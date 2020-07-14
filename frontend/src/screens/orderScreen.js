import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { createOrder, detailsOrder, payOrder } from '../redux/order/order.actions';
import PaypalButton from '../components/paypalButton';

function OrderScreen(props) {

	const orderPay = useSelector(state => state.orderPay);
	const { loading: loadingPay, success: successPay, error: errorPay } = orderPay;

	const dispatch = useDispatch();
	useEffect(() => {
		if(successPay) {
			props.history.push("/profile")
		} else {
			dispatch(detailsOrder(props.match.params.id));
		}		
		return () => {
		
		};
	}, [successPay]);

	const handleSuccessPayment = (paymentResult) => {
		dispatch(payOrder(order, paymentResult));
	}
	
	const orderDetails = useSelector(state=> state.orderDetails);
	const { loading, order, error } = orderDetails;

	const payHandler = () => {};

	return loading ? <div>Loading...</div> : error ? <div>{error}</div> : ( 
	<div>		
		<div className="placeorder">
			<div className="placeorder-info">
				<div>
					<h3>Shipping</h3>				
					<div>
						{order.shipping.address}, {order.shipping.city},
						{order.shipping.postalCode}, {order.shipping.country}
					</div> 
					<div>
						{order.isDelivered ? "Delivered at " + order.deliveredAt : 'Not delivered'}
					</div>
				</div>
				<div>
					<h3>Payment</h3>
					<div>
						Payment Method: {order.payment.paymentMethod}
					</div>
					<div>
						{order.isPaid ? "Paid at " + order.paidAt : 'Not paid'}
					</div>
				</div>
				<div>
					<ul className="cart-list-container">
						<li>
							<h3>Shoping Cart</h3>
							<div>Price</div>
						</li>
						{
							order.orderItems.length === 0 ?
							<div>Cart is empty.</div> :
							order.orderItems.map(item => 
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
					<li className='placeorder-actions-payment'>
					{ !order.isPaid && <PaypalButton amount={order.totalPrice} onSuccess={handleSuccessPayment} /> }
					</li>
					<li>
						<h3>Order Sumarry</h3>
					</li>
					<li>
						<div>Items</div>
						<div>&#8364;{order.itemsPrice}</div>
					</li>
					<li>
						<div>Shipping</div>
						<div>&#8364;{order.shippingPrice}</div>
					</li>
					<li>
						<div>Tax</div>
						<div>&#8364;{order.taxPrice}</div>
					</li>
					<li>
						<div>Order Total</div>
						<div>&#8364;{order.totalPrice}</div>
					</li>
				</ul>
				
			</div>
		</div>
	</div>
	)
};

export default OrderScreen;