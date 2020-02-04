import * as React from 'react';
import * as Font from 'expo-font';
import {View} from 'react-native';

import { connect } from 'react-redux'
import { startCounter, resumeCounter, updateCounter, refCounter } from '_redux/actions.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import TimeDisplay from '_atoms/_counter/timeDisplay/index.js'; 
import TextButton from '_atoms/_counter/textButton/index.js';

class Counter extends React.Component {
    
    async componentDidMount() {
        await Font.loadAsync({
            Speck: require('_assets/fonts/Speck.otf'),
        });

        this.setState({ fontLoaded: true });

        this.props.refCounter(this);
    }

    constructor(props) {
        super(props);
        this.state = {
            fontLoaded: false,
            mainButton: 'Start',
            secondButton: 'Pause'
        }

        this.timeDisplay = React.createRef();
    }

    toggleTime = () => {
        this.timeDisplay.current.startCounter()

        if(this.state.mainButton == 'Start') {
            this.setState(prevState => ({
                mainButton: 'Stop'
            }));
            
            if(this.props.LOG_INFO.countTime === 0){
                this.props.startCounter();
            } else {
                this.props.resumeCounter();
            }
        } else {
            this.setState(prevState => ({
                mainButton: 'Start'
            }));

            this.props.navigation.navigate('LogSave');

            this.props.updateCounter({
                active: false,
                startTime: this.props.LOG_INFO.startTime,
                countTime: this.timeDisplay.current.totalSeconds,
                endTime: new Date(),
                totalSessionTime: this.timeDisplay.current.totalSeconds,
                pauseTime: 0,
                pauseEntities: [],
                tasks: this.props.LOG_INFO.tasks,
                commits: this.props.LOG_INFO.commits
            });
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

const mapStateToProps = (state) => {
    return{
        LOG_INFO: state.LOG_INFO
    };
}
const mapDispatchToProps = dispatch => {
    return {
        startCounter: () => dispatch(startCounter()),
        resumeCounter: () => dispatch(resumeCounter()),
        updateCounter: (obj) => dispatch(updateCounter(obj)),
        refCounter: (ref) => dispatch(refCounter(ref)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);