import React, { useContext, useEffect, useState } from "react";
import "../style/login.css";
import axios from "axios";
import { AppContext } from "../App";

const LoginPage = ({ handleLogin }) => {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const { account, setLoggedIn } = useContext(AppContext); // Assuming you have a setLoggedIn function in your context

  const Userinsert = async (e) => {
    e.preventDefault();

    try {
      if (!account || !phone || !nickname) {
        console.log("plus input");
        // 입력이 필요합니다 팝업 or 안내문
        return;
      }

      if (isNaN(phone)) {
        console.log("전화번호는 숫자여야함");
        return;
      }

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/`,
        {
          phone_number: phone,
          address: account,
          name: nickname,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "any",
          },
        }
      );

      console.log("create user");

      // Update the login state
      setLoggedIn(true);
    } catch (error) {
      console.error(error);
      // 여기도 팝업 ex: 이미 존재하는 전화번호입니다.
    }
  };

  if (loggedIn) {
    // Render the new page after successful login
    return (
      <div>
        <h1>Welcome to the new page!</h1>
        {/* Add your content here */}
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1 className="title">로그인</h1>
      <form onSubmit={Userinsert} className="flex flex-col">
        <input
          type="text"
          placeholder="닉네임"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="input-field"
        />
        <input
          type="tel"
          placeholder="휴대폰 번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="input-field"
        />
        <input type="submit" value="회원 가입" />
      </form>
    </div>
  );
};

export default LoginPage;
