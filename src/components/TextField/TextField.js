import React from 'react';
import Char from '../Char/Char';
import classes from './TextField.module.css';

class TextField extends React.Component {
		state = {
			chars: [],
			loaded: false,
			currentChar: 0
		};

		updateCurrentChar(state) {
			state.currentChar++;
			const current = state.currentChar;
			state.chars[current].isCurrent = true;
			state.chars[current].isValid = true;
			return state;
		}

		onKeyDown(key) {
			if(key === 'Shift' || key === 'Escape') return;

			let state= this.state;
			const currentChar = state.chars[state.currentChar];
			const prevCurrent = state.currentChar;

			if(currentChar.value === key) {
				currentChar.isPassed = true;
				currentChar.isCurrent = false;
				state = this.updateCurrentChar(state);

			} else {
				currentChar.isValid = false;
			}

			state.chars[prevCurrent] = currentChar;

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
					isCurrent: false
				}
			});

			chars[0].isCurrent = true;
			chars[0].isValid = true;

			this.setState({
				chars,
				loaded: true
			})

			document.addEventListener('keydown', (evt) => {
				evt.preventDefault();
				this.onKeyDown(evt.key);
			});
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
