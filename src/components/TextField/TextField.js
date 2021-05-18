import React from 'react';
import classes from './TextField.module.css';

const TextField = props => {
    return(
        <p className={classes.TextField}>
            {props.text}
        </p>
    );
};

export default TextField;
