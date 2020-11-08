import React from 'react';
import useHttp from '../hooks/http.hook';
import { AuthContext } from '../context/auth.context';
import {Link} from 'react-router-dom';

const LinksPage = () => {
  const { token } = React.useContext(AuthContext);
  const { request } = useHttp();
  const [links, setLinks] = React.useState();
  console.log(links);

  const getLinks = async () => {
    try {
      const fetchedLinks = await request(`/api/links/`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setLinks(fetchedLinks.links);
    } catch (err) {}
  };

  React.useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="container">
      <h1 className="mainTitlePage">Список ссылок</h1>
      {!!links && (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Сокращенная</th>
              <th>Откуда</th>
              <th>Количество кликов по ссылке</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, i)=>
            <tr key={link._id}>
              <td>{i+1}</td>
            <td><Link to={`/detail/${link._id}`}>{link.to}</Link></td>
            <td>{link.from}</td>
            <td>{link.clicks}</td>
            <td>{new Date(link.date).toLocaleString()}</td>
            
          </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LinksPage;
