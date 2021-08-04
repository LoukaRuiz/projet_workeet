import * as React from 'react'
import { EditIcon, EmailIcon, IndentIcon, Text, TextArea, UserFriendsIcon } from '@fluentui/react-northstar'
import { Menu, Avatar, Button, Flex, Input } from '@fluentui/react-northstar'
import User from '../../models/User'

const items = [
    {
        key: 'profil',
        content: 'Profil',
    }
]

class Profil extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            user : User.fromJS({ ...this.props.user })
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(prevState !== this.state){
            this.props.onUpdateProfil(this.state.user)
        }
    }

    onChangeLastName = (e) => {
        e.preventDefault()
        this.setState({ user: User.fromJS({ ...this.state.user, lastName: e.target.value })})
    }

    onChangeFirstName = (e) => {
        e.preventDefault()
        this.setState({ user: User.fromJS({ ...this.state.user, firstName: e.target.value }) })
    }

    onChangeDescription = (e) => {
        e.preventDefault()
        this.setState({ user: User.fromJS({ ...this.state.user, description: e.target.value }) })
    }

    render() {

        return (
            <>
                <Flex gap="gap.medium" column>
                    
                    <Flex gap="gap.small">
                        <Menu defaultActiveIndex={0} items={items} underlined primary />
                    </Flex>

                    <Flex gap="gap.small" style={{ marginLeft: 5, marginTop: 10 }}>
                        <Text content="Votre photo" />
                    </Flex>

                    <Flex gap="gap.small" style={{ marginBottom: 40}} >
                        <Avatar  name={this.state.user.firstName.toUpperCase()} status="success" />
                        <Button content="Importer votre photo" text />
                    </Flex>

                    <Flex gap="gap.small">
                        <Flex.Item grow>
                            <Flex gap="gap.small" vAlign="center">
                                <EditIcon />
                                <Input 
                                    fluid 
                                    placeholder="Prénom"
                                    value={this.state.user.firstName}
                                    onChange={this.onChangeFirstName}
                                />
                            </Flex>
                        </Flex.Item>
                        <Flex.Item grow>
                            <Flex gap="gap.small" vAlign="center">
                                <EditIcon />
                                <Input 
                                    fluid 
                                    placeholder="Nom" 
                                    value={this.state.user.lastName}
                                    onChange={this.onChangeLastName}
                                />
                            </Flex>
                        </Flex.Item>

                    </Flex>

                    <Flex gap="gap.small">
                        <Flex.Item grow>
                            <Flex gap="gap.small" vAlign="center">
                                <UserFriendsIcon />
                                <Input 
                                    fluid 
                                    disabled={true}
                                    placeholder="Rôle"
                                    value={this.state.user.isAdmin ? "Administrateur" : "Participant"}
                                />
                            </Flex>
                        </Flex.Item>
                        <Flex.Item grow>
                            <Flex gap="gap.small" vAlign="center">
                                <EmailIcon />
                                <Input 
                                    fluid 
                                    disabled={true}
                                    placeholder="E-mail"
                                    value={this.state.user.email}
                                />
                            </Flex>
                        </Flex.Item>

                    </Flex>

                    <Flex gap="gap.small">
                        <IndentIcon />
                        <TextArea 
                            fluid 
                            rows={5} 
                            placeholder="Description" 
                            value={this.state.user.description}
                            onChange={this.onChangeDescription}
                        />
                    </Flex>

                </Flex>

            </>

        )
    }
}
export default Profil


