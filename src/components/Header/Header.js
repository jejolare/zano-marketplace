import "./header.scss";
import Logo from "../Logo/Logo";
import SearchInput from "../SearchInput/SearchInput";

function Header(props) {
    return (
        <header>
            <Logo />
            <SearchInput />
            {props.Button}
        </header>
    );
};

export default Header;