import React from "react";
import PropTypes from "prop-types";
import "../styles/DashboardCard.css";

const DashboardCard = ({ title, value, icon: Icon, alertLevel, onClick }) => {
  return (
    <div
      className={`dashboard-card ${alertLevel}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick()}
    >
      <div className="card-header">
        {Icon && <Icon className="card-icon" />}
        <h3>{title}</h3>
      </div>
      <div className="card-value">{value}</div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  alertLevel: PropTypes.oneOf(["high", "medium", ""]),
  onClick: PropTypes.func,
};

export default DashboardCard;