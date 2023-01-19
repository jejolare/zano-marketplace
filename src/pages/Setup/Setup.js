import "./setup.scss";
import Registration from "./Registration";
import Login from "./Login";
import { useContext, useEffect } from "react";
import { Store } from "../../store/store-reducer";
import { useNavigate } from "react-router-dom";

function Setup() {

    const { state } = useContext(Store);

    const navigate = useNavigate();

    useEffect(() => {
        if (state.isAdmin && state.isPrepared) {
            navigate('/admin');
        }
    }, [state]);

    return (
        <div className="setup-page">
            {state.isPrepared && <Login/>}
            {!state.isPrepared && <Registration/>}
        </div>
    );
}

export default Setup;