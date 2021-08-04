import React from 'react';
import { Text, Input, Dropdown,TextArea, Flex, EditIcon, CalendarIcon, IndentIcon, ParticipantAddIcon, Button, AcceptIcon, Avatar, UserFriendsIcon } from '@fluentui/react-northstar';
import moment from 'moment';
import Task from '../../models/Task';
import { getUsers } from '../../Api/apiUser';
import ModalMood from '../ModalMood/ModalMood';


class CreateTask extends React.Component {


	constructor(props) {
		super(props)

		this.state = {
			newTask: Task.fromJS({}),
			participants: [],
			participantSelected: [],
			participantLibre: [],
			isTaskFinish: false,
		}
	}

	componentDidMount = () => {
		if(this.props.task){
			this.setState({ newTask: Task.fromJS({ ...this.props.task })})
		}

		this.getAllUsersByProject()
	}

	getAllUsersByProject = async () => {
		if(this.props.projectSelected){
			let users = await getUsers(this.props.projectSelected.id)
			if(users.length) {
				this.setState({ participants: users })
				this.renderParticipantNotAssigned()
			}
		}
	}

	componentDidUpdate = (prevProps, prevState) => {
		if(prevState !== this.state){
			this.props.onUpdateNewTask(this.state.newTask, this.state.participantSelected)
		}
	}

	onChangeTitle = (e) => {
		e.preventDefault()
		this.setState({ newTask: Task.fromJS({ ...this.state.newTask, title: e.target.value })})
	}

	onChangeDescription = (e) => {
		e.preventDefault()
		this.setState({ newTask: Task.fromJS({ ...this.state.newTask, description: e.target.value }) })
	}

	onAddParticipant = (item) => {
		let usersIds = this.state.participantSelected
		if(item) usersIds.push(this.state.participants.find(data => data.firstName === item).id)
		this.setState({ participantSelected: usersIds })
	}

	onRemoveParticipant = (item) => {
		let users = this.state.participantSelected
		if (item) {
			let removes = users.map(user => user !== item ? user : false)
			let filters = removes.filter(item => item)
			this.setState({ participantSelected: filters })
		}
	}

	renderParticipantNotAssigned = () => {
		let res = this.state.participants.map(item => !this.props.task.Users.map(user => user.firstName).includes(item.firstName) && item)
		this.setState({ participantLibre: res.filter(t => t) }) 
	}

	onClickTaskFinish = () => {
		this.setState({ isTaskFinish: true })
	}

    render () {
		if(this.state.isTaskFinish) {
			return (
				<>
					<ModalMood />
				</>
			)	
		}

		return (
			<>
				<Flex gap="gap.medium" column>

					<Flex gap="gap.small" vAlign="center" style={{ marginBottom: 20 }}>
						<EditIcon />
						<Flex.Item>
							<Input 
								fluid 
								clearable 
								maxLength="50" 
								placeholder="Ajouter un titre"
								value={this.state.newTask.title}
								onChange={this.onChangeTitle}
							/>
						</Flex.Item>
					</Flex>

					<Flex gap="gap.small" style={{ marginBottom: 20 }}>
						<Flex.Item grow>
							<Flex gap="gap.small" vAlign="center">
								<CalendarIcon />
								<Text content="Début" />
								<Input
									inputOnly
									type="date"
									value={moment(this.state.newTask.startDate).format("YYYY-MM-DD")}
								/>
							</Flex>
						</Flex.Item>
						<Flex.Item >
							<Flex gap="gap.small" vAlign="center">
								<CalendarIcon />
								<Text content="Fin" />
								<Input
									inputOnly
									type="date"
									value={moment(this.state.newTask.endDate).format("YYYY-MM-DD")}
								/>
							</Flex>
						</Flex.Item>

					</Flex>

					<Flex gap="gap.small" vAlign="center" >
						<ParticipantAddIcon />
						<div style={{ width: "100%"}}>
							<Dropdown
								fluid
								multiple
								search
								items={this.state.participantLibre.map( p => p.firstName)}
								placeholder="Cherchez un participant"
								getA11ySelectionMessage={{
									onAdd: item => this.onAddParticipant(item),
									onRemove: item => this.onRemoveParticipant(item)
								}}
							/>
						</div>
					</Flex>

					<Flex gap="gap.small">
						<IndentIcon />
						<TextArea 
							fluid 
							clearable 
							placeholder="Description"
							rows={10}
							value={this.state.newTask.description}
							onChange={this.onChangeDescription}
						/>
					</Flex>

					{
						this.props.task.Users.length ? 
							<Flex gap="gap.small" vAlign="center" column>
								<Text content="Tâche assigné à: " />
								<Flex gap="gap.small" vAlign="center">
									<UserFriendsIcon />
									<Flex>
										{
											this.props.task.Users.map( user => {
												return (
													<Flex vAlign="center">
														<Avatar name={user.firstName.toUpperCase()}/>
													</Flex>
												)
											})
										}
									</Flex>
								</Flex>
							</Flex> : <></>
					}
					

					<Flex gap="gap.small" vAlign="center">
						<Flex.Item>
							<Flex vAlign="center">
								<AcceptIcon />
								<Button text content="Marquer comme terminée" onClick={() => this.onClickTaskFinish()} />
							</Flex>
						</Flex.Item>
					</Flex>
				</Flex>


			</>
		)
    }
}

export default CreateTask;
