import { ReactComponent as CurrencyImg } from "../../assets/images/UI/zano.svg";
import "./card.scss";
import { getLogo } from "../../utils/utils";
import { Store } from "../../store/store-reducer";
import { useContext, useState } from "react";
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

function Card(props) {

    const { state, dispatch } = useContext(Store);
    const [errorValue, setError] = useState(undefined);    
    const [popupOpen, setPopupState] = useState(false);
    const navigate = useNavigate();

    const paramsString = [
        props.title,
        props.category,
        props.description,
        props.contact,
        props.image,
        props.comment
    ].join(', ');

    const noPhoto = state.config.customLogo ? getLogo() : logoImg;
    const contact = props.contact || '@your_contacts';
    const comment = props.comment || "Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta, minus tenetur recusandae accusamus commodi numquam tempora ea ratione, nesciunt facilis fuga aperiam dolorum? Iste quia qui laboriosam deleniti dolorem impedit. ";

    async function copy(e) {
        e.preventDefault();

        await navigator.clipboard.writeText(contact);

        setError('Contacts copied');
        setTimeout(() => {
            setError();
        }, 2000);
    }


    function PopupContent() {
        return (
            <div className="ui__card__comment__content">
                <div className="popup__close" onMouseUp={() => setPopupState(false)}><CloseImg/></div>
                <div className="ui__card__comment__data">
                    {comment}
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

    if (isHidden && !props.allowAction) {
        return <></>;
    }

    return (
        <div className="ui__card">
            <div className="ui__card__background" style={{ 'opacity': isHidden && props.allowAction ? '0.6' : undefined }}>
                <div className="ui__card__img">
                    <img 
                        src={props.image || noPhoto} 
                        alt="Card" 
                        draggable={false}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null;
                            currentTarget.src = noPhoto;
                        }}
                    />
                </div>
            </div>
            <div className="ui__card__info" style={{ 'opacity': isHidden && props.allowAction ? '0.6' : undefined }}>

                <div className="ui__card__main-info">
                    <div>
                        <h5>{props.title || 'Title'}</h5>
                        <p className="ui__card__main-info__category">{props.category || 'Category'}</p>
                    </div>
                    <div className="ui__card__exp-data">
                        <h6>Expires in</h6>
                        <p>28 days</p>
                    </div>
                </div>

                <div className="ui__card__main-info ui__card__details">
                    <div>
                        <p className="ui__card__main-info__description">{props.description || 'description'}</p>
                        <div className="ui__card__price">
                            <CurrencyImg />
                            <p 
                                style={{ 
                                    'width': `${(props.price?.length || 2) > 5 ? 50 : (props.price?.length || 2)*10}px` 
                                }}
                            >
                                {props.price || 10}
                            </p>
                            <p className="ui__card__currency">ZANO</p>
                        </div>
                    </div>
                    <div className="ui__card__author">
                        <a href="/" onClick={copy}>{contact}</a>
                    </div>
                </div>
                
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
            {comment && 
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