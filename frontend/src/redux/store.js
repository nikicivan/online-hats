import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; 
import Cookie from 'js-cookie';
import { 
	productListReducer, 
	productDetailsReducer, 
	productSaveReducer, 
	productDeleteReducer,
	productReviewSaveReducer 
} from './product/productReducers';
import { cartReducer } from './cart/cart.reducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './user/user.reducers';
import { 
	orderCreateReducer, 
	orderDetailsReducer, 
	orderPayReducer, 
	myOrderListReducer, 
	orderListReducer,
	orderDeleteReducer 
} from './order/order.reducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {cart: {cartItems, shipping: {}, payment: {}}, userSignin: {userInfo}};

const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: cartReducer,
	userSignin: userSigninReducer,
	userRegister: userRegisterReducer,
	productSave: productSaveReducer,
	productDelete: productDeleteReducer,
	orderCreate: orderCreateReducer,
	userUpdate: userUpdateReducer,
	orderDetails: orderDetailsReducer,
	orderPay: orderPayReducer,
	myOrderList: myOrderListReducer,
	orderList: orderListReducer,
	orderDelete: orderDeleteReducer,
	productReviewSave: productReviewSaveReducer
})

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;