import React from 'react';
import styled from 'styled-components';
import { PanResponder } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import CheckBox from 'react-native-check-box'

class ProjectTodo extends React.Component {

    _onGrant() {
        this.setState({ dragPanel: false });
        return true;
    }
    _onRelease() {
        this.setState({ dragPanel: true });
    }
    
    constructor(props) {
        super(props);

        this.state = {
            tasks: [
                {
                    checked: false,
                    todo: 'Primjer za todo'
                },
                {
                    checked: true,
                    todo: 'Ovo je neki dugi todo primjer da vidim kak se text prelijeva u todo listi'
                },
                {
                    checked: false,
                    todo: 'Nekaj treće'
                }
            ]
        }

        this._onGrant = this._onGrant.bind(this);
        this._onRelease = this._onRelease.bind(this);
        
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this._onGrant,
            onPanResponderRelease: this._onRelease,
            onPanResponderTerminate: this._onRelease,
        });
    }

    toggleTask = (index) => {
        this.setState({
            tasks: this.state.tasks.map((_task, ind) => {
                if(ind == index) {
                    _task.checked = !_task.checked;
                }

                return _task;
            })
        })
    }

    render() {
        return (
            <TasksContainer {...this._panResponder.panHandlers} overScrollMode={'never'}>
                {this.state.tasks.map((task, i) => (
                    <TaskItem key={i}>
                        <TaskItemCheckBox
                            checkBoxColor={"#ffffff"}
                            leftTextStyle={{color: "#ffffff", textDecorationLine: `${task.checked ? 'line-through': 'none'}`}}
                            onClick={() => this.toggleTask(i)}
                            isChecked={task.checked}
                            leftText={task.todo}
                        />
                    </TaskItem>
                ))}
            </TasksContainer>
        );
    }
}

const TasksContainer = styled.ScrollView`
    height: 100%;
`;

const TaskItem = styled.View`
    width: ${wp('94%')};
    margin: ${wp('3%')}px;
    background-color: #181e36;
`;

const TaskItemCheckBox = styled(CheckBox)`
    flex: 1;
    padding: 10px;
`;

export default ProjectTodo;
