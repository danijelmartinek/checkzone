import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class LogInfoItem extends React.Component {
    render() {
        return (
            <React.Fragment>
                <FontAwesomeIcon
                    icon={this.props.icon}
                    size={12 * (this.props.scale || 1)}
                    style={
                        {
                            color: '#ffffff', 
                            opacity: this.props.opacity,
                            alignSelf: 'center'
                        }
                    }
                />
                <LogInfoText 
                    scale={this.props.scale} 
                    opacity={this.props.opacity}
                >{this.props.text}</LogInfoText>
            </React.Fragment>
        );
    }
}

const LogInfoText = styled.Text`
    color: #ffffff;
    padding: 0px ${hp('1.5%')}px 0px ${hp('0.5%')}px;
    font-size: ${props => hp('1.8%') * props.scale || hp('1.8%')};
    opacity: ${props => props.opacity || '1'};
`;

export default LogInfoItem;
