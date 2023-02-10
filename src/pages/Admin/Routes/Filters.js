import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import DateInput from "../../../components/DateInput/DateInput";
import { useState } from "react";
import { updateConfig } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import Switch from "../../../components/Switch/Switch";

function Filters(props) {

    const navigate = useNavigate();

    const config = props.config;
    const [category, setCategory] = useState(config?.filters?.category || '');
    const [locationCountry, setLocationCountry] = useState(config?.filters?.locationCountry || '');
    const [locationCity, setLocationCity] = useState(config?.filters?.locationCity || '');
    const [sort, setSort] = useState(config?.filters?.sort || 'Publication date');   
    const [offersPerPage, setOffersPerPage] = useState(config?.filters?.offersPerPage || 50);   
    const [minimumPrice, setMinimumPrice] = useState(config?.filters?.minPrice || '');   
    const [maximumPrice, setMaximumPrice] = useState(config?.filters?.maxPrice || '');   

    const [minDate, setMinDate] = useState(config?.filters?.minDate || '');   
    const [maxDate, setMaxDate] = useState(config?.filters?.maxDate ||'');   
    const [reverse, setReverse] = useState(config?.filters?.reverse || false);   

    
    async function saveFilters() {
        await updateConfig({
            filters: {
                category,
                locationCountry,
                locationCity,
                sort,
                offersPerPage : parseInt(offersPerPage, 10) || 100,
                minPrice: parseInt(minimumPrice, 10) || 0,
                maxPrice: parseInt(maximumPrice, 10) || 0,
                minDate,
                maxDate,
                reverse
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
                <p>Offer will be visible if the category includes this text</p>
                <Input 
                    value={category} 
                    setValue={setCategory} 
                    placeholder="Not selected"
                />
                <p>By location Country</p>
                <Input 
                    placeholder="Not selected" 
                    value={locationCountry} 
                    setValue={setLocationCountry}
                />
                <p>By location City</p>
                <Input 
                    placeholder="Not selected"
                    value={locationCity} 
                    setValue={setLocationCity}
                />
                <p>Amount of offers per page</p>
                <Input 
                    value={offersPerPage} 
                    setValue={setOffersPerPage}
                    type="number"
                    placeholder="Default: 100"
                    attributes={{
                        min: "1"
                    }}
                />
                <p>Minimum offer price (ZANO)</p>
                <Input 
                    value={minimumPrice} 
                    setValue={setMinimumPrice}
                    type="number"
                    placeholder="Not selected"
                    attributes={{
                        min: "1"
                    }}
                />
                <p>Maximum offer price (ZANO)</p>
                <Input 
                    value={maximumPrice} 
                    setValue={setMaximumPrice}
                    type="number"
                    placeholder="Not selected"
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
                <div className="ui__form__switch">
                    <Switch value={reverse} setValue={setReverse}/>
                    <p>Reverse sort</p>
                </div>
                <Button className="ui__submit-btn" onMouseUp={() => window.open('/editor','_blank')}>Offers visibility editor</Button>
                <Button className="ui__submit-btn" onMouseUp={saveFilters}>Save</Button>
            </Form>
        </div>
    );
}

export default Filters;