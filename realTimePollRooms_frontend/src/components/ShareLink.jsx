import { toast } from "react-toastify";
import { Button } from "bootstrap";

function ShareLink({ pollId }) {
  const shareUrl = `${window.location.origin}/poll/${pollId}`;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard");
  };
  return (
    <div className="share-link-box">
      <h5 className="mb-3">🔗 Share this poll</h5>
      <div className="d-flex gap-2">
        <input type="text" className="form-control" value={shareUrl} readOnly />
        <Button
          variant="primary"
          onClick={copyToClipboard}
          className="copy-button"
        >
          Copy Link
        </Button>
      </div>
      <small className="text-muted d-block mt-2">
        Share this link with others to collect votes
      </small>
    </div>
  );
}

export default ShareLink;
