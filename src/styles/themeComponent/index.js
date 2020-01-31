import React from "react";
import { connect } from 'react-redux'
import { ThemeProvider } from "styled-components";

class Theme extends React.Component {
    render() {
        return (
            <ThemeProvider theme={this.props.DEFAULT_THEME}>
                {this.props.children}
            </ThemeProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        DEFAULT_THEME : state.DEFAULT_THEME,
        THEME_OPTIONS: state.THEME_OPTIONS
    };
}

export default connect(mapStateToProps)(Theme);