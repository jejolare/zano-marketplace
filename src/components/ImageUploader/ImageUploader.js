import './loader.scss';
import { useRef } from 'react';

function ImageUploader(props) {

    const inputRef = useRef(null);

    return (
        <div className="ui__image-loader" onClick={() => inputRef.current.click()}>
            <input 
                type="file" 
                style={{ 'display': 'none' }} 
                ref={inputRef}
                accept="image/*"
                onChange={(e) => props.setValue(e.target.files[0])}
            />
            {!props.value &&
                <>
                    <span>+</span>
                    <p>Upload your image</p>
                </>
            }
            {props.value &&
                <img src={URL.createObjectURL(props.value)} alt="" />
            }
        </div>
    );
}

export default ImageUploader;