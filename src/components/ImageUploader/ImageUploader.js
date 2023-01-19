import './loader.scss';
import { useRef } from 'react';

function ImageUploader() {

    const inputRef = useRef(null);

    return (
        <div className="ui__image-loader" onClick={() => inputRef.current.click()}>
            <input type="file" style={{ 'display': 'none' }} ref={inputRef}/>
            <span>+</span>
            <p>Upload your image</p>
        </div>
    );
}

export default ImageUploader;