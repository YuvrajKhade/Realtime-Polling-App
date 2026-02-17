import { useState } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createPoll } from "../services/api";

function CreatePoll() {
  const navigate = useNavigate();
  const [quest, setQuest] = useState("");
  const [opts, setOpts] = useState(["", ""]);
  const [loading, setLoading] = useState(false);

  const handleAddOption = () => {
    if (opts.length < 10) {
      setOpts([...opts, ""]);
    } else {
      toast.warning("Maximum 10 options allowed");
    }
  };
  const handleRemoveOtpion = (idx) => {
    if (opts > 2) {
      const newOpt = opts.filter((_, i) => i !== idx);
      setOpts(newOpt);
    } else {
      toast.warning("Minimum 2 options required");
    }
  };
  const handleOptionChange = (idx, val) => {
    const newOpt = [...opts];
    newOpt[idx] = val;
    setOpts(newOpt);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!quest.trim()) {
      toast.error("Please Enter a Question");
      return;
    }

    const validOpt = opts.filter((opt) => opt.trim() !== "");
    if (validOpt.length < 2) {
      toast.error("Please provide at least 2 options");
      return;
    }
    setLoading(true);

    try {
      const pollData = {
        quest: quest.trim(),
        options: validOpt.map((opt) => opt.trim()),
      };

      const response = await createPoll(pollData);
      toast.success("Poll created Sucessfully");
      navigate(`/poll/${response.id}`);
    } catch (error) {
      console.error("Error: ", error);
      toast.error(error.response?.data?.error || "Failed to create poll");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-wrapper">
      <Container>
        <Col md={8} lg={6}>
          <Card className="card-custom p-4">
            <h2 className="text-center mb-4">Create a new Poll</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4">
                <Form.Label className="fw-bold">Question</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="What would you like to ask?"
                  value={quest}
                  onChange={(e) => setQuest(e.target.value)}
                  maxLength={500}
                  required
                />
                <Form.Text className="text-muted">
                  {" "}
                  {quest.length}/500 characters
                </Form.Text>
              </Form.Group>
              <Form.Label className="fw-bold">Options</Form.Label>
              {opts.map((opt, idx) => (
                <div className="mb-3 d-flex gap-2" key={idx}>
                  <Form.Control
                    type="text"
                    placeholder={`Option ${idx + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    maxLength={200}
                  />
                  {opts.length > 2 && (
                    <Button
                      variant="outline-danger"
                      onClick={() => handleRemoveOtpion(idx)}
                    >
                      x
                    </Button>
                  )}
                </div>
              ))}
              {opts.length < 10 && (
                <Button
                  variant="outline-secondary"
                  onClick={handleAddOption}
                  className="mb-4 w-100"
                >
                  + Add option
                </Button>
              )}
              <Button
                type="submit"
                className="btn-primary-custom w-100"
                size="lg"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Poll"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Container>
    </div>
  );
}

export default CreatePoll;
