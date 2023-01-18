import Form from "../../components/Form/Form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Alert from "../../components/Alert/Alert";
import { useState, useContext } from "react";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import { Store } from "../../store/store-reducer";
import { updateMarketState } from "../../store/actions";

function Registration() {

    const { dispatch } = useContext(Store);

    const navigate = useNavigate();
    const [_, setCookie] = useCookies(['token']);

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [errorValue, setError] = useState(undefined);


    function showError(data) {
        setError(data);
        setTimeout(() => {
            setError(undefined);
        }, 3000);
    }

    async function auth() {
        if (!name || !password) return showError("All fields must be filled");

        const token = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify({
                nickname: name,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => json.token);

        if (!token) {
            showError('Wrong credentials');
        } else {
            setCookie('token', token);
            updateMarketState(dispatch, true);
            navigate('/admin');
        }
    }

    return (
        <>
            <Form>
                <div className="setup-page__header setup-page__header__login">
                    <h3>Log In</h3>
                    <p>Continue with your created account</p>
                </div>
                <p>Username</p>
                <Input setValue={setName} value={name}/>
                <p>Password</p>
                <Input setValue={setPassword} value={password} type={'password'}/>
                <Button className="ui__submit-btn" onMouseUp={auth}>Log In</Button>
            </Form>
            <Alert
                value={errorValue}
            />
        </>
    );
}

export default Registration;