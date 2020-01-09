import React from 'react';
import styled from 'styled-components';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '_utils/dimensions.js';


import SelectedProject from '_atoms/_panel/_projectSelect/selectedProject/index.js'
import ProjectDropdown from '_atoms/_panel/_projectSelect/projectDropdown/index.js'

class ProjectSelect extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            projectSelectOpen: false,
            selectedProject: {
                color: 'cyan',
                title: 'Selected'
            },
            projects: [
                {
                    color: 'purple',
                    title: 'ovo je primjer'
                },
                {
                    color: 'red',
                    title: 'Animacija projekt'
                }
            ]
        }

        this.selectedProjectRef = React.createRef();
    }

    projectDropdownToggle = () => {
        this.setState(prevState => ({
            projectSelectOpen: !prevState.projectSelectOpen
        }));
    };

    changeCurrentProject = (index) => {
        let projectSwap = {...this.state.projects[index]}

        if (index > -1) {
            this.setState(prevState => prevState.projects.splice(index, 1));
            this.setState(prevState => prevState.projects.unshift(prevState.selectedProject));
            this.setState(prevState => ({
                selectedProject: projectSwap
            }));

            this.selectedProjectRef.current.toggleProjectSelect();
        }
    }

    render() {
        return (
            <React.Fragment>
                <SelectedProject 
                    ref={this.selectedProjectRef}
                    color={this.state.selectedProject.color}
                    title={this.state.selectedProject.title}
                    onToggle={() => this.projectDropdownToggle()}
                    disabled={false}
                ></SelectedProject>

                <ProjectDropdown 
                    projects={this.state.projects} 
                    isOpen={this.state.projectSelectOpen}
                    onSelect={(ind) => this.changeCurrentProject(ind)}
                ></ProjectDropdown> 
            </React.Fragment>
        );
    }
}

export default ProjectSelect;
