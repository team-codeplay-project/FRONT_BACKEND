import axios from "axios";
import "../style/admin.css";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";

const chk = {};
let a_idx,
  max = -1;
const AdminPage = ({ admin }) => {
  const [activeTab, setActiveTab] = useState(1);
  const [data, setData] = useState();
  const [Goods_url, setUrl] = useState();
  const [Goods_name, setName] = useState("상품 이름");
  const [winner, setWinner] = useState([]);
  const [n, setN] = useState();
  const [E, setE] = useState();
  const { token_c, web3, account } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const create = async (e) => {
    try {
      e.preventDefault();

      let ARdata;

      if (activeTab === 1) {
        ARdata = "raffle";
      } else {
        ARdata = "auction";
      }

      let start_block = await web3.eth.getBlockNumber();
      start_block = Number(start_block);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/${ARdata}/`,
        {
          name: Goods_name,
          url: Goods_url,
          start_block,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      get_Data();
    } catch (error) {
      console.error(error);
    }
  };
  const AuctionEnd = async (key) => {
    try {
      setN(key);
      let end_block = await web3.eth.getBlockNumber();
      end_block = Number(end_block);
      setE(end_block);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/auction/${key}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const f_B = response.data.start_block; // fromBlock : 은 디비에서
      const e_B = end_block;

      const a = await token_c.getPastEvents("auction", {
        filter: { _idx: key },
        fromBlock: f_B,
        toBlock: e_B,
      });

      max = -1;

      a.map((v, i) => {
        //
      });
    } catch (error) {}
  };

  const RaffleEnd = async (key) => {
    try {
      setN(key);
      let end_block = await web3.eth.getBlockNumber();
      end_block = Number(end_block);
      setE(end_block);

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/Auction/${key}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      const f_B = response.data.start_block; // fromBlock : 은 디비에서
      const e_B = end_block;

      const a = await token_c.getPastEvents("Auction", {
        filter: { _idx: key },
        fromBlock: f_B,
        toBlock: e_B,
      });

      initializeChk();

      a.map((v) => {
        const nowdata = v.returnValues._add.toLowerCase();
        if (chk[nowdata] !== true) {
          chk[nowdata] = true;
          setWinner((prev) => [...prev, nowdata]);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const get_R_winner = async () => {
    let idx = await token_c.methods.Raffle_End(n, winner.length).call();
    idx = Number(idx);
    // console.log( idx , ( typeof idx ) ) ;

    await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/raffle/${n}}/done`,
      {
        end_block: E,
        winner: winner[idx],
      },
      {
        headers: {
          "ngrok-skip-browser-warning": "any",
        },
      }
    );

    // console.log(winner) ;
    // console.log( idx , winner[idx]) ;
    console.log("Raffle_", n, " is End");
  };

  useEffect(() => {
    const length = winner.length;
    if (length !== 0) {
      setWinner([]);
      get_R_winner();
    }
  }, [winner]);

  const initializeChk = () => {
    for (const key in chk) {
      if (chk.hasOwnProperty(key)) {
        delete chk[key];
      }
    }
  };

  const get_Data = async () => {
    try {
      let ARdata;
      setIsLoading(true);

      if (activeTab === 1) {
        ARdata = "raffle";
      } else {
        ARdata = "auction";
      }
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/${ARdata}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    get_Data();
  }, [activeTab]);

  let content;

  if (activeTab === 1) {
    content = (
      <div className="back-container">
        <div className="product-container2 min-h-[844px]">
          <form onSubmit={create}>
            <input
              className="text-black"
              type="text"
              placeholder="상품 URL"
              value={Goods_url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <input
              className="text-black"
              type="text"
              placeholder="상품 이름"
              value={Goods_name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="p-2 m-2">래플 생성</button>
            <button className="p-2 m-2">생성 완료</button>
          </form>

          {isLoading ? (
            <div>loading</div>
          ) : (
            data?.map((v, i) => {
              if (v.isEnd === false) {
                return (
                  <button key={i} onClick={() => RaffleEnd(v.id)}>
                    {v.id}번 래플 종료
                  </button>
                );
              }
              return null;
            })
          )}
        </div>
      </div>
    );
  } else if (activeTab === 2) {
    content = (
      <div className="product-container2">
        <form onSubmit={create}>
          <input
            className="text-black"
            type="text"
            placeholder="상품 URL"
            value={Goods_url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <input
            className="text-black"
            type="text"
            placeholder="상품 이름"
            value={Goods_name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="p-2 m-2">옥션 생성</button>
          <button className="p-2 m-2">생성 완료</button>
        </form>
        {isLoading ? (
          <div>loading</div>
        ) : (
          data?.map((v, i) => {
            if (v.isEnd === false) {
              return (
                <button key={i} onClick={() => AuctionEnd(v.id)}>
                  {v.id}번 옥션 종료
                </button>
              );
            }
            return null;
          })
        )}
      </div>
    );
  } else if (activeTab === 3) {
    content = (
      <>
        <div className="price-container2">
          <h3>래플 가격 설정</h3>
          <input
            className="price-input"
            type="number"
            placeholder="가격 입력"
          />
          <button className="price-button">설정</button>
        </div>

        <div className="price-container">
          <h3>옥션 가격 설정</h3>
          <input
            className="price-input"
            type="number"
            placeholder="가격 입력"
          />
          <button className="price-button">설정</button>
        </div>

        <div className="price-container">
          <button className="price-button">출금</button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="tab4-container shadow-md">
        <button
          className={`tab ${activeTab === 1 ? "active" : ""}`}
          onClick={() => handleTabClick(1)}
          role="tab">
          래플 탭
        </button>
        <button
          className={`tab ${activeTab === 2 ? "active" : ""}`}
          onClick={() => handleTabClick(2)}
          role="tab">
          옥션 탭
        </button>
        <button
          className={`tab ${activeTab === 3 ? "active" : ""}`}
          onClick={() => handleTabClick(3)}
          role="tab">
          가격, 출금
        </button>
      </div>

      <div className="product-gallery">{content}</div>
    </>
  );
};

export default AdminPage;
