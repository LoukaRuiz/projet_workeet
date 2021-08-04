import React from 'react'
import { Input, Flex } from '@fluentui/react-northstar'
import Project from '../../models/Project'

class NewProject extends React.Component {


    constructor(props){
        super(props)

        this.state = {
            newProject: Project.fromJS({})
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState !== this.state){
            this.props.onNewProject(this.state.newProject)
        }
    }

    getProjectName = (name) => {
        this.setState({ newProject: Project.fromJS({ name })})
    }

   

    render() {
        return(

            <>
                <Flex gap="gap.medium" column>
                    <Input fluid clearable placeholder = {"Ex: Workeet"} maxLength = {50}  onChange={(e) => this.getProjectName(e.target.value)}/>
                </Flex>
            </>
        )
    }               
}

export default NewProject
