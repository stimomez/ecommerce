
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate  } from 'react-router-dom';

import { Cart } from '.';

import { getCartThunk, getPurchasesThunk, loginThunk } from '../redux/actions';
import '../styles/navbar.css'

const NavBar = () => {

    const [ isLoginOpen, setIsLoginOpen ] = useState(false);
    const [ isCartOpen, setIsCartOpen ] = useState(false)
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ loginError, setLoginError ] = useState("");
    
    const dispatch = useDispatch();
   

    const openCart = () => {
        setIsCartOpen(!isCartOpen);
        dispatch(getCartThunk());
    }

    const login = e => {
        e.preventDefault();
        const credentials = { email, password }
        dispatch(loginThunk(credentials))
       .then(res => {
         localStorage.setItem("token", res.data.data.token)
         setLoginError("");
         setIsLoginOpen(false);
         setEmail('');
         setPassword('');
        })
    .catch(er => setLoginError(er.response.data.message))
    
 //console.log(localStorage.getItem("token"))
    }
    return (
        <div className='navbar'>
            <div  className='header'>
            <nav>
                
                
                <Link to={"/#/"}>
                <strong  >
                 
                    e-commerce
                   
                    </strong>
                    </Link>
                    
                
               
                
                    <div className="header-buttons-login">
                  <button onClick={()=>setIsLoginOpen(!isLoginOpen)}>
                  <i className="fa-solid fa-right-to-bracket"></i>
                    </button>
                    </div>
                    <div className="header-buttons-cart">
                    <button onClick={()=> openCart() }>
                    <i className="fas fa-shopping-cart"></i>
                    
                    </button>
                    </div>
                  <Link to={"/purchases"}> 
                   <div className="header-buttons-purchases">
                    <button 
                        onClick={() => dispatch(getPurchasesThunk())}
                        disabled={!localStorage.getItem("token")}
                        >
                       <i className="fas fa-money-check"></i>
                        </button>
                        </div>
                  </Link>
                
            </nav>
            </div>
            
               
                    <form onSubmit={login} className={`form-login ${isLoginOpen ? 'open' : ''}`}>

                    {
                        localStorage.getItem("token") ? (
                            <>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBMLgeAVCyTvVd96An7ec4XKwiJs7uULpDVNUPksggWmY3sBuLcEK0kgwcuMJ84_gs4Kk&usqp=CAU" alt="" />
                            <br />
                             <button onClick={() => {
                                 localStorage.setItem("token", "")
                                 setIsLoginOpen(false);
                                 }} type="button">
                                 Log out

                             </button>
                             </>
                             ) : (
                            <>
                                <input
                                    type="email"
                                    placeholder='Email'
                                    value={email}
                                    onChange={e =>setEmail(e.target.value)}
                                />
                                <input
                                    type="password" 
                                    placeholder='Password'
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    
                                />
                                <p>{loginError}</p>
                                <button>Submit</button>
                                
                           </>
                        )
                    }


                    </form>
                
                    <Cart isOpen={isCartOpen}/>
                    
        </div>
    );
};

export default NavBar;