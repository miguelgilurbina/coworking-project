import "../Styles/Home.css";
import Explorer from "../Components/Explorer";
import Recommend from "../Components/Recommend";
const Home = () => {
  return (
    <div className="home">
      {/* <div class="background-image"></div> */}

      <Explorer />
      <Recommend />
    </div>
  );
};

export default Home;
