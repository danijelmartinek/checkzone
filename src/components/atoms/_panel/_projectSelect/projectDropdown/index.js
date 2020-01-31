import React from 'react';
import styled from 'styled-components';
import {
    PanResponder
} from 'react-native';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';

import Collapsible from 'react-native-collapsible';

import ProjectTitle from '_atoms/projectTitle/index.js';

class ProjectDropdown extends React.Component {

    _onGrant() {
        this.setState({ dragPanel: false });
        return true;
    }
    _onRelease() {
        this.setState({ dragPanel: true });
    }

    constructor(props) {
        super(props);

        this._onGrant = this._onGrant.bind(this);
        this._onRelease = this._onRelease.bind(this);
        
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: this._onGrant,
            onPanResponderRelease: this._onRelease,
            onPanResponderTerminate: this._onRelease,
        });
    }

    onProjectSelect = (index, obj) => {
        this.props.onSelect(index, obj);
    }

    render() {
        return (
            <Collapsible style={{paddingTop: hp('1%')}} collapsed={!this.props.isOpen}>
                <ProjectDropdownWrapper {...this._panResponder.panHandlers} overScrollMode={'never'}>
                    {this.props.projects.map((project, i) => (
                        <ProjectOption key={i} activeOpacity={0.5} onPress={() => this.onProjectSelect(i, project)}>
                            <ProjectTitle 
                                color={project.color} 
                                title={project.title} 
                                colorScale={1}
                                fontSize={'gama'}
                            ></ProjectTitle>
                        </ProjectOption>
                    ))}
                </ProjectDropdownWrapper>
            </Collapsible>
        );
    }
}

const ProjectDropdownWrapper = styled.ScrollView`
    max-height: ${hp('50%')};
`;

const ProjectOption = styled.TouchableOpacity`
    margin: ${hp('0.5%')}px;
`;

export default ProjectDropdown;
