import React from 'react';
import './SpeechCommand.scss';

const SpeechCommand = ({ onListen }) => {
  return (
    <div>
      <p>Instructions</p>
      <button 
        className="click-me" 
        type="button" 
        onClick={onListen}
      >
        Click Me
      </button>
      <div>
        <p className="output"></p>
      </div>
    </div>
  );
}

export default SpeechCommand;
