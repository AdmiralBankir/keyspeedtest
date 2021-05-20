import React from 'react';
import classes from './Overlay.module.css';

const Overlay = props => {
		const cls = [classes.Overlay];
		if(props.isActive) {
			cls.push(classes.active);
		}
		return(
				<div className={cls.join(' ')}></div>
		);
};

export default Overlay;
