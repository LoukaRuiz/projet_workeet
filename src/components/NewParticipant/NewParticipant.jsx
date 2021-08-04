import React from 'react';
import { Text, Input, Flex, EmailIcon } from '@fluentui/react-northstar'

class NewParticipant extends React.Component {

    constructor(props){
        super(props)

        this.state = {
            participants: []
        }
    }

    componentDidUpdate = (prevProps, prevState) => {
        if(this.state !== prevState){
            this.props.listParticipantsInvitation(this.state.participants)
        }
    }

    getAddress1 = (address) =>{
        let one = this.state.participants
        one[0] = address
        this.setState({ participants: one })
    }

    getAddress2 = (address) =>{
        let two = this.state.participants
        two[1] = address
        this.setState({ participants: two })
    }
    getAddress3 = (address) =>{
        let three = this.state.participants
        three[2] = address
        this.setState({ participants: three })    
    }

    getAddress4 = (address) =>{
        let four = this.state.participants
        four[3] = address
        this.setState({ participants: four })
    }

    render () {
        return (
            <>
                <Flex gap="gap.medium" column>
                    <Text as="h3" content="Qui travaille sur ce projet avec vous ?" />

                    <Text weight="light" content="Email adresse" />

                    <Flex.Item>
                        <Flex gap="gap.small" vAlign="center">
                            <EmailIcon />
                            <Input clearable fluid placeholder="Ex: example@example.com" onChange={(e) => this.getAddress1(e.target.value)} />
                        </Flex>
                    </Flex.Item>

                    <Flex.Item>
                        <Flex gap="gap.small" vAlign="center">
                            <EmailIcon />
                            <Input clearable fluid placeholder="" onChange={(e) => this.getAddress2(e.target.value)} />
                        </Flex>
                    </Flex.Item>

                    <Flex.Item>
                        <Flex gap="gap.small" vAlign="center">
                            <EmailIcon />
                            <Input clearable fluid placeholder="" onChange={(e) => this.getAddress3(e.target.value)} />
                        </Flex>
                    </Flex.Item>

                    <Flex.Item>
                        <Flex gap="gap.small" vAlign="center">
                            <EmailIcon />
                            <Input clearable fluid placeholder="" onChange={(e) => this.getAddress4(e.target.value)} />
                        </Flex>
                    </Flex.Item>

                </Flex>
            </>
        )
    }
}


export default NewParticipant;
