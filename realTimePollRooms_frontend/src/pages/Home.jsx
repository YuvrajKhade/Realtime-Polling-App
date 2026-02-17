import { Link } from "react-router-dom";
import assest from "../assests/assest";
import { Button, Col, Container, Row } from "react-bootstrap";
function Home() {
  return (
    <div className="content-wrapper">
      <div className="hero-section">
        <Container>
          <h1>
            <img src={assest.poll} alt="poll image" height={40} width={40} />{" "}
            Real-Time Poll Rooms
          </h1>
          <p>Create polls, share links, and see results update in real-time</p>
          <Link to="/create">
            <Button size="lg" className="btn-primary-custom">
              <b>Create Your Poll Now</b>
            </Button>
          </Link>
        </Container>
      </div>
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <div className="feature-box">
              <div className="feature-icon">
                <img
                  src={assest.lightening}
                  alt="lightening"
                  height={150}
                  width={100}
                />
              </div>
              <h4>Real-Time Updates</h4>
              <p>See votes come in live with WebSocket technology </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <div className="feature-icon">
                <img
                  src={assest.share}
                  alt="lightening"
                  height={170}
                  width={100}
                />
              </div>
              <h4>Easy Sharing</h4>
              <p>Share your poll with a simple link </p>
            </div>
          </Col>
          <Col md={4}>
            <div className="feature-box">
              <div className="feature-icon">
                <img
                  src={assest.sheild}
                  alt="lightening"
                  height={165}
                  width={100}
                />
              </div>
              <h4>Fair Voting</h4>
              <p>Anti-abuse mechanisms prevent duplicate votes </p>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col md={12}>
            <div className="card-custom p-5 text-center">
              <h2 className="mb-4">How It Work</h2>
              <Row>
                <Col md={4}>
                  <h3>1️⃣</h3>
                  <h5>Create a Poll</h5>
                  <p>Add your question and options</p>
                </Col>
                <Col md={4}>
                  <h3>2️⃣</h3>
                  <h5>Share the Link</h5>
                  <p>Send it to your audience</p>
                </Col>
                <Col md={4}>
                  <h3>3️⃣</h3>
                  <h5>Watch Results</h5>
                  <p>See votes in real-time</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
