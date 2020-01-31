import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class StatusDot extends React.Component {
    render() {
        return (
            <StatusContainer>
                <StatusWrapper>
                    <StatusDotCircle color={this.props.color}>
                        <StatusDotInner color={this.props.color}></StatusDotInner>
                    </StatusDotCircle>
                    <StatusText>{this.props.text}</StatusText>
                </StatusWrapper>
            </StatusContainer>
        );
    }
}

const StatusContainer = styled.View`
    align-items: center;
    text-align: center;
`;

const StatusWrapper = styled.View`
    flex-direction: row;
    margin: ${hp('4%')}px;
`;

const StatusDotCircle = styled.View`
    width: ${hp('4%')};
    height: ${hp('4%')};
    justify-content: center;
    align-items: center;
    border-radius: ${hp('2%')};
    margin-right: ${wp('2.5%')};
    opacity: 0.5;
    background-color: ${props => props.color || '#ff0000'}};
    z-index: 200;
`;

const StatusDotInner = styled.View`
    width: ${hp('2%')};
    height: ${hp('2%')};
    border-radius: ${hp('1%')};
    background-color: ${props => props.color || '#ff0000'}};
    z-index: 500;
`;

const StatusText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    margin-top: ${hp('0.2%')};
    align-self: center;

    ${props => props.theme.fonts.size.gama}
    text-transform: uppercase;
`;
export default StatusDot;
