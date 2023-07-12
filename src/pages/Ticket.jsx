import React, { useContext, useEffect, useState } from 'react';
import '../style/booking.css';
import '../style/seatselect.css';
import Dropdown from 'react-dropdown-select';
import { BiBaseball } from 'react-icons/bi';
import { TbSection } from 'react-icons/tb';
import { LuArmchair } from 'react-icons/lu';
import { AppContext } from '../App';

const SeatSelectionContainer = ({ onConfirm }) => {
  const [blocks, setblocks] = useState([]);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const {
    nft_c,
    web3,
    account,
    game,
    setgame,
    type,
    settype,
    block,
    setblock,
  } = useContext(AppContext);
  const [seat, setSeat] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [re, setRe] = useState();
  const db = [
    [
      { row: 1, seats: 10, sum: 0 },
      { row: 2, seats: 11, sum: 10 },
      { row: 3, seats: 12, sum: 21 },
      { row: 4, seats: 13, sum: 33 },
    ],
    [
      { row: 1, seats: 13, sum: 0 },
      { row: 2, seats: 12, sum: 13 },
      { row: 3, seats: 4, sum: 25 },
      { row: 4, seats: 10, sum: 35 },
    ],
    [
      { row: 1, seats: 7, sum: 0 },
      { row: 2, seats: 6, sum: 7 },
      { row: 3, seats: 5, sum: 13 },
      { row: 4, seats: 12, sum: 25 },
    ],
  ];

  const get_nft_data = async () => {
    try {
      setIsLoading(true);

      const day = 230715;
      if (game == 2) day = 230716;

      const tblock = type * 1000 + block;
      const edidx = Number(db[type - 1][3].sum) + Number(db[type - 1][3].seats);
      const response = await nft_c.methods.seat_info(day, tblock, edidx).call();
      setRe(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('tq');
    if (block != 0 && block) {
      get_nft_data();
      console.log('!!!');
    }
  }, [block]);

  const handleSeatSelection = (row, seat) => {
    const seatKey = `${row}${seat}`;
    const isSelected = blocks.includes(seatKey);

    if (isSelected) {
      const updatedSeats = blocks.filter((seat) => seat !== seatKey);
      setblocks(updatedSeats);
      setTicketQuantity(0);
    } else {
      if (blocks.length < 1) {
        const updatedSeats = [...blocks, seatKey];
        setblocks(updatedSeats);
        const a = Number(db[type - 1][row - 1].sum) + Number(seat);
        setSeat(a);
        setTicketQuantity(1);
      }
    }
  };

  const handleConfirmBooking = () => {
    onConfirm(blocks, ticketQuantity);
  };

  const temptry = () => {
    const seatMap = db[type - 1];

    return seatMap.map(({ row, seats }) => {
      const rowSeats = [];

      for (let seat = 1; seat <= seats; seat++) {
        const seatNumber = seat.toString().padStart(2, '0');

        const seatKey = `${row}${seatNumber}`;
        const isSelected = blocks.includes(seatKey);

        let blank = 0;
        if (seat % 3 === 0) {
          blank = 10;
        }

        const t = Number(db[type - 1][row - 1].sum) + Number(seat) - 1;

        rowSeats.push(
          <div>
            {re[t] === true ? (
              <div
                key={seatKey}
                className={`seat ml-4 ${isSelected ? 'selected' : ''} `}
                style={{
                  marginLeft: blank,
                  color: 'transparent',
                }}
                onClick={(e) => handleSeatSelection(row, seatNumber)}
              ></div>
            ) : (
              <div
                key={seatKey}
                className={`seat ml-4 ${isSelected ? 'selected' : ''} `}
                style={{
                  marginLeft: blank,
                  color: 'transparent',
                }}
                onClick={(e) => handleSeatSelection(row, seatNumber)}
              ></div>
            )}
          </div>
        );
      }
      return (
        <div key={`row-${row}`} className="row ">
          {rowSeats}
        </div>
      );
    });
  };

  const renderSeatMap = async () => {
    await get_nft_data();
    // temptry() ;
  };

  return (
    <div className="seat-selection-modal">
      <div className="seat-selection-container">
        <div className="seat-container">
          <div className="seat-map">{renderSeatMap()}</div>
        </div>
        <div className="booking-container">
          {blocks.length > 0 && <block seats={blocks} />}
        </div>
        <button className="book-button" onClick={handleConfirmBooking}>
          뒤로가기
        </button>
      </div>
    </div>
  );
};

const TicketBooking = () => {
  const {
    token_c,
    web3,
    account,
    game,
    setgame,
    type,
    settype,
    block,
    setblock,
  } = useContext(AppContext);

  useEffect(() => {
    setgame();
    setblock();
    settype();
  }, []);

  const tickets = ['두산 : 롯데', 'LG 트윈스 : 기아'];
  const seatSections = [
    {
      value: 1,
      label: '테이블석',
      options: [{ value: 101, label: '1루 테이블석' }],
    },
    {
      value: 2,
      label: '네이비석',
      options: [{ value: 201, label: '1루 네이비석' }],
    },
    {
      value: 3,
      label: '익사이팅존',
      options: [{ value: 301, label: '1루 익사이팅존' }],
    },
  ];

  const [showSeatSelection, setShowSeatSelection] = useState(false);

  const handleTicketClick = (ticket) => {
    setgame(ticket);
  };

  const handleSectionChange = (option) => {
    settype(option[0].value);
    setblock(null);
    setShowSeatSelection(false);
  };

  const handleSeatSelectionClick = () => {
    setShowSeatSelection(true);
  };

  const handleConfirmBooking = (blocks, ticketQuantity) => {
    // console.log("Selected Seats:", blocks);
    // console.log("Ticket Quantity:", ticketQuantity);
    // 예매 확인 처리 함수
    // 선택된 좌석 및 티켓 수량 전송
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
                className={`ticket-item ${game === ticket ? 'selected' : ''}`}
                onClick={() => handleTicketClick(ticket)}
              >
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
              value={type}
              onChange={handleSectionChange}
              placeholder="Select a section"
              className="dropdown-select"
              menuPlacement="auto"
            />
          </div>
        </div>

        {type && (
          <div className="section3">
            <h3 className="section3-title">
              <LuArmchair className="section3-icon" />
              좌석
            </h3>
            <div className="seat-select2">
              <Dropdown
                options={
                  seatSections.find((section) => section.value === type)
                    ?.options || []
                }
                value={block}
                onChange={(option) => setblock(option[0].value)}
                placeholder="Select a seat"
                className="dropdown-select"
                menuPlacement="auto"
              />
              {block && (
                <>
                  {showSeatSelection && (
                    <div className="modal-overlay">
                      <SeatSelectionContainer
                        onConfirm={handleConfirmBooking}
                      />
                    </div>
                  )}
                  <button
                    className="seat-selection-button"
                    onClick={handleSeatSelectionClick}
                  >
                    좌석 선택하기
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketBooking;
