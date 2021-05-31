import React from 'react';
import { filterChange } from '../reducers/filterReducer';
import { useDispatch } from 'react-redux';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      all{' '}
      <input
        type="text"
        name="filter"
        onChange={(e) => dispatch(filterChange(e.target.value))}
      ></input>
    </div>
  );
};

export default VisibilityFilter;
