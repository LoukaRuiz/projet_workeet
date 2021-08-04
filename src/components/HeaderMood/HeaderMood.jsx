import * as React from 'react'
import { Text, Card, Avatar, Flex, Input, SearchIcon} from '@fluentui/react-northstar'

class Profil extends React.Component {

    render() {

        return (
            <>
                <Flex gap="gap.meadium" padding="padding.medium" hAlign="start" style={{ marginLeft: 10}}>
                    <div style={{ margin: 15 }}>
                        <Text content="Liste des projets" weight="bold" />
                    </div>
                    <Input icon={<SearchIcon />} placeholder="Search..." iconPosition="start" />

                </Flex>
                <Flex gap="gap.meadium" hAlign="center">
                    {
                        this.props.projects.map((project => {
                            return (
                                <Card aria-roledescription="card avatar" style={{ margin: 5}}>
                                    <Card.Header fitted>
                                        <Flex gap="gap.small">
                                            <Avatar
                                                name={project.name}
                                                status="unknown"
                                            />
                                            <Flex column>
                                                <Text content={project.name} />
                                                <Text content={project.description} size="small" />
                                            </Flex>
                                        </Flex>
                                    </Card.Header>
                                </Card>
                            )
                        }))
                    }
                </Flex>
            </>

        )
    }
}
export default Profil
