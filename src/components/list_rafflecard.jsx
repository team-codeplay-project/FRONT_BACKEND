import "../style/rafflebox.css";
import React from "react";

const RaffleCard = ({ r_data }) => {
  const handleEntry = () => {
    console.log(`Entering raffle for ${r_data.name}`);
  };

  return (
    <div className="product-box ">
      <div className="product-image"></div>
      <div className="product-info">
        <h3>{r_data.name}</h3>
        {/* <p> 이미지 주소 {r_data.URL} </p> */}
        <button className="raffle-button" onClick={handleEntry}>
          자세히보기
        </button>
      </div>
    </div>
  );
};

export default RaffleCard;
