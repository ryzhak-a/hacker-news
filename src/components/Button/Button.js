import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const Button = ({ onClick, className, children }) => {
  return (
    <button
      onClick={ onClick }
      className={ className }
      type="button"
    >
      { children }
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: ''
};

export default Button;
