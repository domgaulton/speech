import React, { Component } from 'react';
import API_KEYS from './../../config/apiKeys.js';
import './Question.scss';
import axios from 'axios';

class Question extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questionAnswer: '',
    };
  };

  componentDidUpdate = (prevProps) => {
    if (this.props.question !== prevProps.question) {
      axios.get('https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query', {
        params: {
          input: this.props.question,
          format: 'plaintext',
          output: 'JSON',
          appid: API_KEYS.question
        }
      })
      .then(response => { // use arrow function so we can pass this.setState later!
        // console.log(response);
        const answer = response.data.queryresult.pods[1].subpods[0].plaintext;
        this.setState({ questionAnswer: answer });
      }) 
      .catch(function (error) {
        // console.log(error);
      });
     }
   }

  render(){
    const questionAnswer = this.state.questionAnswer;
    let answer;
    if (questionAnswer !== '') {
      answer = <p>{questionAnswer}</p>;
    } else {
      answer = "";
    }

    return(
      <div>
        {answer}
      </div>
    );  
  }
};

export default Question;
