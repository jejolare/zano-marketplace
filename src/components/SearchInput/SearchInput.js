import { useContext } from "react";
import { Store } from "../../store/store-reducer";
import { updateSearchState } from "../../store/actions";

function SearchInput() {
    
    const { dispatch } = useContext(Store);

    return (
        <input 
            className="header__search" 
            type="text" 
            placeholder="Search by name"  
            onInput={(e) => updateSearchState(dispatch, e.target.value)}
        />
    );
};

export default SearchInput;