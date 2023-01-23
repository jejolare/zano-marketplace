import './switch.scss';

function Switch(props) {
    return (
        <label className="switch">
            <input type="checkbox" checked={props.value} onChange={() => props.setValue(!props.value)}/>
            <span className="slider round"></span>
        </label>
    );
}

export default Switch;