import React from 'react';
import { Vortex } from 'react-loader-spinner';

const Loading = () => {
  return (
    <Vortex
      visible={true}
      height="60"
      width="60"
      ariaLabel="vortex-loading"
      wrapperStyle={{}}
      wrapperClass="vortex-wrapper"
      colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
    />
  );
};

export default Loading;
