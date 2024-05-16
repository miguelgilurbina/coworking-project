import "../Styles/Home.css";
import Explorer from "../Components/Explorer";
import Recommend from "../Components/Recommend";
import Category from "../Components/Category";
const Home = () => {
  return (
    <div className="home">
      {/* <div class="background-image"></div> */}
      <Explorer />
      <Category/>
      <Recommend />
    </div>
  );
};

export default Home;
