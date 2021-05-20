import React from 'react';
import Char from '../Char/Char';
import classes from './TextField.module.css';

class TextField extends React.Component {
		state = {
			chars: [],
			loaded: false,
			numPassedChar: 0,
			currentChar: 0,
			isTouched: false,
			isFinished: false
		};

		updateState(state) {
			state.currentChar++;
			state.numPassedChar++;
			const isFinished = state.chars.length === state.numPassedChar;

			if(isFinished) {
				this.props.finishedTest();
				document.removeEventListener('keydown', this);
				state.isFinished = true;
			} else {
				const current = state.currentChar;
				state.chars[current].isCurrent = true;
				state.chars[current].isValid = true;
				this.props.speedometer.updateSpeed(state.numPassedChar);
			}
			return state;
		}

		updateChar(isValidKey, char) {
			if(isValidKey) {
				char.isPassed = true;
				char.isCurrent = false;
				char.isValid = true;
			} else {
				char.isValid = false;
			}

			if(!char.isTouched && !char.isValid) {
				this.props.updateAccuracy();
			}

			char.isTouched = true;

			return char;
		}

		runSpeedometer(state) {
			state.isTouched = true;
			this.props.speedometer.run();
			return state;
		}

		handleEvent(evt) {
			switch(evt.type) {
					case 'keydown':
						this.onKeyDown(evt);
						break;
					default:
						break;
			}
		}

		onKeyDown(evt) {
			evt.preventDefault();
			const key = evt.key;

			if(key === 'Shift' || key === 'Escape') return;

			let state= this.state;

			if(!state.isTouched) {
				state = this.runSpeedometer(state);
			}

			const charIdx = state.currentChar;

			let currentChar = state.chars[charIdx];
			const isValidKey = currentChar.value === key;

			currentChar = this.updateChar(isValidKey, currentChar);

			if(isValidKey) {
				state = this.updateState(state);
			}

			if(state.isFinished) {
				return;
			}

			state.chars[charIdx] = currentChar;

			this.setState({
				...state
			})
		}

		componentDidMount() {
			const chars = this.props.text.split('').map((char) => {
				return {
					value: char,
					isPassed: false,
					isValid: false,
					isCurrent: false,
					isTouched: false
				}
			});

			chars[0].isCurrent = true;
			chars[0].isValid = true;

			this.setState({
				chars,
				loaded: true,
				stats: {...this.props.stats}
			})

			document.addEventListener('keydown', this);
		}

		componentWillUnmount() {
			document.removeEventListener('keydown', this);
		}

		render() {
			let rendered = (<div></div>);
			const textField = (
				<p className={classes.TextField}>
					{this.state.chars.map((char, index) => {
						return (
							<Char
								key={index}
								char={char.value}
								isPassed={char.isPassed}
								isCurrent={char.isCurrent}
								isValid={char.isValid}
								 />
						);
					})
					}
			</p>
			);

			if (this.state.loaded) {
				rendered = textField;
			}

			return rendered;
		};
};

export default TextField;
