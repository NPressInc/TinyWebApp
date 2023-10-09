import logo from '../logo.svg';
import '../App.css';
import './Messaging.css'
import Message_Window from '../components/MessageWindow/MessageWindow'; 
import ChatPreview from '../components/ChatPreview/ChatPreview'; 

var testConvo = [{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message is the lady in the night with the light in the cool way it says the thing", "type":"SMS"},{"timestamp":"1:52 AM, October 5, 2023","user":"jim", "message":"test message", "type":"SMS"}, {"timestamp":"1:52 AM, October 5, 2023","user":"james", "message":"test message is the lady in the night with the light in the cool way it says the thing", "type":"SMS"},
{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"},
{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"},
{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"},
{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"},
{"timestamp":"1:52 AM, October 5, 2023","user":"self", "message":"test message", "type":"SMS"}
]
var conversationPreviews = [
  {"picture":"https://i.imgur.com/maTavan.png", "user":"greg", "lastMessage":"Hi", "lastMessager":"You", "timestamp":"Oct 5"},
  {"picture":"https://i.imgur.com/maTavan.png", "user":"Bill", "lastMessage":"Hey", "lastMessager":"Bill", "timestamp":"Oct 4"},
  {"picture":"https://i.imgur.com/maTavan.png", "user":"greg", "lastMessage":"Yo", "lastMessager":"You", "timestamp":"Oct 2"},
]

function Messaging() {
  return (
    <div className='d-flex flex-row'>
      <div className='p-2 previewContainer'>
        <ChatPreview  conversationPreviews={conversationPreviews} />
      </div>
      <div className='p-2 flex-fill'>
        <Message_Window title="William" conversation={testConvo} />
      </div>
    </div>
    
  );
}

export default Messaging;
