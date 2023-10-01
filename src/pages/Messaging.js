import logo from '../logo.svg';
import '../App.css';
import Message_Window from '../components/message_window/Message_Window'; 
import ChatPreview from '../components/ChatPreview/ChatPreview'; 


function Messaging() {
  return (
    <div className='row'>
      <div className='col'>
        <ChatPreview/>
      </div>
      <div className='col'>
        <Message_Window/>
      </div>
        
    </div>
  );
}

export default Messaging;
