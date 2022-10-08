import AlertMessage from "components/AlertMessage";
import AuthContextProvider from "contexts/AuthContext";
import Router from './Router';

function App() {
	return (
		<AuthContextProvider>
			<Router />
			<AlertMessage />
		</AuthContextProvider>
	);
}

export default App;
