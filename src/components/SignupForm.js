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

const SignupForm = () => {
	const navigate = useNavigate();
	const { signUpUser } = useContext(AuthContext);

	const formik = useFormik({
		initialValues: {
			firstName: "Nguyen",
			lastName: "Hau",
			username: "",
			email: "",
			password: "",
		},
		validationSchema: Yup.object({
			username: Yup.string().min(3, "Username is too short").required("Username is required"),
			email: Yup.string().email("Invalid email address").required("Email is required"),
			password: Yup.string().min(6, "Password is week").required("Password is required"),
		}),
		onSubmit: async (values) => {
			try {
				const { username, ...resOfValue } = values;
				const response = await signUpUser(resOfValue);
				if (response?.token) {
					notify("Sign up successfully", "success");
					navigate('/login');
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
			<h3 className="Form__title">Adventure starts here</h3>
			<div className="Form__description">
				Make your app management easy and fun!
			</div>
			<Form onSubmit={formik.handleSubmit}>
				<FormGroup>
					<Label for="username" className="Form__label">
						Username
					</Label>
					<Input
						id="username"
						name="username"
						type="username"
						placeholder="johndoe"
						valid={formik.values.username !== "" && !formik.errors.username}
						invalid={formik.errors.username && formik.touched.username}
						className="Form__input"
						onChange={formik.handleChange}
					/>
					<FormFeedback valid>
						Username is ok
					</FormFeedback>
					<FormFeedback>{formik.errors.username}</FormFeedback>
				</FormGroup>
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
					<Label check>i agree to</Label>{" "}
					<a href="/">privacy policy & terms</a>
				</FormGroup>
				<Button
					outline={false}
					className="Form__button"
					type="submit"
				>
					Sign Up
				</Button>
				<div className="text-center">
					<span>Already have an account?</span>
					<a href="/login" className="Form__redirect">
						Sign in instead
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

export default SignupForm;
