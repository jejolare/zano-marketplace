import "./header.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../SearchInput/SearchInput";
import { Store } from "../../store/store-reducer";
import { useContext } from "react";

function Header(props) {
    const { state } = useContext(Store);

    return (
        <header className={state.config.noSearch ? 'header_no-search' : ''}>
            <Logo config={state.config} />
            {props.children || <>{!state.config.noSearch && <SearchInput />}</>}
            {props.Button}
        </header>
    );
};

export default Header;