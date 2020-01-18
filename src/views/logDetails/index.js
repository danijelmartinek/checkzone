import * as React from 'react';
import styled from 'styled-components';
import Constants from 'expo-constants';

import { connect } from 'react-redux'
import { setTheme } from '_redux/actions.js';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { Text } from 'react-native';

import CloseTopBar from '_atoms/closeTopBar/index.js';

class LogDetails extends React.Component {

    componentWillMount() {
        this.props.setTheme('light')
    }
  
    render() {
        return (
            <LogDetailsContainer>
                <CloseTopBar navigation={this.props.navigation}></CloseTopBar>
                {/* <Text style={{ color: '#ffffff', ...this.props.font.size.giga}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.mega}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.kilo}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.alpha}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.beta}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.gama}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.delta}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.epsilon}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.zeta}}>Lorem IPSUM</Text>
                <Text style={{ color: '#ffffff', ...this.props.font.size.mili}}>Lorem IPSUM</Text> */}
                <Text style={{ color: '#ffffff'}}>{JSON.stringify(this.props.DEFAULT_THEME)}</Text>
            </LogDetailsContainer>
        );
    }
}

const LogDetailsContainer = styled.View`
    flex: 1;
    margin-top: ${Constants.statusBarHeight};
    background-color: #000914;
`;



const mapStateToProps = (state) => {
    return{
        DEFAULT_THEME : state.DEFAULT_THEME,
        THEME_OPTIONS: state.THEME_OPTIONS
    };
}

const mapDispatchToProps = dispatch => {
    return {
      setTheme: (mode) => dispatch(setTheme(mode)),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LogDetails);