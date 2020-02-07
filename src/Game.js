ySelectorAll(`.${stationClass}`);
    targetStationSpans.forEach(span => (span.style.display = "none"));
  };

  hideAllStations = stationClassArray => {
    stationClassArray.forEach(station => this.hideStation(station));
  };

  showStation = stationClass => {
    const targetStationSpans = document.querySelectorAll(`.${stationClass}`);
    targetStationSpans.forEach(span => {
      span.style.display = "block";
      const currentClasses = span.classList.value;
      span.class = `${currentClasses} bounceIn`;
    });
    const newCorrectAnswers = this.state.correctAnswers;
    newCorrectAnswers.push(stationClass);
    this.setState({
      stationClasses: [...this.state.stationClasses].filter(
        el => el !== stationClass
      ),
      correctAnswers: newCorrectAnswers,
      score: (this.state.score += 1)
    });
  };

  showMissingStation = stationClass => {
    const targetStationSpans = document.querySelectorAll(`.${stationClass}`);
    targetStationSpans.forEach(span => (span.style.display = "block"));
    targetStationSpans.forEach(span => (span.style.fill = "red"));
  };import React from "react";
import { ReactComponent as Map } from "./latomap2.svg";
import Form from "react-bootstrap/Form";
import Zoomable from "./Zoomable";
import Message from "./Message";
import Score from "./Score";
import Timer from "react-compound-timer";

class Game extends React.Component {
  state = {
    stationClasses: [
      "aldgate",
      "aldgate-east",
      "angel",
      "baker-street",
      "bank",
      "barbican",
      "bayswater",
      "blackfriars",
      "bond-street",
      "borough",
      "cannon-street",
      "chancery-lane",
      "charing-cross",
      "covent-garden",
      "earls-court",
      "edgware-road",
      "elephant-and-castle",
      "embankment",
      "euston",
      "euston-square",
      "farringdon",
      "gloucester-road",
      "goodge-street",
      "great-portland-street",
      "green-park",
      "high-street-kensington",
      "holborn",
      "hoxton",
      "hyde-park-corner",
      "kings-cross-st-pancras",
      "knightsbridge",
      "lambeth-north",
      "lancaster-gate",
      "leicester-square",
      "liverpool-street",
      "london-bridge",
      "mansion-house",
      "marble-arch",
      "marylebone",
      "monument",
      "moorgate",
      "notting-hill-gate",
      "old-street",
      "oxford-circus",
      "paddington",
      "piccadilly-circus",
      "pimlico",
      "queensway",
      "regents-park",
      "russell-square",
      "shoreditch-high-street",
      "sloane-square",
      "south-kensington",
      "southwark",
      "st-jamess-park",
      "st-pancras-international",
      "st-pauls",
      "temple",
      "tottenham-court-road",
      "tower-gateway",
      "tower-hill",
      "vauxhall",
      "victoria",
      "warren-street",
      "waterloo-east",
      "waterloo",
      "westminster"
    ],
    correctAnswers: [],
    formText: "",
    score: 0,
    gameOver: false
  };

  hideStation = stationClass => {
    const targetStationSpans = document.quer

  showMissingStations = missingStations => {
    missingStations.forEach(station => this.showMissingStation(station));
  };

  gameOver = () => {
    this.showMissingStations(this.state.stationClasses);
  };

  checkStation = input => {
    const classInput = input
      .toLowerCase()
      .split(" ")
      .join("-");
    if (this.state.stationClasses.includes(classInput)) {
      this.showStation(classInput);
      this.setState({ formText: "" });
    }
  };

  handleChange = event => {
    this.setState({ formText: event.target.value }, () =>
      this.checkStation(this.state.formText)
    );
  };

  componentDidMount = () => {
    this.hideAllStations(this.state.stationClasses);
  };

  render() {
    // const {  } = this.props
    return (
      <>
        <nav>
          <h1>Tubey McTubeFace</h1>
          <Form className="answer">
            <Form.Control
              size="lg"
              className="answer-input"
              value={this.state.formText}
              type="text"
              placeholder="Enter Station Name"
              onChange={this.handleChange}
            />
          </Form>

          <Timer
            initialTime={300000}
            direction="backward"
            checkpoints={[
              {
                time: 0,
                callback: () => this.gameOver()
              }
            ]}
            onChange={() => this.state.gameOver && <h2>Game Over</h2>}
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
            <Score score={this.state.score}></Score>
          </h2>
        </nav>

        <Zoomable initialZoom={2.2}>
          <Map />
        </Zoomable>
      </>
    );
  }
}

export default Game;
