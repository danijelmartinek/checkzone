import * as React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';

import Logs from '_organisms/logs/index.js';


class LogsView extends React.Component {
    render() {
        return (
            <LogsContainer>
                <Logs></Logs>
            </LogsContainer>
        );
    }
}

const LogsContainer = styled.View`
    flex: 1;
    padding-top: ${Constants.statusBarHeight};
    background-color: #101424;
    padding: 0px;
`;

export default LogsView;