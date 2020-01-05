import React from 'react';
import styled from 'styled-components';

class Element extends React.Component {
    render() {
        return <ElementWrapper></ElementWrapper>;
    }
}

const ElementWrapper = styled.View`
    background-color: #ff0000;
`;

export default Element;
