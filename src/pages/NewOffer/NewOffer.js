import "./newOffer.scss";
import Header from "../../components/Header/Header";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import OfferForm from "../../components/OfferForm/OfferForm";
import { ReactComponent as CommentsImg } from "../../assets/images/UI/comments.svg";
import { ReactComponent as ZanoImg } from "../../assets/images/UI/zano.svg";
import { ReactComponent as EmailImg } from "../../assets/images/UI/email.svg";
import { submitNewOffer } from "../../utils/rpc";
import sha256 from "sha256";
import { uploadIPFS } from "../../utils/utils";
import ImageUploader from "../../components/ImageUploader/ImageUploader";
import { nanoid } from "nanoid";
import { ReactComponent as DeleteImg } from '../../assets/images/UI/delete.svg';
import { ReactComponent as ArrowImg } from '../../assets/images/UI/arrow.svg';
import { Store } from "../../store/store-reducer";

function NewOffer() {

    const { state } = useContext(Store);
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [contact, setContact] = useState('');
    const [images, setImages] = useState([]);
    const [comment, setComment] = useState('');

    const paramsData = {
        title,
        category,
        description,
        price,
        contact,
        images: JSON.stringify(images),
        comment
    }


    async function submit() {
        const usersOffers = JSON.parse(localStorage.getItem('my-offers') || '[]');

        const paramsString = [
            paramsData.title,
            paramsData.category,
            paramsData.description,
            paramsData.contact,
            JSON.stringify(paramsData.images),
            paramsData.comment
        ].join(', ')
        console.log(paramsString);
        usersOffers.push(sha256(paramsString));
        localStorage.setItem('my-offers', JSON.stringify(usersOffers));

        await submitNewOffer(paramsData);
    }

    // const uploaderRef = useRef(null);

    async function uploadImage(value) {
        const formData = new FormData();
        formData.append("file", value);
        const hash = await uploadIPFS(formData);
        setImages([...images, hash]);
    }

    function UploadedImage(props) {

        function swapElements(arr, index1, index2) {
            const tempArray = [...arr];
            let temp = tempArray[index1];
            tempArray[index1] = tempArray[index2];
            tempArray[index2] = temp;
            return tempArray;
        }

        const image = props.image;
        const index = images.indexOf(image);

        function deleteItem() {
            setImages(images.filter(e => e !== image));
        }

        function moveTop() {    
            setImages(swapElements(images, index, index-1));
        }
        
        function moveDown() {    
            setImages(swapElements(images, index, index+1));
        }

        return (
            <div className="offer-page__image">
                <div className="offer-page__image__wrapper">
                    <div>
                        <img src={`https://ipfs.io/ipfs/${image}`} alt="" />
                    </div>
                    <h4>#{index + 1}</h4>
                </div>
                <div className="offer-page__image__controllers">
                    <div 
                        style={{ 
                            'transform': 'rotate(180deg)', 
                        }} 
                        className={!props.isFirst && !props.onlyItem ? undefined : 'disabled'}
                        onClick={moveTop}
                    >
                        <ArrowImg/>
                    </div>
                    <div
                        className={!props.isLast && !props.onlyItem ? undefined : 'disabled'}
                        onClick={moveDown}
                    >
                        <ArrowImg/>
                    </div>
                    <div className="offer-page__image__delete" onClick={deleteItem}>
                        <DeleteImg/>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="offer-page">
            <Header Button={<Button onMouseUp={() => navigate("/")}>Go Back</Button>}/>
            <OfferForm params={paramsData}>
                <h3>Create New Offer</h3>
                
                {/* <input type="file" name="file" ref={uploaderRef}/>
                <button onClick={uploadImage}>Upload file</button> */}
                <p>Images</p>
                <div
                    style={{ 'position': 'relative' }}
                >
                    {!state.config?.address &&
                        <p className="offer-page__no-address">You cannot upload images because the marketplace owner has not enabled this option</p>
                    }
                    <div className={state.config?.address ? '' : 'disabled disabled_full'}>
                        <ImageUploader setValue={uploadImage}/>
                    </div>
                </div>
                <div className="offer-page__images">
                    {images.filter(e => e).map((e, i) => 
                        <UploadedImage 
                            image={e} 
                            key={nanoid()} 
                            isFirst={i === 0} 
                            isLast={i + 1 === images.length}
                            onlyItem={!images[1]}
                            twoItems={images.length === 2}
                        />
                    )}
                </div>

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
                {/* <p>Image link</p>
                <Input className="ui__input__image" value={image} setValue={setImage}>
                    <div className="ui__input__background">
                        <GalleryImg />
                    </div>
                </Input> */}
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