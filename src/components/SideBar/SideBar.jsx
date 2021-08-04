import { AddIcon, Button, Divider, Flex, FlexItem, Image, Text } from '@fluentui/react-northstar';
import * as React from 'react';
import SectionHome from '../SectionHome/SectionHome';
import SectionProject from '../SectionProject/SectionProject';
import SectionActivity from '../SectionActivity/SectionActivity';
import logo from '../../images/workeet_logo.svg';

class SideBar extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    render () {
        return (
            <>
                <Flex gap="gap.medium" column style={{ width: "100%", height: "100vh" }}>
                    <Flex gap="gap.small" hAlign="center" vAlign="center" style={{ margin: "10px", height: "50px", justifyContent: "flex-start"}}>
                        <Image src={logo}/>
                    </Flex>
                    <FlexItem >
                        <>
                            <Text as="h3" content="Accueil" style={{ marginLeft: 10 }}/>
                            <SectionHome 
                                openDashboard={this.props.openDashboard} 
                                openMyTasks={this.props.openMyTasks}
                            />
                        </>
                    </FlexItem>
                    <FlexItem>
                        <Flex column>
                            <Flex space="between" vAlign="center" style={{ marginLeft: 10 }}>
                                <Text as="h3" content="Mes Projets" style={{ cursor: "pointer" }} onClick={this.props.openProjects}/>
                                <Button text icon={<AddIcon />} iconOnly onClick={() => this.props.showNewProject()}/>
                            </Flex>
                            <Flex style={{ width: "100%" }}>
                                <SectionProject
                                    projects={this.props.projects}
                                    projectSelected={this.props.projectSelected ? this.props.projectSelected : null }
                                    onProjectSelected={this.props.onProjectSelected}
                                    showNewParticipant={this.props.showNewParticipant}
                                    showDetailsProject={this.props.showDetailsProject}
                                    onDeleteProject={this.props.onDeleteProject}
                                    user={this.props.user}
                                />
                            </Flex>
                        </Flex>
                    </FlexItem>
                    <FlexItem grow>
                        <div>
                            <Divider />
                            <Text as="h3" content="Activité" style={{ marginLeft: 10 }}/>
                            <SectionActivity openMood={this.props.openMood}/>
                        </div>
                    </FlexItem>
                </Flex>
            </>
        )
    }
}

export default SideBar;