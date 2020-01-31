import * as React from 'react';
import styled from 'styled-components';

import Logs from '_organisms/logs/index.js';
import StatusBarBg from '_atoms/statusBarBg/index.js';
import TopBar from '_atoms/topBar/index.js';

class LogsView extends React.Component {
    render() {
        return (
            <LogsContainer>
                <StatusBarBg></StatusBarBg>
                <TopBar navigation={this.props.navigation}></TopBar>
                <Logs navigation={this.props.navigation}></Logs>
            </LogsContainer>
        );
    }
}

const LogsContainer = styled.View`
    flex: 1;
    background-color: ${props => props.theme.colors.primary || '#ffffff'}}; 
    padding: 0px;
`;
// #101424

export default LogsView;