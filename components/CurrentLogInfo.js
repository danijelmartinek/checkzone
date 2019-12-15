import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from './dimensions.js';

const { height, width } = Dimensions.get('window');

class CurrentLogInfo extends React.Component {
    render() {
        return (
            <View style={styles.logInfoContainer}>
                <View style={styles.currentStats}>

                    <View style={styles.statusContainer}>
                        <View style={styles.statusWrapper}>
                            <View style={styles.statusDot}>
                                <View style={styles.statusDotInner}></View>
                            </View>
                            <Text style={styles.statusText}>off</Text>
                        </View>
                    </View>

                    <View style={styles.currentLog}>
                        <Text style={styles.currentLogText}>start time:</Text>
                        <Text style={styles.currentLogTextMain}>18:30:20</Text>
                    </View>

                    <View style={styles.currentLog}>
                        <Text style={styles.currentLogText}>tasks completed:</Text>
                        <Text style={styles.currentLogTextMain}>0</Text>
                    </View>

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

    currentStats: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    statusContainer: {
        alignItems: 'center',
        textAlign: 'center',
        width: "33%",
    },

    statusWrapper: {
        flexDirection: 'row',
        margin: hp('3%'),
    },

    statusDot: {
        width: hp('4%'),
        height: hp('4%'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: hp('4%') / 2,
        marginRight: wp('2.5%'),
        opacity: 0.5,
        backgroundColor: 'red',
    },

    statusDotInner: {
        width: hp('2%'),
        height: hp('2%'),
        borderRadius: hp('2%') / 2,
        backgroundColor: 'red',
    },

    statusText: {
        color: '#ffffff',
        marginTop: hp('0.2%'),
        fontSize: hp('2.5%'),
        textTransform: 'uppercase',
    },

    currentLog: {
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: "33%",
    },

    currentLogText: {
        fontSize: hp('1.5%'),
        marginTop: hp('3%'),
        opacity: 0.5,
        color: '#ffffff',
        textTransform: 'uppercase',
        alignItems: 'center',
        textAlign: 'center',
    },

    currentLogTextMain: {
        fontSize: hp('2%'),
        color: '#ffffff',
    },
});

export default CurrentLogInfo;
