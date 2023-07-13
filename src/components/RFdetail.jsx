import React, { useEffect, useState } from "react";
import "../style/RFDetail.css";

const NftDetailPage = () => {
  const [nftData, setNftData] = useState({
    image: "",
    title: "",
    description: "",
    ownerAddress: "",
  });

  useEffect(() => {
    fetchNftData();
  }, []);

  const fetchNftData = async () => {
    try {
      const response = await fetch("API_URL");
      const data = await response.json();

      setNftData({
        image: data.image,
        title: data.title,
        description: data.description,
        ownerAddress: data.ownerAddress,
      });
    } catch (error) {
      console.error("Error fetching NFT data:", error);
    }
  };

  return (
    <div className="container">
      <div className="nft-details">
        <div className="nft-image">
          <img src={nftData.image} alt="NFT 이미지" />
        </div>
        <div className="nft-info">
          <h1 className="nft-title">{nftData.title}</h1>
          <p className="nft-description">{nftData.description}</p>
          <div className="nft-owner">
            <span className="label">소유자:</span>
            <span className="owner-address">{nftData.ownerAddress}</span>
          </div>
          {/* 기타 NFT 정보 */}
        </div>
      </div>
    </div>
  );
};

export default NftDetailPage;
