import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from './dimensions.js';

const { height, width } = Dimensions.get('window');

class ProjectLogInfo extends React.Component {
    render() {
        return (
            <View style={styles.projectLogInfoContainer}>

                <View style={styles.logInfoItemContainer}>
                    <View style={styles.logInfoItem}>
                        <Text style={styles.logInfoItemHeadline}>
                            Total active time:
                        </Text>
                        <View>
                            <Text style={styles.logInfoItemText}>66:33</Text>
                        </View>
                    </View>
                    <View style={styles.logInfoItem}>
                        <Text style={styles.logInfoItemHeadline}>
                            Total pause time:
                        </Text>
                        <View>
                            <Text style={styles.logInfoItemText}>02:33</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    projectLogInfoContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },

    logInfoItemContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    logInfoItem: {
        padding: hp('5%'),
        paddingTop: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logInfoItemHeadline: {
        color: '#ffffff',
        fontSize: hp('1.8%'),
    },

    logInfoItemText: {
        color: '#ffffff',
        fontSize: hp('5%'),
    },
});

export default ProjectLogInfo;
