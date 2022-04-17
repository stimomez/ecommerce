import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addCartThunk, getNewsThunk } from '../redux/actions';
import { Link  } from 'react-router-dom';
import '../styles/products-detail.css'

const ProductsDetail = () => {
    const dispatch = useDispatch();

    const { id } = useParams();

    const products = useSelector(state => state.news);
    
    const [ productsFiltered, setProductsFiltered ] = useState([]);
    //para controlar la cantidad del carrito
    const [ units, setUnits ] = useState(1);

    
    useEffect(()=>{
        dispatch(getNewsThunk())
        },[dispatch]);

        
         const productsFound = products?.products?.find(productsItem => productsItem.id === Number(id))
            

    useEffect(() => {
        if (productsFound) {
            axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${productsFound?.category.id}`)
            .then(res => setProductsFiltered(res.data.data))    
        }
        
    },[dispatch, productsFound])

    const addCart = () => {
        const productsToCart= {  
            id: Number(id), 
            quantity: Number(units)}
         
        dispatch(addCartThunk(productsToCart))
        setUnits(1)
        
    }
        const arrayImages = productsFound?.productImgs;
        console.log(productsFound)
        const productImgs = []
        
        for (let i = 0; i < arrayImages?.length; i++) {
            productImgs.push({
                id:i,
                photo: arrayImages[i]
            })
            
        }
        
          

          const [position, setPosition] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      if(position === arrayImages.length){
        setPosition(1)
      } else {
        setPosition(position + 1)
      }
    }, 4000)
    return () => clearInterval(interval)
  }, [position, arrayImages])

  const width = {
    width: productImgs.length * 100 + '%',
    transform: `translateX(-${(position-1)*100/productImgs.length}%)`
  }
  


          
        

        
    return (
        <div className='container'>
           




            
            <div className="container-carrucel">
        <div className="flex" style={width}>
          {productImgs.map(image => (
            <ProductImages image={image} key={image.id}/>
          ))}
        </div>
        <div className="buttons">
          {productImgs.map(user => {
            const id = user.id
            return(
              <button 
              key={id}
              className= {id===position?"button active" : "button"}
              onClick={() => setPosition(user.id)}/>
            )
          })}
        </div>
      </div>
      
            <div className="description">
                         <h2>{productsFound?.title}</h2>
                         <p>{productsFound?.description}</p>
                        <label htmlFor="units">Units</label>
                        <br />
                        <input 
                            type="number" 
                            id='units'
                            value={units}
                            onChange={e => setUnits(e.target.value)}
                            />
                        
                   
                    
                     <p className='price-description'>Price</p>
                    <h3>$ {productsFound?.price}</h3 >
                    <button onClick={addCart}>Add to cart</button>
            </div>
            <div className="related-products">
                <p className='subtitle'>Discover similar items</p>
            <ul>
                {
                   
                    productsFiltered.products?.map(productsItem => (
                        <li key={productsItem.id}>
                            
                                <img  className="over-related-products"  src={productsItem.productImgs[0]}alt=""/>
                                <img src={productsItem.productImgs[1]} alt="" />
                                <div className='title-related-products'>
                            <Link to={`/products/${productsItem.id}`}> <p>{productsItem.title} </p></Link>
                            <br />
                            <p className='price'>Price</p>
                            <p>$ {productsItem.price}</p>
                         </div>
                         
                        </li>
                    ))
                }
            </ul>
            </div> 
        </div>
    );
};
const ProductImages = ({image}) => {
    return(
      <div className="quote">
        <img src={image.photo} alt="user"/>
        <h3>{image.name}</h3>
        
      </div>
    )
  }
export default ProductsDetail;