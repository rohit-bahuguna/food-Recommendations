

const ShowMeals = ({ meal , getRecipe }) => {
	
	return (
		<>
			<div className="meal-item"  >
			<div className="meal-img">
				<img src={meal.strMealThumb} alt="food" />
			</div>
			<div className="meal-name">
				<h3>
					{meal.strMeal}
				</h3>
				<button id={meal.idMeal} className="recipe-btn" onClick={(e) =>{getRecipe (e.target.id)}}>
					Get Recipe
				</button>
			</div>
		</div>
		</>
	);
};

export default ShowMeals;
