import SignupImage from "assets/images/signup-page.png";
import SignupForm from "components/SignupForm";
import { Col, Container, Row } from "reactstrap";
const Signup = () => {
	return (
		<div className="FormPage">
			<Container fluid>
				<Row>
					<Col className="FormPage__image" md="8" xs="8">
						<img src={SignupImage} alt="SignupImage" />
					</Col>
					<Col className="FormPage__form" md="4" xs="4">
						<SignupForm />
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Signup;
