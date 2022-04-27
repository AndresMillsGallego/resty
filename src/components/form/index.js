import React from 'react';
import './form.scss';
import { useState } from 'react';

function Form({ handleApiCall }) {

  let [method, setMethod] = useState('');
  let [url, setUrl] = useState('');
  let [isSelected, setSelected] = useState(false);
  let [requestBody, setRequestBody] = useState({});

  const handleMethod = (e) => {
    setMethod(e.target.id);
    setSelected(true)
  }

  const handleInput = (e) => {
    setUrl(e.target.value)
  }

  const handleJsonInput = (e) => {
    setRequestBody(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url,
      requestBody: requestBody,
    };
    
    setSelected(false)
    handleApiCall(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label id='input'>
            <span>URL: </span>
            <input name='url' type='text' onChange={handleInput}/>
            <button data-testid="go-button" type="submit">GO!</button>
          </label>
        </div>
        <div>
          <label className="methods">
            <span id="get" className={isSelected && method === 'get' ? 'active' : null} onClick={handleMethod}>GET</span>
            <span id="post" className={isSelected && method === 'post'? 'active' : null} onClick={handleMethod}>POST</span>
            <span id="put" className={isSelected && method === 'put'? 'active' : null} onClick={handleMethod}>PUT</span>
            <span id="delete" className={isSelected && method === 'delete'? 'active' : null} onClick={handleMethod}>DELETE</span>
          </label>
        </div>
        <div id='jsonInput'>
        <textarea name="jsonData" type="text" 
        className={isSelected && method === 'post' || method === 'put' ? 'active' : 'hidden'}
        onChange={handleJsonInput}
        />
        </div>
      </form>
    </>
  );
}

export default Form;