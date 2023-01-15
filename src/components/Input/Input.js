import "./input.scss";

function Input(props) {
    return (
        <input className={props.className} type="text" placeholder={props.placeholder} />
    );
}

export default Input;