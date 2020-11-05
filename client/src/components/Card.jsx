import React from 'react';

const LinkCard = ({ link }) => {
  const { to, from, clicks, date } = link;
  return (
    <>
      <h2>Ссылка</h2>
      <p>
        Сокращеннная ссылка: <a href={from}>{to}</a>
      </p>
      <p>Откуда: {from}</p>
      <p>Количество кликов по ссылке: {clicks}</p>
      <p>Дата создания: {new Date(date).toLocaleDateString()}</p>
    </>
  );
};

export default LinkCard;
