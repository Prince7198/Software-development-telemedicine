import React from 'react';
import "./Checker.css";

import Chatbot from 'react-chatbot-kit'

import 'react-chatbot-kit/build/main.css'
import config from '../../symptomschecker/config';
import MessageParser from '../../symptomschecker/MessageParser';
import ActionProvider from '../../symptomschecker/ActionProvider';

const Checker = () => {
  return (
    <div className='cbody'>
        <h1 className="ctitle">Symptoms Checker</h1>

        <div className="chabox">
            <Chatbot className="chatbot" config={config} messageParser={MessageParser} actionProvider={ActionProvider}  />      
        </div>         
       
    </div>
  )
}

export default Checker