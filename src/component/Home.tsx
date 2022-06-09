import { Button } from 'antd';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const Home = () => {
  const ref = useRef(null);

  return (
    <div>
      <p>这是Home页面</p>
      <p>a</p>
      <p>ewew</p>
      <ReactToPrint trigger={() => <Button>打印</Button>} content={() => ref.current} />
      <div className='ceshi' ref={ref}>
        这是测试的打印
      </div>
    </div>
  );
};

export default Home;
