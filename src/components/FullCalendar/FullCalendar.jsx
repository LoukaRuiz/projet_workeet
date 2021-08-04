import * as React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import CreateTask from '../CreateTask/CreateTask';
import { CloseIcon, Dialog, Text } from '@fluentui/react-northstar';
import Task from '../../models/Task';
import moment from 'moment';
import { updateTask, createTask, getTasks} from '../../Api/apiTasks';
import BarreFullCalendar from '../BarreFullCalendar/BarreFullCalendar';
import { createUserTask } from '../../Api/apiUserTask';

class CFullCalendar extends React.Component {

	calendarRef = null
	calendarApi = null

	constructor(props) {
		super(props)
		this.calendarRef = React.createRef()
	
		this.state = {
			tasks: [],
			participantsAssigned: [],
			showModalCreateTask: false,
			currentCalendarTitle: "",
			task: Task.fromJS({}),
			showWeekends: true,
			displayMode: "dayGridMonth",
			projects: this.props.projects
		}
	}

	componentDidMount = () =>{
		this.calendarApi = this.calendarRef ? this.calendarRef.current.getApi() : null
		this.fetchTasks()
	}

	componentDidUpdate = (prevPros, prevState) => {
		if(prevPros.projectSelected !== this.props.projectSelected) {
			this.fetchTasks()
		}
	}

	handleDatesRendering = () => {
		setTimeout(() => {
			this.setCalendarTitle();
		}, 50);
	}
  
	today = () => {
		if (this.calendarRef) {
		this.calendarApi.today()
		}
	}

	back =() => {
		if (this.calendarRef) {
		this.calendarApi.prev()
		}
	}

	forward =() => {
		if (this.calendarRef) {
		this.calendarApi.next()
		}
	}

	setCalendarTitle = () => {
		if (this.calendarRef) {
			this.setState({ currentCalendarTitle: this.calendarApi.view.title });
		}
	}

	openTask = (show) => {
		this.setState({ showModalCreateTask : show })
	}

	showWeekends = (show) => {
		this.setState({ showWeekends: show });
	}

	wrapDisplayMode = (mode) => {
		switch (mode) {
			case "Liste":
				this.calendarApi.changeView('listWeek');
				break
			case "Day":
				this.calendarApi.changeView('timeGridDay');
				break
			case "Week":
				this.calendarApi.changeView('timeGridWeek');
				break
			case "Month":
				this.calendarApi.changeView('dayGridMonth');
				break
			default:
				return 'dayGridMonth'
		}
	}

	newEventOnBarre = () => {
		let newTask = Task.fromJS({})
		newTask.ProjectId = this.props.projectSelected.id
		newTask.allDay = true
		newTask.startDate = moment(new Date())
		newTask.endDate = moment(new Date()).add(1, "d")
		newTask.duration = moment(newTask.endDate).diff(newTask.startDate, "millisecond")
		newTask.createdAt = new Date()
		newTask.Users = []

		this.setState({ task: Task.fromJS({ ...newTask }) })
		this.openTask(true)
	}

	eventNewTask = (info) => {
		let newTask = Task.fromJS({})
		newTask.ProjectId = this.props.projectSelected.id
		newTask.allDay = true
		newTask.startDate = info.start
		newTask.endDate = info.end
		newTask.duration = moment(info.end).diff(info.start, "millisecond")
		newTask.createdAt = new Date()
		newTask.Users = []

		this.setState({ task: Task.fromJS({ ...newTask})})
		this.openTask(true)
	}

	onUpdateNewTask = (task, participantsAssigned) => {
		this.setState({ task, participantsAssigned })
	}

	onConfirmNewTask = async () => {
		if(this.state.task.id){
			
			let res = await updateTask(this.props.projectSelected.id, this.state.task.id, this.state.task)
			if(res === null){
				// TODO updateUserTask ITEM
				if (this.state.participantsAssigned.length) {
					await this.createRelationUserTask(this.state.task.id)
				}
				await this.fetchTasks()
				this.openTask(false)
			}
		
		} else {
			let newTaskCreated = await createTask(this.props.projectSelected.id, this.state.task)
			if(newTaskCreated.id) {
				// TODO createUserTask ITEM
				if (this.state.participantsAssigned.length) {
					await this.createRelationUserTask(newTaskCreated.id)
				}
				await this.fetchTasks()
				this.openTask(false)
			}
		}
	}

	createRelationUserTask = async (id) => {
		this.state.participantsAssigned.map(async participantId => {
			await createUserTask(participantId, id)
		})
	}

	eventUpdateTask = (info) => {

		let newTask = Task.fromJS({})
		newTask.ProjectId = this.props.projectSelected.id
		newTask.id = info.event.id
		newTask.title = info.event.title
		newTask.description = info.event.extendedProps.description
		newTask.allDay = true
		newTask.startDate = info.event.start
		newTask.endDate = info.event.end
		newTask.duration = moment(info.event.end).diff(info.event.start, "millisecond")
		newTask.createdAt = new Date()
		newTask.Users = info.event.extendedProps.users

		this.setState({ task: Task.fromJS({ ...newTask }) })
		this.openTask(true)
	}

	renderCreateTask = () => {
		return (
			<Dialog
				closeOnOutsideClick={false}
				style={{ minWidth: "600px", maxWidth: "600px" }}
				header={<Text as="h4" content="Tâche" />}
				open={this.state.showModalCreateTask}
				confirmButton="Sauvegarder"
				cancelButton="Annuler"
				onConfirm={() => this.onConfirmNewTask()}
				onCancel={() => this.setState({ showModalCreateTask: false })}
				headerAction={{
					icon: <CloseIcon />,
					onClick: () => this.setState({ showModalCreateTask: false })
				}}
				content={<CreateTask task={this.state.task} onUpdateNewTask={this.onUpdateNewTask} projectSelected={this.props.projectSelected}/>}
			/>
		)
	}

	fetchTasks = async () => {
		let tasks = await getTasks(this.props.projectSelected.id) 
		let events = tasks.map(item => {
			let e = {
				id: item.id,
				title: item.title,
				description: item.description,
				start: item.startDate,
				end: item.endDate,
				duration: item.duration,
				allDay: item.allDay,
				users: item.Users
			}
			return e
		})

		this.setState({ tasks: events })
	}

	render() {
		return (
			<>
				{this.renderCreateTask()}
				<BarreFullCalendar
					style={{ marginLeft: 10 }}
					today={this.today}
					back={this.back}
					forward={this.forward}
					openTask={() => this.newEventOnBarre()}
					isShowWeekends={this.state.showWeekends}
					showWeekends={(show) => this.showWeekends(show)}
					showModeCalendar={(mode) => this.wrapDisplayMode(mode)}
					title={this.state.currentCalendarTitle}
				/>
				<div style={{ height: "90vh" }} >
					<FullCalendar
						schedulerLicenseKey="CC-Attribution-NonCommercial-NoDerivatives"
						ref={this.calendarRef}
						locale={Intl.DateTimeFormat().resolvedOptions().locale}
						plugins={[dayGridPlugin, interactionPlugin, listPlugin, timeGridPlugin ]}
						initialView={this.state.displayMode.toString()}
						footerToolbar={false}
						headerToolbar={false}
						weekends={this.state.showWeekends}
						height="100%"
						selectable={true}
						droppable={true}
						editable={true}
						select={(infos) => this.eventNewTask(infos)}
						dateClick={(infos) => this.openTask(infos) }
						datesSet={() => this.handleDatesRendering()}
						eventDrop={(infos) => this.openTask(infos)}
						eventClick={(infos) => this.eventUpdateTask(infos)}
						events={this.state.tasks}
					/>
				
				</div>
			</>
		)
	}


}

export default CFullCalendar;
