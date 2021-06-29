import React, { useState, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';

const Toggleable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          variant="contained"
          size="small"
          color="secondary"
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Toggleable.displayName = 'Toggleable';

export default Toggleable;
