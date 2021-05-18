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
				wordList: [],
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
			this.fetchText();
		}

    render() {
        return(
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
    };
};

export default TypeTest;
