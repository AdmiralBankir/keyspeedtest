import React from 'react';
import TextField from '../TextField/TextField';
import StatField from '../StatField/StatField';
import Restart from '../Restart/Restart';
import getRequestBody from '../../support/fetchData';
import axios from 'axios';

import classes from './TypeTest.module.css';

class TypeTest extends React.Component {
    state = {
        loaded: false,
        text: '',
				stats: {
					speed: 0,
					accuracy: 100
				}
    };

		async fetchText() {
			try {
				const response  = await axios.get(getRequestBody());
				this.setState({
						text: response.data,
						loaded: true
				})
			} catch (e) {
				alert(e);
		}
		}

    async componentDidMount() {
			this.fetchText();
    }

		async reloaded() {
			const state = this.state;
			state.loaded = false;
			this.setState({
				...state
			})
			this.fetchText();
		}

    render() {
			const loader = (
				<h1>Загрузка</h1>
			);

			const test = (
				<main className={classes.TypeTest}>
					<TextField
							text = {this.state.text}
					/>
					<StatField
							stats = {this.state.stats}
					 />
					<Restart
						onClick={() => this.reloaded()}
					/>
				</main>
			);

			let rendered = loader;

			if(this.state.loaded)
        rendered = test;

			return rendered;
    };
};

export default TypeTest;
