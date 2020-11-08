import React from 'react';
import {useHistory} from 'react-router-dom';

const LinkCard = ({ link }) => {
  const { to, from, clicks, date } = link;  

  return (
    <>
      <h2>Ссылка</h2>
      <p>
        Сокращеннная ссылка: <a href={link.to}>{to}</a>
      </p>
      <p>Откуда: <a href={from}>{from}</a></p>
      <p>Количество кликов по ссылке: {clicks}</p>
      <p>Дата создания: {new Date(date).toLocaleDateString()}</p>
    </>
  );
};

export default LinkCard;
