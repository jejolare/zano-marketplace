import './slider.scss';
import { useRef, useState, useEffect } from 'react';
import { ReactComponent as ArrowImg } from '../../assets/images/UI/arrow.svg';

function Slider(props) {
    
    const [slideWidth, setSlideWidth] = useState(0);

    const sliderRef = useRef(null);

    useEffect(() => {
        if (sliderRef?.current) {
            setSlideWidth(parseFloat(window.getComputedStyle(sliderRef.current).width));   
        }
    }, [sliderRef]);

    function scroll(right = true) {
        if (right) {
            props.setValue(props.children[props.value + 1] ? props.value + 1 : 0);
        } else {
            props.setValue(props.children[props.value - 1] ? props.value - 1 : props.children.length - 1);
        }
    }

    return (
        <div className="ui__slider" ref={sliderRef}>
            <div 
                className="ui__slider__content" 
                style={{ 
                    'width': props.children.length*slideWidth, 
                    'left': props.children.length === 1 ? 0 : `-${slideWidth*props.value}px` 
                }}
            >
                {props.children}
            </div>
            {props.children.length > 1 &&
                <div className="ui__slider__controllers">
                    <div onClick={() => scroll(false)}>
                        <ArrowImg/>
                    </div>
                    <div onClick={() => scroll()}>
                        <ArrowImg/>
                    </div>
                </div>
            }
        </div>
    );
}

export default Slider;