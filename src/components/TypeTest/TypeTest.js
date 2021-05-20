import React from 'react';
import TextField from '../TextField/TextField';
import StatField from '../StatField/StatField';
import Restart from '../Restart/Restart';
import Loader from '../Loader/Loader';
import TestResult from '../TestResult/TestResult';
import Overlay from '../../Layout/Overlay/Overlay';
import getRequestBody from '../../support/fetchData';
import KeySpeedometer from '../../support/KeySpeedometer';
import axios from 'axios';

import classes from './TypeTest.module.css';

class TypeTest extends React.Component {
    state = {
        loaded: false,
				finished: true,
        text: '',
				stats: {
					speed: Number,
					accuracy: Number,
					accDecrement: Number
				}
    };

		async fetchText() {
			try {
				const response  = await axios.get(getRequestBody());
				this.setState({
						text: response.data.slice(-4),
						stats: {
							speed: 0,
							accuracy: 100,
							accDecrement: ((1 / response.data.length) * 100).toFixed(1),
							keySpeedometer: new KeySpeedometer()
						},
						loaded: true,
						finished: false
				})
			} catch (e) {
				alert(e);
		}
		}

    async componentDidMount() {
			this.fetchText();
			setInterval(() => this.updateSpeed(), 1000);
		}

		async reloaded() {
			const state = this.state;
			const speedometer = state.stats.keySpeedometer;
			state.loaded = false;
			this.setState({
				...state
			})
			speedometer.destruct();
			this.fetchText();
		}

		updateAccuracy() {
			const state = this.state;
			const accuracy = state.stats.accuracy;
			state.stats.accuracy = (accuracy - state.stats.accDecrement).toFixed(1);
			this.setState({
				...state
			})
		}

		updateSpeed() {
			const state = this.state;
			const speedometer = state.stats.keySpeedometer;
			state.stats.speed = speedometer.speed;
			this.setState({
				...state
			})
		}

		finishedTest() {
			const state = this.state;
			const speedometer = state.stats.keySpeedometer;
			speedometer.destruct();
			state.finished = true;
			this.setState({
				...state
			})
		}

    render() {
			const loader = <Loader/>;

			const test = (
				<main className={classes.TypeTest}>
					<TextField
							text = {this.state.text}
							updateAccuracy={this.updateAccuracy.bind(this)}
							finishedTest={this.finishedTest.bind(this)}
							speedometer = {this.state.stats.keySpeedometer}
					/>
					<StatField
							stats = {this.state.stats}
					 />
					<Restart
						onClick={() => this.reloaded()}
					/>
					<TestResult
						stats = {this.state.stats}
						reloaded={() => this.reloaded()}
						isActive = {this.state.finished}
						/>
					<Overlay
						isActive = {this.state.finished} />
				</main>
			);

			let rendered = loader;

			if(this.state.loaded)
        rendered = test;

			return rendered;
    };
};

export default TypeTest;
