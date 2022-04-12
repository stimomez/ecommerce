import React, { useEffect, useState } from 'react';
import { Link  } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { filterCategoriesThunk, getCategoriesThunk, getNewsThunk, filterSearchThunk } from '../redux/actions';
import '../styles/home.css'
const Home = () => {
    const dispatch = useDispatch()

    const [ search,  setSearch ] = useState();

    const products = useSelector(state => state.news)
    const categories = useSelector(state => state.categories)

    useEffect(()=>{
        dispatch(getNewsThunk());
        dispatch(getCategoriesThunk());
      
    },[  dispatch ])

    const searchProducts = e => {
        e.preventDefault();
        dispatch(filterSearchThunk(search))
    }

    return (
        <div className='container-home'>
           <h1>HOME</h1>

           
            <div  className='categories-products'>
                    <h3>Category</h3>
                    <ul>
                    {
                        categories.categories?.map(category => (
                            <li key={category.id}>
                            <button
                                onClick={() => dispatch(filterCategoriesThunk(category.id))}
                            >
                            {category.name}
                            

                            </button>
                            
                            </li>
                        ))
                        }
                        </ul>
            </div>
                    <div className='search-products'>
                            <form onSubmit={searchProducts}>
                                <input 
                                type="text"
                                placeholder='What are you looking for'
                                onChange={e => setSearch(e.target.value)} />
                                <button>Search</button>
                            </form>

                         <ul className='product-card'>
                        

                        
                            {
                                products.products?.length === 0 ? (
                                    <li>No search results found</li>
                                ) : (
                                products.products?.map(product => (
                                    <li key={product.id}>
                                        <Link to={`/products/${product.id}`}> 
                                        <img src={product.productImgs[0]} alt="" />
                                        <div className="info">
                                            <strong>{product.title}</strong> 
                                                <br />
                                                <p>Price</p>
                                                <strong>$ {product.price}</strong>
                                        </div>
                                        
                                        </Link>
                                       
                                    </li>
                                ))
                                )
                            }

                    
                         </ul>
                    </div>
        </div>
    );
};

export default Home;