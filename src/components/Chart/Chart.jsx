import React from 'react';
import { Line  } from 'react-chartjs-2';
import moment from 'moment'
import { Button, Flex } from '@fluentui/react-northstar';

const options = {
  scales: {
    xAxes: [{
      scaleLabel: {
        display: true,
        labelString: 'Jours / Mois'
      }
    }],
    yAxes: [{
      ticks: {
        suggestedMin: 0,
        suggestedMax: 6
      },
      scaleLabel: {
        display: true,
        labelString: 'Humeur'
      }
    }],
  }
}

export const participants = [
  {
    name: "Roman"
  },
  {
    name: "Alex"
  },
  {
    name: "Ali"
  }
]

export default class App extends React.Component {


  constructor(props) {
    super(props)

    this.state = {
      monthSelected: 0,
      days: null,
      donnes: {
        labels: Array.from(Array(moment().daysInMonth()), (_, i) => i + 1),
        datasets: [
          {
            label: participants[0].name,
            borderColor: 'black',
            borderWidth: 1,
            data: Array.from({ length: 30 }, () => (Math.floor(Math.random(1, 5) * 5) + 1) )
          },
          {
            label: participants[1].name,
            borderColor: 'salmon',
            borderWidth: 1,
            data: Array.from({ length: 30 }, () => (Math.floor(Math.random(1, 5) * 5) + 1))
          },
          {
            label: participants[2].name,
            borderColor: 'black',
            borderWidth: 1,
            data: Array.from({ length: 30 }, () => (Math.floor(Math.random(1, 5) * 5) + 1))
          }
        ]
      }
    }
  }

  randomNumber = (top) => {
    let array = Array.from({ length: top }, () => (Math.floor(Math.random(1, 5) * 5) +1 ))
    return array
  }

  getMonth = (index) => {

    let year = moment().year()
    let date = year + ((index+1) < 10 ? "-0" : "-") + (index + 1)


    let days = Array.from(Array(moment(date).daysInMonth()), (_, i) => i + 1)
    this.setState({ monthSelected: index, donnes: { ...this.state.donnes, labels: days, datasets: this.state.donnes.datasets.map(item => { 
      return { ...item, data: this.randomNumber(days.length) }
      })
    }})
  }

  render() {
    return (
      <Flex column>
        <Flex hAlign="center" style={{ margin: 15 }}>
          {
            moment.localeData("fr").months().map( (moins, index) => {
              return (
                <div style={{ margin : 10 }}>
                  <Button primary={this.state.monthSelected === index} content={moins} onClick={() => this.getMonth(index)} />
                </div>
              )
            })
          }
        </Flex>

        <div>
          <Line
            data={this.state.donnes}
            width={window.innerWidth * 0.7}
            height={window.innerHeight * 0.3}
            options={options}
          />
        </div>
      </Flex>
    );
  }
}
