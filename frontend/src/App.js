import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';

import HomeScreen from './screens/homeScreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/cartScreen';
import SigninScreen from './screens/signinScreen';
import RegisterScreen from './screens/registerScreen';
import ProductsScreen from './screens/productsScreen';
import ShippingScreen from './screens/shippingScreen';
import PaymentScreen from './screens/paymentScreen';
import PlaceOrderScreen from './screens/placeOrderScreen';
import ProfileScreen from './screens/profileScreen';
import OrderScreen from './screens/orderScreen';
import OrdersScreen from './screens/ordersScreen';

function App() {
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  }
  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            <button onClick={openMenu}>
              &#9776;
            </button> 
            <Link to="/" >Dada Laris</Link>      
          </div>  
          <div className="header-links">
            <a href="cart.html">Cart</a>
            {
              userInfo ? <Link to='/profile'>{userInfo.name}</Link>:
              <Link to="/signin">Sign In</Link> 
            }  
            {userInfo && userInfo.isAdmin && (
              <div className='dropdown'>
                <a href='#'>Admin</a>
                  <ul className='dropdown-content'>
                    <li>
                      <Link to='/orders'>Order</Link>
                      <Link to='/products'>Products</Link>
                    </li>
                  </ul>
              </div>
            )}          
          </div>
        </header>
        <aside className="sidebar">
          <h3>Shopping Categories</h3>
          <button className="sidebar-close-button" onClick={closeMenu}>x</button>
          <ul className='categories'>
            <li>
              <Link to={"/category/summer"}>Summer collection</Link>
            </li>
            <li>
              <Link to={"/category/winter"}>Winter collection</Link>
            </li>
          </ul>          
        </aside>  
        <main className="main">
          <div className="content">
            <Route path='/orders' component={OrdersScreen} />
            <Route path='/shipping' component={ShippingScreen} />
            <Route path='/payment' component={PaymentScreen} />
            <Route path='/placeorder' component={PlaceOrderScreen} />
            <Route path='/order/:id' component={OrderScreen} />
            <Route path='/products' component={ProductsScreen} />
            <Route path='/register' component={RegisterScreen} />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/category/:id' component={HomeScreen} />
            <Route exact path='/' component={HomeScreen} />            
          </div>
        </main>
        <footer className="footer">
          All right reserved
        </footer>   
      </div>
    </BrowserRouter>
  );
}

export default App;
