import * as React from 'react'
import { Text, ChevronStartIcon, Menu, Image, Card, Flex, Button } from '@fluentui/react-northstar'

class Dashboard extends React.Component {

    render() {
        return (
            <>
                <Menu
                    style={{ flexDirection: "row" }}
                    iconOnly
                    items={[
                        {
                            key: 'back',
                            icon: <ChevronStartIcon outline />,
                            content: <Text content={"Retour aux projects"} onClick={this.props.backToProjects} />
                        }
                    ]}
                />

                <Text as="h3" style={{ marginLeft: '70px' }}>
                    Projet récents
                </Text>

                <div style={{ justifyContent: "space-between" }}>
                    <Card style={{ marginLeft: '100px', marginTop: '50px' }}>
                        <Card.Body fitted>
                            <Flex column gap="gap.small">
                                <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
                                <Text as="h3" content="Nom de projet" />
                                <Text content="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
                                <Flex hAlign="start">
                                    <Button content="accéder au projet" text />
                                </Flex>
                            </Flex>
                        </Card.Body>
                    </Card>

                </div>
            </>
        )
    }
}

export default Dashboard
