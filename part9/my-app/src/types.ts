interface CoursePartBase {
  name: string;
  exerciseCount: number;
}
    
interface CoursePartOneAndThree extends CoursePartBase {
  description: string;
}
  
interface CoursePartOne extends CoursePartOneAndThree {
  name: "Fundamentals";
}
  
interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}
  
interface CoursePartThree extends CoursePartOneAndThree {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartOneAndThree {
  name: "Part 4";
  rating: number;
}
  
export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;