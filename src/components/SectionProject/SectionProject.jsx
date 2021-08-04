import React from 'react';
import { Text, MenuButton, Button, Flex, MoreIcon, Checkbox, ParticipantAddIcon, TrashCanIcon } from '@fluentui/react-northstar'
import { deleteProject } from '../../Api/apiProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faUserLock, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

class SectionProject extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            projectSelected: null
        }
    }

    componentDidMount = () => {
        if(this.props.projectSelected){
            this.setState({ projectSelected: this.props.projectSelected })
        }
    }

    projectSelected = (project) => {
        this.props.onProjectSelected(project)
        this.setState({ projectSelected: project })
    }

    showNewParticipant = () => {
        this.props.showNewParticipant()
    }

    deleteProject = async (id) => {
        let res = await deleteProject(this.props.user.id, id)
        if(res === null){
            this.props.onDeleteProject()
        }
    }

    render() {
        return (
            <Flex gap="gap.small" column style={{ width: "100%" }}>
                {
                    this.state.projectSelected ? 
                        this.props.projects ? this.props.projects.map((project, index) => {
                            return (
                                <Flex key={index} hAlign="start" vAlign="center" space="between" style={{ marginLeft: 0 }}>
                                    <Checkbox toggle checked={this.state.projectSelected.id === project.id} onClick={() => this.projectSelected(project)} />
                                    <FontAwesomeIcon icon={faCalendarPlus} />
                                    <Flex style={{ width: 200, marginLeft: 10 }}>
                                        <Text
                                            weight={this.state.projectSelected.id === project.id ? "bold" : "semibold"}
                                            style={{ cursor: "pointer", overflow: "hidden", textOverflow: "ellipsis" }}
                                            content={<Text content={project.name} />} 
                                            onClick={() => this.projectSelected(project)} 
                                        />
                                    </Flex>
                                    <Flex.Item push>
                                        {
                                            project.isAdmin ?
                                                <Flex vAlign="center" style={{ marginRight: this.props.projectSelected.id === project.id ? 0 : 10 }}>
                                                    <FontAwesomeIcon icon={faUserCog} color={this.props.projectSelected.id === project.id ? "black" : "teal"} />
                                                    {
                                                        this.props.projectSelected.id === project.id ? 
                                                            <MenuButton
                                                                trigger={<Button text iconOnly icon={<MoreIcon />} />}
                                                                menu={[
                                                                    {
                                                                        key: "opetion2",
                                                                        icon: <ParticipantAddIcon />,
                                                                        content: <Text content="Ajouter nouveau participant" onClick={() => this.showNewParticipant()} />
                                                                    },
                                                                    {
                                                                        key: "opetion3",
                                                                        icon: <TrashCanIcon />,
                                                                        content: <Text content="Supprimer" onClick={() => this.deleteProject(project.id)} />
                                                                    }
                                                                ]}
                                                            /> :<></> 
                                                    }
                                                </Flex>
                                                :
                                                <Flex vAlign="center" style={{ marginRight: 10 }}>
                                                    <FontAwesomeIcon icon={faUserLock} color="red" />
                                                </Flex>
                                        }
                                    </Flex.Item>
                                </Flex>
                            )
                        }) : null : null
                }
            </Flex>
        )
    }
}

export default SectionProject;
