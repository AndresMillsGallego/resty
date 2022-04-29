import React from 'react';
import { useState } from 'react';
import './results.scss';
import JSONPretty, { propTypes } from 'react-json-pretty';
import Andres from '../../Andres.jpg'

import 'react-json-pretty/themes/adventure_time.css';

function Results(props) {

  let [showHistory, setSelected] = useState(false);
  let [showResults, setShowResults] = useState(true);

  const handleResults = (e) => {
    setShowResults(!showResults)
  }

  const handleHistory = (e) => {
    setSelected(!showHistory)
  }

  const handleClick = (e) => {
    let url = e.target.id;
   for (let obj of props.history) {
     if (obj.url === url) {
       console.log(obj)
       props.callApi({
         method: obj.method,
         url: obj.url,
         requestBody: obj.requestBody,
       })
     }
   }
  }

  return (
    <section>
      <button onClick={handleHistory} className={props.data ? 'showButton' : 'hidden'}>{!showHistory ? 'Show History' : 'Hide History'}</button>
      <div className={showHistory ? 'history-results' : 'hidden'}>
        <ul>
          {props.history.map((event, index) => <li key={index} id={event.url} className="url-list" onClick={handleClick}>{event.url}</li>)}
        </ul>
      </div>
      <button onClick={handleResults} className={props.data ? 'showButton' : 'hidden'}>{showResults ? 'Hide Results' : 'Look!  I\'s Me & Pluto!!'}</button>
      <pre className={props.data ? 'showResults' : 'hidden'}>{showResults ? <JSONPretty className={showResults ? 'json-pretty' : 'hidden'} data={JSON.stringify(props.data)}></JSONPretty>  : <img src={Andres} alt="Andres" />}</pre>
    </section>
  );
}

export default Results;