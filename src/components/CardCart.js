import React from 'react';

const CardCart = ({carProduct, navigate, dispatch, deleteCartThunk}) => {
    console.log(carProduct)
    const total = carProduct.price * carProduct.productsInCart.quantity ;
    return (
        <div className='card-cart'>
                    <strong  onClick={ ()=> navigate(`/products/${carProduct.id}`)}>
                                <p>{carProduct.brand}</p>
                                <span>
                                    <button onClick={() => dispatch(deleteCartThunk(carProduct.id))} >
                                    <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                    </span>
                                   <h2> {carProduct.title} </h2>
                                </strong>
                   <p>{carProduct.productsInCart.quantity}</p>
                   <span>Total:   <strong> $ {total}</strong></span>
                    
                    
            
        </div>
    );
};

export default CardCart;