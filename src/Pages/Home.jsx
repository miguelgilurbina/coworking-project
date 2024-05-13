import Header from "../Components/Header"
import Footer from "../Components/footer"
import '../Styles/Home.css'
import Explorer from '../Components/Explorer'
import Recommend from '../Components/Recommend'
const Home = () => {
  return (
    <div>
      <Header/>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <a href= "./Detail.jsx">Detail</a>
      <Footer/>
    </div>
    <div className="home">
      <Explorer/>
      <Recommend/>

    </div>
  )
}

export default Home