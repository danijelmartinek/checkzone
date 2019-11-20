import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from './dimensions.js';

class ProjectTitle extends React.Component {
    render() {
        return (
            <View style={styles.projectTitleContainer}>
                <View style={styles.projectTitleWrapper}>
                    <View style={styles.projectColor}></View>
                    <Text style={styles.projectTitle}>Project one</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    projectTitleContainer: {
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
    },

    projectTitleWrapper: {
        flexDirection: "row",
        marginTop: hp('2%')
    },

    projectColor: {
        width: hp('4%'),
        height: hp('4%'),
        marginTop: hp('0.1%'),
        borderRadius: hp('1%'),
        backgroundColor: "purple"
    },

    projectTitle: {
        fontSize: hp('3%'),
        color: "#ffffff",
        marginLeft: 10
    }
});

export default ProjectTitle;
