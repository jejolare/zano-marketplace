import './colorPicker.scss';
import { useRef } from 'react';

function ColorPicker({ value, setValue }) {

    const inputRef = useRef(null);

    return (
        <div className="ui__color-picker ui__input" onClick={() => inputRef.current.click()}>
            <input 
                type="color" 
                style={{ 'visibility': 'hidden' }}
                value={value} 
                onChange={e => setValue(e.target.value)} 
                ref={inputRef}
            />
            <div className="ui__color-picker__preview">
                <div style={{ 'background': value }}></div>
            </div>
            <p>{value}</p>
        </div>
    );
}

export default ColorPicker;