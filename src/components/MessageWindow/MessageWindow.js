import './MessageWindow.css'
import '../../css/scrollbar.css';
import { Send, Person }  from 'react-bootstrap-icons'
import { default as Bubble } from './Bubble'
import React, { useState, useEffect } from 'react';




function Message_Window(props) {

    function add_message_UI(messageObj){
        console.log(messageObj)
        console.log(conversation)
        console.log("----------")
        setConversation(oldArray => [...oldArray, messageObj])
        console.log(conversation)
    }

    function write_message_from_input(){
        let inputDoc = document.getElementById("messageContent")
        let value = inputDoc.value
        if(value){
            add_message_UI({"timestamp":Date(Date.now()).toString(),"user":"self", "message":value, "type":"SMS"})
            inputDoc.value = ""
        }
    }

    function handleClickSend(){
        write_message_from_input()
    }



    useEffect(() => {
        var objDiv = document.getElementById("chat-content");
        objDiv.scrollTop = objDiv.scrollHeight;
        setTimeout(()=>{
            //add_message_UI({"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"})
        }, 5000)
      });



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
                    <input className="publisher-input" id="messageContent" type="text" placeholder="Type Message Here..."/>
                    <span className="publisher-btn file-group">
                    </span>
                    <a onClick={handleClickSend} className="publisher-btn text-info" data-abc="true"><Send/></a>
                </div>
            </div>
        </div>
    );
  }
  
  export default Message_Window;


        