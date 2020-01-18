import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import {
    faClock,
    faProjectDiagram,
    faChartBar,
    faTasks,
    faCog
} from '@fortawesome/free-solid-svg-icons';

import NavButton from '_atoms/_panel/navButton';

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
            {
                view: 'Tasks',
                text: 'Settings',
                icon: faCog
            },
        ]
    }

    render() {
        return (
            <NavContainer>
                <NavWrapper>
                    {this.state.navItems.map((navItem, i) => (
                        <NavButton 
                            navigation={this.props.navigation} 
                            item={navItem} 
                            key={i}
                            onPress={() => this.props.closePanel()}
                        ></NavButton>
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
    padding-top: ${hp('2.5%')}px;
`;

const NavWrapper = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
    width: ${wp('100%') * 0.85};
`;

export default Navigation;
