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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from './dimensions.js';

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
                            <Text style={styles.navItemElement}>Logs</Text>
                        </View>
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
                            <Text style={styles.navItemElement}>Projects</Text>
                        </View>
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
                            <Text style={styles.navItemElement}>Tasks</Text>
                        </View>
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
                            <Text style={styles.navItemElement}>
                                Statistics
                            </Text>
                        </View>
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
        marginTop: hp('1%'),
        marginBottom: hp('2%')
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
        margin: hp('2%'),
        paddingTop: hp('4%'),
    },
    navItemElement: {
        color: '#ffffff',
    },
    navItemOpacity: {
        opacity: 0.4,
    },
    iconSize: 32,
});

export default Navigation;
