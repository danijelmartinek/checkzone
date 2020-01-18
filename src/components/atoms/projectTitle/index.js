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
    height: ${hp('5%')};
    display: flex;
    flex-direction: column;
    align-items: ${props => props.align || 'center'}};
    justify-content: center;
`;

const ProjectTitleWrapper = styled.View`
    display: flex;
    flex-direction: row;
    text-align: center;
`;

const ProjectColor = styled.View`
    align-self: center;
    width: ${props => hp('2%') * props.scale || hp('2%')};
    height: ${props => hp('2%') * props.scale || hp('2%')};
    margin-top: ${props => hp('0.2%') * props.scale || hp('0.2%')}px;
    border-radius: ${props => hp('0.5%') * props.scale || hp('0.5%')};
    background-color: ${props => props.color || '#ffffff'}}
`;

const ProjectTitleText = styled.Text`
    font-size: ${props => hp('2.5%') * props.scale || hp('2.5%')};
    color: ${props => props.textColor || '#ffffff'}};
    margin-left: ${props => hp('1.2%') * props.scale || hp('1.2%')};
    margin-right: ${props => hp('1.2%') * props.scale || hp('1.2%')};
`;

export default ProjectTitle;
