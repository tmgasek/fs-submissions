import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('ALL'))}
      ></input>
      important{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('IMPORTANT'))}
      ></input>
      non-important{' '}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange('NONIMPORTANT'))}
      ></input>
    </div>
  );
};

export default VisibilityFilter;
