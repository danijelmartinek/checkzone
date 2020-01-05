import React from 'react';
import styled from 'styled-components';

import TextInfo from '_atoms/_panel/textInfo/index.js';

class ProjectLogInfo extends React.Component {
    render() {
        return (
            <ProjectLogInfoContainer>
                <LogInfoItemContainer>
                    <TextInfo 
                        description={'Total time:'} 
                        text={'18:30'}
                        descSize={16}
                        textSize={20}
                        textUppercase={true}
                    ></TextInfo>
                    <TextInfo 
                        description={'Total pause:'} 
                        text={'18:30'}
                        descSize={16}
                        textSize={20}
                        textUppercase={true}
                    ></TextInfo>
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

export default ProjectLogInfo;
