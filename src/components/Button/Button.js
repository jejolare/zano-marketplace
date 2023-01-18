import "./button.scss";

function Button(props) {
    return (
        <button className={"ui__button " + props.className} onMouseUp={props.onMouseUp}>{props.children}</button>
        
    );
}

export default Button;