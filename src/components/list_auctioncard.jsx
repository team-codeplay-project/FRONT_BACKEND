import React from "react";
import "../style/rafflebox.css";

const AuctionCard = ({ r_data }) => {
  const handleEntry = () => {
    console.log(`Entering raffle for ${r_data.name}`);
  };

  return (
    <div className="product-box ">
      <div className="product-image"></div>
      <div className="product-info">
        <h3>{r_data.name}</h3>
        {/* <p> 이미지 주소 {r_data.URL} </p> */}
        <button className="auction-button" onClick={handleEntry}>
          자세히보기
        </button>
      </div>
    </div>
  );
};

export default AuctionCard;
