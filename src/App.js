//import logo from './logo.svg';
import { useSelector } from 'react-redux';
import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import { NavBar, LoandingScreen } from './components';
import Footer from './components/Footer';
import { Home, ProductsDetail, ProtectedRoutes, Purchases } from './pages'

function App() {

  const isLoading = useSelector(state => state.isLoading)
  return (
    <div className="App">
      <HashRouter>
       
        { isLoading && <LoandingScreen/>}
        <NavBar/> 
        
        <Routes>

          <Route path="/" element={<Home/>}/>
          <Route path="/products/:id" element={<ProductsDetail/>}/>
          <Route element={<ProtectedRoutes/>}>
            <Route path={'/purchases'} element={<Purchases/>}/>
          </Route>
         
        </Routes>
        
      </HashRouter>
      <Footer/>
    </div>
  );
}

export default App;
