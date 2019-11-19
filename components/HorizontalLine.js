import React from 'react';
import { View, StyleSheet } from 'react-native';

class HorizontalLine extends React.Component {
    render() {
        return <View style={styles.horizontalLine}></View>;
    }
}

const styles = StyleSheet.create({
    horizontalLine: {
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2,
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
        opacity: 0.1,
    },
});

export default HorizontalLine;
