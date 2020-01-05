import * as React from 'react';
import * as Font from 'expo-font';
import {View} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import TimeDisplay from '_atoms/timeDisplay/index.js';
import TextButton from '_atoms/textButton/index.js';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            mainButton: 'Start',
            secondButton: 'Pause'
        }

        this.timeDisplay = React.createRef();
    }

    async componentDidMount() {
        await Font.loadAsync({
            Speck: require('_assets/fonts/Speck.otf'),
        });

        this.setState({ fontLoaded: true });
    }

    toggleTime = () => {
        this.timeDisplay.current.startCounter()

        if(this.state.mainButton == 'Start') {
            this.setState(prevState => ({
                mainButton: 'Stop'
            }));
        } else {
            this.setState(prevState => ({
                mainButton: 'Start'
            }));
        }
    }

    togglePause = () => {
        this.timeDisplay.current.startCounter()

        if(this.state.secondButton == 'Pause') {
            this.setState(prevState => ({
                secondButton: 'Resume'
            }));
        } else {
            this.setState(prevState => ({
                secondButton: 'Pause'
            }));
        }
    }

    render() {
        return (
            <View>
                {this.state.fontLoaded ? (
                    <TimeDisplay ref={this.timeDisplay}></TimeDisplay>
                ) : null}

                <TextButton onPress={() => this.toggleTime()} fontSize={hp('6%')}>{this.state.mainButton}</TextButton>
                <TextButton onPress={() => this.togglePause()} fontSize={hp('3%')}>{this.state.secondButton}</TextButton>
            </View>
        );
    }
}

export default Counter;