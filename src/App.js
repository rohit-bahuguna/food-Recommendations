import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Food from './Food';

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Food />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
