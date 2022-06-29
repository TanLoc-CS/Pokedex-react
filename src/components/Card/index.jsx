import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function addLeadingZeros(num, totalLength) {
	if (num < 0) {
		const withoutMinus = String(num).slice(1);
		return '-' + withoutMinus.padStart(totalLength, '0');
	}
	return String(num).padStart(totalLength, '0');
}
export default function Card(props) {
	let [image, setImage] = useState();
	let [id, setID] = useState();
	let [types, setTypes] = useState();
	const { name, url } = props.data;
	useEffect(() => {
		axios.get(url).then((res) => {
			setImage(res.data.sprites.front_default);
			setID(res.data.id);
			console.log(res.data.id);
			setTypes(res.data.types);
		});
	}, []);
	return (
		<div className="mb-4 mr-1" style={{ width: '300px', height: '280px' }}>
			<div className="bg-white flex flex-col flex-1 justify-center items-center p-4 rounded-lg">
				<Link to={`/pokemon/${id - 1}`}>
					<div
						style={{ width: '300px', height: 'auto' }}
						className="flex flex-col justify-center items-center"
					>
						<p className="m-0 mb-3 text-black">
							{id === undefined ? 'undefined' : '#' + addLeadingZeros(id, 3)}
						</p>
						<img className="h-32 w-32" src={image} alt="artwork" />
					</div>
				</Link>
				<h1 className="mt-1 font-bold text-black">{name}</h1>
				<p className="mb-1 font-bold text-black">
					{types == undefined
						? 'undefined'
						: types?.length == 2
						? types[0].type.name + ' ' + types[1].type.name
						: types[0].type.name}
				</p>
				<div className="flex flex-row justify-center items-center">
					<div className="form-control">
						<label className="label cursor-pointer">
							<input
								type="checkbox"
								className="toggle toggle-sm toggle-accent"
							/>
						</label>
					</div>
					<h4 className="text-black">Captured</h4>
				</div>
			</div>
		</div>
	);
}
