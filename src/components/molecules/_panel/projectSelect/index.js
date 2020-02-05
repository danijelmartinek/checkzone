import React from 'react';

import Firebase from "_/database/firebase/setFunctions.js"
import { connect } from 'react-redux'
import { changeSelectedProject } from '_redux/actions.js';

import SelectedProject from '_atoms/_panel/_projectSelect/selectedProject/index.js'
import ProjectDropdown from '_atoms/_panel/_projectSelect/projectDropdown/index.js'

class ProjectSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectSelectOpen: false
        }

        this.selectedProjectRef = React.createRef();
    }

    projectDropdownToggle = () => {
        this.setState(prevState => ({
            projectSelectOpen: !prevState.projectSelectOpen
        }));
    };

    changeCurrentProject = (index, project) => {
        this.props.changeSelectedProject(project);
        Firebase.optionsUpdate({
            selectedProject: project.id
        });

        this.projectDropdownToggle();
    }

    render() {
        return (
            <React.Fragment>
                <SelectedProject 
                    ref={this.selectedProjectRef}
                    color={this.props.PROJECT_INFO.labelColor}
                    title={this.props.PROJECT_INFO.name}
                    onToggle={() => this.projectDropdownToggle()}
                    disabled={this.props.LOG_INFO.active}
                ></SelectedProject>

                <ProjectDropdown 
                    projects={this.props.ALL_PROJECTS}
                    selectedProjectId={this.props.PROJECT_INFO.id}
                    isOpen={this.state.projectSelectOpen}
                    onSelect={(ind, project) => this.changeCurrentProject(ind, project)}
                ></ProjectDropdown> 
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return{
        LOG_INFO: state.LOG_INFO,
        ALL_PROJECTS: state.ALL_PROJECTS,
        PROJECT_INFO: state.PROJECT_INFO,
        OPTIONS: state.OPTIONS
    };
}
const mapDispatchToProps = dispatch => {
    return {
        changeSelectedProject: (obj) => dispatch(changeSelectedProject(obj)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSelect);
