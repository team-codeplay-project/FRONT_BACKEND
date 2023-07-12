import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";

const Auction = () => {
  const [chkscreen, setChkScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(0);
  const { account, chkchainID, contract } = useContext(AppContext);
  const { r_idx } = useParams() ;

  const get_R_data = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auction/${r_idx}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const endchk = response.data.isEnd;

      if (endchk == true) {
        setChkScreen(2);
      } else {
        // console.log(response);
        const f_B = response.data.start_block; // fromBlock : 은 디비에서
        // console.log(f_B);
        const a = await contract.getPastEvents("auction", {
          filter: { _idx: r_idx },
          fromBlock: f_B,
          toBlock: "latest",
        });

        for (const v of a) {
          const nowdata = v.returnValues._add.toLowerCase();
          if (nowdata === account) {
            setChkScreen(1);
            break; // 중지
          }
        }
      }

      setIsLoading(false);
      //console.log( 'chk_auction!' ) ;
    } catch (error) {
      console.log(error);
    }
  };

  const onclickauction_participate = async () => {
    setIsLoading(true);
    try {
      await contract.methods.auction_participate(r_idx).send({ from: account });
      get_R_data();
    } catch (error) {
      setIsLoading(false);
      error(error);
    }
  };

  useEffect(() => {
    chkchainID();
    get_R_data();
  }, []);

  return (
    <div className="product-box">
      <div className="product-image"></div>
      <div className="product-info">
        <h3>{r_data.id} 번 래플</h3>
        <p>{r_data.URL} 블럭부터 추첨 </p>
        <div className="auction-price-container">
          <input
            type="number"
            value={auctionPrice}
            onChange={handlePriceChange}
            placeholder="경매 가격 입력"
            className="auction-price-input"
          />
          {isLoading ? (
          <div> Loading </div>
        ) : chkscreen === 2 ? (
          <div> 래플 종료 </div>
        ) : chkscreen === 1 ? (
          <div> 이미 참가 </div>
        ) : (
          <div>
            <button onClick={onclickauction_participate}>참가!</button>
          </div>
        )}
        </div>
      </div>
    </div>
  )
};

export default Auction;