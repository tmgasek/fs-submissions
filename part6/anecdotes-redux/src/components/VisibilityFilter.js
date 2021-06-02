import React from 'react';
import { connect } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const VisibilityFilter = (props) => {
  return (
    <div>
      all{' '}
      <input
        type="text"
        name="filter"
        onChange={(e) => props.filterChange(e.target.value)}
      ></input>
    </div>
  );
};

export default connect(null, { filterChange })(VisibilityFilter);
