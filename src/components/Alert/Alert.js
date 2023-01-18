import './alert.scss';
import Popup from '../Popup/Popup';

function Alert(props) {

    function PopupContent() {
        return (
            <div className="ui__alert">{props.value}</div>
        );
    }

    if (!props.value) {
        return <></>;
    }

    return (
        <Popup  
            noPointer={true}
            Content={PopupContent}
        >
        </Popup>
    );
}

export default Alert;