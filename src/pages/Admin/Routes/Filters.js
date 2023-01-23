import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import { useState } from "react";

function Filters() {

    const [category, setCategory] = useState('');

    return (
        <div className="admin-page__settings">
            <Form>
                <div className="ui__form__header">
                    <h3>Filters</h3>
                    <p>Edit filters of your marketplace</p>
                </div>
                <p>Category</p>
                <Input options={['cat', 'dog']} value={category} setValue={setCategory} placeholder="Not selected"/>
                <p>Location Country</p>
                <Input options={['test 1', 'test 2']} placeholder="Not selected"/>
                <p>Location City</p>
                <Input options={['test 1', 'test 2']} placeholder="Not selected"/>
                <Button className="ui__submit-btn" onMouseUp={() => {}}>Save</Button>
            </Form>
        </div>
    );
}

export default Filters;