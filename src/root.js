import React from 'react';
import webpack from './image/webpack.png';

const Root = () => {
  return <div>
    <div className='webpack' style={{background: `url(${webpack}) no-repeat center / cover`}}>webpack</div>
    <h3>webpack-dev-server</h3>
  </div>
}
export default Root;