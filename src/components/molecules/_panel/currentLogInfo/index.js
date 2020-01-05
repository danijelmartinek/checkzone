import React from 'react';
import styled from 'styled-components';

import StatusDot from '_atoms/_panel/statusDot/index.js';
import TextInfo from '_atoms/_panel/textInfo/index.js';

class CurrentLogInfo extends React.Component {
    render() {
        return (
            <LogInfoContainer>
                <CurrentStats>
                    <StatusDot color={'#39ff14'} text={'on'}></StatusDot>
                    <TextInfo 
                        description={'start time:'} 
                        text={'18:30'}
                        descSize={12}
                        textSize={16}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>
                    <TextInfo 
                        description={'end time:'} 
                        text={'20:30'}
                        descSize={12}
                        textSize={16}
                        descUppercase={true}
                        textUppercase={true}
                    ></TextInfo>

                </CurrentStats>
            </LogInfoContainer>
        );
    }
}

const LogInfoContainer = styled.View`
    display: flex;
    align-items: center;
    text-align: center;
`;

const CurrentStats = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
`;

export default CurrentLogInfo;
