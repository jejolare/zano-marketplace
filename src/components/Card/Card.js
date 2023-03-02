import { ReactComponent as CurrencyImg } from "../../assets/images/UI/zano.svg";
import "./card.scss";
import { getLogo } from "../../utils/utils";
import { Store } from "../../store/store-reducer";
import { useContext, useState, useEffect, useRef } from "react";
import logoImg from "../../assets/images/UI/logo.png";
import Alert from "../../components/Alert/Alert";
import { ReactComponent as DeleteImg } from '../../assets/images/UI/delete.svg';
import { ReactComponent as ShowImg } from '../../assets/images/UI/show.svg';
import { ReactComponent as TooltipImg } from '../../assets/images/UI/tooltip.svg';
import { ReactComponent as CloseImg } from '../../assets/images/UI/close.svg';
import Popup from "../Popup/Popup";
import { hideOffer, showOffer as showOfferRequest } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import sha256 from "sha256";
import { updateConfigState } from "../../store/actions";
import Button from "../Button/Button";
import { buyOffer } from "../../utils/rpc";
import Slider from "../Slider/Slider";
import { nanoid } from "nanoid";
import Preloader from "../Preloader/Preloader";

function Card(props) {

    const { state, dispatch } = useContext(Store);
    const [errorValue, setError] = useState(undefined);    
    const [popupOpen, setPopupState] = useState(false);
    const [descPopupOpen, setDescPopupState] = useState(false);
    const [imageLoadingFailed, setImageError] = useState(false);
    const [imagePreloader, setImagePreloader] = useState(true);
    const [isBuying, setBuyingState] = useState(false);

    const [activeSlide, setActiveSlide] = useState(0);
    const navigate = useNavigate();

    const paramsString = [
        props.title,
        props.category,
        props.description,
        props.contact,
        props.images,
        props.comment
    ].join(', ');

    const contact = props.contact || '@your_contacts';
    const comment = props.comment || "";

    async function copy(e) {
        e.preventDefault();

        await navigator.clipboard.writeText(contact);

        setError('Contacts copied');
        setTimeout(() => {
            setError();
        }, 2000);
    }


    function PopupContent(props) {
        console.log(props);
        return (
            <div className="ui__card__comment__content">
                <div className="popup__close" onMouseUp={() => props.close()}><CloseImg/></div>
                <div className="ui__card__comment__data custom-scroll">
                    {props.content || comment}
                </div>
            </div>
        );
    }

    async function cancelOffer() {
        const hiddenOffers = (await hideOffer(sha256(paramsString))).data;
        updateConfigState(dispatch, { ...state.config, hiddenOffers: hiddenOffers });
    }

    async function showOffer() {
        const hiddenOffers = (await showOfferRequest(sha256(paramsString))).data;
        updateConfigState(dispatch, { ...state.config, hiddenOffers: hiddenOffers });
    }


    const isHidden = state.config?.hiddenOffers?.includes(sha256(paramsString));
    useEffect(() => {
        setActiveSlide(0);
    }, [props.images]);

    const allImages = JSON.parse(props.images || '[""]').filter(e => e);

    useEffect(() => {
        if (!allImages[0] && !imageLoadingFailed) {
            setImageError(true);
        }
    }, [allImages]);

    const descRef = useRef(null);
    const [descHeight, setDescHeight] = useState(0);
    const [descWidth, setDescWidth] = useState(0);

    useEffect(() => {
        if (descRef.current) {
            setDescHeight(parseFloat(window.getComputedStyle(descRef.current).height));   
            setDescWidth(descRef.current.scrollWidth);
        }
    }, [descRef, props]);

    if (isHidden && !props.allowAction) {
        return <></>;
    }

    const longDesc = descHeight > 58 || descWidth > 300;

    function buyAction() {
        setBuyingState(true);
        setTimeout(() => {
            setBuyingState(false);
        }, 5000);
        buyOffer(state.config?.address, props.title || 'Title');
    }

    return (
        <div className="ui__card">
            {state.config?.offerConfig?.image &&
                <div 
                    className="ui__card__background" 
                    style={{ 
                        'opacity': isHidden && props.allowAction ? '0.6' : undefined,
                        'background': imageLoadingFailed || imagePreloader ? `radial-gradient(var(--ui-gradient-color-from), var(--ui-gradient-color-to))` : undefined 
                    }}
                >
                    <div className="ui__card__img">
                        {imageLoadingFailed && <h5 className="ui__card__img__error">No photo</h5>}
                        <Slider value={activeSlide} setValue={setActiveSlide}>
                            {allImages.map(e => (
                                <div key={nanoid()}>
                                    <img 
                                        src={e.includes('http') ? e : `${state.config.selectedIPFS}${e}`} 
                                        draggable={false}
                                        onError={({ currentTarget }) => {
                                            currentTarget.style.display = 'none';
                                            currentTarget.onerror = null;
                                            setImageError(true);
                                        }}
                                        onLoad={() => {
                                            setImagePreloader(false);
                                            setImageError(false);
                                        }}
                                    />
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            }
            <div className="ui__card__info" style={{ 'opacity': isHidden && props.allowAction ? '0.6' : undefined }}>

                <div className="ui__card__main-info">
                    <div>
                    {state.config?.offerConfig?.title &&
                        <h5>{props.title || 'Title'}</h5>
                    }
                    {state.config?.offerConfig?.category &&
                        <p className="ui__card__main-info__category">{props.category || 'Category'}</p>
                    }
                        
                    </div>
                    {state.config?.offerConfig?.expires &&
                        <div className="ui__card__exp-data">
                            <h6>Expires in</h6>
                            <p>28 days</p>
                        </div>
                    }
                </div>

                <div className="ui__card__main-info ui__card__details">
                    <div>
                        {state.config?.offerConfig?.desc &&
                            <div className="ui__card__main-info__description">
                                <p 
                                    ref={descRef} 
                                    onClick={() => longDesc ? setDescPopupState(true) : ''}
                                    style={{ 'cursor': longDesc ? 'pointer' : undefined }}
                                >
                                    {props.description || 'description'}
                                </p>
                                {longDesc && descPopupOpen && 
                                    <Popup
                                        Content={PopupContent}
                                        settings={{ content: props.description || 'description' }}
                                        blur={true}
                                        close={() => setDescPopupState(false)}
                                    />
                                }
                            </div>
                        }
                        {state.config?.offerConfig?.price &&
                            <div className="ui__card__price">
                                <CurrencyImg />
                                <p 
                                    style={{ 
                                        // 'width': `${(props.price?.length || 2) > 3 ? 45 : (props.price?.length || 2)*12}px` 
                                    }}
                                >
                                    {props.price || 10}
                                </p>
                                {/* <p className="ui__card__currency">ZANO</p> */}
                            </div>
                        }
                    </div>
                    {state.config?.offerConfig?.contacts &&
                        <div className="ui__card__author">
                            <a href="/" onClick={copy}>{contact}</a>
                        </div>
                    }
                </div>
                {state.config?.offerConfig?.buy &&
                    <Button 
                        className={"ui__card__buy-btn " + (state.config?.address ?  '' : 'disabled')} 
                        withIcon={true}
                        onMouseUp={buyAction} 
                    >
                        {isBuying && <Preloader/>}
                        {isBuying ? "Confirm with wallet" : "Buy"}
                    </Button>
                }

            </div>
            {props.allowAction && 
                <div className="ui__card__actions">
                    {!isHidden &&
                        <div className="ui__card__actions__delete" onClick={() => cancelOffer()}>
                            <DeleteImg/>
                        </div>
                    }
                    {isHidden &&
                        <div className="ui__card__actions__delete ui__card__actions__show" onClick={() => showOffer()}>
                            <ShowImg/>
                        </div>
                    }
                </div>
            }
            {comment && state.config?.offerConfig?.tooltip && state.config?.offerConfig?.image && 
                <div className="ui__card__comment">
                    <div className="ui__card__comment__btn" onClick={() => setPopupState(true)}>
                        <TooltipImg/>
                    </div>
                    {popupOpen && 
                        <Popup
                            Content={PopupContent}
                            blur={true}
                            close={() => setPopupState(false)}
                        />
                    }
                </div>
            }
            <Alert
                value={errorValue}
                type={'success'}
            />
        </div>
    );
}

export default Card;