import "./ChatPreview.css"

function PreviewCard(props) {
    return (
     <div className="row PreviewCard">
        <div className="col-sm-3">
            <img src={props.picture}/>
        </div>
        <div className="col-sm-6">
            <p>{props.user}</p>
            <p>{props.lastMessager}:{props.lastMessage}</p>
        </div>
        <div className="col-sm-3">
            <p style={{fontSize: "12px"}}>{props.timestamp}</p>
        </div>
      
     </div>
    );
  }
  
  export default PreviewCard;
  