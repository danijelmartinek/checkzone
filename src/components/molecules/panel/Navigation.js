import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
    faClock,
    faProjectDiagram,
    faChartBar,
    faTasks,
} from '@fortawesome/free-solid-svg-icons';

class Navigation extends React.Component {
    state = {
        navItems: [
            {
                view: 'Logs',
                text: 'Logs',
                icon: faClock
            },
            {
                view: 'Tasks',
                text: 'Projects',
                icon: faProjectDiagram
            },
            {
                view: 'Tasks',
                text: 'Tasks',
                icon: faTasks
            },
            {
                view: 'Tasks',
                text: 'Statistics',
                icon: faChartBar
            },
        ]
    }

    onNavClick(screen) {
        this.props.navigation.navigate(screen);
        this.props.closePanel();
    }

    render() {
        return (
            <NavContainer>
                <NavWrapper>
                    {this.state.navItems.map((navItem, i) => (
                        <NavItemOpacity
                            activeOpacity={1}
                            onPress={() => this.onNavClick(navItem.view)}
                            key={i}
                        >
                            <NavItem>
                                <FontAwesomeIcon
                                    icon={navItem.icon}
                                    size={32}
                                    style={{color: '#ffffff'}}
                                />
                            </NavItem>
                            <NavItemElementText>{navItem.text}</NavItemElementText>
                        </NavItemOpacity >
                    ))}
                </NavWrapper>
            </NavContainer>
        );
    }
}

const NavContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: ${hp('2%')}px;
    margin-bottom: ${hp('6%')}px;
`;

const NavWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    width: ${wp('100%') * 0.85};
`;

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

export default Navigation;
