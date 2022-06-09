import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Container = () => (
  <div>
    <h1>这是主要页面，这是一个标题</h1>
    <Link to='/footer'>888</Link>
  </div>
);

export default Container;
