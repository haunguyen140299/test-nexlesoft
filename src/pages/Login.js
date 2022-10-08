import LoginImage from "assets/images/login-page.png";
import LoginForm from "components/LoginForm";
import { Col, Container, Row } from "reactstrap";
const Login = () => {
	return (
		<div className="FormPage">
			<Container fluid>
				<Row>
					<Col className="FormPage__image" lg="8" md="6" xs="12">
						<img src={LoginImage} alt="LoginImage" />
					</Col>
					<Col className="FormPage__form" lg="4" md="6" xs="12">
						<LoginForm />
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Login
