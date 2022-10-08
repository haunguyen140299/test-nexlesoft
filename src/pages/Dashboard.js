import HomeImage from "assets/images/home-image.png";
import Footer from "components/Footer";
import Header from "components/Header";

const Dashboard = () => {
	return (
		<>
			<Header />
			<div className="Dashboard">
				<h2 className="Dashboard__heading">Welcome to Demo App</h2>
				<img className="Dashboard__image" src={HomeImage} alt="home" />
			</div>
			<Footer />
		</>
	);
};

export default Dashboard;
