import * as React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import Constants from 'expo-constants';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Counter from './components/Counter';
import Panel from './components/Panel';

class Main extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                <Counter></Counter>
                <Panel navigation={this.props.navigation}></Panel>
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

const AppNavigator = createStackNavigator(
    {
        Main: {
            screen: Main,
            navigationOptions: {
                header: null,
            },
        },

        Tasks: {
            screen: Tasks,
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000914',
        padding: 8,
    },
});

export default createAppContainer(AppNavigator);
