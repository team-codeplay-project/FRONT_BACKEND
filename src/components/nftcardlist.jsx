import React, { useEffect } from 'react';
import '../style/mypage.css';
const Nftcardlist = ({ data }) => {
  return (
    <div className="nft-item">
      <img src="nft1.png" alt="NFT 1" />
      <div className="nft-overlay">
        <span>
          {data.day}
          {data.type}
        </span>
      </div>
    </div>
  );
};

export default Nftcardlist;
