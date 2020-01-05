import React from 'react';
import styled from 'styled-components';
import { View } from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class ProjectLogInfo extends React.Component {
    render() {
        return (
            <ProjectLogInfoContainer>
                <LogInfoItemContainer>
                    <LogInfoItem>
                        <LogInfoItemHeadline>
                            Total active time:
                        </LogInfoItemHeadline>
                        <View>
                            <LogInfoItemText>66:33</LogInfoItemText>
                        </View>
                    </LogInfoItem>
                    <LogInfoItem>
                        <LogInfoItemHeadline>
                            Total pause time:
                        </LogInfoItemHeadline>
                        <View>
                            <LogInfoItemText>02:33</LogInfoItemText>
                        </View>
                    </LogInfoItem>
                </LogInfoItemContainer>
            </ProjectLogInfoContainer>
        );
    }
}

const ProjectLogInfoContainer = styled.View`
    display: flex;
    align-items: center;
    text-align: center;
`;

const LogInfoItemContainer = styled.View`
    display: flex;
    flex-direction: row;
`;

const LogInfoItem = styled.View`
    padding: ${hp('2%')}px;
    padding-top: 0px;
    justify-content: center;
    align-items: center;
`;

const LogInfoItemHeadline = styled.Text`
    color: #ffffff;
    font-size: ${hp('1.8%')};
`;

const LogInfoItemText = styled.Text`
    color: #ffffff;
    font-size: ${hp('4%')};
`;

export default ProjectLogInfo;
