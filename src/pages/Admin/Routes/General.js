import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import Switch from "../../../components/Switch/Switch";
import { useState } from "react";
import { updateConfig, uploadLogo, updatePassword, resetAll } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

function General(props) {

    const navigate = useNavigate();

    const config = props.config;

    const [title, setTitle] = useState(config?.title || '');
    const [subtitle, setSubtitle] = useState(config?.subtitle || '');
    const [password, setPassword] = useState('');
    const [allowPosts, setPostsState] = useState(config?.allowPosts || false);
    const [noSearch, setSearchState] = useState(config?.noSearch || false);
    const [ports, setPorts] = useState(config?.ports?.join(', ') || '');
    const [logo, setLogo] = useState();


    async function changeConfig() {
        await updateConfig({
            ...config,
            title,
            subtitle,
            allowPosts,
            noSearch
        });

        if (logo) {
            await uploadLogo(logo);     
        }

        if (password) {
            await updatePassword(password);     
        }

        navigate(0);
    }

    async function resetSettings() {
        const sure = window.confirm('are you sure? You will reset all your settings and STORAGE OF HIDDEN OFFERS');
        if (sure) {
            await resetAll();
            navigate(0);
        }
    }

    return (
        <div className="admin-page__settings">
            <Form>
                <div className="ui__form__header">
                    <h3>General Settings</h3>
                    <p>Edit general view of your marketplace</p>
                </div>
                <p>Title</p>
                <Input placeholder="Type new title" value={title} setValue={setTitle} />
                <p>Subtitle</p>
                <Input placeholder="Type new subtitle" value={subtitle} setValue={setSubtitle}/>
                <p>Logo</p>
                <ImageUploader value={logo} setValue={setLogo}/>
                <p>Change password</p>
                <Input placeholder="Type new password" value={password} setValue={setPassword} type="password"/>
                <div className="ui__form__switch">
                    <Switch value={allowPosts} setValue={setPostsState}/>
                    <p>Allow everyone to post new offers</p>
                </div>
                {!allowPosts &&
                    <>
                        <p>Your wallets ports (ex: port1, port2, port3)</p>
                        <Input placeholder="" value={ports} setValue={setPorts}/>
                    </>
                }

                <div className="ui__form__switch">
                    <Switch value={noSearch} setValue={setSearchState}/>
                    <p>Remove search from header menu </p>
                </div>
                <Button className="ui__submit-btn ui__danger-btn" onMouseUp={resetSettings}>Reset all settings</Button>
                <Button className="ui__submit-btn" onMouseUp={changeConfig}>Save</Button>
            </Form>
        </div>
    );
}

export default General;