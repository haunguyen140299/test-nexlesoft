import { Facebook, Github, Mail, Twitter } from "assets/icons";
import { notify } from "components/AlertMessage";
import { AuthContext } from "contexts/AuthContext";
import { useFormik } from "formik";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
	Button, Form, FormFeedback, FormGroup,
	Input,
	Label
} from "reactstrap";
import * as Yup from 'yup';

const LoginForm = () => {
	const navigate = useNavigate();
	const { loginUser } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			email: Yup.string().email("Invalid email address").required("Email is required"),
			password: Yup.string().min(6, "Password is week").required("Password is required"),
		}),
		onSubmit: async (values) => {
			try {
				const response = await loginUser(values);
				console.log('response', response);
				if (response?.token) {
					notify("Sign in successfully", "success");
					navigate('/');
				} else {
					notify(response?.errors?.error, "error");
				}
			} catch (error) {
				console.error(error);
			}
		}
	})

	return (
		<div className="Form">
			<h3 className="Form__title">Welcome to ReactJS Test Interview! 👋🏻</h3>
			<div className="Form__description">
				Please sign-in to your account and start the adventure
			</div>
			<Form onSubmit={formik.handleSubmit}>
				<FormGroup>
					<Label for="email" className="Form__label">
						Email
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="johndoe@gmail.com"
						valid={formik.values.email !== "" && !formik.errors.email}
						invalid={formik.errors.email && formik.touched.email}
						className="Form__input"
						value={formik.values.email}
						onChange={formik.handleChange}
					/>
					<FormFeedback valid>
						Email is ok
					</FormFeedback>
					<FormFeedback>{formik.errors.email}</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="password" className="Form__label">
						Password
					</Label>
					<a href="/forgot-password" className="Form__forgot_password">Forgot Password?</a>
					<Input
						id="password"
						name="password"
						type="password"
						placeholder="⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉ ⚉"
						valid={formik.values.password !== "" && !formik.errors.password}
						invalid={formik.errors.password && formik.touched.password}
						className="Form__input"
						value={formik.values.password}
						onChange={formik.handleChange}
					/>
					<FormFeedback valid>
						Password is strong
					</FormFeedback>
					<FormFeedback>{formik.errors.password}</FormFeedback>
				</FormGroup>
				<FormGroup check className="Form__check">
					<Input type="checkbox" />
					<Label check>Remember me</Label>
				</FormGroup>
				<Button
					outline={false}
					className="Form__button"
					type="submit"
				>
					Login
				</Button>
				<div className="text-center">
					<span>New on our platform?</span>
					<a href="/signup" className="Form__redirect">
						Create an account
					</a>
				</div>
				<div className="Form__or">
					<span>or</span>
				</div>
				<div className="Form__social">
					<img src={Facebook} alt="Facebook" />
					<img src={Twitter} alt="Twitter" />
					<img src={Mail} alt="Mail" />
					<img src={Github} alt="Git" />
				</div>
			</Form>
		</div>
	);
};

export default LoginForm;
