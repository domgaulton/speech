import React from 'react';
import './Command.scss';

const Command = ({ onStartListening }) => {
  return (
    <div>
      <p>Instructions</p>
      <button 
        className="click-me" 
        type="button" 
        onClick={onStartListening}
      >
        Click Me
      </button>
      <div>
        <p className="output"></p>
      </div>
    </div>
  );
}

export default Command;
