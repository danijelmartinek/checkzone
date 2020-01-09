import React from 'react';
import styled from 'styled-components';
import {
    Animated
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';

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
    };

    render() {
        const interpolatedRotateAnimation = this._animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: ['0deg', '180deg']
        });

        return (
            <SelectedProjectWrapper onPress={() => this.toggleProjectSelect()} activeOpacity={this.props.disabled ? 1 : 0.5}>
                <ProjectTitle color={this.props.color} title={this.props.title}></ProjectTitle>

                <Animated.View style={{ transform: [{rotate: interpolatedRotateAnimation}] }}>
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        size={18}
                        style={
                            {
                                color: '#ffffff', 
                                opacity: this.props.disabled ? 0 : 1
                            }
                        }
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
`;

export default SelectedProject;
