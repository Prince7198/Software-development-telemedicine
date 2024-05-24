import React from 'react';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneCallbackIcon from '@mui/icons-material/PhoneCallback';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import "./Contact.css";

const Contact = () => {
    const handleSubmit =(e)=>{
        e.preventDefault();
    }
  return (
    <div className='cbody'>
        <h1 className="ctitle">Contact Us</h1>
        <section className='ccontact'>
        
            <div className="ccontent">
                
                <p>Talk to us for any queries that you may have. 
                    We'll respond as 
                    soon as the message reach us. Thank you!
                </p>
                </div>
                <div className="ccontainer">
                    <div className="ccontactInfo">
                        <div className="cbox">
                            <div className="cicon"><MailOutlineIcon/></div>
                            <div className="ctext">
                                <h3>Address</h3>
                                <p>243, Nottingham, <b>UK.</b></p>
                            </div>
                        </div>
                        <div className="cbox">
                            <div className="cicon"> <PhoneCallbackIcon/> </div>
                            <div className="ctext">
                                <h3>Phone</h3>
                                <p>+1 209 392 202</p>
                            </div>
                            
                        </div>
                        <div className="cbox">
                            <div className="cicon"> <AlternateEmailIcon/></div>
                            <div className="ctext">
                                <h3>Email</h3>
                                <p>sylvesteralchem@gmail.com </p>
                            </div>
                        </div>
                    </div>
          
                
                <div className="ccontactForm">
                    
                </div>
                </div>
         

        </section>
    </div>
  )
}

export default Contact