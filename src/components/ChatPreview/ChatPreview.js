import {default as PreviewCard } from './PreviewCard'

function ChatPreview(props) {
    return (
     <div>
      {
        props.conversationPreviews.map(function(object, i){
          return <PreviewCard picture={object.picture} user={object.user} lastMessage={object.lastMessage} lastMessager={object.lastMessager} timestamp={object.timestamp}/>
        })
      }
     </div>
    );
  }
  
  export default ChatPreview;
  