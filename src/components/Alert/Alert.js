import './alert.scss';
import Popup from '../Popup/Popup';

function Alert(props) {

    function PopupContent() {
        return (
            <div 
                className="ui__alert" 
                style={{ 'background': props.type === "success" ? "#35c935e6" : undefined }}
            >
                {props.value}
            </div>
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