import { AuthContext } from "contexts/AuthContext";
import Dashboard from 'pages/Dashboard';
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "reactstrap";

const Auth = () => {
	const {
		authState: { authLoading, isAuthenticated },
	} = useContext(AuthContext);

	if (authLoading)
		return <div className="full-screen">
			<Spinner color="info">
				Loading...
			</Spinner>
		</div>;
	else if (isAuthenticated) return <Dashboard />;
	else return <Navigate to="/login" />;
};

export default Auth;
