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
                        size={32}
                        style={{color: '#ffffff'}}
                    />
                </NavItem>
                <NavItemElementText>{this.props.item.text}</NavItemElementText>
            </NavItemOpacity>
        );
    }
}

const NavItem = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
    margin ${hp('1%')};
    padding-top: ${hp('4.2%')};
`;

const NavItemOpacity = styled.TouchableOpacity`
    opacity: 0.4;
`;

const NavItemElementText = styled.Text`
    color: #ffffff;
    text-align: center;
    padding-top: ${hp('2%')};
`;

export default NavButton;
