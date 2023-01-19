import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";

function General() {
    return (
        <div className="admin-page__settings">
            <Form>
                <div className="ui__form__header">
                    <h3>General Settings</h3>
                    <p>Edit general view of your marketplace</p>
                </div>
                <p>Title</p>
                <Input/>
                <p>Subtitle</p>
                <Input/>
                <p>Logo</p>
                <ImageUploader/>
                <Button className="ui__submit-btn" onMouseUp={() => {}}>Save</Button>
            </Form>
        </div>
    );
}

export default General;