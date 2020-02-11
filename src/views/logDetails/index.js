import * as React from 'react';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import Firebase from "_/database/firebase/setFunctions.js";

import { connect } from 'react-redux'
import { setTheme } from '_redux/actions.js';
import Theme from '_styles/themeComponent/index.js';


import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';
import { dateToHnM, subtractTime, humanFormat } from '_utils/time.js';

import { Text } from 'react-native';

import CloseTopBar from '_atoms/closeTopBar/index.js';
import HorizontalLine from '_atoms/horizontalLine/index.js';
import ProjectTitle from '_atoms/projectTitle/index.js';
import TextInfo from '_atoms/_panel/textInfo/index.js';

class LogDetails extends React.Component {

    componentWillMount() {
        Firebase.get('logs', this.props.navigation.getParam('logId'))
        .then(log => {
            this.setState({ log: log.data });

            if(log.data['tasks']) {
                Firebase.getAll('tasks')
                .then(tasks => {
                    this.setState({ 
                        tasks: tasks.data.filter(task => log.data.tasks.includes(task.id))
                    });
                })
                .catch(err => {
                    console.log(err);
                })
            }

            Firebase.getAll('projects')
            .then(res => {
                this.setState(
                    { 
                        project: res.data.find(project => {
                            if(project['logs']) {
                                return project.logs.includes(this.state.log.id);
                            }
                            return false;
                        }) 
                    }
                );
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            log: {},
            project: {},
            tasks: []
        }
    }

    render() {
        return (
            <Theme>
                <LogDetailsContainer>
                    <CloseTopBar navigation={this.props.navigation}></CloseTopBar>
                    <TitleContainer>
                        <ProjectTitle 
                            color={this.state.project.labelColor || '#ffffff'} 
                            title={this.state.project.name || ''}
                            colorScale={1.5}
                            fontSize={'alpha'}
                            charLimit={30}
                        ></ProjectTitle>
                    </TitleContainer>

                    <DateText>{humanFormat(new Date(this.state.log.startTime))}</DateText>
                    
                    <LogInfoContainer>
                        <TextInfo 
                            description={'start time'} 
                            text={dateToHnM(new Date(this.state.log.startTime))}
                            descSize={'delta'}
                            textSize={'beta'}
                            descUppercase={true}
                            textUppercase={true}
                        ></TextInfo>
                        <TextInfo 
                            description={'end time'} 
                            text={dateToHnM(new Date(this.state.log.endTime))}
                            descSize={'delta'}
                            textSize={'beta'}
                            descUppercase={true}
                            textUppercase={true}
                        ></TextInfo>
                        <TextInfo 
                            description={'duration'} 
                            text={subtractTime(new Date(this.state.log.endTime), new Date(this.state.log.startTime))}
                            descSize={'delta'}
                            textSize={'beta'}
                            descUppercase={true}
                            textUppercase={true}
                        ></TextInfo>
                    </LogInfoContainer>

                    <HorizontalLine></HorizontalLine>
                    
                    <TasksHeading>Completed Tasks</TasksHeading>
                    <TasksContainer overScrollMode={'never'}>
                        {this.state.tasks.map((task, i) => (
                            <TaskItem key={i}>
                                <TaskItemText>{task.todo}</TaskItemText>
                            </TaskItem>
                        ))}
                    </TasksContainer>
                    {/* <Text style={{ color: '#ffffff', ...this.props.font.size.giga}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.mega}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.kilo}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.alpha}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.beta}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.gama}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.delta}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.epsilon}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.zeta}}>Lorem IPSUM</Text>
                    <Text style={{ color: '#ffffff', ...this.props.font.size.mili}}>Lorem IPSUM</Text> */}
                    {/* <Text style={{ color: '#ffffff'}}>{JSON.stringify(this.props.DEFAULT_THEME)}</Text> */}
                </LogDetailsContainer>
            </Theme>
        );
    }
}

const LogDetailsContainer = styled.View`
    flex: 1;
    margin-top: ${Constants.statusBarHeight};
    background-color: ${props => props.theme.colors.primary || '#ffffff'}};
`;


const TitleContainer = styled.View`
    margin-top: ${hp('2.5%')}px;
    padding-left: ${wp('5%')}px;
    padding-right: ${wp('5%')}px;
`;

const LogInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0px 0px ${hp('2.5%')}px 0px;
`;

const DateText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    padding: ${hp('2%')}px 0px 0px 0px;
    text-align: center;
    ${props => props.theme.fonts.size.gama}
`;

const TasksHeading = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    padding: ${hp('2.5%')}px 0px ${hp('1%')}px ${hp('1%')}px;
    ${props => props.theme.fonts.size.beta}
`;

const TasksContainer = styled.ScrollView`
    max-height: ${hp('40%')}px;
`;

const TaskItem = styled.View`
    width: ${wp('94%')};
    margin: ${wp('3%')}px;
    background-color: ${props => props.theme.colors.secondary || '#000000'}};
`;

const TaskItemText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    padding: ${hp('1.5%')}px;
    ${props => props.theme.fonts.size.gama}
`;

const mapDispatchToProps = dispatch => {
    return {
      setTheme: (mode) => dispatch(setTheme(mode)),
    }
}


export default connect(null, mapDispatchToProps)(withTheme(LogDetails));