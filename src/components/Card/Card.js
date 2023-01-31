import { ReactComponent as CurrencyImg } from "../../assets/images/UI/zano.svg";
import "./card.scss";
import { getLogo } from "../../utils/utils";
import { Store } from "../../store/store-reducer";
import { useContext, useState } from "react";
import logoImg from "../../assets/images/UI/logo.png";
import Alert from "../../components/Alert/Alert";
import { ReactComponent as DeleteImg } from '../../assets/images/UI/delete.svg';
import { ReactComponent as TooltipImg } from '../../assets/images/UI/tooltip.svg';
import { ReactComponent as CloseImg } from '../../assets/images/UI/close.svg';
import Popup from "../Popup/Popup";

function Card(props) {

    const { state } = useContext(Store);
    const [errorValue, setError] = useState(undefined);    
    const [popupOpen, setPopupState] = useState(false);

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

    return (
        <div className="ui__card">
            <div className="ui__card__background">
                <div className="ui__card__img">
                    <img src={props.image || noPhoto} alt="Card" draggable={false}/>
                </div>
            </div>
            <div className="ui__card__info">

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
                    <div className="ui__card__actions__delete">
                        <DeleteImg/>
                    </div>
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