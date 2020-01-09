import React from 'react';
import styled from 'styled-components';

class HorizontalLine extends React.Component {
    render() {
        return <Line></Line>;
    }
}

const Line = styled.View`
    border: 1px solid #ffffff;
    margin: 0px 20px 0px 20px;
    opacity: 0.1;
`;

export default HorizontalLine;
