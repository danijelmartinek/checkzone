import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
import Constants from 'expo-constants';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import Animated from 'react-native-reanimated';
const { block, call, interpolate } = Animated;
import BottomSheet from 'reanimated-bottom-sheet'

const SheetState = {
  CLOSED: 0,
  OPEN: 1,
  UNDEFINED: 2
}

class Panel extends React.Component {

  componentWillUnmount() {
    this.setState({sheetState: SheetState.UNDEFINED});
    this.setState({pointerEvents: 'box-only'});
    this.bs.current.snapTo(0);
  }

  state = {
    pointerEvents: 'box-none',
    allowCancel: true,
    sheetState: SheetState.UNDEFINED
  }

  value_fall = new Animated.Value(1);

  bottomSheetCallback = ([value]) => {
    if(value < 0.5) {
      this.setState({pointerEvents: 'box-only'});
    } 
    if(value > 0.5) {
      this.setState({pointerEvents: 'box-none'});
    }

    //value => 0 -> closed, 1 -> open - because interpolation
    if(this.state.sheetState === SheetState.CLOSED) {
      if(value === 1) {
        this.setState({sheetState: SheetState.OPEN});
        this.props.onSheetClose();
      }
    }

    if(this.state.sheetState === SheetState.OPEN || this.state.sheetState === SheetState.UNDEFINED) {
      if(value === 0) {
        this.setState({sheetState: SheetState.CLOSED});
        this.props.onSheetOpen();
      }
    }

  }

  openSheet = () => {
    this.bs.current.snapTo(1);
  }

  closeSheet = () => {
    this.bs.current.snapTo(0);
  }

  closeSheetWithOpacity = () => {
    if(this.state.allowCancel) {
      this.bs.current.snapTo(0);
    }
  }

  renderInner = () => (
    <View
      style={{
        height: this.props.height - hp('2%'),
        width: wp('95%'),
        backgroundColor: this.props.backgroundColor || '#ffffff',
        alignSelf: 'center',
        borderRadius: hp('1%')
      }}
    >
      {this.props.children}
    </View>
  )

  bgOpacity = interpolate(this.value_fall, {
    inputRange: [0, 1],
    outputRange: [0.7, 0],
  })

  bs = React.createRef()
  render() {
    return (
      <View 
        style={styles.container} 
        pointerEvents={'box-none'}
      >
        <BottomSheet
          ref={this.bs}
          snapPoints={[0, this.props.height]}
          renderContent={this.renderInner}
          callbackNode={this.value_fall}
          enabledGestureInteraction={this.state.allowCancel}
        />
        <Animated.Code
        exec={
            block([
                call([this.value_fall], this.bottomSheetCallback),
            ])

        }/>
        <TouchableWithoutFeedback onPress={() => this.closeSheetWithOpacity()}>
          <Animated.View style={{
              position: 'absolute',
              height: hp('100%') + Constants.statusBarHeight,
              width: wp('100%'),
              backgroundColor: '#000000',
              opacity: this.bgOpacity
            }}
            pointerEvents={this.state.pointerEvents}
          ></Animated.View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
    zIndex: 999,
  }
})

export default Panel;