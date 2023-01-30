import "./newOffer.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import OfferForm from "../../components/OfferForm/OfferForm";
import { ReactComponent as GalleryImg } from "../../assets/images/UI/gallery.svg";
import { ReactComponent as CommentsImg } from "../../assets/images/UI/comments.svg";
import { ReactComponent as ZanoImg } from "../../assets/images/UI/zano.svg";
import { ReactComponent as EmailImg } from "../../assets/images/UI/email.svg";

function NewOffer() {

    const navigate = useNavigate();

    return (
        <div className="offer-page">
            <Header Button={<Button onMouseUp={() => navigate("/")}>Go Back</Button>}/>
            <OfferForm>
                <h3>Create New Offer</h3>
                <p>Title</p>
                <Input className="new-offer__title"/>
                <span >Maximum length is 30 characters</span>
                <p>Category</p>
                <Input/>
                <p>Description</p>
                <Input/>
                <div className="ui__form__wrapper">
                    <div className="ui__input__wrapper">
                        <p>Price</p>
                        <div>
                            <Input className="ui__input__price"> 
                                {/* <div className="ui__input__background">
                                    <ZanoImg />
                                </div> */}
                            </Input>
                            <div className="ui__input__asset">ZANO</div>
                        </div>
                    </div>
                    <div>
                        <p>Contact details</p>
                        <Input className="ui__input__author">
                            <div className="ui__input__background">
                                <EmailImg />
                            </div>
                        </Input>
                    </div>
                </div>
                <p>Image link</p>
                <Input className="ui__input__image">
                    <div className="ui__input__background">
                        <GalleryImg />
                    </div>
                </Input>
                <p>Comments</p>
                <Input className="ui__input__comments">
                    <div className="ui__input__background">
                        <CommentsImg />
                    </div>
                </Input>
                <Button className="ui__submit-btn">Submit</Button>
                <span className="ui__warn">You'll Be Prompted To Confirm Your Submission With Zano Wallet</span>
            </OfferForm>
        </div>
    );
};

export default NewOffer;