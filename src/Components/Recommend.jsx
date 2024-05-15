import { Link } from 'react-router-dom';
import  '../Styles/Recommend.css'
import image1 from '../../public/images/img_aleatory_1.png';
import image2 from '../../public/images/img_aleatory_2.png';
import image3 from '../../public/images/img_aleatory_3.png';
import image4 from '../../public/images/img_aleatory_4.png';
import image from '../../public/images/img_aleatory.png';


const Recommend = () => {

  const imagery = [
    image1,image2, image3, image4
  ];

  return (
    <div className='containerDetail' >               
                               
        <div className='cardDetail'>
            <h1> home office</h1>
            <div className='buttonDetail'>
            <button>⬅️ Back</button>
        </div>
        <div className='containerImg'>

          <img src={image} alt="" className='imgHero' />

          <div className='gridDetail'>              
                {imagery.map((image, index) => (
                <img key={index} src={image} alt={`Image of room`} style={{ width: '400px', height: '400px', borderRadius:20 }} />
                ))}
          </div>
        </div>
            

           <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad, provident est quos accusamus similique iusto repudiandae tempore magni hic dolor beatae adipisci possimus molestias sint dolorum maxime voluptatibus. Cupiditate architecto nemo voluptates illum blanditiis, neque mollitia laboriosam sequi perspiciatis quasi! Maxime nostrum inventore similique veritatis repellendus animi, magnam rem blanditiis explicabo ea quos veniam esse tenetur officiis nisi distinctio dolore, ullam aut vero. Veritatis libero architecto ab, tenetur asperiores alias. Harum veritatis aliquam praesentium sint nemo, sequi velit doloremque numquam! Laboriosam, quod obcaecati ad esse repellat facilis error, voluptatem eveniet veniam, pariatur minus sint! Nam, facilis? Placeat, deserunt perspiciatis corporis neque aliquid dolorem sint dicta fugiat vel aspernatur in ipsum voluptatum culpa, earum nam illo fuga reprehenderit non qui consectetur, et asperiores mollitia aperiam! Natus reiciendis incidunt error, nihil cum expedita in cumque. Maxime, et dolor. Optio delectus odio enim inventore consectetur, corporis dolore illum, tempore doloremque incidunt sed ad possimus consequatur debitis maxime sit aperiam ratione quibusdam quidem ducimus? Consectetur eum, quibusdam, minus atque asperiores rem obcaecati ea distinctio dignissimos, vel ipsa totam. Fuga magni ullam neque, consectetur reiciendis ad, quos pariatur blanditiis deserunt alias ut necessitatibus amet, molestiae sed. Aliquam esse molestiae itaque fugit maxime facere eos velit necessitatibus. Deleniti praesentium illo doloremque quod assumenda exercitationem sapiente consequatur veniam labore sint, in enim laudantium fugiat at optio temporibus explicabo reiciendis sed asperiores animi eum! Quo, cumque consectetur quaerat ipsam molestiae tempore eum id voluptatibus deserunt explicabo. Natus, nesciunt. Eaque consequuntur ducimus officia modi vitae porro nihil libero blanditiis totam, expedita at dolores provident obcaecati sint repudiandae nisi quisquam voluptates iure praesentium unde consectetur sunt? Unde, impedit iste. Id cum numquam voluptatum maiores ab veniam. Quia laborum sed ratione quasi odit corporis nulla nihil omnis, voluptate aspernatur quibusdam in earum voluptatum incidunt temporibus odio, dolor ex sunt saepe minus obcaecati quisquam libero labore similique. Nobis eaque eum quae a, vero architecto alias voluptatem repellendus praesentium tenetur laudantium aspernatur. Minima, expedita? Quo, pariatur tenetur? Ab dolore ipsum fugiat inventore rem neque reiciendis est praesentium ducimus, officiis iste illum placeat dolorem odio voluptates quis facilis nihil veniam mollitia temporibus non quia  veniam vel.</p>            
        </div>          
    </div>
    );
  
  
}

export default Recommend