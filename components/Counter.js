import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './dimensions.js';

export default class Counter extends React.Component {
    state = {
        fontLoaded: false,
        time: {
            seconds: '00',
            minutes: '00',
            hours: '00',
            button: 'Start',
        },
    };

    timer = false;
    totalSeconds = 0;
    totalMinutes = 0;

    async componentDidMount() {
        await Font.loadAsync({
            Speck: require('./../assets/fonts/Speck.otf'),
        });

        this.setState({ fontLoaded: true });
    }

    startCounter = () => {
        let that = this;
        function Interval(fn, time) {
            this.start = function() {
                if (!this.isRunning()) {
                    that.setState(prevState => ({
                        time: {
                            ...prevState.time,
                            button: 'Stop',
                        },
                    }));
                    that.timer = setInterval(fn, time);
                }
            };
            this.stop = function() {
                clearInterval(that.timer);
                that.timer = false;
            };
            this.isRunning = function() {
                return that.timer !== false;
            };
        }

        function pad(val) {
            var valString = val + '';
            if (valString.length < 2) {
                return '0' + valString;
            } else {
                return valString;
            }
        }

        function setTime() {
            ++that.totalSeconds;
            that.totalMinutes = pad(parseInt(that.totalSeconds / 60));

            that.setState(prevState => ({
                time: {
                    seconds: pad(that.totalSeconds % 60),
                    minutes: pad(parseInt(that.totalMinutes % 60)),
                    hours: pad(parseInt(that.totalMinutes / 60)),
                    button: prevState.time.button,
                },
            }));
        }

        let i = new Interval(setTime, 1000);
        if (i.isRunning()) {
            i.stop();
            that.setState(prevState => ({
                time: {
                    ...prevState.time,
                    button: 'Start',
                },
            }));
        } else {
            i.start();
            that.setState(prevState => ({
                time: {
                    ...prevState.time,
                    button: 'Stop',
                },
            }));
        }
    };

    render() {
        return (
            <View>
                {this.state.fontLoaded ? (
                    <View>
                        <Text style={[styles.seconds, styles.fontSpeck]}>
                            {this.state.time.seconds}
                        </Text>
                        <View style={[styles.minutesNHours]}>
                            <Text style={[styles.hours, styles.fontSpeck]}>
                                {this.state.time.hours} :
                            </Text>
                            <Text style={[styles.minutes, styles.fontSpeck]}>
                                {' '}
                                {this.state.time.minutes}
                            </Text>
                        </View>
                    </View>
                ) : null}

                <TouchableOpacity
                    style={styles.toggleButtonContainer}
                    activeOpacity={1}
                    onPress={() => this.startCounter()}
                >
                    <Text style={styles.toggleButton}>
                        {this.state.time.button}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    fontSpeck: {
        fontFamily: 'Speck',
    },
    minutesNHours: {
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: hp('1%'),
    },
    seconds: {
        textAlign: 'center',
        fontSize: hp('20%'),
        lineHeight: hp('22%'),
        marginLeft: wp('2%'),
        color: 'red',
    },
    minutes: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: hp('6%'),
        lineHeight: hp('7%'),
        color: 'red',
    },
    hours: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: hp('6%'),
        lineHeight: hp('7%'),
        color: 'red',
    },
    toggleButtonContainer: {
        display: 'flex',
        opacity: 0.5,
    },
    toggleButton: {
        textTransform: 'uppercase',
        color: 'white',
        fontSize: hp('5%'),
        textAlign: 'center',
    },
});
