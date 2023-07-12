import React, { useContext, useEffect, useState } from "react";
import "../style/mypage.css";
import Nftcardlist from "../components/nftcardlist";
import { AppContext } from "../App";
import axios from "axios";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { ChevronLeft } from "react-icons/ai";
// import MyTicket from "../components/MyTicket";
// import MyToken from "../components/MyToken";

const Mypage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { account, getbalance } = useContext(AppContext);
  const [data, setData] = useState();

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const get_nft_data = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nft/${account.address}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    get_nft_data();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <div className="tab3-container">
        <button
          className={`tab3 ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
          role="tab">
          사용전
        </button>
        <button
          className={`tab3 ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
          role="tab">
          사용완료
        </button>
        <button
          className={`tab3 ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
          role="tab">
          내 토큰
        </button>
      </div>
      <div>
        <div className="card-container">
          <div className="card">
            <div className="card-content">
              {activeTab !== 3 && (
                <div>
                  <div className="nft-list">
                    {data?.map((v, i) => {
                      if (
                        (activeTab === 1 && v.isUsed === false) ||
                        (activeTab === 2 && v.isUsed === true)
                      ) {
                        return <Nftcardlist key={i} data={v} />;
                      }
                      return null;
                    })}
                  </div>
                </div>
              )}
              {activeTab === 3 && (
                <div class="container">
                  <div class="user-info">
                    <div class="user-box">
                      <h4>User Name</h4>
                      <p>010-1234-1234</p>
                    </div>
                  </div>
                  <div class="tokens-tickets">
                    <div class="token-container">
                      <h5>My 토큰</h5>
                      <p>0</p>
                    </div>
                    <div class="ticket-container">
                      <h5>My 티켓</h5>
                      <p>0</p>
                    </div>
                  </div>
                  <div>
                    <button className="button2">로그아웃</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mypage;
