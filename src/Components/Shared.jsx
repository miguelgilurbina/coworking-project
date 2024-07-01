import React, { useState } from "react";
import { FaShareAlt, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { IconContext } from "react-icons";
import "../Styles/Shared.css";

const Shared = ({ title, subtitle, image, url }) => {
  const [socialNetwork, setSocialNetwork] = useState(null);
  const [customMessage, setCustomMessage] = useState("");

  const shareOnSocialNetwork = () => {
    if (socialNetwork) {
      let shareUrl;
      switch (socialNetwork) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`;
          break;
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(customMessage)}`;
          break;
        case "instagram":
          shareUrl = `https://www.instagram.com/share?url=${encodeURIComponent(
            url
          )}&title=${encodeURIComponent(customMessage)}`;
          break;
        default:
          return;
      }
      window.open(
        shareUrl,
        "_blank",
        "noopener noreferrer, width=600, height=400"
      );
      setSocialNetwork(null);
    }
  };

  const handleInputChange = (event) => {
    setCustomMessage(event.target.value);
  };

  const cancelShare = () => {
    setSocialNetwork(null);
  };

  const openSharePopup = (network) => {
    setSocialNetwork(network);
  };

  const getSocialIcon = (network) => {
    switch (network) {
      case "facebook":
        return <FaFacebook />;
      case "twitter":
        return <FaTwitter />;
      case "instagram":
        return <FaInstagram />;
      default:
        return null;
    }
  };

  return (
    <div className="shareComponent">
      <div className="shareText">
        <h3>{title}</h3>
        <h5>{subtitle}</h5>
      </div>
      <div className="shareOptions">
        <div>
          <IconContext.Provider value={{ size: "1.5em" }}>
            <FaShareAlt />
          </IconContext.Provider>
          <span>Share on:</span>
        </div>
        <div>
          <button onClick={() => openSharePopup("facebook")}>
            {getSocialIcon("facebook")}
          </button>
          <button onClick={() => openSharePopup("twitter")}>
            {getSocialIcon("twitter")}
          </button>
          <button onClick={() => openSharePopup("instagram")}>
            {getSocialIcon("instagram")}
          </button>
        </div>
      </div>
      {socialNetwork && (
        <div className="shareMessage">
          <textarea
            placeholder="Write your message..."
            value={customMessage}
            onChange={handleInputChange}
          />
          <div>
            <button onClick={shareOnSocialNetwork}>Share</button>
            <button onClick={cancelShare}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shared;
