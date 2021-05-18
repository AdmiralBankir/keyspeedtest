import React from 'react';
import classes from './Char.module.css';

const Char = props => {
	const cls = [classes.Char];

	if(props.isCurrent) {
		cls.push(classes.Char__current)
	}

	if(props.isValid) {
		cls.push(classes.Char__valid)
	}
		return(
				<span className={cls.join(' ')}>{props.char}</span>
		);
};

export default Char;
