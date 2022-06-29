import React from 'react';
import { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

const LazyCard = React.lazy(() => import('../Card'));

function Homepage() {
	const [pokedex, setPokedex] = useState([]);
	const [offset, setOffset] = useState(12);
	const limit = 12;
	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=12').then((res) => {
			setPokedex(res.data.results);
			console.log(res.data.results);
		});
	}, []);

	if (!pokedex) return <></>;
	const fetchMoreData = () => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit + offset}`)
			.then((res) => {
				setPokedex(res.data.results);
				setOffset(limit + offset);
				console.log(res.data.results);
			});
	};

	return (
		<div
			className="bg-pokemon flex flex-col justify-center items-center"
			style={{ backgroundColor: '#60BFD5' }}
		>
			<img
				className="w-1/3"
				src="https://static0.gamerantimages.com/wordpress/wp-content/uploads/2021/07/pokemon-gotta-catch-em-all-slogan.jpg"
			/>
			<InfiniteScroll
				className="w-full grid grid-cols-4 gap-12 justify-items-center"
				dataLength={offset}
				hasMore
				next={fetchMoreData}
			>
				{pokedex.map((e, index) => (
					<LazyCard key={index} data={e} />
				))}
			</InfiniteScroll>
		</div>
	);
}

export default Homepage;
