import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = (props) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavigation = (path) => {
        navigate(path);
    };

    const links = [{ link: "/patientprofile", text: "Profile" },
    { link: "/adddoctor", text: "Add Doctor" },
    { link: "/addrecord", text: "Add Record" }]

    return (
        <div className="sidebar4">
            <ul className="ul4">
                {links.map((link, index) => {
                    return <li className={`li4 ${location.pathname === link.link ? 'active' : ''}`} onClick={() => handleNavigation(link.link)}>{link.text}</li>
                })}
            </ul>
        </div>
    )
}

export default Sidebar
