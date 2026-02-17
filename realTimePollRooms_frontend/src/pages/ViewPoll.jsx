import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { generateFingerPrint } from "../utils/fingerprint";
import { connectWebSocket } from "../services/websocket";
import { toast } from "react-toastify";
import { getPoll, submitVote } from "../services/api";
import {
  Card,
  Col,
  Container,
  Row,
  Form,
  Button,
  ProgressBar,
} from "react-bootstrap";
import ShareLink from "../components/ShareLink";
function ViewPoll() {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [loading, setLoding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [voterID] = useState(generateFingerPrint());

  useEffect(() => {
    loadPoll();

    const voted = localStorage.getItem(`voted_${pollId}`);
    if (voted) {
      setHasVoted(true);
    }

    const wsClient = connectWebSocket(pollId, (updatedPoll) => {
      setPoll(updatedPoll);
      toast.info("Poll Updated!", { autoClose: 1000 });
    });

    return () => {
      if (wsClient) {
        wsClient.deactivate();
      }
    };
  }, [pollId]);

  const loadPoll = async () => {
    try {
      const data = await getPoll(pollId);
      setPoll(data);
    } catch (error) {
      console.error("Error loading poll: ", error);
      toast.error("Failed to load poll");
    } finally {
      setLoding(false);
    }
  };

  const handleVote = async () => {
    if (!selectedOpt) {
      toast.warning("Please Select option");
      return;
    }
    setSubmitting(true);

    try {
      const voteData = {
        optId: selectedOpt,
        voterId: Number(voterID),
      };

      const updatedPoll = await submitVote(pollId, voteData);
      setPoll(updatedPoll);
      setHasVoted(true);
      localStorage.setItem(`voted_${pollId}`, true);
      toast.success("Vote Submitted Successfully!");
    } catch (error) {
      console.error("Error submitting vote: ", error);

      if (error.response?.status === 409) {
        toast.error("You have already voted in this poll");
        setHasVoted(true);
        localStorage.setItem(`voted_${pollId}`);
      } else {
        toast.error(error.response?.data?.error || "Failed to submit vote");
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="content-wrapper">
        <Container>
          <div className="text-center text-white">
            <h3>Loading Poll...</h3>
          </div>
        </Container>
      </div>
    );
  }

  if (!poll) {
    return (
      <div className="content-wrapper">
        <Container>
          <Card className="card-custom p-5 text-center">
            <h3>Poll not found</h3>
            <p>This poll may have been deleted or the link is incorrect</p>
          </Card>
        </Container>
      </div>
    );
  }

  const totalVotes = poll.totalVotes || 0;
  return (
    <div className="content-wrapper">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Card className="card-custom p-4">
              <h2 className="text-center mb-4">{poll.quest}</h2>
              <ShareLink pollId={pollId} />
              {!hasVoted ? (
                <div>
                  <h5 className="mb-3">Select your answer:</h5>
                  {poll.opts.map((opt) => (
                    <div
                      key={opt.id}
                      className={`poll-option ${selectedOpt === opt.id ? "selected" : ""}`}
                      onClick={() => setSelectedOpt(opt.id)}
                    >
                      <Form.Check
                        type="radio"
                        name="pollOption"
                        label={opt.text}
                        checked={selectedOpt === opt.id}
                        onChange={() => setSelectedOpt(opt.id)}
                      />
                    </div>
                  ))}
                  <Button
                    className="btn-primary-custom w-100 mt-4"
                    size="lg"
                    onClick={handleVote}
                    disabled={!selectedOpt || submitting}
                  >
                    {submitting ? "Submitting..." : "Submit Vote"}
                  </Button>
                </div>
              ) : (
                <div className="results-container">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5>Results</h5>
                    <span className="vote-count-badge">
                      {totalVotes} {totalVotes === 1 ? "vote" : "votes"}
                    </span>
                  </div>
                  {poll.opts &&
                    poll.opts.map((opt) => {
                      const percentage =
                        totalVotes > 0
                          ? ((opt.voteCount / totalVotes) * 100).toFixed(1)
                          : 0;

                      return (
                        <div className="mb-4" key={opt.id}>
                          <div className="d-flex justify-content-between mb-2">
                            <span className="fw-bold">{opt.text}</span>
                            <span className="text-muted">
                              {opt.voteCount} votes ({percentage}%)
                            </span>
                          </div>
                          <ProgressBar
                            now={percentage}
                            className="progress-bar-custom"
                            style={{ height: "25px" }}
                          />
                        </div>
                      );
                    })}
                  <div className="alert alert-info mt-4">
                    <small>
                      You vote has been recorded. Results update in real-time!
                    </small>
                  </div>
                </div>
              )}
              <div className="text-center mt-4">
                <small className="text-muted">
                  Created: {new Date(poll.createdAt).toLocaleString()}
                </small>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ViewPoll;
