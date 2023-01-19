import { NavLink } from "react-router-dom";

function AdminMenu() {

    function getClasses(options) {
        return options.isActive ? "admin-page__active" : undefined;
    }

    return (
        <ul>
            <li><NavLink to={'/admin/general'} className={getClasses}>GENERAL</NavLink></li>
            <li><div></div></li>
            <li><NavLink to={'/admin/filters'} className={getClasses}>FILTERS</NavLink></li>
            <li><div></div></li>
            <li>
                <NavLink 
                    to={'/admin/styles'}  
                    className={getClasses}
                >
                    STYLES
                </NavLink>
                </li>
        </ul>
    );
}

export default AdminMenu;