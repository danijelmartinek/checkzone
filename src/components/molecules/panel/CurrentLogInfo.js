import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class CurrentLogInfo extends React.Component {
    render() {
        return (
            <LogInfoContainer>
                <CurrentStats>
                    <StatusContainer>
                        <StatusWrapper>
                            <StatusDot>
                                <StatusDotInner></StatusDotInner>
                            </StatusDot>
                            <StatusText>off</StatusText>
                        </StatusWrapper>
                    </StatusContainer>

                    <CurrentLog>
                        <CurrentLogText>start time:</CurrentLogText>
                        <CurrentLogTextMain>18:30:20</CurrentLogTextMain>
                    </CurrentLog>

                    <CurrentLog>
                        <CurrentLogText>tasks completed:</CurrentLogText>
                        <CurrentLogTextMain>0</CurrentLogTextMain>
                    </CurrentLog>

                </CurrentStats>
            </LogInfoContainer>
        );
    }
}

const LogInfoContainer = styled.View`
    display: flex;
    align-items: center;
    text-align: center;
`;

const CurrentStats = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

const StatusContainer = styled.View`
    align-items: center;
    text-align: center;
    width: ${wp('33%')};
`;

const StatusWrapper = styled.View`
    flex-direction: row;
    margin: ${hp('3%')}px;
`;

const StatusDot = styled.View`
    width: ${hp('4%')};
    height: ${hp('4%')};
    justify-content: center;
    align-items: center;
    border-radius: ${hp('2%')};
    margin-right: ${wp('2.5%')};
    opacity: 0.5;
    background-color: #ff0000;
`;

const StatusDotInner = styled.View`
    width: ${hp('2%')};
    height: ${hp('2%')};
    border-radius: ${hp('1%')};
    background-color: #ff0000;
`;

const StatusText = styled.Text`
    color: #ffffff;
    margin-top: ${hp('0.2%')};
    font-size: ${hp('2.5%')};
    text-transform: uppercase;
`;

const CurrentLog = styled.View`
    flex-direction: column;
    align-items: center;
    text-align: center;
    width: ${wp('33%')};
`;

const CurrentLogText = styled.Text`
    font-size: ${hp('1.5%')};
    margin-top: ${hp('3%')};
    opacity: 0.5;
    color: #ffffff;
    text-transform: uppercase;
    align-items: center;
    text-align: center;
`;

const CurrentLogTextMain = styled.Text`
    font-size: ${hp('2%')};
    color: #ffffff;
`;

export default CurrentLogInfo;
