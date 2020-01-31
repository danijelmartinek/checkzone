import React from 'react';
import styled, { withTheme } from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesome5 } from '@expo/vector-icons';

class CloseTopBar extends React.Component {
    render() {
        return (
            <TopBar>
                <CloseButton onPress={() => this.props.navigation.goBack()} activeOpacity={0.5}>
                    <FontAwesome5
                        name={'times'}
                        size={20}
                        style={{color: this.props.theme.colors.topBar.text}}
                    />
                </CloseButton>
            </TopBar>
        );
    }
}

const TopBar = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: ${wp('100%')};
`;

const CloseButton = styled.TouchableOpacity`
    width: ${wp('20%')};
    padding: ${hp('2.5%')}px;
    z-index: 900;
`;

export default withTheme(CloseTopBar);
