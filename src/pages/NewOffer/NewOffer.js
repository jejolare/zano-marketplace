import Header from "../../components/Header/Header";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import { useNavigate } from "react-router-dom";

function NewOffer() {
    const navigate = useNavigate();
    return (
        <div className="offer-page">
            <Header Button={<Button onMouseUp={() => navigate("/")}>Go Back</Button>}/>
            <main>
                <Form>
                    <h3>Create New Offer</h3>
                    <p>Title</p>
                    <Input className="ui__input"/>
                    <span>Maximum length is 30 characters</span>
                    <p>Category</p>
                    <Input className="ui__input"/>
                    <p>Description</p>
                    <Input className="ui__input"/>
                    <div className="ui__form__wrapper">
                        <div className="ui__input__wrapper">
                            <p>Price</p>
                            <Input className="ui__input ui__input__price"/>
                            <div>ZANO</div>
                        </div>
                        <div>
                            <p>Contact details</p>
                            <Input className="ui__input ui__input__author"/>
                        </div>
                    </div>
                    <p>Image link</p>
                    <Input className="ui__input ui__input__image"/>
                    <p>Comments</p>
                    <Input className="ui__input ui__input__comments"/>
                    <button className="ui__submit-btn">Submit</button>
                    <span className="ui__warn">You'll Be Prompted To Confirm Your Submission With Zano Wallet</span>
                </Form>
            </main>
        </div>
    );
};

export default NewOffer;