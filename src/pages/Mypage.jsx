import React, { useContext, useEffect, useState } from "react";
import "../style/mypage.css";
import Nftcardlist from "../components/nftcardlist";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { ChevronLeft } from "react-icons/ai";
// import MyTicket from "../components/MyTicket";
// import MyToken from "../components/MyToken";

const Mypage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const { account, getbalance , mynft, mytoken} = useContext(AppContext);
  const [data, setData] = useState();
  const [use_t , setuse_t] = useState(0) ;

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const get_nft_data = async () => {
    try {
      if( account ) {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nft/${account.address}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      let c = 0 ;
      response.data.map( (v,i) => {
        if( v.isUsed === true ) c ++ ;
      })

      setuse_t( c ) ;
      setData(response.data) ;
      console.log(response.data);
    }
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate() ;
  useEffect( () => {
    if( !account ) {
      navigate("/");
    }
    get_nft_data();
  } , [] );

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
                      <h4>{account.name}</h4>
                    </div>
                  </div>
                  <div class="tokens-tickets">
                    <div class="token-container">
                      <h5>My 토큰</h5>
                      <p>{mytoken}</p>
                    </div>
                    <div class="ticket-container">
                      <h5>미사용 티켓</h5>
                      <p>{mynft-use_t}</p>
                    </div>
                    <div class="token-container">
                      <h5>사용 티켓</h5>
                      <p>{use_t}</p>
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
