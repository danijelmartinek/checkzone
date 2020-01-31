import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux'

import { dateToHnM, secToString } from '_utils/time.js';

import StatusDot from '_atoms/_panel/statusDot/index.js';
import TextInfo from '_atoms/_panel/textInfo/index.js';

class CurrentLogInfo extends React.Component {
    render() {
        return (
            <LogInfoContainer>
                <CurrentStats>
                    <StatusDot color={(this.props.LOG_INFO.active? '#39ff14': '#f70d1a')} text={(this.props.LOG_INFO.active? 'on': 'off')}></StatusDot>
                    <TextInfo 
                        description={'start time:'} 
                        text={dateToHnM(this.props.LOG_INFO.startTime)}
                        descSize={'delta'}
                        textSize={'beta'}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>
                    <TextInfo 
                        description={'pause time:'} 
                        text={secToString(this.props.LOG_INFO.pauseTime)}
                        descSize={'delta'}
                        textSize={'beta'}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>

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

const mapStateToProps = (state) => {
    return{
        LOG_INFO: state.LOG_INFO
    };
}

export default connect(mapStateToProps)(CurrentLogInfo);
