import React from 'react';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faClock,
    faProjectDiagram,
    faChartBar,
    faTasks,
} from '@fortawesome/free-solid-svg-icons';

const { height, width } = Dimensions.get('window');
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './dimensions.js';

class Navigation extends React.Component {
    onNavClick(screen) {
        this.props.navigation.navigate(screen);
        this.props.closePanel();
    }

    render() {
        return (
            <View style={styles.navContainer}>
                <View style={styles.navigation}>
                    <TouchableOpacity
                        style={styles.navItemOpacity}
                        activeOpacity={1}
                        onPress={() => this.onNavClick('Tasks')}
                    >
                        <View style={styles.navItem}>
                            <FontAwesomeIcon
                                icon={faClock}
                                size={styles.iconSize}
                                style={styles.navItemElement}
                            />
                        </View>
                        <Text style={styles.navItemElementText}>Logs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItemOpacity}
                        activeOpacity={1}
                        onPress={() => this.onNavClick('Tasks')}
                    >
                        <View style={styles.navItem}>
                            <FontAwesomeIcon
                                icon={faProjectDiagram}
                                size={styles.iconSize}
                                style={styles.navItemElement}
                            />
                        </View>
                        <Text style={styles.navItemElementText}>Projects</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItemOpacity}
                        activeOpacity={1}
                        onPress={() => this.onNavClick('Tasks')}
                    >
                        <View style={styles.navItem}>
                            <FontAwesomeIcon
                                icon={faTasks}
                                size={styles.iconSize}
                                style={styles.navItemElement}
                            />
                        </View>
                        <Text style={styles.navItemElementText}>Tasks</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.navItemOpacity}
                        activeOpacity={1}
                        onPress={() => this.onNavClick('Tasks')}
                    >
                        <View style={styles.navItem}>
                            <FontAwesomeIcon
                                icon={faChartBar}
                                size={styles.iconSize}
                                style={styles.navItemElement}
                            />
                        </View>
                        <Text style={styles.navItemElementText}>
                            Statistics
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('6%'),
    },
    navigation: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        textAlign: 'center',
        width: wp('100%') * 0.85,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: hp('1%'),
        paddingTop: hp('4.2%'),
    },
    navItemElement: {
        color: '#ffffff',
    },
    navItemElementText: {
        color: '#ffffff',
        textAlign: 'center',
        paddingTop: hp('2%'),
    },
    navItemOpacity: {
        opacity: 0.4,
    },
    iconSize: 32,
});

export default Navigation;
