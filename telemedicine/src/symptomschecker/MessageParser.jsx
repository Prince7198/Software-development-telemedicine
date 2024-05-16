
import React, {useState, useEffect} from 'react';

const MessageParser = ({ children, actions }) => {

    const [age, setAge] =useState("");
    const [names, setNames] = useState("");

    const { checker } = children.props.state;
  const parse = (message) => {
    if(checker === "initial"){
        actions.initialAction();
    }
    if (checker==="names") {
        setNames(message);
        actions.handleAge();
      }
    if (checker==="age") {
      setAge(message);
      actions.handleDisclaimer();
    }
    if (checker ==="disclaimer"){
        actions.handleSymptoms();
    }
    if (checker  === "symptoms"){
        const msg=message.toLowerCase();
        if (msg.includes("headache") && msg.includes("fever")){
            actions.handleMalaria();
        }else if(msg == "flu" || msg=="cold"){
            actions.handleFlu();
        } else if (msg.includes("flu") && msg.includes("cough") && msg.includes("cold")){
            actions.handlePneumonia();
        } else if(msg.includes("stomachache") || msg.includes("abdominal") || msg.includes("bloat")){
            actions.handleStomachIssues();
        } else if(msg.includes("headache")){
            actions.handleMigrane()
        } else{
            actions.handleUnknown();
        }

    }

  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;