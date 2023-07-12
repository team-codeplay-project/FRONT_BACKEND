import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import '../style/rafflebox.css';
import axios from 'axios';

const Nfttest = () => {
  const [buyId, setBuyId] = useState();
  const [useId, setUseId] = useState();
  const [reId, setReId] = useState();
  const { account, nft_c, web3 } = useContext(AppContext);

  const buyticket = async (e) => {
    e.preventDefault();

    try {
      // console.log(account.address);

      if (!account) return;
      let day = 230715;
      await nft_c.methods.buy_ticket(day, buyId).send({
        from: account.address,
        value: web3.utils.toWei('0.0001', 'ether'),
      });

      // console.log('nft mint');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/nft/`,
        {
          day,
          type: Number(buyId),
          owner: account.address,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      // console.log( 'db input' ) ;
    } catch (error) {
      console.error(error);
    }
  };

  const useticket = async (e) => {
    e.preventDefault();

    try {
      // console.log( account ) ;

      if (!account) return;
      let day = 230711;
      await nft_c.methods.use(day, useId).send({
        from: account.address,
      });

      console.log('use!');

      await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/nft/done`,
        {
          day,
          type: Number(useId),
          owner: account.address,
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const refundticket = async (e) => {
    e.preventDefault();

    try {
      // console.log( account ) ;

      if (!account) return;
      let day = 230711;
      const response = await nft_c.methods.refund(day, reId).send({
        from: account.address,
      });

      console.log(day, reId);

      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/nft`,
        {
          data: {
            day,
            type: Number(reId),
            owner: account.address,
          },
        },
        {
          headers: {
            'ngrok-skip-browser-warning': 'any',
          },
        }
      );

      console.log('delete end!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="tab2-container shadow-md text-white">
      <div className="flex flex-col">
        <form onSubmit={buyticket}>
          <input
            className="text-black"
            type="text"
            value={buyId}
            onChange={(e) => setBuyId(e.target.value)}
          ></input>
          <input type="submit" value="민팅" />
        </form>
        <form onSubmit={useticket}>
          <input
            className="text-black"
            type="text"
            value={useId}
            onChange={(e) => setUseId(e.target.value)}
          ></input>
          <input type="submit" value="사용" />
        </form>
        <form onSubmit={refundticket}>
          <input
            className="text-black"
            type="text"
            value={reId}
            onChange={(e) => setReId(e.target.value)}
          ></input>
          <input type="submit" value="환불" />
        </form>
      </div>
    </div>
  );
};

export default Nfttest;
