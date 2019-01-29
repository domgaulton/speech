import React, { Component } from 'react';
import API_KEYS from './../config/api-keys.js';
import './Question.scss';
import axios from 'axios';

// function answerMe(question) {
//   // https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query?input=' + question + '&format=plaintext&output=JSON&appid=27LAYV-JVWUHLR5JQ
//   var request = new XMLHttpRequest();   
//   request.open('GET', 'https://cors-anywhere.herokuapp.com/https://api.wolframalpha.com/v2/query?input=' + question + '&format=plaintext&output=JSON&appid=27LAYV-JVWUHLR5JQ', true);
//   request.onload = function() {
//     if (request.status >= 200 && request.status < 400) {
//       // Success
//       // console.log(JSON.parse(request.responseText))
//       //var data = JSON.parse(request.responseText);
//       var data = JSON.parse(request.responseText);
//       const answer = data.queryresult.pods[1].subpods[0].plaintext;
//     } else {
//       // We reached our target server, but it returned an error
//       console.log(request.status);
//     }
//   };
//   request.onerror = function() {
//     // There was a connection error of some sort
//   };
//   request.send();
// };

const previousQuestion = "";

// const Question = ({ question }) => {
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
