import React from "react";

const SeatSelection = ({ onSeatSelection, selectedSeats }) => {
  const handleSeatSelection = (row, seat) => {
    onSeatSelection(row, seat);
  };

  const renderSeatMap = () => {
    const seatMap = [
      { row: 1, seats: 13 },
      { row: 2, seats: 15 },
      { row: 3, seats: 15 },
      { row: 4, seats: 16 },
    ];

    return seatMap.map(({ row, seats }) => {
      const rowSeats = [];

      for (let seat = 1; seat <= seats; seat++) {
        const seatKey = `${row}-${seat}`;
        const isSelected = selectedSeats.includes(seatKey);

        let blank = 0;
        if (seat % 3 === 0) {
          blank = 10;
        }

        rowSeats.push(
          <div
            key={seatKey}
            className={`seat ml-4 ${isSelected ? "selected" : ""}`}
            style={{ marginLeft: blank }}
            onClick={() => handleSeatSelection(row, seat)}></div>
        );
      }

      return (
        <div key={`row-${row}`} className="row">
          {rowSeats}
        </div>
      );
    });
  };

  return (
    <div className="seat-selection-container">
      <div className="seat-container">
        <div className="seat-map">{renderSeatMap()}</div>
      </div>
    </div>
  );
};

export default SeatSelection;
