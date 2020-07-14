import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrder } from '../redux/order/order.actions';
import CheckoutSteps from '../components/checkoutSteps';

function PlaceOrderScreen(props) {
	const cart = useSelector(state => state.cart);
	const { cartItems, shipping, payment } = cart;
	console.log(cart);
	
	const orderCreate = useSelector(state => state.orderCreate);
	const { loading, success, error, order } = orderCreate;

	if(!shipping.address) {
		props.history.push("/shipping");
	} else if(!payment.paymentMethod) {
		props.history.push("/payment");
	}

	const itemsPrice = cartItems.reduce((a,c) => a + c.price * c.qty, 0);
	const shippingPrice = itemsPrice > 100 ? 0 : 10;
	const taxPrice = 0.15 * itemsPrice;
	const totalPrice = itemsPrice + shippingPrice + taxPrice;

	const dispatch = useDispatch();
	
	const placeOrderHandler = () => {
		//create an order
		dispatch(createOrder({
			orderItems: cartItems, shipping, payment, itemsPrice, 
			shippingPrice, taxPrice, totalPrice
		}));
	}

	useEffect(() => {
		if(success) {
			props.history.push("/order/" + order._id);
		}
	}, [success]);
	
	const checkoutHandler = () => {
		props.history.push("/signin?redirect=shipping");
	}
	return ( 
	<div>
		<CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
		<div className="placeorder">
			<div className="placeorder-info">
				<div>
					<h3>Shipping</h3>				
					<div>
						{cart.shipping.address}, {cart.shipping.city},
						{cart.shipping.postalCode}, {cart.shipping.country}
					</div> 
				</div>
				<div>
					<h3>Payment</h3>
					<div>
						Payment Method: {cart.payment.paymentMethod}
					</div>
				</div>
				<div>
					<ul className="cart-list-container">
						<li>
							<h3>Shoping Cart</h3>
							<div>Price</div>
						</li>
						{
							cartItems.length === 0 ?
							<div>Cart is empty.</div> :
							cartItems.map(item => 
							<li>
								<div className="cart-image">
									<img src={item.img} alt="product" />
								</div>
								<div className="cart-name">
									<div>
										<Link to={"/product/" + item.product}> 
											{item.name}
										</Link>							
									</div>
									<div>
										Qty: {item.qty}															
									</div>
								</div>
								<div className="cart-price">&#8364;{item.price}</div>						
							</li>
							)
						}
					</ul>
				</div>				
			</div>
			<div className="placeorder-action">
				<ul>
					<li>
						<button className='button primary full-width' onClick={placeOrderHandler}>Place Order</button>
					</li>
					<li>
						<h3>Order Sumarry</h3>
					</li>
					<li>
						<div>Items</div>
						<div>&#8364;{itemsPrice}</div>
					</li>
					<li>
						<div>Shipping</div>
						<div>&#8364;{shippingPrice}</div>
					</li>
					<li>
						<div>Tax</div>
						<div>&#8364;{taxPrice}</div>
					</li>
					<li>
						<div>Order Total</div>
						<div>&#8364;{totalPrice}</div>
					</li>
				</ul>
				
			</div>
		</div>
	</div>
	)
};

export default PlaceOrderScreen;