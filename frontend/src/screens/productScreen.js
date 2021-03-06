import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { detailsProduct, saveProductReview } from '../redux/product/products.actions';
import { PRODUCT_REVIEW_SAVE_RESET } from '../redux/product/products.types';
import Rating from '../components/rating';

function ProductScreen(props) {
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const userSignin = useSelector(state => state.userSignin);
	const { userInfo } = userSignin;

	const productDetails = useSelector(state => state.productDetails);
	const { product, loading, error } = productDetails;

	const productReviewSave = useSelector(state => state.productReviewSave);
	const { success: productSaveSuccess } = productReviewSave;

	const dispatch = useDispatch();
	useEffect(()=> {
		if(productSaveSuccess) {
			alert("Review submitted successfully.");
			setRating(0);
			setComment('');
			dispatch({type: PRODUCT_REVIEW_SAVE_RESET})
		}
		dispatch(detailsProduct(props.match.params.id));
		//console.log(props.match.params.id);
		return () => {
			//
		};
	}, [productSaveSuccess]);
	const submitHandler = (e) => {
		e.preventDefault();
		//dispatch actions
		dispatch(saveProductReview(props.match.params.id, {
			name: userInfo.name,
			rating: rating,
			comment: comment
		}));
	}
	const handleAddToCart = () => {
		props.history.push("/cart/" + props.match.params.id + "?qty=" + qty);
	}
	return (
	<div>
		<div className='back-to-result'>
			<Link to='/'>&#60;&#60; Back to result</Link>
		</div>
		{ loading ? ( <div>Loading...</div> ) : 
		error ? ( <div>{error}</div>    
		) : (
		<>		
		<div className='details'>
			<div className='details-image'>
				<img src={product.img} alt='product' />
			</div>
			<div className='details-info'>
				<ul>
					<li><h4>{product.name}</h4></li>					
					<li>
						<a href="#reviews">
							<Rating value={product.rating} text={product.numReview + ' reviews'}/>
						</a>
					</li>
					<li>Price: <b>&#8364;{product.price}</b></li>
					<li>
					Description: 
						<div>{product.description}</div>
					</li>
				</ul>
			</div>
			<div className='details-action'>
				<ul>
					<li>Price: &#8364;{product.price}</li>
					<li>
						Status: {product.countInStock > 0 ? "In stock": "Out of stock"}
					</li>
					<li>Qty: <select value={qty} onChange={(e) => {setQty(e.target.value)}}>
						{[...Array(product.countInStock).keys()].map(x=> 
							<option key={x+1} value={x+1}>{x+1}</option>
						)}
						</select>
					</li>
					<li>
						{product.countInStock> 0 && 
							<button onClick={handleAddToCart} className='button primary'>Add to cart</button>
						}
					</li>
				</ul>
			</div>
		</div>
		<div className='content-margined'>
			<h2>Reviews</h2>
			{!product.reviews.length && <div>There is no review</div>}
			<ul className='review' id="reviews">			
			{product.reviews.map(review => ( 
					<li key={review._id}>
						<div>
						{review.name}
						</div>
						<div>
							<Rating value={review.rating} />
						</div>
						<div>
							{review.createdAt.substring(0,10)}
						</div>
						<div>
							{review.comment}
						</div>
					</li>
				))}
				<li>
					<h3>Write a customer review</h3>
					{userInfo ? ( <form onSubmit={submitHandler}> 
						<ul className='form-container'>
							<li>
								<label htmlFor='rating'>Rating</label>
								<select name="rating" 
										id="rating" value={rating} onChange={(e) => setRating(e.target.value)} >
									<option value="1">1-Poor</option>
									<option value="2">2-Fair</option>
									<option value="3">3-Good</option>
									<option value="4">4-Very Good</option>
									<option value="5">5-Excelent</option>
								</select>
							</li>
							<li>
								<label htmlFor="comment">Comment</label>
								<textarea name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
							</li>
							<li>
								<button type="submit" className="button primary">Submit</button>
							</li>
						</ul>
					</form>
					) : (
					<div>
						Please, <Link to='/signin'>Sign-in</Link> to write review 
					</div> 
					)}
				</li>
			</ul>
		</div>
		</>			
		)}				
	</div>
	);
}
export default ProductScreen;