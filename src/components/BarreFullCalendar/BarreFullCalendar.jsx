import * as React from 'react';
import { Flex, Menu, Text } from '@fluentui/react-northstar'
import { AddIcon, ChevronStartIcon, ChevronEndIcon, CheckmarkCircleIcon, BulletsIcon, CalendarIcon, EyeIcon, EyeSlashIcon } from '@fluentui/react-icons-northstar'


class BarreFullCalendar extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			showModalCreateTask: false,
			showWeekends: this.props.showWeekends
		}
	}

	showWeekends = () => {
		if (this.props.isShowWeekends === true) {
			this.props.showWeekends(false)
		} else {
			this.props.showWeekends(true)
		}
	}

	render() {
		return(
			<>
				<Flex>
					<Menu
						style={{ flexDirection: "row" }}
						iconOnly
						items={[
							{
								key: 'open',
								icon: <AddIcon outline />,
								content: <Text content={"Nouvelle tâche"} onClick={() => this.props.openTask()} />
							},
							{
								key: 'today',
								icon: (<CheckmarkCircleIcon outline onClick={() => this.props.today()} />),
								content: <Text content={"Aujourd'hui"} onClick={() => this.props.today()} />
							},
							{
								key: 'back',
								icon: <ChevronStartIcon outline onClick={() => this.props.back()} />,
								content: <Text content={"Retour"} onClick={() => this.props.back()} />
							},
							{
								key: 'forward',
								icon: <ChevronEndIcon outline onClick={() => this.props.forward()} />,
								content: <Text content={"Suivant"} onClick={() => this.props.forward()} />
							},
							{
								key: 'weekends',
								icon: this.props.isShowWeekends ? <EyeIcon outline /> : <EyeSlashIcon outline />,
								content: <Text content={"Week-ends"} onClick={this.showWeekends} />
							}
						]}
					/>


					<Flex.Item push>
						<Flex gap="gap.medium" >
							<Text as="h2" style={{ color: "#646464", margin: 0, marginRight: 50 }} content={this.props.title} />
							<Menu
								style={{ flexDirection: "row" }}
								iconOnly
								items={[
									{
										key: '7',
										icon: <CalendarIcon onClick={() => this.props.showModeCalendar("Month")} />,
										content: <Text content="Mois" onClick={() => this.props.showModeCalendar("Month")} />,
									},
									{
										key: '6',
										icon: <CalendarIcon outline onClick={() => this.props.showModeCalendar("Week")} />,
										content: <Text content="Semaine" onClick={() => this.props.showModeCalendar("Week")} />,
									},
									{
										key: '4',
										icon: <BulletsIcon onClick={() => this.props.showModeCalendar("Day")}/>,
										content: <Text content="Day" onClick={() => this.props.showModeCalendar("Day")} />,
									},
									{
										key: '5',
										icon: <BulletsIcon onClick={() => this.props.showModeCalendar("Liste")} />,
										content: <Text content="Liste" onClick={() => this.props.showModeCalendar("Liste")} />,
									},
								]}
							/>
						</Flex>
					</Flex.Item>
				</Flex>
			</>
		)	
	}
}

export default BarreFullCalendar;