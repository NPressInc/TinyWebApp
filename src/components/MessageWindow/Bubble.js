
import './MessageWindow.css'

function chatTitle(user){
 return <p>{user}</p>;
}

function timestamp(timestamp){
    return <p style={{"fontSize":10, "textAlign": "center"}}>{timestamp}</p>
}

function Bubble(props) {
    
    return (
        <div style={{width: "100%", display: "inline-block"}}>
            {props.timestamp && timestamp(props.timestamp)}
            <div className= {'media media-chat ' + (props.user == "self" ? 'media-chat-reverse': '')}>
                {props.user != "self" && chatTitle(props.user)}
                <div className={"media-body " + (props.user == "self" ? "media-body-reverse": "")}>
                    <p>{props.message}</p>
                </div>
                
            </div>
        </div>
    );
  }
  
  export default Bubble;

