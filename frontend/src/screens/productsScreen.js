import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { saveProduct, listProducts, deleteProduct } from '../redux/product/products.actions';


function ProductsScreen(props) {
	const [modalVisible, setModalVisible] = useState(false);
	const [id, setId] = useState('');
	const [name, setName] = useState('');
	const [price, setPrice] = useState('');
	const [img, setImg] = useState('');
	const [brand, setBrand] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState('');
	const [description, setDescription] = useState('');
	const [uploading, setUploading] = useState(false);
	
	const productSave = useSelector(state => state.productSave);
	const productDelete = useSelector(state => state.productDelete);
	const productList = useSelector(state => state.productList);
	
	const { loading: loadingSave, success: successSave, error: errorSave } = productSave;
	const { loading: loadingDelete, success: successDelete, error: errorDelete } = productDelete;
	const { loading, products, error } = productList;	
	
	const dispatch = useDispatch();
	useEffect(()=> {
		if(successSave) {
			setModalVisible(false);
		}
		dispatch(listProducts()) 
		return () => {
			//
		};
	}, [successSave, successDelete]);

	const openModal = (product) => {
		setModalVisible(true);
		setId(product._id);
		setName(product.name);
		setPrice(product.price);
		setImg(product.img);
		setBrand(product.brand);
		setCategory(product.category);
		setCountInStock(product.countInStock);
		setDescription(product.description);		
	};

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(saveProduct({ _id:id, name, price, img, brand, category, countInStock, description}));
	};
	const deleteHandler = (product) => {
		dispatch(deleteProduct(product._id))
	};

	const uploadFileHandler = (e) => {
		const file = e.target.files[0];
		const bodyFormData = new FormData();
		bodyFormData.append('image', file);
		setUploading(true);
		axios.post('/api/uploads/s3', bodyFormData, {
			headers: {
				'Content-Type':'multipart/form-data'
			}
		}).then(response => {
			setImg(response.data);
			setUploading(false);
		}).catch(err => {
			console.log(err);
			setUploading(false);
		});
	}

	return (
		<div className="content content-margined">
			<div className="product-header">
				<h3>Products</h3>
				<button className='button primary' onClick={() => openModal({})}>Create Product</button>
			</div>
			{modalVisible && (
			<div className="form">
				<form onSubmit={submitHandler} >
					<ul className="form-container">
						<li>
							<h2>Create Product</h2>
						</li>
						<li>
						</li>
							{loadingSave && <div>Loading</div>}
							{errorSave && <div>{errorSave}</div>}
						<li>
							<label htmlFor='name'>Name</label>
							<input type="text" 
							name="name" id="name" value={name}
							onChange={(e) => setName(e.target.value)}>
							</input>
						</li>
						<li>
							<label htmlFor='price'>Price</label>
							<input type="number" 
							name="price" id="price" value={price}
							onChange={(e) => setPrice(e.target.value)}>
							</input>
						</li>	
						<li>
							<label htmlFor='img'>Image</label>
							<input type="text" 
							name="img" id="img" value={img}
							onChange={(e) => setImg(e.target.value)}>
							</input>
							<input type="file" onChange={uploadFileHandler}></input>
							{uploading && <div>Uploading...</div>} 
						</li>	
						<li>
							<label htmlFor='brand'>Brand</label>
							<input type="text" 
							name="brand" id="brand" value={brand}
							onChange={(e) => setBrand(e.target.value)}>
							</input>
						</li>	
						<li>
							<label htmlFor='category'>Category</label>
							<input type="text" 
							name="category" id="category" value={category}
							onChange={(e) => setCategory(e.target.value)}>
							</input>
						</li>
						<li>
							<label htmlFor='countInStock'>Count in Stock</label>
							<input type="number" 
							name="countInStock" id="countInStock" value={countInStock}
							onChange={(e) => setCountInStock(e.target.value)}>
							</input>
						</li>	
						<li>
							<label htmlFor='name'>Description</label>
							<textarea  name="description" id="description" value={description}
							onChange={(e) => setDescription(e.target.value)}>
							</textarea>
						</li>					
						<li>
							<button type="submit" className="button primary">
								{id ? 'Update' : 'Create'}
							</button>
						</li>
						<li>
							<button type="button" onClick={() => setModalVisible(false)} className="button secondary">Back</button>
						</li>				
					</ul>
				</form>
			</div>
			)}			
			<div className='product-list'>
				<table className='table'>
					<thead>
						<tr>
							<th>ID</th>
							<th>Name</th>
							<th>Category</th>
							<th>Brand</th>
							<th>Price</th>
							<th>Count in Stock</th>
							<th>Action</th>					
						</tr>
					</thead>
					<tbody>
						{products.map((product) => ( 
						<tr key={product._id}>
							<td>{product._id}</td>
							<td>{product.name}</td>							
							<td>{product.category}</td>
							<td>{product.brand}</td>
							<td>{product.price}</td>
							<td>{product.countInStock}</td>
							<td>
								<button className='button' onClick={() => openModal(product)}>Edit</button>{' '}
								<button className='button' onClick={() => deleteHandler(product)}>Delete</button>
							</td>					
						</tr> 
						))}				
					</tbody>
				</table>
			</div> 
		</div> 
	);	
}
export default ProductsScreen;