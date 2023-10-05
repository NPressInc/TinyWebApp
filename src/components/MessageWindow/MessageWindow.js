import './MessageWindow.css'
import '../../css/scrollbar.css';
import { Send, Person }  from 'react-bootstrap-icons'
import { default as Bubble } from './Bubble'
import React, { useState } from 'react';




function Message_Window(props) {

    const [conversation, setConversation] = useState(props.conversation);
    return (
        <div className="container">
            <div className="card card-bordered container_chat">
                <div className="card-header d-flex justify-content-center">
                    <h3 className="card-title"><strong>{ props.title }</strong></h3>
                </div>
        
                <div className="ps-container ps-theme-default ps-active-y messages_container" id="chat-content"> 
                    
                        {conversation.map(function(object, i){
                            return <Bubble timestamp={object.timestamp} message={object.message} user={object.user}/>
                        })}
        
                    <div className="ps-scrollbar-x-rail" style={{left: "0px", bottom: "0px"}}>
                        <div className="ps-scrollbar-x" tabIndex="0" style={{left: "0px", width: "0px"}}>
                        </div>
                    </div>
                    <div className="ps-scrollbar-y-rail" style={{top: "0px", height: "0px", right: "2px"}}>
                        <div className="ps-scrollbar-y" tabIndex="0" style={{top: "0px", height: "2px"}}>
                        </div>
                    </div>
                </div>
        
                <div className="publisher mb-1 bt-1 border-light">
                    <Person/>
                    <input className="publisher-input" type="text" placeholder="Type Message Here..."/>
                    <span className="publisher-btn file-group">
                    </span>
                    <a className="publisher-btn text-info" data-abc="true"><Send/></a>
                </div>
            </div>
        </div>
    );
  }
  
  export default Message_Window;


        