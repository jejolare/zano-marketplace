import "./button.scss";

function Button(props) {
    return (
        <button 
            className={"ui__button " + (props.className || '') + (props.withIcon ? "ui__button___icon" : "")} 
            onMouseUp={props.onMouseUp}
        >
            {props.children}
        </button>
        
    );
}

export default Button;