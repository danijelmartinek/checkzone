import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

class ProjectTitle extends React.Component {
    render() {
        return (
            <ProjectTitleContainer align={this.props.align}>
                <ProjectTitleWrapper scale={this.props.scale}>
                    <ProjectColor color={this.props.color} scale={this.props.scale}></ProjectColor>
                    <ProjectTitleText textColor={this.props.textColor} scale={this.props.scale}>{this.props.title}</ProjectTitleText>
                </ProjectTitleWrapper>
            </ProjectTitleContainer>
        );
    }
}

const ProjectTitleContainer = styled.View`
    display: flex;
    align-items: ${props => props.align || 'center'}};
    text-align: center;
`;

const ProjectTitleWrapper = styled.View`
    flex-direction: row;
    margin: ${props => hp('1%') * props.scale || hp('1%')}px;
`;

const ProjectColor = styled.View`
    width: ${props => hp('2%') * props.scale || hp('2%')};
    height: ${props => hp('2%') * props.scale || hp('2%')};
    margin-top: ${props => hp('0.8%') * props.scale || hp('0.8%')}px;
    border-radius: ${props => hp('0.5%') * props.scale || hp('0.5%')};
    background-color: ${props => props.color || '#ffffff'}}
`;

const ProjectTitleText = styled.Text`
    font-size: ${props => hp('2.5%') * props.scale || hp('2.5%')};
    color: ${props => props.textColor || '#ffffff'}};
    margin-left: ${props => hp('1%') * props.scale || hp('1%')};
`;

export default ProjectTitle;
