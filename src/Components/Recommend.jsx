// import axios from "axios"
import { useEffect , useState } from "react"
import data from "../Data/recommendData.json"
import Card from "./Card.jsx"
import "../Styles/Recommend.css"
const Recommend = () => {

  const [recommendData, setRecommendData] = useState([]);

  useEffect (() => {
    setRecommendData(data.data);
  },[])


  return (
    <div className="recommend">
      {recommendData.map((item)=> 
      <Card data= {item} key= {item.id} />)}
    </div>
  )
}

export default Recommend