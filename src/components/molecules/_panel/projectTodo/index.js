import React from 'react';
import styled, { withTheme } from 'styled-components';
import { PanResponder } from 'react-native';

import { connect } from 'react-redux'
import { toggleTodo } from '_redux/actions.js';

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

    componentWillMount() {
        this.setState({
            tasks: this.state.tasks.filter(task => task.checked === false)
        })
    }
    
    constructor(props) {
        super(props);

        this.state = {
            tasks: this.props.PROJECT_INFO.tasks
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

    render() {
        return (
            <TasksContainer 
                {...this._panResponder.panHandlers} 
                overScrollMode={'never'} 
                active={this.props.LOG_INFO.active? '1': this.props.theme.options.textDepressedOpacity}
            >
                {this.state.tasks.map((task, i) => (
                    <TaskItem key={i}>
                        <TaskItemCheckBox
                            disabled={!this.props.LOG_INFO.active}
                            checkBoxColor={this.props.theme.colors.textPrimary}
                            leftTextStyle={{...{
                                color: this.props.theme.colors.textPrimary, 
                                textDecorationLine: `${task.checked ? 'line-through': 'none'}`
                            }, ...this.props.theme.fonts.oSize.gama}}
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
    opacity: ${props => props.active || '1'}};
`;

const TaskItem = styled.View`
    width: ${wp('94%')};
    margin: ${wp('3%')}px;
    background-color: ${props => props.theme.colors.secondary || '#000000'};
`;

const TaskItemCheckBox = styled(CheckBox)`
    flex: 1;
    padding: 10px;
`;

const mapStateToProps = (state) => {
    return{
        PROJECT_INFO: state.PROJECT_INFO,
        LOG_INFO: state.LOG_INFO
    };
}
const mapDispatchToProps = dispatch => {
    return {
        toggleTodo: (id, isChecked) => dispatch(toggleTodo(id, isChecked)),
    }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withTheme(ProjectTodo));
