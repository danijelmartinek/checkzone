import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesome5 } from '@expo/vector-icons';

class LogInfoItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <LogInfoIcon
                    name={this.props.icon}
                    size={12 * (this.props.scale || 1)}
                    opacity={this.props.opacity}
                ></LogInfoIcon>
                <LogInfoText 
                    scale={this.props.scale} 
                    opacity={this.props.opacity}
                >{this.props.text}</LogInfoText>
            </React.Fragment>
        );
    }
}

const LogInfoIcon = styled(FontAwesome5)`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    opacity: ${props => props.opacity || '1'};
    align-self: center;
`;

const LogInfoText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}}; 
    padding: 0px ${hp('1.5%')}px 0px ${hp('0.5%')}px;
    font-size: ${props => hp('1.8%') * props.scale || hp('1.8%')};
    opacity: ${props => props.opacity || '1'};
`;

export default LogInfoItem;
