import React from 'react';
import { Text, Flex } from '@fluentui/react-northstar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTasks } from '@fortawesome/free-solid-svg-icons'

class SectionHome extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            projectSelected: ''
        }
    }

    render() {
        return (
            <>
                <Flex gap="gap.small" hAlign="start" column vAlign="center" style={{ marginLeft: 25 }}>
                    <Flex gap="gap.small" vAlign="center">
                        <FontAwesomeIcon icon={faHome} />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer"}}
                            content={<Text content="Tableau de bord" />}
                            onClick={this.props.openDashboard}
                        />
                    </Flex>
                    <Flex gap="gap.small" vAlign="center">
                        <FontAwesomeIcon icon={faTasks} />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer" }}
                            content={<Text content="Mes tâches" />}
                            onClick={this.props.openMyTasks}
                        />
                    </Flex>
                    <Text
                        weight="semibold"
                        style={{ cursor: "pointer" }}
                        content={<Text content="" />}
                        onClick={this.props.openChat}
                    />
                </Flex>
            </>
        )
    }
}

export default SectionHome;
