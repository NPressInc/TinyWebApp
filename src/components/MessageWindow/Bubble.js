
import './MessageWindow.css'

function chatTitle(user){
 return <p>{user}</p>;
}

function Bubble(props) {
    
    return (
        <div style={{width: "100%", display: "inline-block"}}>
            <div className= {'media media-chat ' + (props.user == "self" ? 'media-chat-reverse': '')}>
                {props.user != "self" && chatTitle(props.user)}
                <div className="media-body">
                    <p>{props.message}</p>
                </div>
            </div>
        </div>
    );
  }
  
  export default Bubble;

