import * as React from 'react'
import { Text, Flex, Avatar, InfoIcon, Menu, ChevronDownIcon, EditIcon, SettingsIcon, Dialog, CloseIcon, LeaveIcon, OptionsIcon } from '@fluentui/react-northstar'
import Profil from '../Profil/Profil'
import UpdateProject from '../UpdateProject/UpdateProject'
import Project from '../../models/Project'
import { updateProject } from '../../Api/apiProject'
import User from '../../models/User'
import { updateUser } from '../../Api/apiUser'

class WorkHeader extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            showSettings: false,
            showModalUpdateProject: false,
            projectToUpdate: Project.fromJS({}),
            profil: User.fromJS({})
        }
    }

    onCancelModalSettings = () => {
        this.setState({ showSettings: false })
    }
     
    showProfilSettings = () => {
        this.setState({ showSettings: true })
    }

    onConfirmModalSettings = async () => {
        let user_updated = await updateUser(this.state.profil.id, this.state.profil)
        if(user_updated === null){
            this.setState({ showSettings: false })
            this.props.onUpdatedUser(true)
        } else {
            this.props.onUpdatedUser(false)
        }
    }

    onUpdateProfil = (profil) => {
        this.setState({ profil })
    }

    renderprofil = () => {
        return (
          <Dialog
                closeOnOutsideClick={false}
                style={{ minWidth: "600px", maxWidth: "600px" }}
                header={<Text as="h4" content="Paramétres du profil" />}
                confirmButton="Sauvegarder"
                cancelButton="Annuler"
                onCancel={this.onCancelModalSettings}
                onConfirm={this.onConfirmModalSettings}
                open={this.state.showSettings}
                content={<Profil user={this.props.user} onUpdateProfil={this.onUpdateProfil}/>}
                headerAction={{
                  icon: <CloseIcon />,
                    onClick: () => this.setState({ showSettings: false }),
                }}
          />
        )
      }

    onCancelModalUpdateProject = () => {
        this.setState({ showModalUpdateProject: false })
    }

    showModalUpdateProject = () => {
        this.setState({ showModalUpdateProject: true })
    }

    onConfirmUpdateProject = async () => {
        this.setState({ showModalUpdateProject: false })
        await updateProject(this.props.user.id, this.state.projectToUpdate.id, this.state.projectToUpdate)
        this.props.onUpdateProject()
    }

    onUpdateStateProject = (projectUpdate) => {
        this.setState({ projectToUpdate: projectUpdate })
    }

    renderUpdateProject = () => {
        return (
            <Dialog
                closeOnOutsideClick={false}
                style={{ minWidth: "600px", maxWidth: "600px" }}
                header={<Text as="h4" content="Détails du projet" />}
                confirmButton="Sauvegarder"
                cancelButton="Annuler"
                onCancel={this.onCancelModalUpdateProject}
                onConfirm={this.onConfirmUpdateProject}
                open={this.state.showModalUpdateProject}
                content={
                    <UpdateProject 
                        projectCurrent={this.props.projectSelected} 
                        onUpdateStateProject={this.onUpdateStateProject} 
                    />
                }
                headerAction={{
                    icon: <CloseIcon />,
                    onClick: () => this.setState({ showModalUpdateProject: false }),
                }}
            />
        )
    }

    logout = () => {
        let a = document.createElement('a')
        a.href = `http://keycloak.nibaldonoso.fr/auth/realms/workeet/protocol/openid-connect/logout?redirect_uri=${process.env.REACT_APP_UrlAppBase}`
        a.click()
        a.remove()
    }

    account = () => {
        let a = document.createElement('a')
        a.href = `https://keycloak.nibaldonoso.fr/auth/realms/workeet/account?referrer=${process.env.REACT_APP_Local}`
        a.click()
        a.remove()
    }

    render() {
        return (
            <>
                { this.renderprofil() }
                { this.renderUpdateProject() }

                <Flex gap="gap.medium" vAlign="center" style={{ margin: "0 10px" }}>
                    
                    <Flex.Item grow gap="gap.small" space="between" vAlign="center">
                        <Flex vAlign="center" gap="gap.small">
                            {
                                this.props.openMyTasks ? 
                                    <Text as="h2" style={{ margin: 10 }} content='Mes Tâches' />
                                    :
                                this.props.openDashboard ? 
                                    <Text as="h2" style={{ margin: 10 }} content={"Tableau de bord"} />
                                    :
                                    <>
                                        <Text as="h2" style={{ margin : 10}} content={this.props.projectSelected.name} />
                                        <Menu
                                            iconOnly
                                            items={
                                                [
                                                    {
                                                        key: '1',
                                                        indicator: false,
                                                        icon: <ChevronDownIcon />, 
                                                        menu: {
                                                            items: [
                                                                {
                                                                    key: "2ss",
                                                                    icon: <EditIcon />,
                                                                    content: <Text content="Modifier les détails du projet" onClick={this.showModalUpdateProject} />
                                                                }
                                                            ],
                                                        }
                                                    }
                                                ]
                                            }
                                        />
                                        <InfoIcon outline />
                                    </>
                            } 
                        </Flex>
                    </Flex.Item>

                    <Flex gap="gap.small" vAlign="center">
                        <Menu
                            style={{ flexDirection: "row"}}
                            iconOnly
                            items={
                                [
                                    {
                                        key: "user",
                                        content: <Text content={this.props.user.email} onClick={this.showProfilSettings}/>
                                    },
                                    {
                                        key: '3',
                                        indicator: false,
                                        icon: <SettingsIcon />,
                                        menu: {
                                            items: [
                                                {
                                                    key: "4",
                                                    icon: <EditIcon />,
                                                    content: <Text content="Paramètres du profil" onClick={this.showProfilSettings}/>
                                                },
                                                {
                                                    key: "5",
                                                    icon: <OptionsIcon />,
                                                    content: <Text content="Account" onClick={this.account} />
                                                },
                                                {
                                                    key: "6",
                                                    icon: <LeaveIcon />,
                                                    content: <Text content="Se déconnecter" onClick={this.logout} />
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        />
                        <Avatar name={this.props.user.firstName.toUpperCase()} size="medium" status="success" />
                    </Flex>
                </Flex>

               
            </>
        )
    }

}
export default WorkHeader;