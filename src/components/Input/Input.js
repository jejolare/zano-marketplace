import "./input.scss";
import { nanoid } from "nanoid";
import { useState, useEffect, useRef } from "react";
import ArrowImg from "../../assets/images/UI/arrow.svg";

function Input(props) {

    const [selectorOpen, setSelectorState] = useState(false);

    const popupRef = useRef(null);

    function Selector() {

        useEffect(() => {
            function handleClick(e) {
                if (!selectorOpen || popupRef.current.contains(e.target)) return;
                setSelectorState(false);
            }
            window.addEventListener('mousedown', handleClick);  
            return () => window.removeEventListener('mousedown', handleClick);
        }, []);

        const options = props.options ? [(props.noInput ? '' : 'Not selected'), ...(props.options || [])] : undefined;

        const filteredData = options.filter(e => props.noInput ? e : e.includes(props.value));

        return (
            <div className="ui__input__options">
                {(filteredData[0] ? filteredData : options).map(e => 
                    <p 
                        key={nanoid()} 
                        onClick={() => {
                            props.setValue(e === 'Not selected' ? '' : e);
                            setSelectorState(false);
                        }}
                    >
                        {e}
                    </p>
                )}
            </div>
        );
    }

    function handlerInputClick(e) {
        if (props.options) {
            e.stopPropagation();
            setSelectorState(!selectorOpen);
        }
    }

    return (
        <div style={{ 'position': 'relative' }} className={"ui__input " + (props.className || '')} ref={popupRef}>
            <input 
                className={(props.options ? ' ui__input__select' : '')} 
                type={props.type || "text"}
                placeholder={props.placeholder} 
                onInput={e => props.noInput ? '' : props.setValue(e.target.value)}
                readOnly={props.noInput}
                value={props.value}
                onClick={handlerInputClick}
                {...props.attributes}
            />
            {props.options &&
                <img 
                    src={ArrowImg} 
                    alt="options" 
                    className="ui__input__arrow" 
                    style={{
                        'transform': selectorOpen ? 'rotateX(180deg) translate(0, 65%)' : undefined,
                    }}
                    onClick={handlerInputClick}
                />
            }
            {props.children}
            {selectorOpen && <Selector/>}
        </div>
    );
}

export default Input;