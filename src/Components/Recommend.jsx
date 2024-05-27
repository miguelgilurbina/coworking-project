import { useEffect , useState } from "react"
import data from "../Data/recommendData.json"
import Card from "./Card.jsx"
import "../Styles/Recommend.css"
const Recommend = () => {

  const [recommendData, setRecommendData] = useState([]);

  useEffect (() => {

    const dataArray = Object.values(data.data);


    const shuffledData = shuffleArray(dataArray);


    setRecommendData(shuffledData);
  },[])

  const shuffleArray = (array) => {
    const shuffledArray = [... array];
    for (let i = shuffledArray.length -1 ; i > 0 ; i--) {
      const j = Math.floor(Math.random()* (i+1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j],shuffledArray[i]];
      
    }
    return shuffledArray;
  }


  return (
    <div className="recommend">
      {recommendData.map((item)=> 
      <Card data= {item} key= {item.id} />)}
    </div>
  )
}

export default Recommend