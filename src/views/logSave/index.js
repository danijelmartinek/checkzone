import * as React from 'react';
import { BackHandler, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Firebase from "_/database/firebase/setFunctions.js";
import { withAlert } from '_components/middleware/Alert.js';

import { connect } from 'react-redux'
import { startCounter, stopCounter, updateCounter, toggleTodo, initData } from '_redux/actions.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';
import { dateToHnM, subtractTime, subtractTimeSeconds } from '_utils/time.js';

import StatusBarBg from '_atoms/statusBarBg/index.js';
import TopBar from '_atoms/topBar/index.js';

import HorizontalLine from '_atoms/horizontalLine/index.js';
import ProjectTitle from '_atoms/projectTitle/index.js';
import TextInfo from '_atoms/_panel/textInfo/index.js';
import Panel from '_atoms/panel/index.js';
import Spinner from '_atoms/spinner/index.js';

import CheckBox from 'react-native-check-box'

class LogsView extends React.Component {

    componentWillMount() {
        this.setState({
            tasks: this.state.tasks.filter(task => {
                if(!task.checked || this.props.LOG_INFO.tasks.includes(task.id)) {
                    return true;
                }
            })
        })
    }

    storeHighScore = (userId, score) => {
        firebase.database().ref('users/' + userId).set({
          highscore: score
        });
      }

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            this.normalizeCounter();
            this.props.navigation.goBack();
            this.props.REF_COUNTER.toggleTime();

            return true;
        });

        // this.actionPanel.current.openSheet();

    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    constructor(props) {
        super(props);

        this.state = {
            tasks: this.props.PROJECT_INFO.tasks
        }

        this.alert = React.createRef();
        this.actionPanel = React.createRef();
    }

    toggleTask = (index) => {
        let that = this;
        this.setState({
            tasks: this.state.tasks.map((_task, ind) => {
                if(ind == index) {
                    that.props.toggleTodo(_task.id, _task.checked)
                }

                return _task;
            })
        })
    }

    continueCounter = () => {
        this.normalizeCounter();
        this.props.navigation.goBack();
        this.props.REF_COUNTER.toggleTime();
    }

    cancelCounter = () => {
        this.props.alert.show({
            text: "Log canceled!",
            color: this.props.theme.colors.primary,
            accent: this.props.theme.colors.semantic.error,
            textColor: this.props.theme.colors.textPrimary,
            textSize: this.props.theme.fonts.oSize.delta,
            animationDuration: 200,
            duration: 100000
        });

        this.props.navigation.goBack();

        setTimeout(() => { 
            this.props.REF_COUNTER.timeDisplay.current.resetCounter();
            this.props.stopCounter();
        }, 500);
    }

    saveLog = () => {
        const getId = (logString) => {
            let a = String(logString).split("/");
            return a[a.length - 1];
        }
        const log = this.props.LOG_INFO;


        Firebase.save('logs', {
            active: log.active,
            startTime: String(log.startTime),
            countTime: log.countTime,
            endTime: String(log.endTime),
            totalSessionTime: log.totalSessionTime,
            pauseTime: log.pauseTime,
            pauseEntities: log.pauseEntities,
            tasks: log.tasks,
            commits: log.commits
        })
        .then(logStr => {
            
            this.props.PROJECT_INFO.logs.push(getId(logStr));
            this.props.PROJECT_INFO.timeInfo.totalTime = this.props.PROJECT_INFO.timeInfo.totalTime + log.totalSessionTime;

            if(this.props.PROJECT_INFO.timeInfo.startTime === '') {
                this.props.PROJECT_INFO.timeInfo.startTime = String(log.startTime);
            }

            let updatedProjectInfo = {...this.props.PROJECT_INFO};
            updatedProjectInfo.tasks = updatedProjectInfo.tasks.map(task => task.id);

            Firebase.update('projects', updatedProjectInfo.id, 
                updatedProjectInfo
            )
            .then(a => {

                Firebase.updateMultiple('tasks', this.props.PROJECT_INFO.tasks)
                .then(b => {
                    this.props.initData();

                    this.props.alert.show({
                        text: "Log succesfully saved!",
                        color: this.props.theme.colors.semantic.success,
                        textColor: "#ffffff",
                        animationDuration: 100,
                        duration: 3000
                    });
        
                    setTimeout(() => { 
                        this.props.REF_COUNTER.timeDisplay.current.resetCounter();
                        this.props.stopCounter();
                    }, 500);
                })
                .catch(err => {
                    this.props.alert.show({
                        text: err.message,
                        color: this.props.theme.colors.semantic.error,
                        textColor: "#ffffff",
                        animationDuration: 100,
                        duration: 3000
                    });
                })
            })
            .catch(err => {
                this.props.alert.show({
                    text: err.message,
                    color: this.props.theme.colors.semantic.error,
                    textColor: "#ffffff",
                    animationDuration: 100,
                    duration: 3000
                });
            })
        })
        .catch(err => {
            this.props.alert.show({
                text: err.message,
                color: this.props.theme.colors.semantic.error,
                textColor: "#ffffff",
                animationDuration: 100,
                duration: 3000
            });
        })

        this.props.navigation.goBack();
    }

    normalizeCounter = () => {
        return this.props.REF_COUNTER.timeDisplay.current.normalizeCounter(
                subtractTimeSeconds(new Date().toISOString(), this.props.LOG_INFO.startTime)
            );
    }

    render() {
        return (
            <LogContainer>
                <StatusBarBg></StatusBarBg>
                {/* <TopBar navigation={this.props.navigation} name="Log"></TopBar> */}

                <Panel 
                    height={hp('80%')}
                    backgroundColor={'blue'}
                    onSheetClose={() => {console.log('close')}}
                    onSheetOpen={() => {console.log('open')}}
                    ref={this.actionPanel}
                >
                    <Text>Lorem ipsum</Text>
                </Panel>

                <TitleContainer>
                    <ProjectTitle 
                        color={this.props.PROJECT_INFO.labelColor} 
                        title={this.props.PROJECT_INFO.name}
                        colorScale={1.5}
                        fontSize={'alpha'}
                    ></ProjectTitle>
                </TitleContainer>
                
                <LogInfoContainer>
                    <TextInfo 
                        description={'start time'} 
                        text={dateToHnM(this.props.LOG_INFO.startTime)}
                        descSize={'delta'}
                        textSize={'beta'}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>
                    <TextInfo 
                        description={'end time'} 
                        text={dateToHnM(this.props.LOG_INFO.endTime)}
                        descSize={'delta'}
                        textSize={'beta'}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>
                    <TextInfo 
                        description={'duration'} 
                        text={subtractTime(this.props.LOG_INFO.endTime, this.props.LOG_INFO.startTime)}
                        descSize={'delta'}
                        textSize={'beta'}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>
                </LogInfoContainer>


                <ProjectTasksText>Add Tasks</ProjectTasksText>
                <TasksContainer overScrollMode={'never'}>
                    {this.state.tasks.map((task, i) => (
                        <TaskItem key={i}>
                            <TaskItemCheckBox
                                checkBoxColor={this.props.theme.colors.textPrimary}
                                leftTextStyle={{...{
                                    color: this.props.theme.colors.textPrimary, 
                                    textDecorationLine: `${task.checked ? 'line-through': 'none'}`
                                }, ...this.props.theme.fonts.oSize.delta}}
                                onClick={() => this.toggleTask(i)}
                                isChecked={task.checked}
                                leftText={task.todo}
                            />
                        </TaskItem>
                    ))}
                </TasksContainer>
                
                <Spinner
                    speed={1000}
                    size={100}
                    color={'red'}
                    direction={1}
                ></Spinner>
                <ProjectTasksText>Connect Commits -></ProjectTasksText>
                
                <ActionsContainer>
                    <HorizontalLine></HorizontalLine>
                    <ActionsWrapper>
                        <ActionButton 
                            onPress={this.continueCounter}
                            activeOpacity={this.props.theme.options.activeOpacity} 
                            flex={1}
                        >
                            <ActionButtonText color={this.props.theme.colors.textPrimary}>
                                Continue
                            </ActionButtonText>
                        </ActionButton>
                        <ActionButton 
                            onPress={this.cancelCounter}
                            activeOpacity={this.props.theme.options.activeOpacity} 
                            flex={1}
                        >
                            <ActionButtonText color={this.props.theme.colors.semantic.error}>
                                Cancel
                            </ActionButtonText>
                        </ActionButton>
                        <ActionButton 
                            onPress={this.saveLog} 
                            activeOpacity={this.props.theme.options.activeOpacity} 
                            bgColor={this.props.theme.colors.semantic.success}
                            flex={1}
                        >
                            <ActionButtonText>
                                Save
                            </ActionButtonText>
                        </ActionButton>
                    </ActionsWrapper>
                </ActionsContainer>
            </LogContainer>
        );
    }
}

const LogContainer = styled.View`
    height: 100%;
    background-color: ${props => props.theme.colors.primary || '#ffffff'}}; 
    display: flex;
    padding: 0px;
`;

const ActionsContainer = styled.View`
    position: absolute;
    width: ${wp('100%')};
    bottom: 0;
`;

const ActionsWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: ${hp('2.5%')}px;
`;

const ActionButton = styled.TouchableOpacity`
    flex: ${props => props.flex || 1}};
    padding: ${hp('1%')}px;
    background-color: ${props => props.bgColor || 'transparent'}};
    border-radius: ${hp('0.5%')}px;
`;

const ActionButtonText = styled.Text`
    align-self: center;
    text-transform: uppercase;
    color: ${props => props.color || '#ffffff'}};
    ${props => props.theme.fonts.size.gama}
`;

const TitleContainer = styled.View`
    margin-top: ${hp('2.5%')}px;
`;

const LogInfoContainer = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const TasksContainer = styled.ScrollView`
    max-height: ${hp('40%')}px;
`;

const TaskItem = styled.View`
    width: ${wp('94%')};
    margin: ${wp('3%')}px;
    background-color: ${props => props.theme.colors.secondary || '#000000'}};
`;

const TaskItemCheckBox = styled(CheckBox)`
    flex: 1;
    padding: 10px;
`;

const ProjectTasksText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#000000'}};
    margin-top: ${hp('3%')}px;
    margin-bottom: ${hp('1%')}px;
    margin-left: ${hp('2%')}px;

    ${props => props.theme.fonts.size.gama}
    text-transform: uppercase;
`;





const mapStateToProps = (state) => {
    return{
        PROJECT_INFO: state.PROJECT_INFO,
        LOG_INFO: state.LOG_INFO,
        REF_COUNTER: state.REF_COUNTER,
        ALL_PROJECTS: state.ALL_PROJECTS
    };
}
const mapDispatchToProps = dispatch => {
    return {
        startCounter: () => dispatch(startCounter()),
        updateCounter: (obj) => dispatch(updateCounter(obj)),
        stopCounter: () => dispatch(stopCounter()),
        toggleTodo: (id, isChecked) => dispatch(toggleTodo(id, isChecked)),
        initData: () => initData(dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(withAlert(LogsView)));