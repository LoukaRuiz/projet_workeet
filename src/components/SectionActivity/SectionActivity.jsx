import React from 'react';
import { Text, Flex, ApprovalsAppbarIcon, ToDoListIcon, EmojiIcon, LikeIcon } from '@fluentui/react-northstar'

class SectionActivity extends React.Component {

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
                        <EmojiIcon outline />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer" }}
                            content={<Text content="Humeur" />}
                            onClick={this.props.openMood}
                        />
                    </Flex>
                    <Flex gap="gap.small" vAlign="center">
                        <ApprovalsAppbarIcon />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer" }}
                            content={<Text content="Tâches que j'ai créées" />}
                            onClick={this.props.openDashboard}
                        />
                    </Flex>
                    <Flex gap="gap.small" vAlign="center">
                        <ToDoListIcon outline  />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer" }}
                            content={<Text content="Tâches que j'ai attribuées" />}
                            onClick={this.props.openDashboard}
                        />
                    </Flex>
                    <Flex gap="gap.small" vAlign="center">
                        <LikeIcon outline />
                        <Text
                            weight="semibold"
                            style={{ cursor: "pointer" }}
                            content={<Text content="Tâches terminées" />}
                            onClick={this.props.openDashboard}
                        />
                    </Flex>
                </Flex>
            </>
        )
    }
}

export default SectionActivity;
