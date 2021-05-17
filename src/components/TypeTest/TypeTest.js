import React from 'react';
import TextField from '../TextField/TextField';
import StatField from '../StatField/StatField';
import Restart from '../Restart/Restart';
import axios from 'axios';

const fetchSettings = {
    url: 'https://baconipsum.com/api/',
    type: 'meat-and-filler',
    paras: 1,
    format: 'text'
};

const getRequestBody = () => {
    let request = fetchSettings.url + '?';
    for(let key in fetchSettings) {
        if(key !== 'url') {
            request += key + '=' + fetchSettings[key] + '&';
        }
    }
    return request.slice(0, -1);
};

class TypeTest extends React.Component {
    state = {
        loaded: false,
        text: ''
    };

    async componentDidMount() {
        try {
            const response  = await axios.get(getRequestBody());
            this.setState({
                text: response.data
            })
        } catch (e) {
            alert(e);
        }
    }

    render() {
        return(
          <main>
            <TextField 
                text = {this.state.text}
            />
            <StatField />
            <Restart />
          </main>
        );
    };
};

export default TypeTest;