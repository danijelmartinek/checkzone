import React from 'react';
import styled, { withTheme } from 'styled-components';
import {
    Animated
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesome5 } from '@expo/vector-icons';

import ProjectTitle from '_atoms/projectTitle/index.js';

class SelectedProject extends React.Component {

    componentWillMount () {
        this._animatedValue = new Animated.Value(0);
    }
    
    state = {
        toggleOpen: false
    }

    toggleProjectSelect = () => {
        if(!this.props.disabled) {
            this.setState(prevState => ({
                toggleOpen: !prevState.toggleOpen
            }));
    
            if(this.state.toggleOpen) {
                Animated.timing(this._animatedValue, {
                    toValue: 0,
                    duration: 300
                }).start(); 
            } else {
                Animated.timing(this._animatedValue, {
                    toValue: 100,
                    duration: 300
                }).start();
            }
    
            this.props.onToggle();
        }
    }

    render() {
        const interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });

        return (
            <SelectedProjectWrapper onPress={() => this.toggleProjectSelect()} activeOpacity={this.props.disabled ? 1 : this.props.theme.options.activeOpacity}>
                <ProjectTitle 
                    color={this.props.color} 
                    title={this.props.title}
                    colorScale={1}
                    fontSize={'beta'}
                    charLimit={25}
                ></ProjectTitle>

                <Animated.View style={{ transform: [{rotate: interpolatedRotateAnimation}] }}>
                    <FontAwesome5
                        name={'caret-down'}
                        size={18}
                        style={{
                            color: this.props.theme.colors.textPrimary,
                            opacity: this.props.disabled ? 0 : 1
                        }}
                    />
                </Animated.View>
            </SelectedProjectWrapper>
        );
    }
}

const SelectedProjectWrapper = styled.TouchableOpacity`
    display: flex;
    flexDirection: row;
    justifyContent: center;
    alignItems: center;
    padding-left: ${wp('10%')}px;
    padding-right: ${wp('10%')}px;
`;

export default withTheme(SelectedProject);
