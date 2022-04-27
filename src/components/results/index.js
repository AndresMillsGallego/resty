import React from 'react';
import { useState } from 'react';
import './results.scss';

function Results(props) {

  const handleClear = (e) => {
    window.location.reload()
  }

  return (
    <section>
      <button onClick={handleClear} className={props.data ? 'showButton' : 'hidden'}>Clear Results</button>
      <pre className={props.data ? 'showResults' : null}>{props.data ? JSON.stringify(props.data, null, '\t') : null}</pre>
    </section>
  );
}

export default Results;