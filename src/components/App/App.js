import axios from 'axios';
import React, { Component } from 'react';
import { DEFAULT_HPP, DEFAULT_QUERY, PARAM_HPP, PARAM_PAGE, PARAM_SEARCH, PATH_BASE, PATH_SEARCH } from '../../constants';
import Button from '../Button/Button';
import Search from '../Search/Search';
import Table from '../Table/Table';
import './App.css';

class App extends Component {
  _isMounted = false;

  state = {
    results: null,
    searchKey: '',
    searchTerm: DEFAULT_QUERY,
    error: null
  };

  componentDidMount() {
    this._isMounted = true;
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  needsToSearchTopStories = (searchTerm) => {
    return !this.state.results[searchTerm];
  };

  fetchSearchTopStories = (searchTerm, page = 0) => {
    axios.get(`${ PATH_BASE }${ PATH_SEARCH }?${ PARAM_SEARCH }${ searchTerm }&${ PARAM_PAGE }${ page }&${ PARAM_HPP }${ DEFAULT_HPP }`)
      .then(results => this._isMounted &&
        this.setSearchTopStories(results.data))
      .catch(error => this._isMounted && this.setState({ error }));
  };

  onSearchSubmit = (event) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });

    if (this.needsToSearchTopStories(searchTerm)) {
      this.fetchSearchTopStories(searchTerm);
    }

    event.preventDefault();
  };

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { searchKey, results } = this.state;

    const oldHits = results && results[searchKey]
      ? results[searchKey].hits
      : [];

    const updatedHits = [...oldHits, ...hits];

    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    });
  };

  onDismiss = (id) => {
    const { searchKey, results } = this.state;
    const { hits, page } = results[searchKey];

    const isNotId = item => item.objectID !== id;
    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: {
        ...results,
        [searchKey]: {
          hits: updatedHits,
          page
        }
      }
    });
  };

  onSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  render() {
    const { searchTerm, results, searchKey, error } = this.state;
    const page = (results && results[searchKey] && results[searchKey].page) ||
      0;
    const list = (
      results &&
      results[searchKey] &&
      results[searchKey].hits
    ) || [];

    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={ searchTerm }
            onChange={ this.onSearchChange }
            onSubmit={ this.onSearchSubmit }
          >
            Search
          </Search>
        </div>
        {
          error
            ? <div className="interactions">
              <p>
                Something went wrong.
              </p>
            </div>
            : <Table
              list={ list }
              onDismiss={ this.onDismiss }
            />
        }
        <div className="interactions">
          <Button
            onClick={ () => this.fetchSearchTopStories(searchKey, page + 1) }
          >
            More
          </Button>
        </div>
      </div>
    );
  }
}

export default App;
