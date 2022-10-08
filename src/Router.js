import Auth from "components/Auth";
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import { BrowserRouter, Route, Routes } from "react-router-dom";

// const Routers = createBrowserRouter([
// 	{
// 		path: "/Dashboard",
// 		element: <Dashboard />,
// 	},
// 	{
// 		path: "/",
// 		element: <Login />,
// 	},
// 	{
// 		path: "/signup",
// 		element: <Signup />,
// 	},
// ]);


const Routers = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
		</BrowserRouter>

	)
}

export default Routers
