import * as React from 'react';
import { View, StatusBar, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import Counter from '_molecules/counter/index.js';
import Panel from '_organisms/panel/index.js';

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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#000914',
        padding: 8,
    },
});

export default Main;