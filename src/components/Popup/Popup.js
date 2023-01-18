import * as ReactDOM from 'react-dom';
import { useEffect, useState } from 'react';
import './popup.scss';

export default function Popup(props) {
    const [popupContainer] = useState(() => {
        const container = document.createElement('div');
        container.setAttribute('id', `popup${document.querySelectorAll('body > div').length}`);
        container.classList.add('popup-background');
        if (props.blur) container.classList.add('popup-blur');
        if (props.scroll) container.classList.add('popup-scroll');
        if (props.noPointer) container.classList.add('popup_no-pointer');
        if (props.classList) {
            for (const className of props.classList) {
                container.classList.add(className);
            }
        };
        return container;
    });

    function getPopupElement() {
        const PopupContent = props.Content;
        return (
            <PopupContent {...props.settings} close={props.close}/>
        );
    }

    useEffect(() => {
        if (!props.blur) return;
        
        function handleClick(e) {
            if (e.target === popupContainer) props.close();
        }
        window.addEventListener('mousedown', handleClick);
        return () => window.removeEventListener('mousedown', handleClick);
    });

    useEffect(() => {
        document.body.appendChild(popupContainer);
        return () => document.body.removeChild(popupContainer);
    }, [popupContainer]);

    return ReactDOM.createPortal(getPopupElement(), popupContainer);
}