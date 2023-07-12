import React, { useState } from "react";
import Dropdown from "react-dropdown-select";
import { BiBaseball } from "react-icons/bi";
import { TbSection } from "react-icons/tb";
import { LuArmchair } from "react-icons/lu";
import SelectedSeatsCard from "./SelectedSeatsCard";
import SeatSelection from "./SeatSelection";
import "../style/booking.css";
import "../style/seatselect.css";

const TicketBooking = () => {
  const tickets = ["두산 : 롯데", "LG 트윈스 : 기아"];
  const seatSections = [
    {
      value: "테이블석",
      label: "테이블석",
      options: [{ value: "1루 테이블석", label: "1루 테이블석" }],
    },
    {
      value: "네이비석",
      label: "네이비석",
      options: [{ value: "1루 네이비석", label: "1루 네이비석" }],
    },
    {
      value: "익사이팅존",
      label: "익사이팅존",
      options: [{ value: "1루 익사이팅존", label: "1루 익사이팅존" }],
    },
  ];

  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleSectionChange = (option) => {
    setSelectedSection(option[0].value);
    setSelectedSeat(null);
    setSelectedSeats([]);
    setShowSeatSelection(false);
  };

  const handleSeatSelection = (row, seat) => {
    const seatKey = `${row}-${seat}`;
    const isSelected = selectedSeats.includes(seatKey);

    if (isSelected) {
      const updatedSeats = selectedSeats.filter((seat) => seat !== seatKey);
      setSelectedSeats(updatedSeats);
    } else {
      const updatedSeats = [...selectedSeats, seatKey];
      setSelectedSeats(updatedSeats);
    }
  };

  const handleSeatSelectionClick = () => {
    setShowSeatSelection(true);
  };

  const handleSeatSelectionClose = () => {
    setShowSeatSelection(false);
  };

  const handleBooking = () => {
    if (selectedTicket && selectedSeat) {
      console.log("Booking Confirmed!");
    } else {
      console.log("Please select all options!");
    }
  };

  const handleConfirmBooking = () => {
    console.log("Selected Seats:", selectedSeats);
    console.log("Ticket Quantity:", selectedSeats.length);
    setShowSeatSelection(false);
  };

  return (
    <div>
      <div className="title2-container">
        <h3 className="title2">티켓 예매</h3>
      </div>
      <div className="ticket-booking-container">
        <div className="section">
          <h3 className="section-title">
            <BiBaseball className="section-icon" />
            경기
          </h3>
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <div
                key={ticket}
                className={`ticket-item ${
                  selectedTicket === ticket ? "selected" : ""
                }`}
                onClick={() => handleTicketClick(ticket)}>
                <p>{ticket}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="section2">
          <h3 className="section2-title">
            <TbSection className="section2-icon" />
            구역
          </h3>
          <div className="seat-select">
            <Dropdown
              options={seatSections}
              value={selectedSection}
              onChange={handleSectionChange}
              placeholder="Select a section"
              className="dropdown-select"
              menuPlacement="auto"
            />
          </div>
        </div>

        {selectedSection && (
          <div className="section3">
            <h3 className="section3-title">
              <LuArmchair className="section3-icon" />
              좌석
            </h3>
            <div className="seat-select2">
              <Dropdown
                options={
                  seatSections.find(
                    (section) => section.value === selectedSection
                  )?.options || []
                }
                value={selectedSeat}
                onChange={(option) => setSelectedSeat(option[0].value)}
                placeholder="Select a seat"
                className="dropdown-select"
                menuPlacement="auto"
              />
              {selectedSeat === "1루 테이블석" && (
                <>
                  {showSeatSelection && (
                    <div className="modal-overlay">
                      <SeatSelection
                        onSeatSelection={handleSeatSelection}
                        selectedSeats={selectedSeats}
                      />
                      <SelectedSeatsCard
                        seats={selectedSeats}
                        onConfirm={handleConfirmBooking}
                      />
                    </div>
                  )}
                  <button
                    className="seat-selection-button"
                    onClick={handleSeatSelectionClick}>
                    좌석 선택하기
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        <button className="book-button" onClick={handleBooking}>
          예매하기
        </button>
      </div>
    </div>
  );
};

export default TicketBooking;
