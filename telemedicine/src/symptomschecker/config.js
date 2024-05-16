import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  botName: "Telemedicine Symptoms Checker",
    initialMessages: [createChatBotMessage(`Welcome to the System Checker Module. How can I help you Today?`, )],
   
    state: {
        checker: "initial",
  
        
        
},
};

export default config;