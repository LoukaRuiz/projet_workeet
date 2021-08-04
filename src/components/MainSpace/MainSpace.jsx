import * as React from 'react';
import { CloseIcon, Dialog, Flex, Text } from '@fluentui/react-northstar';
import CFullCalendar from '../FullCalendar/FullCalendar';
import WorkHeader from '../WorkHeader/WorkHeader';
import SideBar from '../SideBar/SideBar';
import Project from '../../models/Project';
import { fetchKeycloak, loadProjects, loadUser } from '../../services/services'
import User from '../../models/User';
import NewParticipant from '../NewParticipant/NewParticipant';
import NewProject from '../NewProject/NewProject';
import UpdateProject from '../UpdateProject/UpdateProject';
import { createProject} from '../../Api/apiProject'
import { createGuess } from '../../Api/apiGuess'
import { sendEmail } from '../../Api/apiEmail'
import Dashboard from '../Dashboard/Dashboard';
import { getUserByEmail } from '../../Api/apiUser';
import MyTasks from '../MyTasks/MyTasks';
import TabMood from '../Mood/TabMood';
import HeaderMood from '../HeaderMood/HeaderMood'
import Chart from '../Chart/Chart'

class MainSpace extends React.Component {

    constructor(props) {
        super(props)
        
        this.state = {
            showNewParticipants: false,
            showNewProject: false,
            showDetailsProject: false,
            email_user: null,
            userIsAdmin: false,
            userCurrent: User.fromJS({}),
            projects: [],
            projectSelected: Project.fromJS({}),
            newProject: Project.fromJS({}),
            newParticipants: [],
            openDashboard: false,
            openMyTasks: false,
            openMood: false,
            participantSelected: ""
        }
    }
    
    componentDidMount = () => {
        this.fetchKeycloak()
    }

    fetchKeycloak = async () => {
        let { email_user } = await fetchKeycloak()
        if(email_user) {
            this.setState({ email_user: email_user })
            this.fetchAdmin()
        }
    }

    onProjectSelected = (project) => {
        this.setState({ projectSelected: project })
    }

    fetchAdmin = async () => {
        let { isAdmin, user } = await loadUser()
        
        if(user.status === 404) {
            // TODO
            // get user by workspaceId like a guess
            window.location.href = "/new/username"
        }

        if(isAdmin)  {
            this.setState({ userIsAdmin: true, userCurrent: User.fromJS({ ...user }) })
        } else {
            this.setState({ userIsAdmin: false, userCurrent: User.fromJS({ ...user }) })
        }

        let user_ = await getUserByEmail(this.state.email_user)
        if(user_.id) {
            let workspaceIdLink = window.location.href.split('/')[4]
            if(user_.Workspace.id === workspaceIdLink){
                this.fetchProjects()
            } else {
                //window.location.href = "/"
            }
        }
    }

    fetchProjects = async () => {
        let { projects, projectSelected } = await loadProjects(this.state.userCurrent.id)
        this.setState({ projects, projectSelected })
    }

    onNewProject = (newProject) => {
        this.setState({ newProject: newProject })
    }

    onConfirmNewProject = () => {
        this.setState({ showNewProject: false })
        this.createProject()
    }

    createProject = async () => {
        let newProject = await createProject(this.state.userCurrent.id, Project.fromJS({ ...this.state.newProject, createdBy: this.state.userCurrent.email }))
        if (newProject.id) {
            this.fetchProjects()
        }
    }

    sendMail = async () => {
        this.state.newParticipants.forEach( async (email) => {
            // GUESS
            await createGuess(email, this.state.projectSelected.id)
            // SEND MAIL
            await sendEmail("toto", email, this.state.projectSelected.id)
        })
        this.setState({ showNewParticipants: false })
    }

    listParticipantsInvitation = (participants) => {
        let liste = participants.filter((item) => item)
        this.setState({ newParticipants: liste })
    }

    renderDialogNewParticipant = () => {
        return (
            <Dialog 
                closeOnOutsideClick={false}
                style={{ minWidth: "600px", maxWidth: "600px" }}
                header="Nouveux Participants"
                cancelButton="Annuler"
                confirmButton="Inviter"
                onCancel={() => this.setState({ showNewParticipants: false })}
                onConfirm={async () => await this.sendMail()}
                open={this.state.showNewParticipants}
                content={<NewParticipant listParticipantsInvitation={this.listParticipantsInvitation}/>}
                headerAction={{
                    icon: <CloseIcon />,
                    onClick: () => this.setState({ showNewParticipants: false }),
                }}
            />
        )
    }

    renderNewProject = () => {
        return (
            <Dialog
                closeOnOutsideClick={false}
                style={{ minWidth: "600px", maxWidth: "600px" }}
                header={<Text as="h3" content="New Project" />}
                cancelButton="Annuler"
                confirmButton="Ajouter"
                onCancel={() => this.setState({ showNewProject: false })}
                onConfirm={() => this.onConfirmNewProject()}
                open={this.state.showNewProject}
                content={<NewProject onNewProject={(newProject) => this.onNewProject(newProject)} />}
                headerAction={{
                    icon: <CloseIcon />,
                    onClick: () => this.setState({ showNewProject: false }),
                }}
            />
        )
    }

    renderUpdateProject = () => {
        return (
            <Dialog
                closeOnOutsideClick={false}
                style={{ minWidth: "600px", maxWidth: "600px" }}
                header={<Text as="h4" content="Détails du projet" />}
                confirmButton="Sauvegarder"
                cancelButton="Annuler"
                onCancel={() => this.setState({ showDetailsProject: false })}
                onConfirm={this.onConfirmUpdateProject}
                open={this.state.showDetailsProject}
                content={
                    <UpdateProject
                        projectCurrent={this.props.projectSelected}
                        onUpdateStateProject={this.onUpdateStateProject}
                    />
                }
                headerAction={{
                    icon: <CloseIcon />,
                    onClick: () => this.setState({ showDetailsProject: false }),
                }}
            />
        )
    }

    participantSelected = (participant) => {
        console.log(participant)
    }

    render () {
        return (
            <div style={{ display: "flex", height: "100vh"}}>
                {/* DIALOGS */}
                { this.renderDialogNewParticipant()}
                { this.renderNewProject()}
                { this.renderUpdateProject()}

                <div style={{ width: 300 }}>
                    {
                        this.state.projects.length ?
                            <SideBar
                                user={this.state.userCurrent}
                                projects={this.state.projects}
                                projectSelected={this.state.projectSelected}
                                onProjectSelected={this.onProjectSelected}
                                showNewParticipant={() => this.setState({ showNewParticipants: true })}
                                showDetailsProject={() => this.setState({ showDetailsProject: true })}
                                showNewProject={() => this.setState({ showNewProject: true })}
                                onNewProject={this.fetchProjects}
                                onDeleteProject={this.fetchProjects}
                                openDashboard={() => this.setState({ openDashboard: true, openMyTasks: false, openMood: false })}
                                openProjects={() => this.setState({ openDashboard: false, openMyTasks: false, openMood: false })}
                                openMyTasks={() => this.setState({ openMyTasks: true, openDashboard: false, openMood: false  })}
                                openMood={() => this.setState({ openMood: true, openDashboard: false, openMyTasks: false })}
                            /> : null
                    }
                    
                </div>

                <div style={{ display: "flex", flexDirection: "column" , flex: 11, justifyContent: "start"}}>
                    <div style={{ flex: 1, marginRight: 10 }}>
                        {
                            this.state.projects.length ?
                                <WorkHeader
                                    isAdmin={this.state.userIsAdmin}
                                    user={this.state.userCurrent}
                                    onUpdateProject={this.fetchProjects}
                                    onUpdatedUser={this.fetchAdmin}
                                    projectSelected={this.state.projectSelected}
                                    openDashboard={this.state.openDashboard}
                                    openMyTasks={this.state.openMyTasks}
                                /> : null
                        }
                    </div>
                   
                    <Flex style={{ flex: 11 }} column>
                        
                        {
                            this.state.openMyTasks ? 
                                <MyTasks backToProjects={() => this.setState({ openMyTasks: false })} />
                                :
                            this.state.openDashboard ? 
                                <Dashboard backToProjects={() => this.setState({ openDashboard: false })} />
                                :
                            this.state.openMood ?
                                <div style={{ height: "90%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                                    
                                    <Flex gap="gap.medium" column>
                                        <HeaderMood projects={this.state.projects}/>
                                    </Flex>

                                    <Flex hAlign="center">
                                        <Chart />
                                    </Flex>
                                    <div style={{ margin : 10}}>
                                        <TabMood projects={this.state.projects} participantSelected={this.participantSelected} />
                                    </div>
                                </div>
                                :
                            <div>
                                {
                                    this.state.projects.length ? <CFullCalendar projectSelected={this.state.projectSelected} /> : null
                                }
                            </div>
                        }
                    </Flex>
                </div>

            </div>
        )
    }
}

export default MainSpace;