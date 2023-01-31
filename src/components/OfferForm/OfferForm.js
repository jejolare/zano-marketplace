import Form from "../../components/Form/Form";
import Card from "../../components/Card/Card"
import './offerForm.scss';

function OfferForm(props) {
    return (
        <main className="new-offer__wrapper">
            <Form>
                <div className="ui__form__content">
                    {props.children}
                </div>
            </Form>
            <Card 
                {...props.params}
            />
        </main>
    );
}

export default OfferForm;