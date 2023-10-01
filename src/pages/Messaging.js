import logo from '../logo.svg';
import '../App.css';
import './Messaging.css'
import Message_Window from '../components/MessageWindow/MessageWindow'; 
import ChatPreview from '../components/ChatPreview/ChatPreview'; 


function Messaging() {
  return (
    <div className='d-flex flex-row'>
      <div className='p-2 previewContainer'>
        <ChatPreview/>
      </div>
      <div className='p-2 flex-fill'>
        <Message_Window/>
      </div>
    </div>
    
  );
}

export default Messaging;
