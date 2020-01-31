import React from 'react';
import styled, { withTheme } from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesome5 } from '@expo/vector-icons';

class TopBar extends React.Component {
    render() {
        return (
            <TopBarContainer>
                <BackButton onPress={() => this.props.navigation.goBack()} activeOpacity={0.5}>
                    <FontAwesome5
                        name={'arrow-left'}
                        size={20}
                        style={{color: this.props.theme.colors.topBar.text}}
                    />
                    {/* <TextBack>
                        BACK
                    </TextBack> */}
                </BackButton>
                <ViewHeader>
                    {(this.props.name? this.props.name: this.props.navigation.state.routeName)}
                </ViewHeader>
            </TopBarContainer>
        )
    }
}

const TopBarContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: ${wp('100%')};
`;

const BackButton = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    width: ${wp('20%')};
    padding: ${hp('2.5%')}px;
    z-index: 900;
`;

// const TextBack = styled.Text`
//     color: ${props => props.theme.colors.topBar.text || '#ffffff'}};
//     margin-left: ${wp('2%')};
//     align-self: center;
// `;

const ViewHeader = styled.Text`
    position: absolute;
    width: ${wp('100%')};
    text-align: center;
    color: ${props => props.theme.colors.topBar.text || '#ffffff'}};
    align-self: center;
    font-size: ${hp('3%')};
`;

export default withTheme(TopBar);
