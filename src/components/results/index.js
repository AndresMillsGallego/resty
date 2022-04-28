import React from 'react';
import { useState } from 'react';
import './results.scss';
import JSONPretty from 'react-json-pretty';

import 'react-json-pretty/themes/adventure_time.css';

function Results(props) {

  const handleClear = (e) => {
    window.location.reload()
  }

  return (
    <section>
      <button onClick={handleClear} className={props.data ? 'showButton' : 'hidden'}>Clear Results</button>
      <pre aria-label='results' className={props.data ? 'showResults' : null}>{props.data ? <JSONPretty aria-label="results" id='json-pretty' data={JSON.stringify(props.data)}></JSONPretty>  : null}</pre>
    </section>
  );
}

export default Results;