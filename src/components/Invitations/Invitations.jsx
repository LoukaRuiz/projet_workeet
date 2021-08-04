import { Button, Flex, Header, Input, Text } from '@fluentui/react-northstar'
import * as React from 'react'
import { deleteGuess, getGuess } from '../../Api/apiGuess'
import { getProject } from '../../Api/apiProject'
import { createUser, getUserByEmail } from '../../Api/apiUser'
import { createUserProject } from '../../Api/apiUserProject'
import Guess from '../../models/Guess'
import User from '../../models/User'
import { fetchKeycloak } from '../../services/services'

class Invitations extends React.Component {

    constructor (props) {
        super(props)

        this.state = {
            invitationAccepted: false,
            isGuess: false,
            user: User.fromJS({}),
            guess: Guess.fromJS({})
        }
    }

    componentDidMount = () => {
        this.fetchKeycloak()
    }

    fetchKeycloak = async () => {
        let { email_user } = await fetchKeycloak()
        if (email_user) {
            this.setState({ email_user: email_user })
            this.guess()
        }
    }

    accepteInvitation = async () => {
        let guess = this.state.guess
        let user = await getUserByEmail(guess.email);
        if (user.id) {
            let project = await getProject(user.id, guess.projectId)
            if (project.id) {
                let newRelationUserProject = await createUserProject(user.id, guess.projectId, false)
                if (newRelationUserProject.id) {
                    await deleteGuess(guess.id, guess.projectId)
                    window.location.href = "/"
                }
            }
        } else {
            this.setState({ newUser: true })
        }
    }

    guess = async () => {
        if (this.state.email_user) {
            let projectId = window.location.href.split("/")[3]
            let guess = await getGuess(this.state.email_user, projectId)
            if (guess.id) {
                this.setState({ isGuess: true, guess })
            } else {
                this.setState({ isGuess: false })
            }
        }
    }

    createUser = async () => {
        if(this.state.user.firstName !== "") {
            let newUser = await createUser(this.state.user)
            localStorage.setItem('userId', newUser.id)
            if (newUser.id) {
                this.accepteInvitation()
            }
        }
    }

    getName = (name) => {
        let newUser = User.fromJS({
            firstName: name,
            email: this.state.email_user,
            createdBy: this.state.email_user,
            isAdmin: true,
        })
        this.setState({ user: User.fromJS({ ...newUser }) })
    }


    render() {
        if(this.state.newUser) {
            return (
                <Flex>
                    {/* <Image src={fond} style={{ position: "absolute", zIndex: 1, right: 0, height: "100vh" }}/>  */}
                    <div style={{ display: "flex", textAlign: "center", alignItems: "center", flexDirection: "column", height: "100vh", width: "50%" }}>

                        <Text style={{ marginTop: "150px", width: "100%" }} content="Bienvenue à Workeet" weight="bold" size="larger" />

                        <div style={{ marginTop: 10, width: "100%" }}>
                            <Text content="Vous vous inscrivez en tant que " size="largest" style={{ fontWeight: 'lighter' }} />
                            <Text content={this.state.email_user} size="largest" weight="bold" />
                        </div>

                        <div style={{ marginTop: 40, width: "100%" }}>
                            <Text content="Quel est votre nom complet ?" size="largest" />
                        </div>

                        <div style={{ marginTop: 20, width: "250px" }}>
                            <Input
                                fluid
                                clearable
                                maxLength={50}
                                onKeyDown={this.handleKeyPress}
                                onChange={(e) => this.getName(e.target.value)} />
                        </div>

                        <div style={{ marginTop: 30, width: "100%" }}>
                            <Button
                                content="Continuer"
                                primary
                                onClick={() => this.createUser()} />
                        </div>
                    </div>
                </Flex>
            )
        }

        return (
            <>
                {
                    this.state.isGuess ? 
                        <Flex hAlign="center" column style={{ marginTop: 100}}>
                            <Header content="Vous avez été intité à participer dans le projet workeet" />
            
                            <Button primary content="Accepter l'invitation" onClick={async () => await this.accepteInvitation()}/>
                        </Flex>
                        :
                            <Flex hAlign="center" column style={{ marginTop: 100 }}>
                                <Header content="Vous n'avez été intité à participer dans aucun projet workeet" />
    
                                <Button primary content="Revenir à l'application" onClick={() => window.location.href = "/" }/>
                            </Flex>
                }
            </>
        )
    }
}

export default Invitations