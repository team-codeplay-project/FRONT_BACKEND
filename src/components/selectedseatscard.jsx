import React from "react";

const SelectedSeatsCard = ({ seats, onConfirm }) => {
  return (
    <div className="selected-seats-card">
      <div className="selected-seats">
        <ul>
          {seats.map((seat) => (
            <li key={seat}>{seat}</li>
          ))}
        </ul>
      </div>
      <button className="confirm-button" onClick={onConfirm}>
        Confirm Booking
      </button>
    </div>
  );
};

export default SelectedSeatsCard;
