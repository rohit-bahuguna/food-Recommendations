import React from 'react';
import { Link } from 'react-router-dom';
const GetRecipe = ({ recipe }) => {
	
	console.log(recipe.strYoutube);
	return (
		<>
			<h2 className="recipe-title">
				{recipe.strMeal}
			</h2>
			<p className="recipe-category">
				{recipe.strCategory}
			</p>
			<div className="recipe-instruct">
				<h3>Instructions:</h3>
				<p>
					{recipe.strInstructions}
				</p>
			</div>
			<div className="recipe-meal-img">
				<img src={recipe.strMealThumb} alt="" />
			</div>
			 <div class = "recipe-link">
            <Link   to={recipe.strYoutube}>Watch Video</Link>
        </div>
			
		</>
	);
};

export default GetRecipe;
