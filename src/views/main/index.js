import * as React from 'react';
import styled from 'styled-components';
import { StatusBar } from 'react-native';

import Counter from '_molecules/counter/index.js';
import Panel from '_organisms/panel/index.js';

class Main extends React.Component {
    render() {
        return (
            <MainContainer>
                <StatusBar barStyle="light-content" />
                <Counter></Counter>
                <Panel navigation={this.props.navigation}></Panel>
            </MainContainer>
        );
    }
}

const MainContainer = styled.View`
    flex: 1;
    justify-content: center;
    background-color: #000914;
    padding: 8px;
`;

export default Main;