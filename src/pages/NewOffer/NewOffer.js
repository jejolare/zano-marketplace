import "./newOffer.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OfferForm from "../../components/OfferForm/OfferForm";
import { ReactComponent as GalleryImg } from "../../assets/images/UI/gallery.svg";
import { ReactComponent as CommentsImg } from "../../assets/images/UI/comments.svg";
import { ReactComponent as ZanoImg } from "../../assets/images/UI/zano.svg";
import { ReactComponent as EmailImg } from "../../assets/images/UI/email.svg";
import { submitNewOffer } from "../../utils/rpc";

function NewOffer() {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [contact, setContact] = useState('');
    const [image, setImage] = useState('');
    const [comment, setComment] = useState('');

    const paramsData = {
        title,
        category,
        description,
        price,
        contact,
        image,
        comment
    }


    async function submit() {
        await submitNewOffer(paramsData);
        // navigate(0);
    }

    return (
        <div className="offer-page">
            <Header Button={<Button onMouseUp={() => navigate("/")}>Go Back</Button>}/>
            <OfferForm params={paramsData}>
                <h3>Create New Offer</h3>
                <p>Title</p>
                <Input value={title} setValue={setTitle}/>
                <p>Category</p>
                <Input value={category} setValue={setCategory}/>
                <p>Description</p>
                <Input value={description} setValue={setDescription}/>
                <div className="ui__form__wrapper">
                    <div className="ui__input__wrapper">
                        <p>Price</p>
                        <div>
                            <Input className="ui__input__price" value={price} setValue={setPrice} type="number"> 
                                <div className="ui__input__background">
                                    <ZanoImg />
                                </div>
                            </Input>
                            <div className="ui__input__asset">ZANO</div>
                        </div>
                    </div>
                    <div>
                        <p>Contact details</p>
                        <Input className="ui__input__author" value={contact} setValue={setContact}>
                            <div className="ui__input__background">
                                <EmailImg />
                            </div>
                        </Input>
                    </div>
                </div>
                <p>Image link</p>
                <Input className="ui__input__image" value={image} setValue={setImage}>
                    <div className="ui__input__background">
                        <GalleryImg />
                    </div>
                </Input>
                <p>Comments</p>
                <Input className="ui__input__comments" value={comment} setValue={setComment}>
                    <div className="ui__input__background">
                        <CommentsImg />
                    </div>
                </Input>
                <Button className="ui__submit-btn" onMouseUp={submit}>Submit</Button>
                <span className="ui__warn">You'll Be Prompted To Confirm Your Submission With Zano Wallet</span>
            </OfferForm>
        </div>
    );
};

export default NewOffer;