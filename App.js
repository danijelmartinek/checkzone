import * as React from "react";
import { View, StyleSheet } from "react-native";
import Constants from "expo-constants";
import Counter from './components/Counter';
import Panel from './components/Panel';

export default class App extends React.Component {

	render() {
		return (
			<View style={styles.container}>
				<Counter></Counter>
				<Panel></Panel>
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
	}
});
