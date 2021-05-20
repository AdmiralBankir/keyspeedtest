import React from 'react';
import StatFiled from '../StatField/StatField';
import Restart from '../Restart/Restart';
import classes from './TestResult.module.css';

const TestResult = props => {
	const cls = [classes.TestResult];
	if(props.isActive) {
		cls.push(classes.active)
	}
		return(
				<div className={cls.join(' ')}>
					<p className={classes.TestResult__title}>You win!!!</p>
					<p className={classes.TestResult__result}>Результаты:</p>
					<StatFiled stats = {props.stats}/>
					<Restart onClick={() => props.reloaded()}/>
				</div>
		);
};

export default TestResult;
