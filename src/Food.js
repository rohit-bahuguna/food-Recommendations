import axios from 'axios';
import { useEffect, useInsertionEffect, useState } from 'react';
import ShowMeals from './ShowMeals';
import GetRecipe from './GetRecipe';
import './App.css';
import { Link } from 'react-router-dom';

const Food = () => {
	const [data, setData] = useState({ value: '', searchBy: '' });
	const [meals, setMeals] = useState([]);
	const [recipe, setRecipe] = useState({});
	const [showModal, setShowModal] = useState(false);
	const [list, setList] = useState([]);

	const getMeals = async () => {
		console.log(data.value);
		if (data.value !== undefined && data.value !== null && data.value !== '') {
			if (data.searchBy === 'ingredient') {
				const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${data.value}`;

				const result = await axios.get(url);
				console.log(data);
				console.log(result.data.meals);
				setMeals([...result.data.meals]);
			} else if (data.searchBy === 'categorie') {
				const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${data.value}`;
				const result = await axios.get(url);
				console.log(result.data.meals);
				setMeals([...result.data.meals]);
			} else if (data.searchBy === 'name') {
				const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${data.value}`;
				const result = await axios.get(url);
				console.log(result.data.meals);
				setMeals([...result.data.meals]);
			} else {
				const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${data.value}`;
				const result = await axios.get(url);
				console.log(result.data.meals);
				setMeals([...result.data.meals]);
			}
		} else {
			alert(`please enter an ${data.searchBy}`);
		}
	};

	const getRecipe = async id => {
		const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
		if (id !== undefined) {
			const result = await axios.get(url);

			setRecipe({ ...result.data.meals[0] });
			setShowModal(!showModal);
		}
	};

	const getList = async () => {
		if (data.searchBy === 'categorie') {
			const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

			const result = await axios.get(url);

			setList([
				{ strCategory: `Select ${data.searchBy}` },
				...result.data.meals
			]);
		} else if (data.searchBy === 'area') {
			const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';

			const result = await axios.get(url);
			console.log(result.data.meals);
			setList([{ strArea: `Select ${data.searchBy}` }, ...result.data.meals]);
		}
	};

	// else if (data.searchBy === 'ingredient') {
	// 			const url = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

	// 			const result = await axios.get(url);
	// 			console.log(result);
	// 			setList([{ strCategory: data.searchBy }, ...result.data.meals]);
	// 		}

	useEffect(
		() => {
			getList();
			setData({ ...data, value: '' });
			setMeals([]);
		},
		[data.searchBy]
	);

	console.log(data);
	return (
		<div className="container">
			<div className="meal-wrapper">
				<div className="meal-search">
					<h2 className="title">Let me suggests you a Meals</h2>
					<blockquote>
						Real food doesn't have ingredients, real food is ingredients.<br />
						<cite>- Rohit Bahuguna</cite>
					</blockquote>
					<div className="option-control">
						<label htmlFor="searchby"> Search Meals By :-</label>

						<label>Name</label>
						<input
							type="radio"
							name="searchby"
							value="name"
							onClick={e => setData({ ...data, searchBy: e.target.value })}
						/>

						<label>Ingredient</label>
						<input
							type="radio"
							name="searchby"
							value="ingredient"
							onClick={e => setData({ ...data, searchBy: e.target.value })}
						/>

						<label>Categorie</label>
						<input
							type="radio"
							name="searchby"
							value="categorie"
							onClick={e => setData({ ...data, searchBy: e.target.value })}
						/>

						<label>Area</label>
						<input
							type="radio"
							name="searchby"
							value="area"
							onClick={e => setData({ ...data, searchBy: e.target.value })}
						/>
					</div>
					<div className="meal-search-box">
						<input
							type="text"
							className="search-control"
							placeholder={
								data.searchBy !== ''
									? `${data.searchBy} will come here`
									: 'select an option from above to enable search Box '
							}
							onChange={e => setData({ ...data, value: e.target.value })}
							value={data.value}
							disabled={data.searchBy === '' ? true : false}
						/>

						{data.searchBy === 'categorie' || data.searchBy === 'area'
							? <select
									onChange={e => {
										setData({ ...data, value: e.target.value });
									}}>
									{list &&
										list.map(listItem => {
											return (
												<option
													key={
														data.searchBy === 'categorie'
															? listItem.strCategory
															: listItem.strArea
													}>
													{data.searchBy === 'categorie'
														? listItem.strCategory
														: listItem.strArea}
												</option>
											);
										})}
								</select>
							: ''}
						<button
							type="submit"
							className="search-btn btn"
							onClick={() => getMeals()}
							disabled={data.searchBy === '' ? true : false}>
							<i className="fas fa-search" />
						</button>
					</div>
				</div>
				{/* {data.searchBy === ''
					? <p>PLease Select an option to search By to enable search Box</p>
					: ''} */}
				<div className="meal-result">
					<h2 className="title">Your Search Results:</h2>
					<div id="meal">
						{meals &&
							meals.map(meal => {
								return (
									<ShowMeals
										meal={meal}
										key={meal.idMeal}
										getRecipe={getRecipe}
									/>
								);
							})}
					</div>
				</div>

				{showModal &&
					<div className="meal-details showRecipe">
						<button
							type="button"
							className="btn recipe-close-btn"
							onClick={() => setShowModal(!showModal)}>
							<i className="fas fa-times" />
						</button>

						<div className="meal-details-content">
							<GetRecipe recipe={recipe} />
						</div>
					</div>}
			</div>
			<footer>
				<p>@ | 2022 | Rohit Bahuguna</p>

				<div className="horizontal">
					<Link to="https://twitter.com/rohitba96862397">
						<i className="footer_icon fab fa-2x fa-twitter" />
					</Link>
					<Link to="https://www.linkedin.com/in/rohit--bahuguna/">
						<i className="footer_icon fab fa-2x fa-linkedin" />
					</Link>
					<Link to="https://github.com/rohit-bahuguna/">
						<i className="footer_icon fab fa-2x fa-github" />
					</Link>
					<Link to="https://rohit-bahuguna.netlify.app/">
						<i className="fa fa-2x fa-home" aria-hidden="true" />
					</Link>
				</div>
			</footer>
		</div>
	);
};

export default Food;
