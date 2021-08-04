import React from 'react';
import { Text, Input, Button, Flex, Image } from '@fluentui/react-northstar'
import { fetchKeycloak } from '../../services/services';
import User from '../../models/User';
import Guess from '../../models/Guess';
import { createUser, getUserByEmail } from '../../Api/apiUser'
import fond from '../../images/background_login.png'

class NewUser extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            email_user : "",
            user: User.fromJS({}),
            isGuess: false,
            guess: Guess.fromJS({}),
            continue: false,
        }
    }

    componentDidMount = () => {
        this.fetchKeycloak()
        
    }

    fetchKeycloak = async () => {
        let { email_user } = await fetchKeycloak()
        if(email_user) {
            this.setState({ email_user })
            this.verifyUser()
        }
    }

    verifyUser = async () => {
        let user = await getUserByEmail(this.state.email_user)
        if(user.id){
            if(user.firstName){
                window.location.href = "/"
            }
        } else {
            this.setState({ continue: true })
        } 
    }

    createUser = async () => {
        let newUser = await createUser(this.state.user)
        if(newUser.id) {
            localStorage.setItem('userId', newUser.id)
            window.location.href = "/"
        }
    }

    getName = (name) => {
        let newUser = User.fromJS({
            firstName: name, 
            email: this.state.email_user,
            createdBy: this.state.email_user,
            isAdmin: true,
        })
        this.setState({ user: User.fromJS({ ...newUser })})
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.createUser()
        }
    }


    render () {
        return (
            <>
                {
                        <Flex style={{ position: "absolute", width: "100%"}}>
                            <Image src={fond} style={{ position: "absolute", zIndex: -1, right: 0, height: "100vh" }}/> 
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
                }
            </>
        )
    }
}

export default NewUser;