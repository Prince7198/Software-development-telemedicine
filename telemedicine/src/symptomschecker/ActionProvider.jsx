
import React from 'react';
import DisclaimerMessage from './DisclaimerMessage';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {


    const initialAction = () => {
        const message = createChatBotMessage('Please provide your names? ');
        
        updateState(message, "names");
    }
  const handleAge = () => {
    const botMessage = createChatBotMessage(`Please provide your Age` );
    updateState(botMessage, "age");

  };

  const handleDisclaimer =() =>{
    const botMessage = createChatBotMessage(<DisclaimerMessage/> );
    updateState(botMessage, "disclaimer");
  }
  const handleSymptoms = () =>{
    const botMessage = createChatBotMessage("Please help me uderstand how you are feeling by providing your Symptoms");
    updateState(botMessage, "symptoms");

  }

  const handleMalaria=()=>{
    const botMessage = createChatBotMessage("Fever and Headache are common symptoms for Malaria. You're likely suffering from Malaria.");
    updateState(botMessage, "final");

  }
  const handlePneumonia=()=>{
    const botMessage = createChatBotMessage("You are most likely suffering from Pneumonia. Kindly, Seek Medical Attention ASAP");
    updateState(botMessage, "final");

  }
  const handleStomachIssues =()=>{
    
    const botMessage = createChatBotMessage("You are having stomach issues such can be as a result of Acid, Ulcers or Gastritis. Kindly purpose to visit a doctor");

    updateState(botMessage, "final");

  
  }

  const handleFlu=()=>{
    const botMessage = createChatBotMessage("You are most likely suffering from normal Cold condition. You will be well soon");
    updateState(botMessage, "final");

  }
  const handleMigrane=()=>{
    const botMessage = createChatBotMessage("You are most likely suffering from normal Migrane, A painkiller pill will have it healed");
    updateState(botMessage, "final");

  }
  const handleUnknown=()=>{
    const botMessage = createChatBotMessage("Apologies. I am unable to determine your condition. Kindly seek help from the Doctor");
    updateState(botMessage, "final");

  }
  //to update states
  const updateState = (message, checker) => {
    setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
        checker,
    }))
}

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            initialAction,
            handleAge,
            handleDisclaimer,
            handleSymptoms,
            handleMalaria,
            handlePneumonia,
            handleStomachIssues,
            handleFlu,
            handleMigrane,
            handleUnknown,


          },
        });
      })}
    </div>
  );
};

export default ActionProvider;