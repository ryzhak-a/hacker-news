import React, { Component } from 'react';

class Search extends Component {
  render() {
    const { value, onChange, onSubmit, children } = this.props;
    return (
      <form>
        <input
          type="text"
          value={ value }
          onChange={ onChange }
        />
        <button
          type="submit"
          onClick={ onSubmit }
        >
          { children }
        </button>
      </form>
    );
  }
}

export default Search;
