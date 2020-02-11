import React from 'react';
import Constants from 'expo-constants';
import styled, { withTheme } from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import HorizontalLine from '_atoms/horizontalLine/index.js';
import Navigation from '_molecules/_panel/navigation/index.js';
import ProjectSelect from '_molecules/_panel/projectSelect/index.js';
import CurrentLogInfo from '_molecules/_panel/currentLogInfo/index.js';
// import ProjectLogInfo from '_molecules/_panel/projectLogInfo/index.js';
import ProjectTodo from '_molecules/_panel/projectTodo/index.js';

import Animated from 'react-native-reanimated';
const { block, call } = Animated;

import BottomSheet from 'reanimated-bottom-sheet'

class Panel extends React.Component {

    value_fall = new Animated.Value(0);
    bsPos = 0;

    bottomSheetCallback = ([value]) => {
        this.bsPos = Math.round(value * 10)

        //console.log(value) -> to see which breakponts to include in togglePanel
    }

    togglePanel = () => {
        if(this.bsPos == 0) {
            this.bs.current.snapTo(0);
        } else if(this.bsPos == 8) {
            this.bs.current.snapTo(2);
        } else if(this.bsPos == 10) {
            this.bs.current.snapTo(1);
        }
    }


    closePanelEvent = () => {
        this.bs.current.snapTo(0);
    }

    renderInner = () => (
        <ContentWrapper>
            <Navigation
                navigation={this.props.navigation}
                closePanel={this.closePanelEvent}
            ></Navigation>

            <HorizontalLine/>

            <ProjectSelect></ProjectSelect>

            <CurrentLogInfo></CurrentLogInfo>

            {/* <ProjectLogInfo></ProjectLogInfo> */}
            
            <ProjectTasksText>Tasks</ProjectTasksText>
            <ProjectTodo></ProjectTodo>
        </ContentWrapper>
    )


    renderHeader = () => (
        <HookContainer
            onPress={this.togglePanel}
            activeOpacity={this.props.theme.options.activeOpacity}
        >
            <HookWrapper>
                <Hook></Hook>
            </HookWrapper>
            <Animated.Code
            exec={
                block([
                    call([this.value_fall], this.bottomSheetCallback),
                ])

            }/>
        </HookContainer>
    )

    bs = React.createRef()
    
    render() {
        return (
            <ContentContainer pointerEvents={'box-none'}>
                <BottomSheet
                    ref={this.bs}
                    snapPoints={[hp('5%'), hp('20%'), hp('100%') - Constants.statusBarHeight]}
                    renderContent={this.renderInner}
                    renderHeader={this.renderHeader}
                    enabledBottomClamp={true}
                    enabledInnerScrolling={false}
                    enabledContentTapInteraction={false}
                    callbackNode={this.value_fall}      
                />
            </ContentContainer>
        );
    }
}

const ContentContainer = styled.View`
    position: absolute;
    bottom: 0px;
    height: ${hp('100%')};
    width: ${wp('100%')};
`;

const ContentWrapper = styled.View`
    height: ${hp('95%')};
    width: ${wp('100%')};
    background-color: ${props => props.theme.colors.primary || '#ffffff'}};
`;

const HookContainer = styled.TouchableOpacity`
    width: ${wp('100%')};
    opacity: ${props => props.theme.options.initialOpacity || 1};
    background-color: ${props => props.theme.colors.primary || '#ffffff'}};
    borderTopLeftRadius: ${hp('2%')};
    borderTopRightRadius: ${hp('2%')};
`;

const HookWrapper = styled.View`
    height: ${hp('5%')};
    width: ${wp('100%')};
    display: flex;
    justify-content: center;
`;

const Hook = styled.View`
    height: ${hp('0.5%')};
    margin: 0px ${hp('24%')}px 0px ${hp('24%')}px;
    border-radius: ${hp('5%')};
    background-color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
`;

const ProjectTasksText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#000000'}};
    padding: ${hp('2%')}px;

    ${props => props.theme.fonts.size.beta}
    text-transform: uppercase;
`;

export default withTheme(Panel);
