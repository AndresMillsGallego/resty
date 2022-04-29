import React from 'react';
import './app.scss';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

export const initialState = {
  url: '',
  method: '',
  body: {},
  results: null,
  history: [],
  isLoading: false,
}

export const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'Add':
      return {...state, url: payload.url, method: payload.method, body: payload.requestBody, history: [...state.history, payload]}
    case 'Results':
      return{...state, results: [payload]}
    default:
      return state;
  }
}

function App() {


  let [state, dispatch] = useReducer(reducer, initialState);

  let updateRequestParams = (requestParams) => {
    dispatch({ type: 'Add', payload: requestParams})
  }
  
  let updateResults = (results) => {
    dispatch({ type: 'Results', payload: {results}})
  }

  let handleRequest = () => {
    if (state.url) {
      axios({
        url: state.url,
        method: state.method || 'get',
        data: state.body || {},
      }).then(results => {
        updateResults({
          count: results.data.count,
          headers: results.headers,
          results: results.data.results,
        })
        
      })
    }
  }

  useEffect(handleRequest, [state.url]);
  
  const callApi = (requestParams) => {
    console.log(requestParams)
    updateRequestParams(requestParams)
  }
  

  return (
    <React.Fragment>
      <Header />
      <section className={state.method ? 'showParams' : null}>
        <div>Request Method: {state.method ? state.method.toUpperCase() : state.method}</div>
        <div>URL: {state.url}</div>
      </section>
      <Form handleApiCall={callApi} />
      <Results 
        data={state.results} 
        history={state.history}
        callApi={callApi}
      />
      <Footer />
    </React.Fragment>
  );

}

export default App;