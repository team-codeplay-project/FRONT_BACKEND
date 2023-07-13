import React from "react";
import { createContext, useEffect, useState } from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/footer";
import Header from "./components/header";
import StatusBar from "./components/statusbar";
import EventPage from "./pages/Event";
import Homepage from "./pages/Home";
import ReactPlayer from "react-player";
import Mypage from "./pages/Mypage";
import Nfttest from "./pages/Nfttest";
import AdminPage from "./pages/admin";
import { n_abi, n_addr, t_abi, t_addr } from "./raffletest.config";
import Web3 from "web3";
import LoginPage from "./pages/login";
import TicketBooking from "./pages/Ticket2";
import Nftcardlist from "./components/nftcardlist";
import NftDetailPage from "./components/RFdetail";

export const AppContext = createContext();

const admin = "0x1f6D70acBd7B09096717fd5625783F78AF685A5a";
function App() {
  const [temp, setTemp] = useState();
  const [account, setAccount] = useState();
  const [mytoken, setMytoken] = useState(0);
  const [mynft, setMynft] = useState(0);
  const web3 = new Web3(window.ethereum);
  const token_c = new web3.eth.Contract(t_abi, t_addr);
  const nft_c = new web3.eth.Contract(n_abi, n_addr);
  const [game, setgame] = useState(null);
  const [type, settype] = useState(null);
  const [block, setblock] = useState(null);

  const getbalance = async () => {
    try {
      if (account) {
        setMynft(-1);
        const nft_b = await nft_c.methods.balanceOf(account.address).call();
        const token_b = await token_c.methods.balanceOf(account.address).call();
        setMynft(Number(nft_b));
        setMytoken(Number(token_b));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        temp,
        setTemp,
        game,
        setgame,
        type,
        settype,
        block,
        setblock,
        account,
        setAccount,
        mynft,
        mytoken,
        getbalance,
        web3,
        token_c,
        nft_c,
      }}>
      <div>
        <ReactPlayer
          url="/Videos/video.mp4"
          playing={true}
          loop={true}
          muted={true}
          width="100%"
          height="auto"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.15)",
          }}
        />

        <BrowserRouter>
          <div className="iphone-container min-h-[844px]">
            <StatusBar />
            <Header />
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/Ticket" element={<TicketBooking />} />
              <Route path="/Event" element={<EventPage />} />
              <Route path="/Mypage" element={<Mypage />} />
              <Route path="/LoginPage" element={<LoginPage />} />
              <Route path="/AdminPage" element={<AdminPage admin={admin} />} />
              <Route path="/nft" element={<Nfttest />} />
              <Route path="/DetailPage" element={<NftDetailPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
}

export default App;
