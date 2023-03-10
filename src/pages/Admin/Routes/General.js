import Form from "../../../components/Form/Form";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import ImageUploader from "../../../components/ImageUploader/ImageUploader";
import Switch from "../../../components/Switch/Switch";
import { useRef, useState } from "react";
import { updateConfig, uploadLogo, updatePassword, resetAll, exportConfig } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { ReactComponent as DownloadImg } from "../../../assets/images/UI/download.svg";
import { ReactComponent as UploadImg } from "../../../assets/images/UI/upload.svg";

function General(props) {

    const navigate = useNavigate();

    const config = props.config;

    const [title, setTitle] = useState(config?.title || '');
    const [subtitle, setSubtitle] = useState(config?.subtitle || '');
    const [password, setPassword] = useState('');
    const [allowPosts, setPostsState] = useState(config?.allowPosts || false);
    const [useZanod, setZanodState] = useState(config?.zanod || false);
    const [noSearch, setSearchState] = useState(config?.noSearch || false);
    const [ports, setPorts] = useState(config?.ports?.join(', ') || '');
    const [nodeLink, setNodeLink] = useState(config?.walletPort || '');
    const [logo, setLogo] = useState();
    const [transferAddress, setTransferAddress] = useState(config?.address || '');
    const [infuraID, setInfuraID] = useState(config?.projectId || '');
    const [infuraSecret, setInfuraSecret] = useState(config?.projectSecret || '');
    const [ipfsEndpoint, setEndpoint] = useState(() => {
        if (!config?.selectedIPFS) return '';

        if (config?.defaultIPFS.includes(config?.selectedIPFS)) {
            return config?.selectedIPFS;
        }

        return 'Use my own';
    });
    const [ownIpfsEndpoint, setOwnEndpoint] = useState(config?.defaultIPFS?.includes(config?.selectedIPFS) ? '' : config?.selectedIPFS);

    async function changeConfig() {
        await updateConfig({
            ...config,
            title,
            subtitle,
            allowPosts,
            noSearch,
            zanod: useZanod,
            address: transferAddress,
            ports: ports.split(', '),
            projectId: infuraID,
            projectSecret: infuraSecret,
            walletPort: nodeLink,
            selectedIPFS: ipfsEndpoint === "Use my own" ? ownIpfsEndpoint : ipfsEndpoint
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

    const importRef = useRef(null);

    async function importConfig(e) {
        const file = e.target.files[0];
        if (file.type !== 'application/json') return;

        const reader = new FileReader();
        reader.onload = async () => {
            const config = JSON.parse(reader.result);
            if (config.defaultIPFS && config.defaultIPFS[0]) {
                await updateConfig(config);
                navigate(0);
            }
        };
        reader.readAsText(file);
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
                <Button className="ui__submit-btn ui__submit-btn__image" onMouseUp={exportConfig}> 
                    <DownloadImg/>
                    Export config
                </Button>
                <Button className="ui__submit-btn ui__submit-btn__image ui__danger-btn" onMouseUp={() => importRef.current?.click()}>
                    <UploadImg/>
                    Import config
                </Button>
                <input style={{ 'display': 'none' }} type="file" ref={importRef} onChange={importConfig}/>
                <div className="ui__form__header admin__subheader">
                    <h3>IPFS settings</h3>
                    <p>Set ipfs settings to allow users to upload images</p>
                </div>
                <p>Infura project ID</p>
                <Input placeholder="Type your project ID" value={infuraID} setValue={setInfuraID} />
                <p>Infura secret</p>
                <Input placeholder="Type your Infura secret" value={infuraSecret} setValue={setInfuraSecret} type="password"/>
                <p>IPFS endpoint</p>
                <Input 
                    options={config?.defaultIPFS || []} 
                    value={ipfsEndpoint} 
                    setValue={setEndpoint}
                    noInput={true}
                />
                {ipfsEndpoint === "Use my own" &&
                    <>
                        <p>Your IPFS endpoint</p>
                        <Input placeholder="https://ipfs.io/ipfs/" value={ownIpfsEndpoint} setValue={setOwnEndpoint}/>
                    </>
                }
                <div className="ui__form__header admin__subheader">
                    <h3>Zano wallet</h3>
                    <p>Set Zano settings to display offers in your marketplace</p>
                </div>
                <p>Transfer address for offers</p>
                <Input placeholder="Type transfer address" value={transferAddress} setValue={setTransferAddress}/>
                <div className="ui__form__switch">
                    <Switch value={useZanod} setValue={setZanodState}/>
                    <p>Use Zano daemon</p> 
                    {/* Allow everyone to post new offers */}
                </div>
                {!useZanod &&
                    <>
                        <p>Your wallets links (ex: url1, url2, url3)</p>
                        <Input placeholder="" value={ports} setValue={setPorts}/>
                    </>
                }
                {useZanod &&
                    <>
                        <p>Your Zanod link</p>
                        <Input placeholder="" value={nodeLink} setValue={setNodeLink}/>
                    </>
                }

                {useZanod && 
                    <div className="ui__form__switch">
                        <Switch value={allowPosts} setValue={setPostsState}/>
                        <p>Show "new offer" button to everyone</p> 
                    </div>
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