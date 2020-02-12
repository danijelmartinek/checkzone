import React from 'react'
import Svg, { Path } from 'react-native-svg';
import Animated, { Easing } from 'react-native-reanimated';

const AnimatedPath = Animated.createAnimatedComponent(Path);
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
	ON: 1,
	OFF: 0,
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
		cond(state.finished, [
			// we stop
			stopClock(clock),
			
			// set flag ready to be restarted
			set(state.finished, 0),
			// same value as the initial defined in the state creation
			set(state.position, 0),
	
			// very important to reset this ones !!! as mentioned in the doc about timing is saying
			set(state.time, 0),
			set(state.frameTime, 0),
			
			// and we restart
			startClock(clock),
		]),
		state.position,
	]);
};

const runOffset = (clock, value, duration, dest, active) => {
	return block([
		cond(eq(active, ANIMATION.ON), set(value, runTiming(clock, value, dest.end, duration))),
	]);
};

class Spinner extends React.Component {

	//--props-- : --default--
	// speed : 1000
	// size : 100
	// color : gray
	// direction : 0
	// strokeWidth : 2
	// opacity : 1

	constructor(props) {
		super(props)

		this.clock = new Clock();
		this.rotationOffset = new Value(0);
		this.active = new Value(0);
		this.startTime = null;
	}

	componentDidMount() {
		this.startRotation();
	}

	startRotation = () => {
		this.active.setValue(1);
		this.startTime = new Date();
	}

	stopRotation = () => {
		this.active.setValue(0);
		this.rotationOffset.setValue(0);

		// this.preventStopAnimationFlick(() => {
		// 	this.active.setValue(0);
		// 	this.rotationOffset.setValue(0);
		// }, this.startTime, this.props.speed);
	}

	// //function that prevents loop flick if stopAnimation is not called in time that is multiple of loopDuration
	// //allows smooth ending of animation
	// preventStopAnimationFlick = (callback, startTime, loopDuration) => {
	// 	const rotationTimeRounded = new Date() - startTime.getTime();
	// 	let deltaMultiply = 0;

	// 	if(rotationTimeRounded < loopDuration) {
	// 		deltaMultiply = (loopDuration - rotationTimeRounded) / loopDuration;
	// 	} 
	// 	if(rotationTimeRounded > loopDuration) {
	// 		deltaMultiply = rotationTimeRounded / loopDuration - Math.floor(rotationTimeRounded / loopDuration);
	// 	}
	// 	setTimeout(callback, deltaMultiply * loopDuration);
	// }

	render() {
		return (
			<React.Fragment>
				<Animated.Code>
				{() => 
					block([
						runOffset(this.clock, this.rotationOffset, this.props.speed || 1000, {
							end: (this.props.direction === 1? 80: -80) || -80,
							start: 0,
						}, this.active)
					])
				}
				</Animated.Code>

				<Svg height={this.props.size || 100} width={this.props.size || 100} viewBox="0 0 40 40">
					<AnimatedPath
						d="M10,10 h20 v20 h-20 z" 
						fill="transparent" 
						opacity={this.props.opacity || 1}
						stroke={this.props.color || 'gray'} 
						strokeWidth={this.props.strokeWidth || 2} 
						strokeDasharray="20, 20"
						strokeLinecap="round"
						strokeDashoffset={this.rotationOffset}
					></AnimatedPath>
				</Svg>
			</React.Fragment>
		)
	}
}

export default Spinner;