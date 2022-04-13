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
      console.log(productsFound)
        const arrayImages = productsFound?.productImgs;
    return (
        <div className='container'>
            <div  className="container-carrucel">
            
            <ul className="slider" >
                <button>I</button>
                {arrayImages?.map(img => (
                    <div key={img}>
                        
                       <li><img src={img} alt=""/></li>

                        
                        
                    </div>
                    ))}
                    <button>D</button>
                    </ul>
                 <div className="menu" >
                 {arrayImages?.map(img => (
                    <ul key={img}>
                    
                       <li >
                      <img src={img} alt=""/>
                       </li>
                    
                    
                    </ul>
                    ))}
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

export default ProductsDetail;