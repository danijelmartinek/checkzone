import React from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

const {
    Clock,
    Value,
    block,
    clockRunning,
    cond,
    eq,
    set,
    startClock,
    stopClock,
    timing,
} = Animated;


const ANIMATION = {
    OPEN: 1,
    CLOSE: 0,
};

function runTiming(clock, value, dest, duration) {
    const state = {
        finished: new Value(0),
        position: new Value(0),
        time: new Value(0), // set the current value of clock
        frameTime: new Value(0),
    };

    const config = {
        duration,
        toValue: new Value(0),
        easing: Easing.linear,
    };

    const timeSyncedWithClock = new Value(0); // flag to track if we need to sync

    return block([
        cond(
            clockRunning(clock),
            // condition to sync the state.time with clock on first invocation
            cond(eq(timeSyncedWithClock, 0), [
                set(state.time, clock),
                set(timeSyncedWithClock, 1), // set flag to not update this value second time
            ]),
            [
                set(timeSyncedWithClock, 0), // reset the flag
                set(state.finished, 0),
                set(state.time, clock), //set the current value of clock
                set(state.position, value),
                set(state.frameTime, 0),
                set(config.toValue, dest),
                startClock(clock),
            ],
        ),
        timing(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ]);
};

const runToggle = ( clock, state, value, duration, dest) => {
    return block([
        cond(eq(state, ANIMATION.OPEN), set(value, runTiming(clock, value, dest.open, duration))),
        cond(eq(state, ANIMATION.CLOSE), set(value, runTiming(clock, value, dest.close, duration))),
    ]);
};

class Alert extends React.Component {

    constructor(props) {
        super(props)
    
        this.clock = new Clock()
        this.animState = new Value(0)
        this.transY = new Value(-hp('20%'))
    
    }
    
    // This can be also moved to Animated.event and called with onHandlerStateChange
    runAnimation = () => {
        this.animState.setValue(1);

        setTimeout(() => {
            this.animState.setValue(0);
        }, this.props.duration);
    }

    show = () => {
        this.runAnimation();
    }

    closeAlert = () => {
        this.animState.setValue(0);
    }

    render() {
        return (
            <React.Fragment>
                <Animated.Code>
                {() => 
                    block([
                        runToggle(this.clock, this.animState, this.transY, this.props.animationDuration, {
                            open:  hp('8%'),
                            close: -hp('20%'),
                        })
                    ])
                }
                </Animated.Code>

                <TouchableWithoutFeedback onPress={() => this.closeAlert()}>
                    <AlertContainer 
                        style={{ transform: [{translateY: this.transY}] }} 
                        color={this.props.color} 
                        accent={this.props.accent}
                    >
                        <AlertText
                            color={this.props.color}
                            textColor={this.props.textColor}
                            style={
                                this.props.textSize
                            }
                        >{this.props.text}</AlertText>
                    </AlertContainer>
                </TouchableWithoutFeedback>
            </React.Fragment>
        );
    }
}

const AlertContainer = styled(Animated.View)`
    position: absolute;
    align-self: center;
    min-width: ${wp('50%')}px;
    max-width: ${wp('90%')}px;
    border-radius: ${hp('1%')}px;
    border-right-color:  ${props => props.accent || '#ffffff'};;
    border-right-width: ${hp('1%')}px;
    border-left-color:  ${props => props.color || '#ffffff'};;
    border-left-width: ${hp('1%')}px;
`;

const AlertText = styled.Text`
    color: ${props => props.textColor || '#000000'};
    padding: ${hp('2%')}px;
    background-color: ${props => props.color || '#ffffff'};
`;

export default Alert;
