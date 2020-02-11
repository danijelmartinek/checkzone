import React from 'react';
import styled from 'styled-components';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';


const { Value, event, add, cond, eq, set, call } = Animated;

class Panel extends React.Component {
    componentDidMount() {
        setInterval(function(){  }, 500);

    }
    constructor(props) {
        super(props);
    
    
        this.dragY = new Value(0);
        this.offsetY = new Value(0);
        this.gestureState = new Value(-1);

        this.onGestureEvent = event([
          {
            nativeEvent: {
              translationY: this.dragY,
              state: this.gestureState,
            },
          },
        ]);
    
        const addY = add(this.offsetY, this.dragY);

        this.transY = cond(eq(this.gestureState, State.ACTIVE), addY, [
            cond(eq(this.gestureState, State.END), call([addY], this.handlerStateChange)),
            set(this.offsetY, addY),
        ]);
      }

      handlerStateChange(offset) {
          console.log(offset);
      }

    //   _onHandlerStateChange = event => {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //       this._lastOffset.y += event.nativeEvent.translationY;
    //     //   this._translateY.setOffset(this._lastOffset.y);
    //       this._translateY.setValue(100);
    //     }
    //   };

    render() {
        return (
            <PanGestureHandler
                maxPointers={1}
                onGestureEvent={this.onGestureEvent}
                onHandlerStateChange={this.onGestureEvent}
            >
                <PanelContainer 
                    style={[
                        {transform: [{ translateY: this.transY}]}
                    ]}
                >

                </PanelContainer>
            </PanGestureHandler>
        );
    }
}

const PanelContainer = styled(Animated.View)`
    position: absolute;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #ff0000;
`;

export default Panel;































import React from 'react';
import { Dimensions } from "react-native";
import styled from 'styled-components';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { clamp, onGestureEvent, timing, withSpring } from "react-native-redash";


const { Value, event, add, cond, eq, set, call } = Animated;

const { height } = Dimensions.get("window");
const SNAP_TOP = 0;
const SNAP_BOTTOM = height - 50;

const config = {
  damping: 15,
  mass: 0.1,
  stiffness: 50,
  overshootClamping: true,
  restSpeedThreshold: 1,
  restDisplacementThreshold: 1
};

class Panel extends React.Component {
    
    constructor(props) {
        super(props);
        
        this.translationY = new Value(0);
        this.velocityY = new Value(0);
        this.state = new Value(State.UNDETERMINED);
        this.offset = new Value(SNAP_BOTTOM);
    
        // this.dragY = new Value(0);
        // this.offsetY = new Value(0);
        // this.gestureState = new Value(-1);

        // this.onGestureEvent = event([
        //   {
        //     nativeEvent: {
        //       translationY: this.dragY,
        //       state: this.gestureState,
        //     },
        //   },
        // ]);
    
        // const addY = add(this.offsetY, this.dragY);

        // this.transY = cond(eq(this.gestureState, State.ACTIVE), addY, [
        //     cond(eq(this.gestureState, State.END), call([addY], this.handlerStateChange)),
        //     set(this.offsetY, addY),
        // ]);

        // this.gestureHandler = onGestureEvent({
        //     state: this.state,
        //     translationY: this.translationY,
        //     velocityY: this.velocityY
        //   });

        this.transY = withSpring({
            value: clamp(this.translationY, SNAP_TOP, SNAP_BOTTOM),
            velocity: this.velocityY,
            offset: this.offset,
            state: this.state,
            snapPoints: [SNAP_TOP, SNAP_BOTTOM],
            config: config
          });
      }

      handlerStateChange(offset) {
          console.log(withSpring);
      }

    //   _onHandlerStateChange = event => {
    //     if (event.nativeEvent.oldState === State.ACTIVE) {
    //       this._lastOffset.y += event.nativeEvent.translationY;
    //     //   this._translateY.setOffset(this._lastOffset.y);
    //       this._translateY.setValue(100);
    //     }
    //   };

    render() {
        return (
            <PanGestureHandler
                {...this.gestureHandler}
            >
                <PanelContainer 
                    style={[
                        {transform: [{ translateY: this.transY}]}
                    ]}
                >

                </PanelContainer>
            </PanGestureHandler>
        );
    }
}

const PanelContainer = styled(Animated.View)`
    position: absolute;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #ff0000;
`;

export default Panel;
