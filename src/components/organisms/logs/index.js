import React from 'react';
import { ScrollView } from 'react-native';
import styled from 'styled-components';

import Firebase from "_/database/firebase/setFunctions.js";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';
import { secToString, humanFormat } from '_utils/time.js';

import HorizontalLine from '_atoms/horizontalLine/index.js';
import Log from '_molecules/log/index.js';

class Logs extends React.Component {

    async componentWillMount() {
        let Logs = await Firebase.getAll('logs')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })

        let Projects = await Firebase.getAll('projects')
        .then(res => {
            return res.data;
        })
        .catch(err => {
            console.log(err);
        })

        Logs = await Logs.map(log => {
            const startDate = new Date(log.startTime).setHours(0,0,0,0);
            log.startTime = new Date(startDate).toISOString();
            return log;
        })

        const groupBy = key => array =>
        array.reduce((objectsByKeyValue, obj) => {
            const value = obj[key];
            objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
            return objectsByKeyValue;
        }, {});

        let AggLogs = groupBy('startTime')(Logs)
        let OutLogs = [];

        for (var key in AggLogs) {
            if (AggLogs.hasOwnProperty(key)) {
                OutLogs.push({
                    date: key,
                    totalTime: AggLogs[key].reduce((prev, cur) => prev += cur.totalSessionTime, 0),
                    records: AggLogs[key].map(log => {
                        return {
                            id: log.id,
                            project: {},
                            time: log.totalSessionTime,
                            pause: log.pauseTime,
                            tasks: 0,
                            github: {
                                repo: false,
                                commits: 0
                            }
                        }
                    })
                })
                // console.log(key, AggLogs[key]);
            }
        }

        OutLogs = await OutLogs.map(x => {
            x.records = x.records.map(y => {
                let selProject = Projects.find(project => {
                    if(project['logs']) {
                        return project.logs.includes(y.id);
                    }
                    return false;
                })

                if(selProject) {
                    y.project = {
                        title: selProject.name,
                        color: selProject.labelColor
                    }

                    return y;
                } else {
                    return null;
                }
            }).filter((el) => {
                return el != null;
            }).reverse();

            return x;
        }).filter((el) => {
            return el.records[0] != null;
        }).sort((a, b) => {
            a = new Date(a.date);
            b = new Date(b.date);
            return a > b ? -1 : a < b ? 1 : 0;
        })

        this.setState({
            logs: OutLogs
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            logs: []
        }
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
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    font-weight: bold;
    padding: ${hp('2%')}px 0px 0px ${hp('2%')}px;
    ${props => props.theme.fonts.size.beta}
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
