import React from 'react';
import styled from 'styled-components';
import {
    View,
    Animated,
    TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import SlidingUpPanel from 'rn-sliding-up-panel';

import Navigation from '_molecules/panel/Navigation.js';
import HorizontalLine from '_atoms/horizontalLine/index.js';

import ProjectTitle from '_molecules/panel/ProjectTitle.js';
import CurrentLogInfo from '_molecules/panel/CurrentLogInfo.js';
import ProjectLogInfo from '_molecules/panel/ProjectLogInfo.js';
import ProjectTodo from '_molecules/panel/ProjectTodo.js';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

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
            <PanelContainer pointerEvents={'box-none'}>
                <SlidingUpPanel
                    ref={c => (this._panel = c)}
                    draggableRange={{ top: top - hp('7.5%'), bottom: bottom }}
                    animatedValue={this._draggedValue}
                    snappingPoints={[hp('20%')]}
                    height={hp('100%')}
                    friction={1}
                    showBackdrop={false}
                >
                    <PanelWrapper>
                        <TouchableOpacity
                            onPress={this.togglePanel}
                            activeOpacity={0.8}
                        >
                            <HookContainer>
                                <Hook></Hook>
                            </HookContainer>
                        </TouchableOpacity>

                        <Navigation
                            navigation={this.props.navigation}
                            closePanel={this.closePanelEvent}
                        ></Navigation>

                        <HorizontalLine />

                        <ProjectTitle></ProjectTitle>

                        <CurrentLogInfo></CurrentLogInfo>

                        <ProjectLogInfo></ProjectLogInfo>
                        
                        <ProjectTasksText>Tasks</ProjectTasksText>
                        <ProjectTodo></ProjectTodo>

                        <SettingsButtonContainer>
                            <TouchableOpacity
                                activeOpacity={1}
                                style={{opacity: 0.5}}
                            >
                                <View>
                                    <FontAwesomeIcon
                                        icon={faCog}
                                        size={24}
                                        style={{color: '#ffffff'}}
                                    />
                                </View>
                            </TouchableOpacity>
                        </SettingsButtonContainer>
                    </PanelWrapper>
                </SlidingUpPanel>
            </PanelContainer>
        );
    }
}

const PanelContainer = styled.View`
    position: absolute;
    height: ${hp('100%')};
    width: ${wp('100%')};
`;

const PanelWrapper = styled.View`
    flex: 1;
    position: relative;
    background-color: #ffffff;
    background-color: #101424;
    border-top-left-radius: ${wp('5%')};
    border-top-right-radius: ${wp('5%')};
`;

const HookContainer = styled.View`
    height: ${hp('7.5%')};
    width: ${wp('100%')};
`;

const Hook = styled.View`
    height: ${hp('1%')};
    margin: ${hp('3.5%')}px ${hp('5%')}px 0px ${hp('5%')}px;
    border-radius: ${hp('5%')};
    background-color: #ffffff;
    opacity: 0.2;
`;

const SettingsButtonContainer = styled.View`
    position: absolute;
    right: ${wp('2%')};
    top: ${hp('50.5%')};
    width: ${wp('10%')};
`;

const ProjectTasksText = styled.Text`
    color: #ffffff;
    font-size: ${hp('3%')};
    padding: ${hp('1%')}px;
`;

export default Panel;
