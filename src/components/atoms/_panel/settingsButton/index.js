import React from 'react';
import styled from 'styled-components';

import {
    View,
    TouchableOpacity,
} from 'react-native';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

class SettingsButton extends React.Component {
    render() {
        return (
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
        );
    }
}

export default SettingsButton;
