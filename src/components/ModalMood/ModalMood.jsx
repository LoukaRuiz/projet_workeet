import * as React from 'react'
import { Text, TextArea, Flex, IndentIcon, Avatar, Image, Button } from '@fluentui/react-northstar';
import emoji1 from "../../images/emoji1.svg"
import emoji1Selected from "../../images/emoji1_selected.svg"
import emoji2 from "../../images/emoji2.svg"
import emoji3 from "../../images/emoji3.svg"
import emoji4 from "../../images/emoji4.svg"
import emoji5 from "../../images/emoji5.svg"

const emojis = [
    {
        key: 0,
        content: emoji1,
        selection: emoji1Selected
    },
    {
        key: 1,
        content: emoji2,
        selection: emoji1Selected
    },
    {
        key: 2,
        content: emoji3,
        selection: emoji1Selected
    },
    {
        key: 3,
        content: emoji4,
        selection: emoji1Selected
    },
    {
        key: 4,
        content: emoji5,
        selection: emoji1Selected
    }
]

class ModalMood extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            emojiSelected: null
        }
    }
    render() {
        return (
            <>

                <Flex gap="gap.medium" vAlign="center">
                    <Avatar name="User" />
                    <Text content="user" />
                </Flex>

                <Flex gap="gap.medium" padding="padding.medium">
                        <Text content="Qu'est ce que j'ai aimé" siza="largest"  />
                </Flex>

                <div style={{ width: "100%" }}>
                    <Flex gap="gap.small">
                            <IndentIcon />
                            <TextArea
                                fluid
                                clearable
                                placeholder="Description"
                                rows={5}
                            />
                    </Flex>
                </div>

                <Flex gap="gap.medium" padding="padding.medium">
                    <Text content="Quels problèmes j'ai rencontré" siza="largest"  />
                </Flex>

                <div style={{ width: "100%" }}>
                    <Flex gap="gap.medium">
                            <IndentIcon />
                            <TextArea
                                fluid
                                clearable
                                placeholder="Description"
                                rows={5}
                            />
                    </Flex>
                </div>

                <Flex gap="gap.medium" padding="padding.medium">
                    <Text content="Texte libre" />
                </Flex>

                <div style={{ width: "100%" }}>
                    <Flex gap="gap.medium">
                            <IndentIcon/>
                            <TextArea
                                fluid
                                clearable
                                placeholder="Description"
                                rows={5}
                            />
                    </Flex>
                </div>
                <Flex gap="gap.medium" padding="padding.medium">
                    <Text content="Quelle est ton humeur ?" />
                </Flex>


                <Flex gap="gap.medium">
                    <Flex.Item grow>
                        <Flex gap="gap.medium" padding="padding.medium" vAlign="center" hAlign="center">
                            {
                                emojis.map((item, index) => {
                                    return (
                                        <Button onClick={() => this.setState({ emojiSelected: index })} icon={<Image src={item.content} />} style={{ transform: this.state.emojiSelected === (index) ? "scale(0.2)": "scale(0.15)" }} />
                                    )
                                })
                            }
                        </Flex>
                    </Flex.Item>
                </Flex>
            </>
        )
    }
}


export default ModalMood;
