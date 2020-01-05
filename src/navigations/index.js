import * as React from 'react';

import { createStackNavigator } from 'react-navigation-stack';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Main from '_views/main/index.js';

class Logs extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ color: '#ffffff' }}>Logss page</Text>
            </View>
        );
    }
}

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
        transitionConfig: () => ({
            containerStyle: {
                backgroundColor: 'transparent',
            },
        }),
    }
);

export default MainNavigator;