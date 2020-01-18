import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import {
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class CloseTopBar extends React.Component {
    render() {
        return (
            <TopBar>
                <CloseButton onPress={() => this.props.navigation.goBack()} activeOpacity={0.5}>
                    <FontAwesomeIcon
                        icon={faTimes}
                        size={20}
                        style={{color: '#ffffff'}}
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

export default CloseTopBar;
