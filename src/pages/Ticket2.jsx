import React, { useEffect, useState } from 'react';
import Dropdown from 'react-dropdown-select';
import { BiBaseball } from 'react-icons/bi';
import { TbSection } from 'react-icons/tb';
import { LuArmchair } from 'react-icons/lu';

import '../style/booking.css';
import '../style/seatselect.css';

const TicketBooking = () => {
  const tickets = ['두산:롯데', 'LG트윈스:기아'];
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

  const [game, setgame] = useState(null);
  const [type, settype] = useState(null);
  const [block, setblock] = useState(null);
  const [typeclear, setTypeclear] = useState(true);

  useEffect(() => {
    console.log('game', game);
  }, [game]);
  useEffect(() => {
    console.log('type', type);
  }, [type]);
  useEffect(() => {
    console.log('block', block);
  }, [block]);

  const [show, setshow] = useState(false);

  const c_game = (ticket) => {
    settype();
    setblock();
    setTypeclear(!typeclear);
    setgame(ticket);
  };

  const c_type = (option) => {
    settype(option[0].value);
    setblock();
    setshow(false);
  };

  const c_block = () => {
    setshow(true);
  };

  const handleBooking = () => {
    if (game && block) {
      console.log('Booking Confirmed!');
    } else {
      console.log('Please select all options!');
    }
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
            {tickets.map((v) => (
              <div
                key={v}
                className={`ticket-item ${game === v ? 'selected' : ''}`}
                onClick={() => c_game(v)}
              >
                <p>{v}</p>
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
              key={typeclear}
              options={seatSections}
              value={type}
              onChange={c_type}
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
              {block === '1루 테이블석' && (
                <>
                  {show && <div className="modal-overlay"></div>}
                  <button className="seat-selection-button" onClick={c_block}>
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
