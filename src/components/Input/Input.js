import "./input.scss";

function Input(props) {
    return (
        <input 
            className={"ui__input " + (props.className || '')} 
            type={props.type || "text"}
            placeholder={props.placeholder} 
            onInput={e => props.setValue(e.target.value)}
            value={props.value}
        />
    );
}

export default Input;