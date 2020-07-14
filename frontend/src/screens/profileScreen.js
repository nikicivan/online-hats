import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { logout, update } from '../redux/user/user.actions';
import { useDispatch, useSelector } from 'react-redux';
import { listMyOrders } from '../redux/order/order.actions';

function ProfileScreen(props) {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const dispatch = useDispatch();

	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;
	//console.log(userSignin);
	
	const handleLogout = () => {
		dispatch(logout());
		props.history.push('/signin');
	}
	
	const submitHandler = (e) => {
		e.preventDefault();
		//console.log(userInfo);
		dispatch(update({userId: userInfo._id, email, name, password}));
	}

	const userUpdate = useSelector(state => state.userUpdate);
	const { loading, success, error } = userUpdate;

	const myOrderList = useSelector(state => state.myOrderList);
	const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

	useEffect(() => {
		if(userInfo) {
			setEmail(userInfo.email);
			setName(userInfo.name);
			setPassword(userInfo.password);
			//console.log(userInfo);
		}
		dispatch(listMyOrders());
		return () => {
			
		};
	}, [userInfo]);
	
	return ( 
	<div className='profile'>
		<div className='profile-info'>
			<div className="form">
				<form onSubmit={submitHandler} >
					<ul className="form-container">
						<li>
							<h2>User Profile</h2>
						</li>
						<li>
							{loading && <div>Loading</div>}
							{error && <div>{error}</div>}
							{success && <div>Profile Saved Successfuly</div>}
						</li>					
						<li>
							<label htmlFor='name'>Name</label>
							<input type="name" 
							name="name" id="name" value={name}
							onChange={(e) => setName(e.target.value)}>
							</input>
						</li>
						<li>
							<label htmlFor='email'>Email</label>
							<input type="email" 
							name="email" id="email" value={email}
							onChange={(e) => setEmail(e.target.value)}>
							</input>
						</li>
						<li>
							<label htmlFor='password'>Password</label>
							<input type="password" 
							name="password" id="password" value={password}
							onChange={(e) => setPassword(e.target.value)}>
							</input>
						</li>						
						<li>
							<button type="submit" className="button primary">Update</button>
						</li>
						<li>							
							<button type="button" onClick={handleLogout} className='button secondary full-width'>Logout</button>	
						</li>
					</ul>
				</form>
			</div>
		</div>
		<div className='profile-orders content-margined'>
		{
			loadingOrders ? <div>Loading...</div> : 
			errorOrders ? <div>{errorOrders}</div> :
			<table className='table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>DATE</th>
						<th>TOTAL</th>
						<th>PAID</th>
						<th>ACTION</th>
					</tr>
				</thead>
				<tbody>
					{orders.map(order => <tr key={order._id}>
						<td>{order._id}</td>
						<td>{order.createdAt}</td>
						<td>{order.totalPrice}</td>
						<td>{order.isPaid.toString()}</td>
						<td>
							<Link to={'/order/' + order._id}>DETAILS</Link>
						</td>
					</tr>)}
				</tbody>
			</table>
		}
		</div>
	</div> )
}

export default ProfileScreen;