import { React } from 'react';

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum = course.parts.reduce((accumulator, current) => {
    return accumulator + current.exercises;
  }, 0);

  return <p>Number of exercises {sum}</p>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}
    </div>
  );
};

export const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};
