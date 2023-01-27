import "./input.scss";
import { nanoid } from "nanoid";
import { useState, useEffect, useRef } from "react";
import ArrowImg from "../../assets/images/UI/arrow.svg";

function Input(props) {

    const [selectorOpen, setSelectorState] = useState(false);

    function Selector() {

        const popupRef = useRef(null);

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
            <div className="ui__input__options" ref={popupRef}>
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

    return (
        <div style={{ 'position': 'relative' }} className={"ui__input " + (props.className || '')}>
            <input 
                className={(props.options ? ' ui__input__select' : '')} 
                type={props.type || "text"}
                placeholder={props.placeholder} 
                onInput={e => props.noInput ? '' : props.setValue(e.target.value)}
                value={props.value}
                onClick={(e) => {
                    if (props.options) {
                        e.stopPropagation();
                        setSelectorState(true);
                    }
                }}
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
                    onClick={e => {
                        e.stopPropagation();
                        setSelectorState(!selectorOpen)
                    }}
                />
            }
            {selectorOpen && <Selector/>}
        </div>
    );
}

export default Input;