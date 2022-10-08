import { Logout } from "assets/icons";
import Avatar from "assets/images/avatar.png";
import { notify } from "components/AlertMessage";
import { LOCAL_STORAGE_NAME } from "constants";
import { AuthContext } from "contexts/AuthContext";
import { useContext, useState } from "react";

const Account = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);
	const { logoutUser } = useContext(AuthContext);
	
	const name = localStorage.getItem(LOCAL_STORAGE_NAME);

	const handleLogout = async (e) => {
		e.preventDefault();
		await logoutUser();
		notify("Logout successfully", "success");
	};

	return (
		<div className="Account">
			<div className="Account__wrapper" onClick={toggle}>
				<div className="Account__content">
					<div className="Account__name">{name}</div>
					<div className="Account__status">Available</div>
				</div>
				<div className="Account__icon">
					<img src={Avatar} alt="avatar" />
					<div className="Account__dot"></div>
				</div>
			</div>
			<div
				className="Account__logout"
				style={{
					display: isOpen ? "block" : "none",
				}}
				onClick={handleLogout}
			>
				<span>Logout</span>
				<img src={Logout} alt="logout" />
			</div>
		</div>
	);
};

export default Account;
