import React from 'react';
import {
    View,
    Text,
    Dimensions,
    Animated,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import SlidingUpPanel from 'rn-sliding-up-panel';

import Navigation from './Navigation.js';
import HorizontalLine from './HorizontalLine.js';

import ProjectTitle from './ProjectTitle.js';
import CurrentLogInfo from './CurrentLogInfo.js';
import ProjectLogInfo from './ProjectLogInfo.js';
import ProjectTodo from './ProjectTodo.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from './dimensions.js';

class Panel extends React.Component {
    static defaultProps = {
        draggableRange: { top: hp('100%'), bottom: hp('7.5%') },
    };

    _draggedValue = new Animated.Value(hp('7.5%'));

    closePanelEvent = () => {
        this._panel.show({ toValue: hp('7.5%'), velocity: 3 });
    };

    togglePanel = () => {
        const { top } = this.props.draggableRange;
        const maxPos = top - hp('7.5%');
        const currentPanelValue = JSON.stringify(this._draggedValue);

        if (currentPanelValue === String(hp('7.5%'))) {
            this._panel.show(hp('20%'));
        } else if (currentPanelValue === String(hp('20%'))) {
            this._panel.show(maxPos);
        } else {
            this._panel.hide();
        }
    };

    render() {
        const { top, bottom } = this.props.draggableRange;

        return (
            <View style={styles.container} pointerEvents={'box-none'}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{ top: top - hp('7.5%'), bottom: bottom }}
                    animatedValue={this._draggedValue}
                    snappingPoints={[hp('20%')]}
                    height={hp('100%')}
                    friction={1}
                    showBackdrop={false}
                >
                    <View style={styles.panel}>
                        <TouchableOpacity
                            onPress={this.togglePanel}
                            activeOpacity={0.8}
                        >
                            <View style={styles.toggleHook}>
                                <View style={styles.hook}></View>
                            </View>
                        </TouchableOpacity>

                        <Navigation
                            navigation={this.props.navigation}
                            closePanel={this.closePanelEvent}
                        ></Navigation>

                        <HorizontalLine />

                        <ProjectTitle></ProjectTitle>

                        <CurrentLogInfo></CurrentLogInfo>

                        <ProjectLogInfo></ProjectLogInfo>
                        
                        <Text style={styles.projectTasks}>Tasks</Text>
                        <ProjectTodo></ProjectTodo>

                        <View style={styles.settingsButtonContainer}>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={styles.settingsButtonOpacity}
                            >
                                <View style={styles.navItem}>
                                    <FontAwesomeIcon
                                        icon={faCog}
                                        size={24}
                                        style={styles.settingsButton}
                                    />
                                </View>
                            </TouchableOpacity>
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
        height: hp('100%'),
        width: wp('100%'),
    },
    panel: {
        flex: 1,
        backgroundColor: 'white',
        position: 'relative',
        backgroundColor: '#101424',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
    },

    hook: {
        height: hp('1%'),
        marginTop: hp('3.5%'),
        marginLeft: hp('5%'),
        marginRight: hp('5%'),
        borderRadius: hp('5%'),
        backgroundColor: '#ffffff',
        opacity: 0.2,
    },

    toggleHook: {
        height: hp('7.5%'),
        width: wp('100%'),
    },

    settingsButtonContainer: {
        position: 'absolute',
        right: wp('2%'),
        top: hp('50.5%'),
        width: wp('10%'),
    },

    settingsButton: {
        color: '#ffffff',
    },

    settingsButtonOpacity: {
        opacity: 0.5,
    },

    projectTasks: {
        color: '#ffffff',
        fontSize: hp('3%'),
        padding: hp('1%')
    }
});

export default Panel;
