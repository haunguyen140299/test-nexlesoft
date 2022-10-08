import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//type: info, success, warning, error, default.
export const notify = (message, type) =>
	toast[type](message, {
		position: "top-right",
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});

const AlertMessage = () => (
	<ToastContainer
		position="top-right"
		autoClose={5000}
		hideProgressBar={false}
		newestOnTop={false}
		closeOnClick
		rtl={false}
		pauseOnFocusLoss
		draggable
		pauseOnHover
	/>
);

export default AlertMessage;
