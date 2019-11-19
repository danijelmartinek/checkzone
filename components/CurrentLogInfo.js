import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { height, width } = Dimensions.get('window');

class CurrentLogInfo extends React.Component {
    render() {
        return (
            <View style={styles.logInfoContainer}>
                <View style={styles.logStartEndContainer}>
                    <Text style={styles.logInfoItem}>START 18:33:25</Text>
                    <Text style={styles.logInfoItem}>END 20:50:14</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    logInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },

    logStartEndContainer: {
        display: 'flex',
        alignItems: 'flex-end',
    },

    logInfoItem: {
        color: "#ffffff"
    }
});

export default CurrentLogInfo;
