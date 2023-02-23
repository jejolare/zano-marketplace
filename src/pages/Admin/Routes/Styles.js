import OfferForm from "../../../components/OfferForm/OfferForm";
import ColorPicker from "../../../components/ColorPicker/ColorPicker";
import React, { useState, useContext, useEffect } from "react";
import { Store } from "../../../store/store-reducer";
import { nanoid } from "nanoid";
import { redefineStyle } from "../../../utils/utils"; 
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import { resetStyles, updateConfig } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import Switch from "../../../components/Switch/Switch";
import { updateConfigState } from "../../../store/actions";

function Styles() {
    const navigate = useNavigate();
    const { state, dispatch } = useContext(Store);

    async function reset() {
        const sure = window.confirm('Reset all styles to default?');
        if (sure) {
            await resetStyles();
            navigate(0);
        }
    }


    const initialData = {};

    for (const iterator of state?.config?.styles) {
        initialData[iterator.property] = iterator.value;
    }

    const [stylesData, setStylesData] = useState(initialData);
    const [offerConfig, setOfferConfig] = useState(state?.config?.offerConfig || {});

    function changeOfferConfig(field, value) {

        const newData = {
            ...offerConfig,
            [field]: value
        }

        setOfferConfig(newData);
        updateConfigState(dispatch, { ...state.config, offerConfig: newData  });
    }

    async function save() {

        const updatedStyles = state.config.styles.map(e => {
            e.value = stylesData[e.property];
            return e;
        });

        updateConfig({ ...state.config, styles: updatedStyles, offerConfig: offerConfig }, true);
        navigate(0);
    }

    useEffect(() => {
        for (const key in stylesData) {
            redefineStyle(key, stylesData[key]);
        }
    }, [stylesData]);

    return (
        <div className="admin-page__styles">
            <OfferForm>
                <div className="ui__form__header">
                    <h3>Offer card</h3>
                    <p>Edit the appearance of the offer card</p>
                </div>

                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.title} setValue={(value) => changeOfferConfig('title', value)}/>
                    <p>Show title field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.category} setValue={(value) => changeOfferConfig('category', value)}/>
                    <p>Show category field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.expires} setValue={(value) => changeOfferConfig('expires', value)}/>
                    <p>Show "Expires in" field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.desc} setValue={(value) => changeOfferConfig('desc', value)}/>
                    <p>Show description field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.price} setValue={(value) => changeOfferConfig('price', value)}/>
                    <p>Show price field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.contacts} setValue={(value) => changeOfferConfig('contacts', value)}/>
                    <p>Show contacts field</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.buy} setValue={(value) => changeOfferConfig('buy', value)}/>
                    <p>Show "buy" button</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.tooltip} setValue={(value) => changeOfferConfig('tooltip', value)}/>
                    <p>Show offer tooltip</p> 
                </div>
                <div className="ui__form__switch admin__switch">
                    <Switch value={offerConfig.image} setValue={(value) => changeOfferConfig('image', value)}/>
                    <p>Show offer image</p> 
                </div>


                <div className="ui__form__header admin__subheader">
                    <h3>Styles</h3>
                    <p>Edit styles of your marketplace</p>
                </div>
                {state?.config?.styles[0] && state?.config?.styles?.map((e) => 
                    <div key={e.property}>
                        <p>{e.name}</p>
                        {e.type === 'color' &&
                            <ColorPicker 
                                value={stylesData[e.property]} 
                                setValue={value => setStylesData({ ...stylesData, [e.property]: value })}
                            />
                        }
                        {e.type === 'font-size' && 
                            <Input 
                                value={parseInt(stylesData[e.property], 10)} 
                                setValue={value => setStylesData({ ...stylesData, [e.property]: parseInt(value, 10) + 'px' })}
                                type="number"
                                attributes={{
                                    min: "1"
                                }}
                            />
                        }
                    </div>
                )}

                <Button className="ui__submit-btn ui__danger-btn" onMouseUp={reset}>Reset default appearance</Button>
                <Button className="ui__submit-btn" onMouseUp={save}>Save</Button>

            </OfferForm>
        </div>
    );
}

export default Styles;