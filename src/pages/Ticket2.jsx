import React, { useContext, useEffect, useState } from 'react';
import Dropdown from 'react-dropdown-select';
import { BiBaseball } from 'react-icons/bi';
import { TbSection } from 'react-icons/tb';
import { LuArmchair } from 'react-icons/lu';

import '../style/booking.css';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TicketBooking = () => {
  const tickets = [ { label : '두산:롯데' , value : 1 } ,{ label : 'LG트윈스:기아' , value : 2 } ];
  const { web3, account, nft_c } = useContext(AppContext);
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

  const db = [
    [
      { seats: 10, sum: 0 },
      { seats: 11, sum: 10 },
      { seats: 12, sum: 21 },
      { seats: 13, sum: 33 },
      { seats: 6, sum: 46 },
    ],
    [
      { seats: 13, sum: 0 },
      { seats: 12, sum: 13 },
      { seats: 4, sum: 25 },
      { seats: 10, sum: 35 },
      { seats: 9, sum: 45 },
    ],
    [
      { seats: 7, sum: 0 },
      { seats: 6, sum: 7 },
      { seats: 5, sum: 13 },
      { seats: 12, sum: 25 },
      { seats: 13, sum: 38 },
    ],
  ];

  const [game, setgame] = useState(null);
  const [type, settype] = useState(null);
  const [block, setblock] = useState(null);
  const [typeclear, setTypeclear] = useState(true);
  const [isloading, setIsLoading] = useState(false);
  const [loading_mint, setloading_mint] = useState(false);
  const [re, setRe] = useState();

  const c_game = (ticket) => {
    settype();
    setblock();
    setTypeclear(!typeclear);
    setgame(ticket);
  };

  const c_type = (option) => {
    settype(option[0].value);
    setblock();
  };

  const get_nft_data = async () => {

    try {
      setIsLoading(true);
      let day = 230715;
      if (game === 2) day = 230716;      

      const tblock = type * 1000 + block;
      const edidx = Number(db[type - 1][4].sum) + Number(db[type - 1][4].seats);
      
      const response = await nft_c.methods.seat_info(day, tblock, edidx).call();
      setRe(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const [board, setBoard] = useState(() => {
    const initialBoard = [];
    for (let i = 0; i < 5; i++) {
      initialBoard.push(Array(13).fill(0));
    }
    return initialBoard;
  });

  const buyticket = async (idx) => {
    try {
      let day = 230715;
      if (game === 2) day = 230716;

      setloading_mint(true);
      const _type = type * 1000000 + block * 1000 + idx + 1;
      const response = await nft_c.methods.buy_ticket(day, _type).send({
        from: account.address,
        value: web3.utils.toWei('0.0001', 'ether'),
      });
      
      const responses = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/nft/`,
        {
          day,
          type: _type ,
          owner: account.address,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );
      

      setloading_mint(false);

    } catch (error) {
      setloading_mint(true);
      console.error(error);
    } finally {
      navigate('/ticket');
      c_game();
    }
  };

  useEffect(() => {
    if (block) {
      get_nft_data();
    }
  }, [block]);

  const navigate = useNavigate() ;
  useEffect( () => {
    if( !account ) {
      navigate("/");
    }
  } , [] );

  return (
    <div>
      <div className="title2-container">
        <h3 className="title2">티켓 예매</h3>
      </div>

      <div className="ticket-booking-container">
        {!block && (
          <>
            <div className="section">
              <h3 className="section-title">
                <BiBaseball className="section-icon" />
                경기
              </h3>
              <div className="ticket-list">
                {tickets.map((v,i) => (
                  <div
                    key={i}
                    className={`ticket-item ${game === v.value ? 'selected' : ''}`}
                    onClick={() => c_game(v.value)}
                  >
                    <p>{v.label}</p>
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
                </div>
              </div>
            )}
          </>
        )}
        {block &&
          re && ( loading_mint ? <div>minting 중... </div> : (isloading ? (
            <div> isloading</div>
          ) : (
            <div>
              {board.map((row, x) => (
                <div key={x} className="flex m-2">
                  {row.map((cell, y) =>
                    y >= 13 - db[type - 1][x].seats ? (
                      re[
                        db[type - 1][x].sum + y - 13 + db[type - 1][x].seats
                      ] === false ? (
                        <button
                          key={y}
                          className={`m-1 w-8 h-5 border rounded-md border-gray-400 bg-white-100`}
                          onClick={() =>
                            buyticket(
                              db[type - 1][x].sum +
                                y -
                                13 +
                                db[type - 1][x].seats
                            )
                          }
                        ></button>
                      ) : (
                        <div
                          key={y}
                          className={`m-1 w-8 h-5 border rounded-md border-gray-400 bg-red-100
                      `}
                        ></div>
                      )
                    ) : (
                      <div key={y} className={`m-1 w-8 h-5 bg-white`}></div>
                    )
                  )}
                </div>
              ))}
            </div>
          )))
          
          }
      </div>
    </div>
  );
};

export default TicketBooking;
