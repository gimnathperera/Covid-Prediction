import React, { useState } from 'react';
import { withRouter, Link } from 'react-router-dom';

function LeftSidebar({ history }) {
  const [selectedLink, setSelectedLink] = useState(
    history.location.pathname.substring(1)
  );

  return (
    <div className='sidebar'>
      <ul>
        <Link
          to={process.env.PUBLIC_URL + '/'}
          onClick={() => setSelectedLink('')}
        >
          <li
            className={`${
              selectedLink === '' ||
              selectedLink === 'react-corona-tracker/' ||
              selectedLink === 'react-corona-tracker'
                ? 'active'
                : ''
            }`}
          >
            <i className='fa fa-home'></i>
          </li>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + '/map'}
          onClick={() => setSelectedLink('map')}
        >
          <li className={`${selectedLink === 'map' ? 'active' : ''}`}>
            <i className='fa fa-map-marker'></i>
          </li>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + '/prediction'}
          onClick={() => setSelectedLink('ravelry')}
        >
          <li className={`${selectedLink === 'ravelry' ? 'active' : ''}`}>
            <i className='fa fa-ravelry'></i>
          </li>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + '/countries'}
          onClick={() => setSelectedLink('globe')}
        >
          <li className={`${selectedLink === 'globe' ? 'active' : ''}`}>
            <i className='fa fa-globe'></i>
          </li>
        </Link>
        <Link
          to={process.env.PUBLIC_URL + '/info'}
          onClick={() => setSelectedLink('info')}
        >
          <li className={`${selectedLink === 'info' ? 'active' : ''}`}>
            <i className='fa fa-info'></i>
          </li>
        </Link>
      </ul>
    </div>
  );
}

export default withRouter(LeftSidebar);
