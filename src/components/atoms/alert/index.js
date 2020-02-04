import React from 'react';
import {
    Animated,
    Easing
} from 'react-native';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class Alert extends React.Component {
    componentWillMount() {
        this._animatedValue = new Animated.Value(0);
    }

    show = () => {
        Animated.timing(this._animatedValue, {
            easing: Easing.linear(),
            toValue: 100,
            duration: this.props.animationDuration
        }).start();

        setTimeout(() => {
            Animated.timing(this._animatedValue, {
                toValue: 0,
                duration: this.props.animationDuration
            }).start();
        }, this.props.duration);
    }

    render() {
        const interpolatedMoveAnimation = this._animatedValue.interpolate({
            inputRange: [0, 100],
            outputRange: [-hp('20%'), hp('8%')]
        });

        return (
            <AlertContainer style={{ transform: [{translateY: interpolatedMoveAnimation}] }}>
                <AlertText
                    color={this.props.color}
                    textColor={this.props.textColor}
                >{this.props.text}</AlertText>
            </AlertContainer>
        );
    }
}

const AlertContainer = styled(Animated.View)`
    position: absolute;
    width: ${wp('100%')}px;
`;

const AlertText = styled.Text`
    align-self: center;
    text-align: center;
    border-radius: ${hp('1%')}px;
    color: ${props => props.textColor || '#000000'};
    padding: ${hp('2%')}px;
    background-color: ${props => props.color || '#ffffff'};;
`;

export default Alert;
