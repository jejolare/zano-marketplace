import "./button.scss";

function Button(props) {
    return (
        <button className="ui__button">{props.children}</button>
    );
}

export default Button;