import axios from "axios";
import { authAPI, LOCAL_STORAGE_NAME, LOCAL_STORAGE_TOKEN } from "constants";
import { createContext, useEffect, useReducer } from "react";
import { AuthReducer } from "reducers/AuthReducer";
import setAuthToken from "utils/setAuthToken";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [authState, dispatch] = useReducer(AuthReducer, {
		authLoading: true,
		isAuthenticated: false,
		user: null,
	});

	//Check authenticate user
	const loadUser = async () => {
		const token = localStorage.getItem(LOCAL_STORAGE_TOKEN);
		const name = localStorage.getItem(LOCAL_STORAGE_NAME);
		if (token && name) {
			setAuthToken(token);
			dispatch({
				type: "SET_AUTH",
				payload: {
					isAuthenticated: true,
					user: name,
				},
			});
		} else {
			dispatch({
				type: "SET_AUTH",
				payload: {
					isAuthenticated: false,
					user: null,
				},
			});
		}
	};

	useEffect(() => {
		loadUser();
	}, []);

	const signUpUser = async (userForm) => {
		try {
			const response = await axios.post(`${authAPI}/signup`, userForm);
			if (response.status === 200) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN,
					response.data.token
				);
				localStorage.setItem(
					LOCAL_STORAGE_NAME,
					response.data.displayName
				);
			}
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response) {
				return error.response.data;
			} else return { success: false, message: "Internal server error" };
		}
	};

	const loginUser = async (userForm) => {
		try {
			const response = await axios.post(`${authAPI}/signin`, userForm);
			if (response.status === 200) {
				localStorage.setItem(
					LOCAL_STORAGE_TOKEN,
					response.data.token
				);
				localStorage.setItem(
					LOCAL_STORAGE_NAME,
					response.data.displayName
				);
			}
			await loadUser();
			return response.data;
		} catch (error) {
			if (error.response) {
				return error.response.data;
			} else return { success: false, message: "Internal server error" };
		}
	};

	const logoutUser = async () => {
		await axios.post(`${authAPI}/logout`);
		localStorage.removeItem(LOCAL_STORAGE_TOKEN);
		localStorage.removeItem(LOCAL_STORAGE_NAME);
		setAuthToken(null);
		dispatch({
			type: "SET_AUTH",
			payload: {
				isAuthenticated: false,
				user: null,
			},
		});
	};

	const authContextData = { signUpUser, loginUser, logoutUser, authState };

	return (
		<AuthContext.Provider value={authContextData}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContextProvider;
