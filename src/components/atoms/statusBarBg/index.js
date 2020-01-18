import * as React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';

class StatusBar extends React.Component {
    render() {
        return (
            <StatusBarContainer></StatusBarContainer>
        );
    }
}

const StatusBarContainer = styled.View`
    height: ${Constants.statusBarHeight};
    background-color: #101424;
    padding: 0px;
`;

export default StatusBar;