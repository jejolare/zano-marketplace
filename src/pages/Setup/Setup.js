import "./setup.scss";
import Registration from "./Registration";
import Login from "./Login";
import { useContext } from "react";
import { Store } from "../../store/store-reducer";

function Setup() {

    const { state } = useContext(Store);

    return (
        <div className="setup-page">
            {state.isPrepared && <Login/>}
            {!state.isPrepared && <Registration/>}
        </div>
    );
}

export default Setup;