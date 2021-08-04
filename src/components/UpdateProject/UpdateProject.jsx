import React from 'react';

import { Text, Input, Avatar, TextArea, Flex, EditIcon, IndentIcon, UserFriendsIcon } from '@fluentui/react-northstar';
import Project from '../../models/Project';


class UpdateProject extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            projectCurrent: Project.fromJS({})
        }
    }

    componentDidMount = () => {
        if (this.props.projectCurrent) {
            this.setState({ projectCurrent: Project.fromJS({ ...this.props.projectCurrent })})
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state !== prevState) {
            this.props.onUpdateStateProject(this.state.projectCurrent)
        }
    }

    onChangeTitle = (e) => {
        e.preventDefault()
        this.setState({ projectCurrent: Project.fromJS({ ...this.state.projectCurrent, name: e.target.value }) })
    }

    onChangeDescription = (e) => {
        e.preventDefault()
        this.setState({ projectCurrent: Project.fromJS({ ...this.state.projectCurrent, description: e.target.value }) })
    }

    render() {
        
        return (
            <>

                <Flex gap="gap.medium" column>
                    
                    <Flex gap="gap.small" vAlign="center">
                        <EditIcon />
                        <Flex.Item>
                            <Input 
                                fluid 
                                clearable 
                                maxLength="50" 
                                placeholder="Nom"
                                value={this.state.projectCurrent.name}
                                onChange={this.onChangeTitle}
                            />
                        </Flex.Item>
                    </Flex>

                    <Flex gap="gap.small">
                        <UserFriendsIcon />
                        <Flex gap="gap.small" column>
                            <Text content="Propriétaire du projet" size="smallest" />
                            <Flex gap="gap.medium" vAlign="center">
                                <Avatar name={this.state.projectCurrent.createdBy} /> <Text content={this.state.projectCurrent.createdBy} />
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex gap="gap.small">
                        <IndentIcon />
                        <TextArea
                            fluid
                            rows={5} 
                            placeholder="Description"
                            value={this.state.projectCurrent.description}
                            onChange={this.onChangeDescription}/>
                    </Flex>

                </Flex>

            </>           
        )

    }
}

export default UpdateProject;