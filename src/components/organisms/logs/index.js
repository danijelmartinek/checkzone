import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';
import { secToString, humanFormat } from '_utils/time.js';

import HorizontalLine from '_atoms/horizontalLine/index.js';
import Log from '_molecules/log/index.js';

class Logs extends React.Component {

    state = {
        logs: [
            {
                date: '2020-01-13T00:05:32.000Z',
                totalTime: 25128,
                records: [
                    {
                        id: 8,
                        project: {
                            title: 'Project 11',
                            color: '#ff0000'
                        },
                        time: 9945,
                        pause: 2500,
                        tasks: 4,
                        github: {
                            repo: false,
                            commits: 0
                        }
                    },
                    {
                        id: 5,
                        project: {
                            title: 'Project 22',
                            color: '#ffff00'
                        },
                        time: 12945,
                        pause: 4500,
                        tasks: 5,
                        github: {
                            repo: true,
                            commits: 3
                        }
                    }
                ]
            },
            {
                date: '2020-01-07T00:05:32.000Z',
                totalTime: 15128,
                records: [
                    {
                        id: 1,
                        project: {
                            title: 'Project 55',
                            color: '#ff00ff'
                        },
                        time: 7945,
                        pause: 1560,
                        tasks: 4,
                        github: {
                            repo: true,
                            commits: 0
                        }
                    },
                    {
                        id: 2,
                        project: {
                            title: 'Project 123',
                            color: '#ffffff'
                        },
                        time: 10045,
                        pause: 3500,
                        tasks: 3,
                        github: {
                            repo: false,
                            commits: 0
                        }
                    }
                ]
            }
        ]
    }

    

    render() {
        return (
            <ScrollView>
                {this.state.logs.map((log, i) => (
                    <LogsGroup key={i}>
                        <LogsDay>
                            <LogsDayText>{humanFormat(log.date)}</LogsDayText>
                            <LogsTotalTime>Σ {secToString(log.totalTime)}</LogsTotalTime>
                        </LogsDay>
                        {log.records.map((record, j) => (
                            <React.Fragment key={j}>
                                <Log record={record} navigation={this.props.navigation}></Log>
                                <HorizontalLine></HorizontalLine>
                            </React.Fragment>
                        ))}
                    </LogsGroup>
                ))}
            </ScrollView>
        );
    }
}

const LogsGroup = styled.View``;

const LogsDay = styled.View`
    width: ${wp('100%')};
    display: flex;
    flex-direction: row;
    margin-top: ${hp('2%')}px;
    margin-bottom: ${hp('1.5%')}px;
`;

const LogsDayText = styled.Text`
    flex: 1;
    font-size: ${hp('3%')};
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    font-weight: bold;
    padding: ${hp('2%')}px 0px 0px ${hp('2%')}px;
`;

const LogsTotalTime = styled.Text`
    flex: 1;
    font-size: ${hp('2%')};
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    text-align: right;
    align-self: flex-end;
    padding-right: ${wp('6.5%')}px;
`;
export default Logs;
