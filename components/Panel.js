import React from "react";
import { Text, View, Dimensions, Animated } from "react-native";

import SlidingUpPanel from "rn-sliding-up-panel";

const { height, width } = Dimensions.get("window");

const styles = {
  container: {
    position: 'absolute',
    height: height,
    width: width,
  },
  panel: {
    flex: 1,
    backgroundColor: "white",
    position: "relative",
    backgroundColor: "#010014",
  },
  textHeader: {
    fontSize: 28,
    color: "#FFF"
  }
};

class Panel extends React.Component {
  static defaultProps = {
    draggableRange: { top: height, bottom: 50 }
  };

  _draggedValue = new Animated.Value(50);

  render() {
    const { top, bottom } = this.props.draggableRange;

    return (
      <View style={styles.container}>
        <SlidingUpPanel
          ref={c => (this._panel = c)}
          draggableRange={{ top: top - 50, bottom: bottom }}
          animatedValue={this._draggedValue}
          snappingPoints={[300]}
          height={height}
          friction={1}
          showBackdrop={false}
        >
          <View style={styles.panel}>
            <View style={styles.container}>
              <Text style={{position: 'relative', top: 0}}>Bottom sheet content</Text>
            </View>
          </View>
        </SlidingUpPanel>
      </View>
    );
  }
}

export default Panel;
