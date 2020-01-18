import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

class NavButton extends React.Component {
    
    onNavClick(screen) {
        this.props.navigation.navigate(screen);
        this.props.onPress();
    }

    render() {
        return (
            <NavItemOpacity
                activeOpacity={1}
                onPress={() => this.onNavClick(this.props.item.view)}
            >
                <NavItem>
                    <FontAwesomeIcon
                        icon={this.props.item.icon}
                        size={Number(hp('5%'))}
                        style={{color: '#ffffff'}}
                    />
                </NavItem>
                <NavItem>
                    <NavItemElementText>{this.props.item.text}</NavItemElementText>
                </NavItem>
            </NavItemOpacity>
        );
    }
}

const NavItemOpacity = styled.TouchableOpacity`
    height: ${hp('11%')};
    opacity: 0.5;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center
`;

const NavItem = styled.View`
    flex: 1;
`;

const NavItemElementText = styled.Text`
    color: #ffffff;
    text-align: center;
    font-size: ${hp('2%')};
`;

export default NavButton;
