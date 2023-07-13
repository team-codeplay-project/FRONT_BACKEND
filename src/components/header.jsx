import React, { useContext, useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { MdOutlineAddCard, MdCreditCard } from "react-icons/md";
import { CgCloseR } from "react-icons/cg";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../App";
import axios from "axios";
import { IoIosArrowForward } from "react-icons/io";

const Header = () => {
  const { setTemp, account, setAccount, mynft, mytoken, getbalance } =
    useContext(AppContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const connect = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // await
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/${accounts[0]}`,
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      if (!response.data.ok) {
        setTemp(accounts[0]);
        navigate("/loginpage");
      }
      setAccount(response.data.user);
      chkchainID();
    } catch (error) {
      console.error(error);
    }
  };

  const disconnect = async () => {
    try {
      setAccount();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (account) {
      getbalance();
    }
  }, [account]);

  const chkchainID = async () => {
    try {
      const id = await window.ethereum.request({
        method: "eth_chainId",
        params: [],
      });

      if (id !== 0x5) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: "0x5",
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const clearSearchInput = () => {
    setSearchValue("");
  };

  return (
    <header className={`header ${isMenuOpen ? "menu-open" : ""}`}>
      <div className="header-menu">
        <FiMenu
          className={`header-icon ${isMenuOpen ? "active" : ""}`}
          size={28}
          strokeWidth={2}
          onClick={toggleMenu}
        />
      </div>
      <div className="header-content">
        <div className="search-container">
          <input
            type="text"
            placeholder="검색어를 입력하세요."
            value={searchValue}
            onChange={handleSearchInputChange}
          />
          {searchValue && (
            <div className="close-icon-container">
              <CgCloseR
                className="close-icon"
                size={15}
                onClick={clearSearchInput}
              />
            </div>
          )}
        </div>
        {account ? (
          <div className="connected-account">
            <MdCreditCard
              className="header-icon card-icon"
              size={34}
              color="#007aff"
              onClick={disconnect}
              style={{ marginTop: "2.5px" }}
            />
          </div>
        ) : (
          <div>
            <MdOutlineAddCard
              className="header-icon card-icon"
              size={34}
              onClick={connect}
            />
          </div>
        )}
        <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
          <GrClose className="close-icon2" size={20} onClick={toggleMenu} />
          {account ? (
            <div>
              <span
                className="login-link"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}>
                {`${account.name} 님`}
              </span>
              <ul className="menu-items">
                {mynft === -1 ? (
                  <li>loading~~</li>
                ) : (
                  <div>
                    <li className="menu-item">
                      티켓 수 : {mynft} : 토큰 수 : {mytoken}
                    </li>
                    <li className="menu-item">MY 티켓</li>
                    <li className="menu-item">MY 정보</li>
                  </div>
                )}
              </ul>
            </div>
          ) : (
            <div className="login-link" onClick={connect}>
              <span style={{ marginRight: "20px" }}>로그인</span>
              <IoIosArrowForward
                size={25}
                style={{ verticalAlign: "middle" }}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
