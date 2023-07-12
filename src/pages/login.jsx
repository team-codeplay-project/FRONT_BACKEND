import React, { useContext, useState } from 'react';
import '../style/login.css';
import axios from 'axios';
import { AppContext } from '../App';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { temp } = useContext(AppContext);
  const navigate = useNavigate();

  const Userinsert = async (e) => {
    e.preventDefault();

    try {
      if (!temp || !phone || !nickname) {
        console.log('plus input');
        // 입력이 필요합니다 팝업 or 안내문
        return;
      }

      if (isNaN(phone)) {
        console.log('전화번호는 숫자여야함');
        return;
      }

      setIsLoading(true);

      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/user/`,
        {
          phone_number: phone,
          address: temp,
          name: nickname,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      setIsLoading(false);

      navigate('/');
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

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
        {isLoading ? (
          <div>Loading</div>
        ) : (
          <input type="submit" value="회원 가입" />
        )}
      </form>
    </div>
  );
};

export default LoginPage;
