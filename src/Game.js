import React from 'react'
import { ReactComponent as Map } from './latomap2.svg';
import Form from 'react-bootstrap/Form';
import Timer from 'react-compound-timer'
import Score from './Score.js'
import Zoomable from './Zoomable';

class Game extends React.Component {


    state = {
        stationClasses: ["aldgate", "aldgate-east", "angel", "baker-street", "bank", "barbican", "bayswater", "blackfriars", "bond-street", "borough", "cannon-street", "chancery-lane", "charing-cross", "covent-garden", "earls-court", "edgware-road", "elephant-and-castle", "embankment", "euston", "euston-square", "farringdon", "gloucester-road", "goodge-street", "great-portland-street", "green-park", "high-street-kensington", "holborn", "hoxton", "hyde-park-corner", "kings-cross-st-pancras", "knightsbridge", "lambeth-north", "lancaster-gate", "leicester-square", "liverpool-street", "london-bridge", "mansion-house", "marble-arch", "marylebone", "monument", "moorgate", "notting-hill-gate", "old-street", "oxford-circus", "paddington", "piccadilly-circus", "pimlico", "queensway", "regents-park", "russell-square", "shoreditch-high-street", "sloane-square", "south-kensington", "southwark", "st-jamess-park", "st-pancras-international", "st-pauls", "temple", "tottenham-court-road", "tower-gateway", "tower-hill", "vauxhall", "victoria", "warren-street", "waterloo-east", "waterloo", "westminster"],
        correctAnswers: [],
        formText: "",
        score: 0
    }

    hideStation = stationClass => {
        const targetStationSpans = document.querySelectorAll(`.${stationClass}`)
        targetStationSpans.forEach(span => span.style.display = 'none')
    }


    hideAllStations = stationClassArray => {
        stationClassArray.forEach(station => this.hideStation(station))
    }

    showStation = stationClass => {
        const targetStationSpans = document.querySelectorAll(`.${stationClass}`)
        targetStationSpans.forEach(span => {
            span.style.display = 'block'
            const currentClasses = span.classList.value
            span.class = `${currentClasses} bounceIn`
        })
        const newCorrectAnswers = this.state.correctAnswers
        newCorrectAnswers.push(stationClass)
        this.setState({
            stationClasses: [...this.state.stationClasses].filter(el => el !== stationClass),
            correctAnswers: newCorrectAnswers,
            score: this.state.score += 1
        })
    }

    showMissingStation = stationClass => {
        const targetStationSpans = document.querySelectorAll(`.${stationClass}`)
        targetStationSpans.forEach(span => span.style.display = 'block')
        targetStationSpans.forEach(span => span.style.fill = 'red')
    }

    showMissingStations = missingStations => {
        missingStations.forEach(station => this.showMissingStation(station))
    }

    gameOver = () => {
        this.showMissingStations(this.state.stationClasses)
    }

    checkStation = input => {
        const classInput = input.toLowerCase().split(' ').join('-')
        if (this.state.stationClasses.includes(classInput)) {
            this.showStation(classInput)
            this.setState({formText: ''})
        }
    }

    handleChange = event => {
        this.setState({formText: event.target.value}, () => this.checkStation(this.state.formText))
    }

    componentDidMount = () => {
        this.hideAllStations(this.state.stationClasses)
    }
    

    render() {
        // const {  } = this.props
        return (
           <>
           <nav>
           <h1>Tubey McTubeFace</h1>
           <Form className="answer">
               <Form.Control size="lg" className="answer-input" value={this.state.formText} type="text" placeholder="Enter Station Name" onChange={this.handleChange}/>
           </Form>
           <Timer
                initialTime={300000}
                direction="backward"
                checkpoints={[
                    {
                        time: 0,
                        callback: () => this.gameOver(),
                    }
                ]}
                
            >
                {() => (
                    <>
                        
                        <h2>
                        <Timer.Minutes /> minutes <br />
                        <Timer.Seconds /> seconds 
                        </h2>
                    
                    </>
                )}
            </Timer>
            <h2>
            <Score score={this.state.score} ></Score>
            </h2>
           </nav>

                    <Zoomable initialZoom={2.2}>
                         <Map />
                    </Zoomable>
           

           </>

        )
    }
}


export default Game

//         ["Aldgate",
//         "Aldgate East",
//         "Angel",
//         "Baker Street",
//         "Bank",
//         "Barbican",
//         "Bayswater",
//         "Blackfriars",
//         "Bond Street",
//         "Borough",
//         "Cannon Street",
//         "Charing Cross",
//         "Covent Garden",
//         "Earl's Court",
//         "Edgware Road",
//         "Elephant & Castle",
//         "Embankment",
//         "Euston",
//         "Euston Square",
//         "Farringdon",
//         "Gloucester Road",
//         "Goodge Street",
//         "Great Portland Street",
//         "Green Park",
//         "High Street Kensington",
//         "Holborn",
//         "Hoxton",
//         "Hyde Park Corner",
//         "King's Cross St Pancras",
//         "Knightsbridge",
//         "Lambeth North",
//         "Lancaster Gate",
//         "Leicester Square",
//         "Liverpool Street",
//         "London Bridge",
//         "Mansion House",
//         "Marble Arch",
//         "Marylebone",
//         "Monument",
//         "Moorgate",
//         "Notting Hill Gate",
//         "Old Street",
//         "Oxford Circus",
//         "Paddington",
//         "Piccadilly Circus",
//         "Pimlico",
//         "Queensway",
//         "Regent's Park",
//         "Russell Square",
//         "Shoreditch High Street",
//         "Sloane Square",
//         "South Kensington",
//         "Southwark",
//         "St James's Park",
//         "St Pancras International",
//         "St Paul's",
//         "Temple",
//         "Tottenham Court Road",
//         "Tower Gateway",
//         "Tower Hill",
//         "Vauxhall",
//         "Victoria",
//         "Warren Street",
//         "Waterloo East",
//         "Waterloo",
//         "Westminster"]