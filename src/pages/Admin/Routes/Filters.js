import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import DateInput from "../../../components/DateInput/DateInput";
import { useState } from "react";
import { updateConfig } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

function Filters(props) {

    const navigate = useNavigate();

    const config = props.config;
    const [category, setCategory] = useState(config?.filters?.category || '');
    const [locationCountry, setLocationCountry] = useState(config?.filters?.locationCountry || '');
    const [locationCity, setLocationCity] = useState(config?.filters?.locationCity || '');
    const [sort, setSort] = useState(config?.filters?.sort || 'Publication date');   
    const [offersPerPage, setOffersPerPage] = useState(config?.filters?.offersPerPage || 50);   

    const [minDate, setMinDate] = useState(config?.filters?.minDate || '');   
    const [maxDate, setMaxDate] = useState(config?.filters?.maxDate ||'');   

    
    async function saveFilters() {
        await updateConfig({
            filters: {
                category,
                locationCountry,
                locationCity,
                sort,
                offersPerPage : parseInt(offersPerPage, 10),
                minDate,
                maxDate
            }
        }, true);
        navigate(0);
    }

    return (
        <div className="admin-page__settings">
            <Form>
                <div className="ui__form__header">
                    <h3>Filters</h3>
                    <p>Edit filters of your marketplace</p>
                </div>
                <p>By category</p>
                <Input 
                    options={[]} 
                    value={category} 
                    setValue={setCategory} 
                    placeholder="Not selected"
                />
                <p>By location Country</p>
                <Input 
                    options={[]} 
                    placeholder="Not selected" 
                    value={locationCountry} 
                    setValue={setLocationCountry}
                />
                <p>By location City</p>
                <Input 
                    options={[]} 
                    placeholder="Not selected"
                    value={locationCity} 
                    setValue={setLocationCity}
                />
                <p>Amount of offers per page</p>
                <Input 
                    value={offersPerPage} 
                    setValue={setOffersPerPage}
                    type="number"
                    attributes={{
                        min: "1"
                    }}
                />
                <p>Minimum offer date</p>
                <DateInput
                    value={minDate}
                    setValue={setMinDate}
                    max={maxDate}
                />
                <p>Maximum offer date</p>
                <DateInput
                    value={maxDate}
                    setValue={setMaxDate}
                    min={minDate}
                />
                <p>Sort by</p>
                <Input 
                    options={['Publication date', 'Amount of Zano', 'Location']} 
                    value={sort} 
                    setValue={setSort}
                    noInput={true}
                />
                <Button className="ui__submit-btn" onMouseUp={saveFilters}>Save</Button>
            </Form>
        </div>
    );
}

export default Filters;