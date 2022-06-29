import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Tabs from '../Tabs';
import Info from '../Info';

function Pokemon() {
	const { id } = useParams();
	const [pokedex, setPokedex] = useState([]);

	useEffect(() => {
		axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000').then((res) => {
			setPokedex(res.data.results);
		});
	}, []);
	if (!pokedex[id]) return <></>;
	const { name, url } = pokedex[id];

	return (
		<div>
			<div
				className="bg-pokemon flex flex-col"
				style={{ backgroundColor: '#60BFD5', width: '1536px' }}
			>
				<Info name={name} id={id} url={url}></Info>
				<Tabs url={url}></Tabs>
			</div>
		</div>
	);
}

export default Pokemon;
