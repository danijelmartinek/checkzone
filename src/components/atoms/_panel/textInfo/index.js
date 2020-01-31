import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class TextInfo extends React.Component {
    render() {
        return (
            <TextInfoContainer>
                <TextDesc fontSize={this.props.descSize} uppercase={this.props.descUppercase}>{this.props.description}</TextDesc>
                <TextMain fontSize={this.props.textSize} uppercase={this.props.textUppercase}>{this.props.text}</TextMain>
            </TextInfoContainer>
        );
    }
}

const TextInfoContainer = styled.View`
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: ${wp('33%')};
`;

const TextDesc = styled.Text`
    margin-top: ${hp('3%')};
    opacity: 0.5;
    align-items: center;
    text-align: center;

    ${props => props.theme.fonts.size[props.fontSize || 'delta']}
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    text-transform: ${props => props.uppercase? 'uppercase' : 'capitalize'}};
`;

const TextMain = styled.Text`
    text-transform: ${props => props.uppercase? 'uppercase' : 'capitalize'}};

    ${props => props.theme.fonts.size[props.fontSize] || hp('2%')}
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
`;

export default TextInfo;
