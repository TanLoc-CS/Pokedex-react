import React from 'react';
import { useState, useEffect } from 'react';
import { GraphQLClient, gql } from 'graphql-request';
import { Link } from 'react-router-dom';

const PokeAPIquery = gql`
	{
		gen3_species: pokemon_v2_pokemonspecies(where: {}, order_by: { id: asc }) {
			id
			name
		}
	}
`;

function Navbar() {
	const [pokedex, setPokedex] = useState([]);
	const [filteredData, setFilteredData] = useState([]);
	const [searchBox, setSearchBox] = useState(false);
	const client = new GraphQLClient('https://beta.pokeapi.co/graphql/v1beta');
	useEffect(() => {
		client
			.request(PokeAPIquery)
			.then((res) => {
				setPokedex(res.gen3_species);
			})
			.catch((err) => console.log(err));
	}, []);
	const handleFilter = (event) => {
		const search = event.target.value;
		const newFilter = pokedex.filter((value) => {
			return value.name.toLowerCase().indexOf(search.toLowerCase()) != -1;
		});
		if (search === '') setFilteredData([]);
		else setFilteredData(newFilter);
	};
	return (
		<div
			className="w-full h-20 flex flex-row justify-start items-center"
			style={{ backgroundColor: '#EF5350' }}
		>
			<a href="/">
				<img
					style={{ height: '100%', width: 'auto' }}
					src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/62902855-31e8-48de-986e-5080e8ef5f15/d5uxsvu-cbf56dfe-0c82-40f9-928b-1e756acf0236.png/v1/fill/w_312,h_112,strp/pokedex_vector_logo_by_macoscrazy_d5uxsvu-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTEyIiwicGF0aCI6IlwvZlwvNjI5MDI4NTUtMzFlOC00OGRlLTk4NmUtNTA4MGU4ZWY1ZjE1XC9kNXV4c3Z1LWNiZjU2ZGZlLTBjODItNDBmOS05MjhiLTFlNzU2YWNmMDIzNi5wbmciLCJ3aWR0aCI6Ijw9MzEyIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.W5OaCwDASPcITC1_1B8Rr-lqsOWzYddfZH3HwnCkR4o"
					alt="logo"
				/>
			</a>
			<div className="flex flex-col justify-start">
				<div className="input-group">
					<input
						type="text"
						placeholder="Search"
						onFocus={() => setSearchBox(true)}
						onChange={handleFilter}
						className="input input-bordered font-medium"
						style={{ backgroundColor: 'white', borderWidth: '2px' }}
					/>
					<span style={{ backgroundColor: 'white' }}>
						<button type="submit">
							<img
								style={{ height: '24px', width: 'auto' }}
								src="https://cdn-icons-png.flaticon.com/512/149/149852.png"
								alt="search"
							/>
						</button>
					</span>
				</div>

				{filteredData.length != 0 && (
					<div
						className={
							searchBox
								? 'w-52 h-36 bg-white shadow-lg overflow-hidden overflow-y-scroll absolute rounded-lg px-1 text-left'
								: 'hidden'
						}
						onBlur={() => setSearchBox(false)}
						style={{ top: '68px' }}
					>
						{filteredData.map((value, index) => {
							return (
								<Link to={`/pokemon/${value.id}`} key={index}>
									<p className="hover:bg-gray-200">{value.name}</p>
								</Link>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}

export default Navbar;
