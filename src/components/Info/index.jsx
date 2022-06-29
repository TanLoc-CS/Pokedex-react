import React, { useState, useEffect } from 'react';
import axios from 'axios';

function addLeadingZeros(num, totalLength) {
	if (num < 0) {
		const withoutMinus = String(num).slice(1);
		return '-' + withoutMinus.padStart(totalLength, '0');
	}
	return String(num).padStart(totalLength, '0');
}

function Info(props) {
	const { name, id, url } = props;

	const [image, setImage] = useState();
	const [base_exp, setBase_epx] = useState();
	const [height, setHeight] = useState();
	const [weight, setWeight] = useState();
	const [type1, setType1] = useState();
	const [type2, setType2] = useState();

	useEffect(() => {
		axios.get(url).then((res) => {
			setImage(res.data.sprites.front_default);
			setBase_epx(res.data.base_experience);
			setHeight(res.data.height);
			setWeight(res.data.weight);
			setType1(res.data.types[0].type.name);
			if (res.data.types.length == 2) setType2(res.data.types[1].type.name);
		});
	}, []);

	return (
		<div className="flex flex-col text-black">
			<div
				className="h-auto flex flex-row justify-evenly items-center mt-4 mb-8"
				style={{ width: '270px', marginLeft: '368px' }}
			>
				<h1 className="text-3xl font-semibold">{name}</h1>
				<h1 className="text-3xl font-semibold">
					{'#' + addLeadingZeros(parseInt(id) + 1, 3)}
				</h1>
			</div>
			<div className="flex flex-row justify-evenly flex-wrap mx-56">
				<div
					className="bg-green-200 rounded-lg shadow-lg"
					style={{ width: '270px', height: '270px', padding: '6px' }}
				>
					<img
						style={{ width: '250px', height: '250px' }}
						src={image}
						alt="poke-img"
					/>
				</div>
				<div className="w-auto flex flex-col justify-start">
					<div className="flex flex-row justify-start items-center mb-4">
						<div className="h-7 w-auto bg-white px-1 py-0.5 rounded-lg font-semibold shadow-lg">
							<h2>{type1}</h2>
						</div>
						<div
							className={
								type2 == undefined
									? 'hidden'
									: 'h-7 w-auto bg-white px-1 py-0.5 rounded-lg ml-2 font-semibold shadow-lg'
							}
						>
							<h2>{type2 == undefined ? 'undefined' : type2}</h2>
						</div>
					</div>
					<div
						className="py-4 px-1 rounded-lg shadow-lg flex flex-row justify-between"
						style={{
							height: '226px',
							width: '390px',
							backgroundColor: '#30A7D7',
						}}
					>
						<div className="w-48 flex flex-col justify-start items-end">
							<div
								className="text-xl font-semibold text-white"
								style={{ height: '52px' }}
							>
								<p>Base experience</p>
							</div>
							<div
								className="text-xl font-semibold text-white "
								style={{ height: '52px' }}
							>
								<p>Weight</p>
							</div>
							<div
								className="text-xl font-semibold text-white"
								style={{ height: '52px' }}
							>
								<p>Height</p>
							</div>
						</div>
						<div className="w-36 flex flex-col justify-start items-start">
							<div
								className="text-xl font-medium text-black"
								style={{ height: '52px' }}
							>
								<p>{base_exp}</p>
							</div>
							<div
								className="text-xl font-medium text-black"
								style={{ height: '52px' }}
							>
								<p>{weight}</p>
							</div>
							<div
								className="text-xl font-medium text-black"
								style={{ height: '52px' }}
							>
								<p>{height}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Info;
