import React from 'react';
import styled from 'styled-components';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import {
    faHourglassHalf,
    faPause,
    faCheckSquare
} from '@fortawesome/free-solid-svg-icons';
import {
    faGithub
} from '@fortawesome/free-brands-svg-icons';

import moment from 'moment';

import ProjectTitle from '_atoms/projectTitle/index.js';
import LogInfoItem from '_atoms/logInfoItem/index.js';

class Log extends React.Component {

    secToString = (sec) => {
        return moment.utc(moment.duration(sec, "seconds").asMilliseconds()).format("HH:mm")
    }

    render() {
        commitsLabel = (github) => {
            if(github.repo) {
                return (
                    <React.Fragment>
                        <LogInfoItem 
                            icon={faGithub}
                            text={github.commits}
                            scale={0.8}
                            opacity={0.5}
                        ></LogInfoItem>
                    </React.Fragment>
                )
            }
        }

        return (
            <LogWrapper
                activeOpacity={0.5}
                onPress={() => this.props.navigation.navigate('LogDetails', {logId: this.props.record.id})}
            >
                <LogTitle>
                    <ProjectTitle 
                        align={'flex-start'} 
                        color={this.props.record.project.color} 
                        title={this.props.record.project.title}
                        scale={0.9}
                    ></ProjectTitle>
                </LogTitle>
                <LogInfo>
                    <LogInfoRow>
                        <LogInfoItem 
                            icon={faHourglassHalf}
                            text={this.secToString(this.props.record.time)}
                        ></LogInfoItem>
                    </LogInfoRow>
                    <LogInfoRow>
                        <LogInfoItem 
                            icon={faPause}
                            text={this.secToString(this.props.record.pause)}
                            scale={0.8}
                            opacity={0.5}
                        ></LogInfoItem>
                        <LogInfoItem 
                            icon={faCheckSquare}
                            text={this.props.record.tasks}
                            scale={0.8}
                            opacity={0.5}
                        ></LogInfoItem>
                        
                        <React.Fragment>
                            { commitsLabel(this.props.record.github) }
                        </React.Fragment>
                            
                    </LogInfoRow>
                </LogInfo>
            </LogWrapper>
        );
    }
}

const LogWrapper = styled.TouchableOpacity`
    width: ${wp('100%')};
    padding: ${hp('0.5%')}px ${wp('2%')}px ${hp('0.5%')}px ${wp('4%')}px;
    display: flex;
    flex-direction: row;
`;

const LogTitle = styled.View`
    flex: 1;
    justify-content: center;
    padding: ${hp('1.5%')}px;
`;

const LogInfo = styled.View`
    flex: 1;
    align-items: flex-end;
    justify-content: center;
`;

const LogInfoRow = styled.View`
    padding: ${hp('1%')}px;
    display: flex;
    flex-direction: row;
`;

export default Log;
