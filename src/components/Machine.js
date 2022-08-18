import React from "react";
import { bankOne } from "./drumset";

class Machine extends React.Component {
  render() {
    return (
      <div>
        <div id="drum-machine" className="text-center main-content">
          <h1>DRUM MACHINE</h1>
          <DrumPlates />
        </div>
      </div>
    );
  }
}

class DrumPlates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  handleKeyPress(e) {
    // console.log(e.keyCode);
    const findKey = bankOne.find(
      (keyp) => keyp.keyTrigger === e.key.toUpperCase()
    );
    if (e.keyCode === findKey.keyCode) {
      const sound = document.getElementById(findKey.keyTrigger);
      sound.currentTime = 0;
      sound.play();
      this.setState({ displayName: findKey.id });
    }
  }

  handleClick(getId, songName) {
    // console.log("im ");
    const sound = document.getElementById(getId);
    sound.currentTime = 0;
    sound.play();
    // console.log(sound);
    this.setState({ displayName: songName });
  }

  render() {
    return (
      <div className="drum-pad-parents">
        {bankOne.map((list) => (
          <div
            key={list.id}
            className="drum-pad btn"
            id={list.id}
            onClick={() => this.handleClick(list.keyTrigger, list.id)}
          >
            <audio src={list.url} className="clip" id={list.keyTrigger}></audio>
            {list.keyTrigger}
          </div>
        ))}
        <div id="display">{this.state.displayName}</div>
      </div>
    );
  }
}

export { Machine };
