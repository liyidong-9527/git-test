import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Footer = () => (
  <div>
    这应该是尾部，但是我不知道写什么
    <p>ccc</p>
    <p>4444</p>
    <p>444</p>
    <Link to='/container'>aaa</Link>
    <Link to='/footer/a'>222</Link>
    <Link to='/case'>案件</Link>
  </div>
);

export default Footer;
