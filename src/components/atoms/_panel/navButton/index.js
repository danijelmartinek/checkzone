import React from 'react';
import styled, { withTheme } from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesome5 } from '@expo/vector-icons';

class NavButton extends React.Component {
    
    onNavClick(screen) {
        this.props.navigation.navigate(screen);
        this.props.onPress();
    }

    render() {
        return (
            <NavItemOpacity
                activeOpacity={this.props.theme.options.activeOpacity}
                onPress={() => this.onNavClick(this.props.item.view)}
            >
                <NavItem>
                    <NavItemElementIcon 
                        name={this.props.item.icon}
                        size={Number(hp('3.5%'))}
                    ></NavItemElementIcon>
                </NavItem>
                <NavItem>
                    <NavItemElementText>{this.props.item.text}</NavItemElementText>
                </NavItem>
            </NavItemOpacity>
        );
    }
}

const NavItemOpacity = styled.TouchableOpacity`
    height: ${hp('8%')};
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    margin-bottom: ${hp('3%')};
    opacity: ${props => props.theme.options.initialOpacity || 1};
`;

const NavItem = styled.View`
    flex: 1;
`;

const NavItemElementIcon = styled(FontAwesome5)`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
`;

const NavItemElementText = styled.Text`
    color: ${props => props.theme.colors.textPrimary || '#ffffff'}};
    text-align: center;
    font-size: ${hp('2%')};
`;

export default withTheme(NavButton);
