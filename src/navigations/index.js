import * as React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

import { fromRight } from 'react-navigation-transitions';
import { View, Text, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';

import Main from '_views/main/index.js';

import Logs from '_views/logs/index.js';
import LogSave from '_views/logSave/index.js';
import LogDetails from '_views/logDetails/index.js';

class Tasks extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#ffffff' }}>Tasks page</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000914',
        padding: 8,
    },
});

const MainNavigator = createStackNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: {
                header: null,
                headerShown: false
            },
        },

        Logs: {
            screen: Logs,
            navigationOptions: {
                title: 'Logs',
                headerStyle: {
                    backgroundColor: '#000914',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                headerShown: false
            },
        },

        LogSave: {
            screen: LogSave,
            navigationOptions: {
                title: 'LogSave',
                headerShown: false
            },
        },

        LogDetails: {
            screen: LogDetails,
            navigationOptions: {
                title: 'LogDetails',
                headerShown: false
            },
        },

        Tasks: {
            screen: Tasks,
            navigationOptions: {
                title: 'Tasks',
                headerStyle: {
                    backgroundColor: '#000914',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            },
        },
    },
    {
        initialRouteName: 'Main',

        //prevent flickering on screen change
        transparentCard: true,
        cardStyle: {
            backgroundColor: 'transparent',
        },
        transitionConfig: (currentState) => {
            const currentView = currentState.scenes[
                currentState.scenes.length - 1
            ].route.routeName

            if(currentView === 'LogDetails') {
                return fromRight();
            }
        },
    }
);

export default createAppContainer(MainNavigator);