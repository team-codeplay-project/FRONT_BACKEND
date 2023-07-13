import React, { useContext, useEffect, useState } from "react";
import "../style/rafflebox.css";
import axios from "axios";
import RaffleCard from "../components/list_rafflecard";
import AuctionCard from "../components/list_auctioncard";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const EventPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState();
  const [toggle, setToggle] = useState(false);
  const { account , getbalance } = useContext(AppContext);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const get_Raffle_Data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/raffle`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setdata(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const get_Auction_Data = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auction`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setdata(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 1) {
      get_Raffle_Data();
    } else if (activeTab === 2) {
      get_Auction_Data();
    }
  }, [activeTab]);

  
    const navigate = useNavigate() ;
    useEffect(() => {
    if( !account ){
      navigate("/");
    }
    getbalance() ;
    } , [] ) ;

  let content;
  let buttonGroup = null;

  const items = [
    {
      id: 1,
      image: "product1.jpg",
      name: "아이템 1",
      description: "아이템 1에 대한 설명",
    },
    {
      id: 2,
      image: "product2.jpg",
      name: "아이템 2",
      description: "아이템 2에 대한 설명",
    },
    {
      id: 3,
      image: "product3.jpg",
      name: "아이템 3",
      description: "아이템 3에 대한 설명",
    },
    {
      id: 4,
      image: "product4.jpg",
      name: "아이템 4",
      description: "아이템 4에 대한 설명",
    },
    {
      id: 5,
      image: "product5.jpg",
      name: "아이템 5",
      description: "아이템 5에 대한 설명",
    },
  ];

  if (activeTab === 1) {
    content = (
      <div className="product-container2">
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map((v, i) => {
            if (v.isEnd === toggle) {
              return <RaffleCard r_data={v} key={i} />;
            }
            return null;
          })
        )}
      </div>
    );
    buttonGroup = (
      <div className="button-group">
        <button className="ongoing-button" onClick={() => setToggle(false)}>
          진행중
        </button>
        <button className="completed-button" onClick={() => setToggle(true)}>
          마감
        </button>
      </div>
    );
  } else if (activeTab === 2) {
    content = (
      <div className="product-container2">
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map((v, i) => {
            if (v.isEnd === toggle) {
              return <AuctionCard r_data={v} key={i} />;
            }
            return null;
          })
        )}
      </div>
    );
    buttonGroup = (
      <div className="button-group">
        <button className="ongoing-button" onClick={() => setToggle(false)}>
          진행중
        </button>
        <button className="completed-button" onClick={() => setToggle(true)}>
          마감
        </button>
      </div>
    );
  } else if (activeTab === 3) {
    content = (
      <div>
        {items.map((item) => (
          <div className="item-box" key={item.id}>
            <div className="item">
              <div className="item-image-container">
                <img src={item.image} alt={item.name} className="item-image" />
              </div>
              <div className="item-content">
                <h3 className="item-name">{item.name}</h3>
                <p className="item-description">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="tab2-container shadow-md">
        <button
          className={`tab2 ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
          role="tab">
          래플
        </button>
        <button
          className={`tab2 ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
          role="tab">
          옥션
        </button>
        <button
          className={`tab2 ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
          role="tab">
          확인하기
        </button>
      </div>

      <div className="product-gallery min-h-[844px]">{content}</div>

      {buttonGroup}
    </>
  );
};

export default EventPage;
