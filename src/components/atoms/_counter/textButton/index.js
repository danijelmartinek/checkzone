import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class TextButton extends React.Component {
    render() {
        return (
            <ToggleButtonContainer
                activeOpacity={1}
                onPress={this.props.onPress}
            >
                <ToggleButton fontSize={this.props.fontSize}>
                    {this.props.children}
                </ToggleButton>
            </ToggleButtonContainer>
        );
    }
}

const ToggleButtonContainer = styled.TouchableOpacity`
    display: flex;
    opacity: 0.5;
`;

const ToggleButton = styled.Text`
    text-transform: uppercase;
    color: #ffffff;
    font-size: ${props => props.fontSize || hp('2%')}};
    text-align: center;
`;

export default TextButton;
