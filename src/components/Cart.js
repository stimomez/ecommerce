import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { checkoutThunk, deleteCartThunk } from '../redux/actions';
import '../styles/cart.css'
import CardCart from './CardCart';

const Cart = ({isOpen}) => {
    const cart = useSelector(state => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    
    
    return (
        <div className={` cart-modal ${isOpen ? 'open' : ''}`}>
            <h3>Shopping cart</h3>
            
            {
                cart.cart?.products.map(carProduct => (
                <li key={carProduct.id}>
                    <CardCart carProduct ={carProduct} navigate ={navigate} dispatch={dispatch} deleteCartThunk={deleteCartThunk}/>
                </li>
                ))
            }
            
            <button onClick={() => dispatch(checkoutThunk())} >
                Checkout</button>
            
        </div>
    );
};

export default Cart;