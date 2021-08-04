import React from 'react'
import { Text, Table, tableHeaderCellBehavior } from '@fluentui/react-northstar'
import { participants } from "../Chart/Chart"

class TabMood extends React.Component {


    render() {
        return (
            <>
                <Text as="h3">
                    Nom Project
            </Text>

                <Table aria-label="table">
                    <Table.Row header>
                        <Table.Cell content="Participant" accessibility={tableHeaderCellBehavior} />
                        <Table.Cell content="Picture" accessibility={tableHeaderCellBehavior} />
                        <Table.Cell content="Age" accessibility={tableHeaderCellBehavior} />
                    </Table.Row>
                    
                    {
                        participants.map( participant => {
                            return (
                                <Table.Row>
                                    <Table.Cell content={<Text content={participant.name} onClick={() => this.props.participantSelected(participant)}/>} />
                                    <Table.Cell content="None" />
                                    <Table.Cell content="30 years" />
                                </Table.Row>
                            )
                        })
                    }
                </Table>

            </>
        )
    }
}

export default TabMood
