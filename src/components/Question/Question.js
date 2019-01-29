import React, { Component } from 'react';
import API_KEYS from './../config/apiKeys.js';
import './Question.scss';
import axios from 'axios';

const previousQuestion = "";

class Question extends Component {

  componentDidUpdate = (previousQuestion) => {
    console.log('CDU', previousQuestion);
    console.log('CDU', this.props.question);
     if (previousQuestion !== this.props.question) {
       this.answerQuestion(this.props.question);
     }
   }

  answerQuestion = (input) => {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query', {
      params: {
        input: input,
        format: 'plaintext',
        output: 'JSON',
        appid: API_KEYS.question
      }
    })
    .then(function (response) {
      console.log(response);
      const answer = response.data.queryresult.pods[1].subpods[0].plaintext;
      console.log(answer);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  render(){
    return(
      <div>
        <p>Question: {this.props.question}</p>
      </div>
    );  
  }
};

export default Question;
