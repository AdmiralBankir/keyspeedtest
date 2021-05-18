import React from 'react';
import Char from '../Char/Char';
import classes from './TextField.module.css';

class TextField extends React.Component {
		state = {
			chars: [],
			loaded: false
		};

		componentDidMount() {
			const chars = this.props.text.split('').map((char) => {
				return {
					value: char,
					isValid: false,
					isTouched: false
				}
			});

			this.setState({
				chars,
				loaded: true
			})
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
								isTouched={char.isTouched}
								isValid={char.isValid}
								 />
						);
					})
					}
			</p>
			);

			if (this.state.loaded) rendered = textField;
				return rendered;
		};
};

export default TextField;
