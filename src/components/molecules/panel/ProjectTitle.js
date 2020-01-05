import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class ProjectTitle extends React.Component {
    render() {
        return (
            <ProjectTitleContainer>
                <ProjectTitleWrapper>
                    <ProjectColor color={'purple'}></ProjectColor>
                    <ProjectTitleText>Project one</ProjectTitleText>
                </ProjectTitleWrapper>
            </ProjectTitleContainer>
        );
    }
}

const ProjectTitleContainer = styled.View`
    display: flex;
    align-items: center;
    text-align: center;
`;

const ProjectTitleWrapper = styled.View`
    flex-direction: row;
    margin-top: ${hp('1.5%')}px;
`;

const ProjectColor = styled.View`
    width: ${hp('3%')};
    height: ${hp('3%')};
    margin-top: ${hp('0.1%')}px;
    border-radius: ${hp('1%')};
    background-color: ${props => props.color || '#ffffff'}}
`;

const ProjectTitleText = styled.Text`
    font-size: ${hp('2.5%')};
    color: #ffffff;
    margin-left: 10px;
`;

export default ProjectTitle;
