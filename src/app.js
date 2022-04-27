import React from 'react';
import './app.scss';
import { useState } from 'react';
import axios from 'axios';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App() {

  let [data, setData] = useState(null);
  let [requestParams, setRequestParams] = useState({});

  const callApi = (requestParams) => {
    let url = requestParams.url;
    let method = requestParams.method;

    setRequestParams(requestParams)
    getResults(method, url);
  }
  async function getResults(method, url) {
    try {
      let results = await axios.get(url);
      console.log(results)
      setData({
        count: results.data.count,
        headers: results.headers,
        results: results.data.results,
      })

    } catch (error) {
      console.log('Error with the GET request')
    }
  }

  return (
    <React.Fragment>
      <Header />
      <section className={requestParams.method ? 'showParams' : null}>
        <div>Request Method: {requestParams.method ? requestParams.method.toUpperCase() : requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
      </section>
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;