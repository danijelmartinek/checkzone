import React from 'react';
import { View, PanResponder, ScrollView, Text, StyleSheet } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './dimensions.js';

import CheckBox from 'react-native-check-box'

class ProjectTitle extends React.Component {

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
            isChecked: true
        }

        this._onGrant = this._onGrant.bind(this);
        this._onRelease = this._onRelease.bind(this);
        
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this._onGrant,
            onPanResponderRelease: this._onRelease,
            onPanResponderTerminate: this._onRelease,
        });
    }
      

    render() {
        return (
            <ScrollView style={styles.tasksContainer} {...this._panResponder.panHandlers} overScrollMode={'never'}>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
                <View style={styles.taskItem}>
                    <CheckBox
                        style={{flex: 1, padding: 10,}}
                        checkBoxColor={"#ffffff"}
                        leftTextStyle={{color: "#ffffff"}}
                        onClick={()=>{
                            this.setState({
                                isChecked:!this.state.isChecked
                            })
                          }}
                        isChecked={this.state.isChecked}
                        leftText={"CheckBox"}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    tasksContainer: {
        height: "100%"
    },
    taskItem: {
        width: wp('94%'),
        margin: wp('3%'),
        backgroundColor: '#181e36'
    }
});

export default ProjectTitle;
