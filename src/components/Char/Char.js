import React from 'react';
import classes from './Char.module.css';

const Char = props => {
	const cls = [classes.Char];

	if(props.isCurrent) {
		cls.push(classes.Char__current)
	}

	if(props.isValid || props.isPassed) {
		cls.push(classes.Char__valid)
	}

	if(props.isCurrent && !props.isValid) {
		cls.push(classes.Char__invalid)
	}

		return(
				<span className={cls.join(' ')}>{props.char}</span>
		);
};

export default Char;
