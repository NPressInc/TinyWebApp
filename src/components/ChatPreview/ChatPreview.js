import {default as PreviewCard } from './PreviewCard'

var conversationPreviews = [
  {"picture":"https://i.imgur.com/maTavan.png", "user":"greg", "lastMessage":"Hi", "lastMessager":"You", "timestamp":"Oct 5"},
  {"picture":"https://i.imgur.com/maTavan.png", "user":"Bill", "lastMessage":"Hey", "lastMessager":"Bill", "timestamp":"Oct 4"},
  {"picture":"https://i.imgur.com/maTavan.png", "user":"greg", "lastMessage":"Yo", "lastMessager":"You", "timestamp":"Oct 2"},
  
]

function ChatPreview(props) {
    return (
     <div>
      {
        conversationPreviews.map(function(object, i){
          return <PreviewCard picture={object.picture} user={object.user} lastMessage={object.lastMessage} lastMessager={object.lastMessager} timestamp={object.timestamp}/>
        })
      }
     </div>
    );
  }
  
  export default ChatPreview;
  