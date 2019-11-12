import React from "react";
import { View, Button, Dimensions, Animated, StyleSheet } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const { height, width } = Dimensions.get("window");

class Panel extends React.Component {
  
  static defaultProps = {
    draggableRange: { top: height, bottom: 30 }
  };

  _draggedValue = new Animated.Value(30);

  render() {
    const { top, bottom } = this.props.draggableRange;

    return (
      <View style={styles.container}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: top - 30, bottom: bottom }}
          animatedValue={this._draggedValue}
          snappingPoints={[200]}
          height={height}
          friction={1}
          showBackdrop={false}
        >
          <View style={styles.panel}>
              <View style={styles.hook}></View>
              <View>
                <Button
                  style={{marginTop: 50}}
                  title="Go to Tasks"
                  onPress={() => this.props.navigation.navigate('Tasks')}
                />
              </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: height,
    width: width,
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    backgroundColor: "#101424",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25
  },

  hook: {
    height: 5,
    marginTop: 25,
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    opacity: 0.2
  }
});

export default Panel;
