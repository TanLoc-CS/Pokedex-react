import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';

function Tabs(props) {
	const { url } = props;
	let [toggle, setToggle] = useState(1);
	const [hp, setHp] = useState();
	const [attack, setAttack] = useState();
	const [defense, setDefense] = useState();
	const [special_attack, setSpecial_attack] = useState();
	const [special_defense, setSpecial_defense] = useState();
	const [speed, setSpeed] = useState();
	const [moves, setMoves] = useState([]);
	useEffect(() => {
		axios.get(url).then((res) => {
			console.log(res.data.moves);
			setHp(res.data.stats[0].base_stat);
			setAttack(res.data.stats[1].base_stat);
			setDefense(res.data.stats[2].base_stat);
			setSpecial_attack(res.data.stats[3].base_stat);
			setSpecial_defense(res.data.stats[4].base_stat);
			setSpeed(res.data.stats[5].base_stat);
			setMoves(res.data.moves);
		});
	}, []);

	return (
		<div>
			<div className="tabs mt-4 ml-56 font-semibold">
				<div
					className={
						toggle === 1
							? 'tab tab-lifted tab-active p-0.5 text-white'
							: 'tab tab-lifted bg-white'
					}
					onClick={() => setToggle(1)}
				>
					Stats
				</div>
				<div
					className={
						toggle === 2
							? 'tab tab-lifted tab-active p-0.5 text-white'
							: 'tab tab-lifted bg-white'
					}
					onClick={() => setToggle(2)}
				>
					Move
				</div>
			</div>
			<div>
				<div
					className={toggle === 1 ? 'flex flex-row tab-active' : 'hidden'}
					style={{
						width: '1536px',
						height: '310px',
						backgroundColor: '#2A303C',
					}}
				>
					<div
						className="flex flex-col justify-evenly items-end font-semibold text-base text-white"
						style={{ width: '332px' }}
					>
						<p>HP</p>
						<p>Attack</p>
						<p>Defense</p>
						<p>Special Attack</p>
						<p>Special Defense</p>
						<p>Speed</p>
					</div>
					<div
						className="flex flex-col justify-evenly items-center font-semibold text-base text-white"
						style={{ width: '112px' }}
					>
						<p>{hp}</p>
						<p>{attack}</p>
						<p>{defense}</p>
						<p>{special_attack}</p>
						<p>{special_defense}</p>
						<p>{speed}</p>
					</div>
					<div className="flex flex-col justify-evenly">
						<progress
							className="progress progress-info"
							value={hp}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
						<progress
							className="progress progress-info"
							value={attack}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
						<progress
							className="progress progress-info"
							value={defense}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
						<progress
							className="progress progress-info"
							value={special_attack}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
						<progress
							className="progress progress-info"
							value={special_defense}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
						<progress
							className="progress progress-info"
							value={speed}
							max="150"
							style={{
								height: '20px',
								width: '600px',
								backgroundColor: 'white',
							}}
						></progress>
					</div>
				</div>
				<div
					className={toggle === 2 ? 'tab-active' : 'hidden'}
					style={{
						width: '1536px',
						height: '310px',
						backgroundColor: '#2A303C',
					}}
				>
					<div style={{ width: '1536px', height: '16px' }}></div>
					<div className="grid grid-cols-3 gap-4 justify-items-center mx-36">
						{moves.map((e, index) => (
							<div
								key={index}
								className="flex flex-col justify-center items-evenly bg-white rounded-lg border-4 text-2xl text-black p-4"
								style={{
									width: '210px',
									height: '140px',
									borderColor: '#616161',
								}}
							>
								<p className="font-bold">{e.move.name}</p>
								<p className="font-semibold">Level 0</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Tabs;
