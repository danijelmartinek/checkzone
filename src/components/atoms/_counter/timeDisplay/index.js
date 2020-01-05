import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class TimeDisplay extends React.Component {
    state = {
        time: {
            seconds: '00',
            minutes: '00',
            hours: '00',
        },
    };

    timer = false;
    totalSeconds = 0;
    totalMinutes = 0;

    startCounter = () => {
        let that = this;
        function Interval(fn, time) {
            this.start = function() {
                if (!this.isRunning()) {
                    that.setState(prevState => ({
                        time: {
                            ...prevState.time
                        },
                    }));
                    that.timer = setInterval(fn, time);
                }
            };
            this.pause = function() {
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
            i.pause();
            that.setState(prevState => ({
                time: {
                    ...prevState.time
                },
            }));
        } else {
            i.start();
            that.setState(prevState => ({
                time: {
                    ...prevState.time
                },
            }));
        }
    };

    render() {
        return (
            <View>
                <Seconds font="Speck" color="red">
                    {this.state.time.seconds}
                </Seconds>
                <HoursAndMinutes>
                    <Hours font="Speck" color="red">
                        {this.state.time.hours} :
                    </Hours>
                    <Minutes font="Speck" color="red">
                        {' '}
                        {this.state.time.minutes}
                    </Minutes>
                </HoursAndMinutes>
            </View>
        );
    }
}

const HoursAndMinutes = styled.View`
    text-align: center;
    align-items: center;
    flex-direction: row;
    justify-content: center;
    margin-bottom: ${hp('1%')};
`;

const Seconds = styled.Text`
    text-align: center;
    font-size: ${hp('20%')};
    line-height: ${hp('22%')};
    margin-left: ${wp('2%')};
    color: ${props => props.color || "#000000"};
    fontFamily: ${props => props.font || "sans-serif"};
`;

const Hours = styled.Text`
    text-align: center;
    font-weight: 400;
    font-size: ${hp('6%')};
    line-height: ${hp('7%')};
    color: ${props => props.color || "#000000"};
    fontFamily: ${props => props.font || "sans-serif"};
`;

const Minutes = styled.Text`
    text-align: center;
    font-weight: 400;
    font-size: ${hp('6%')};
    line-height: ${hp('7%')};
    color: ${props => props.color || "#000000"};
    fontFamily: ${props => props.font || "sans-serif"};
`;

export default TimeDisplay;
