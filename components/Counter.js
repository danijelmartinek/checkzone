import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import * as Font from "expo-font";

import Button from 'react-native-button';

export default class Counter extends React.Component {
    state = {
        fontLoaded: false,
        time: {
            seconds: "00",
            minutes: "00",
            hours: "00",
            button: "Start"
        }
    };

    timer = false;
    totalSeconds = 0;
    totalMinutes = 0;

    async componentDidMount() {
        await Font.loadAsync({
            'Speck': require("./../assets/fonts/Speck.otf"),
        });

        this.setState({ fontLoaded: true });
    }

    startCounter = () => {
        let that = this;
        function Interval(fn, time) {
            this.start = function () {
                if (!this.isRunning()) {
                    that.setState(prevState => ({
                        time: {
                            ...prevState.time,
                            button: 'Stop'
                        }
                    }));
                    that.timer = setInterval(fn, time);
                }
            };
            this.stop = function () {
                clearInterval(that.timer);
                that.timer = false;
            };
            this.isRunning = function () {
                return that.timer !== false;
            };
        }

        function pad(val) {
            var valString = val + "";
            if (valString.length < 2) {
                return "0" + valString;
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
                    button: prevState.time.button
                }
            }));
        }

        let i = new Interval(setTime, 1000);
        if (i.isRunning()) {
            i.stop();
            that.setState(prevState => ({
                time: {
                    ...prevState.time,
                    button: 'Start'
                }
            }));
        } else {
            i.start();
            that.setState(prevState => ({
                time: {
                    ...prevState.time,
                    button: 'Stop'
                }
            }));
        }
    };

    render() {
        return (
            <View>
                {
                    this.state.fontLoaded ? (
                        <View>
                            <Text style={[styles.seconds, styles.fontSpeck]}>{this.state.time.seconds}</Text>
                            <View style={[styles.minutesNHours]}>
                                <Text style={[styles.hours, styles.fontSpeck]}>{this.state.time.hours} :</Text>
                                <Text style={[styles.minutes, styles.fontSpeck]}> {this.state.time.minutes}</Text>
                            </View>
                        </View>
                    ) : null
                }
                <Button onPress={this.startCounter} style={[styles.toggleButton]}>{this.state.time.button}</Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#000914",
        padding: 8,
    },
    fontSpeck: {
        fontFamily: "Speck"
    },
    minutesNHours: {
        textAlign: "center",
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    seconds: {
        textAlign: "center",
        fontSize: 150,
        marginLeft: 15,
        color: 'red'
    },
    minutes: {
        textAlign: "center",
        fontWeight: '400',
        fontSize: 40,
        color: 'red'
    },
    hours: {
        textAlign: "center",
        fontWeight: '400',
        fontSize: 40,
        color: 'red'
    },
    toggleButton: {
        textTransform: 'uppercase',
        color: 'white',
        opacity: 0.5,
        fontSize: 30
    }
});
