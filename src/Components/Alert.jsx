import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FaCheck, FaExclamation } from "react-icons/fa";

const Alert = ({ type, message, duration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <FaCheck className="me-2" />;
      case "error":
        return <FaExclamation className="me-2" />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`alert alert-${
        type === "success" ? "success" : "danger"
      } d-flex align-items-center`}
      role="alert"
      style={{
        position: "fixed",
        zIndex: 5050,
        top: "85%",
        width: "95%",
        left: "3%",
      }}
    >
      {getIcon(type)}
      <div>{message}</div>
    </div>
  );
};

Alert.propTypes = {
  type: PropTypes.oneOf(["success", "error"]).isRequired,
  message: PropTypes.string.isRequired,
  duration: PropTypes.number,
};

Alert.defaultProps = {
  duration: 4000,
};

export default Alert;
