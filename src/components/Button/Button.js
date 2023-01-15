import "./button.scss";

function Button(props) {
    return (
        <button className="ui__button" onMouseUp={props.onMouseUp}>{props.children}</button>
        
    );
}

export default Button;