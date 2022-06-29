import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import Homepage from './components/Homepage';
import Pokemon from './components/Pokemon';
import Navbar from './components/Navbar';
function App() {
	return (
		<div className="App">
			<Navbar></Navbar>
			<Routes>
				<Route path="/" element={<Homepage />} exact></Route>
				<Route path="/pokemon/:id" element={<Pokemon />}></Route>
			</Routes>
		</div>
	);
}

export default App;
