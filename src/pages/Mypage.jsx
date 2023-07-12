import React, { useContext, useEffect, useState } from "react";
import "../style/mypage.css";
import Nftcardlist from "../components/nftcardlist";
import { AppContext } from "../App";
import axios from "axios";

const Mypage = () => {
  
  const [activeTab, setActiveTab] = useState(1);
  const { account , getbalance } = useContext(AppContext);
  const [ data , setData ] = useState() ;

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const get_nft_data = async() => {

    try {

      // console.log( `${process.env.REACT_APP_BACKEND_URL}/nft/${account.address}`) ;
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/nft/${account.address}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      // console.log(response.data) ;
      setData(response.data) ;
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect( () => {get_nft_data()} ,[] ) ;

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
                   { data?.map( (v,i) =>{ 
                    if( ( activeTab === 1 && v.isUsed === false ) || ( activeTab === 2 && v.isUsed === true ) ){
                   return ( <Nftcardlist key = { i } data={v} /> ) ;
                  }
                  return null ;
                   })
                   }
                 </div>
                </div>
              )}
              {activeTab === 3 && (
                <div>
                  <h2>보유 토큰</h2>
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
