import React from 'react';

export const Filter = (props) => {
  return (
    <div>
      search names:{' '}
      <input value={props.newFilter} onChange={props.handleFilterChange} />
    </div>
  );
};
