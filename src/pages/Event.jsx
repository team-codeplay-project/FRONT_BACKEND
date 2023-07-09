import React, { useEffect, useState } from "react";
import "../style/rafflebox.css";
import axios from "axios";
import RaffleCard from "../components/list_rafflecard";
import AuctionCard from "../components/list_auctioncard";
// import ReactPlayer from "react-player";

const EventPage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setdata] = useState();

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

  let content;

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
  ];

  if (activeTab === 1) {
    content = (
      <div className="product-container2">
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map((v, i) => <RaffleCard r_data={v} key={i} />)
        )}
      </div>
    );
  } else if (activeTab === 2) {
    content = (
      <div className="product-container2">
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map((v, i) => <AuctionCard r_data={v} key={i} />)
        )}
      </div>
    );
  } else if (activeTab === 3) {
    content = (
      <div className="item-list">
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
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
          role="tab">
          래플
        </button>
        <button
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
          role="tab">
          옥션
        </button>
        <button
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
          role="tab">
          확인하기
        </button>
      </div>

      <div className="product-gallery">{content}</div>

      {activeTab === 1 && (
        <div className="button-group">
          <button className="ongoing-button">진행중</button>
          <button className="completed-button">마감</button>
        </div>
      )}

      {activeTab === 2 && (
        <div className="button-group">
          <button className="ongoing-button">진행중</button>
          <button className="completed-button">마감</button>
        </div>
      )}
    </>
  );
};

export default EventPage;
