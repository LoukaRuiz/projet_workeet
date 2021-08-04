import { ChevronStartIcon, Menu, Text } from '@fluentui/react-northstar'
import * as React from 'react'

class MyTasks extends React.Component {

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
            </>
        )
    }
}

export default MyTasks