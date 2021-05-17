import React from 'react';
import TextField from '../TextField/TextField';
import StatField from '../StatField/StatField';
import Restart from '../Restart/Restart';

class TypeTest extends React.Component {
    state = {};
    render() {
        return(
          <main>
            <TextField />
            <StatField />
            <Restart />
          </main>
        );
    };
};

export default TypeTest;