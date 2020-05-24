import React from 'react';

interface TotalProps {
    totalNum: number;
  }

const Total: React.FC<TotalProps> = (props) => {
  return (
    <p>
        Number of exercises {props.totalNum}
    </p>
  );
};
export default Total;
