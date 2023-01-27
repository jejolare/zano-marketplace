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

function Styles() {
    const navigate = useNavigate();
    const { state } = useContext(Store);

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

    async function save() {

        const updatedStyles = state.config.styles.map(e => {
            e.value = stylesData[e.property];
            return e;
        });

        updateConfig({ ...state.config, styles: updatedStyles }, true)
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

                <Button className="ui__submit-btn ui__danger-btn" onMouseUp={reset}>Reset default styles</Button>
                <Button className="ui__submit-btn" onMouseUp={save}>Save</Button>

            </OfferForm>
        </div>
    );
}

export default Styles;