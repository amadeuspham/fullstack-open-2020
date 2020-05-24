import React from 'react';
import Part from './Part'

import {CoursePart} from './types';
  
interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = (props) => {
  return (
    <div>
      {props.courseParts.map(part => (
        <Part key={part.name} coursePart={part}/>
      ))}
    </div>
  );
};
export default Content;
