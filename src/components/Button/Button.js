import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../Loading/Loading';
import './Button.css';

const Button = ({ onClick, className, children }) =>
  <button
    onClick={ onClick }
    className={ className }
    type="button"
  >
    { children }
  </button>;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

Button.defaultProps = {
  className: ''
};

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />;

const ButtonWithLoading = withLoading(Button);

export { ButtonWithLoading, Button };
