const VOICE_DATA = [
  {
    title: "Q",
    id: "heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    display: "Heater 1",
  },
  {
    title: "W",
    id: "heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    display: "Heater 2",
  },
  {
    title: "E",
    id: "heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    display: "Heater 3",
  },
  {
    title: "A",
    id: "heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    display: "Heater 4",
  },
  {
    title: "S",
    id: "clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    display: "Clap",
  },
  {
    title: "D",
    id: "open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    display: "Open HH",
  },
  {
    title: "Z",
    id: "kick-n-hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    display: "Kick n' Hat",
  },
  {
    title: "X",
    id: "kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    display: "Kick",
  },
  {
    title: "C",
    id: "closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    display: "Closed HH",
  },
];

const DrumPad = (props) => {
  const { title, id, src, display } = props.audioData;
  const audioRef = React.useRef();

  React.useEffect(() => {
    audioRef.current.volume = parseInt(props.volume) / 100;
  }, [props.volume]);

  function handlePlayAudio() {
    audioRef.current.currentTime = 0;
    audioRef.current.play();
    props.changeDisplay();
  }
  return (
    <div>
      <button
        onClick={handlePlayAudio}
        className="drum-pad btn btn-secondary"
        id={id}
      >
        {title}
        <audio src={src} ref={audioRef} className="clip" id={title}></audio>
      </button>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "Heater 1",
      volume: "20",
    };
    this.handleChangeDisplay = this.handleChangeDisplay.bind(this);
  }

  componentDidMount() {
    const pressed = {
      81: "heater-1",
      87: "heater-2",
      69: "heater-3",
      65: "heater-4",
      83: "clap",
      68: "open-HH",
      90: "kick-n-hat",
      88: "kick",
      67: "closed-HH",
    };
    document.addEventListener("keydown", (event) => {
      const clicked = document.getElementById(pressed[event.keyCode]);
      let clearTime = null;
      if (clicked) {
        clearTimeout(clearTime);
        clicked.classList.add("active");
        clicked.click();
        clearTime = setTimeout(() => {
          clicked.classList.remove("active");
        }, 100);
      }
    });
  }

  handleChangeDisplay(text) {
    this.setState({
      display: text,
    });
  }

  render() {
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center ">
        <div
          id="drum-machine"
          className="bg-dark d-flex justify-content-center align-items-center p-3 border border-4 border-warning"
        >
          <div
            className="d-flex justify-content-start align-items-center flex-wrap"
            style={{
              width: "20rem",
            }}
          >
            {VOICE_DATA.map((item) => (
              <DrumPad
                audioData={item}
                changeDisplay={() => this.handleChangeDisplay(item.display)}
                volume={this.state.volume}
              />
            ))}
          </div>
          <div className="row">
            <div className="text-center">
              <div id="display">{this.state.display}</div>
            </div>
            <div className="text-center">
              <input
                id="range-input"
                value={this.state.volume}
                type="range"
                min="0"
                max="100"
                style={{ width: "70%" }}
                onChange={(e) => this.setState({ volume: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
