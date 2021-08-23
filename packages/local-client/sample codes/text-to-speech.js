import PropTypes from 'prop-types'
import update from 'immutability-helper'

const style = {
  container: {
    width: '100%',
  },
  text: {
    width: '100%',
    display: '',
  },
  play: {
    hover: {
      backgroundColor: 'GhostWhite',
    },
    button: {
      width: '34',
      height: '34',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'Gainsboro',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6,
    },
  },
  stop: {
    hover: {
      backgroundColor: 'GhostWhite',
    },
    button: {
      width: '34',
      height: '34',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'Gainsboro',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6,
    },
  },
  pause: {
    hover: {
      backgroundColor: 'GhostWhite',
    },
    button: {
      width: '34',
      height: '34',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'Gainsboro',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6,
    },
  },
  resume: {
    hover: {
      backgroundColor: 'GhostWhite',
    },
    button: {
      width: '34',
      height: '34',
      cursor: 'pointer',
      pointerEvents: 'none',
      outline: 'none',
      backgroundColor: 'Gainsboro',
      border: 'solid 1px rgba(255,255,255,1)',
      borderRadius: 6,
    },
  },
}

class SpeechSynthesis {
  constructor(props) {
    this.utterance = new window.SpeechSynthesisUtterance()
    this.selected = SpeechSynthesis.getVoice(props.voice)
    // this.utterance.voice = this.selected;
    this.utterance.text = props.text.replace(/\n/g, '')
    this.utterance.lang = props.lang || 'en-EN'
    this.utterance.pitch = parseFloat(props.pitch, 10) || 0.8
    this.utterance.rate = parseFloat(props.rate, 10) || 1
    this.utterance.volume = parseFloat(props.volume, 10) || 1
  }

  static supported(selected) {
    return window.speechSynthesis
  }

  static getVoice(selected) {
    const voices = window.speechSynthesis.getVoices()
    const voice = voices.find((voice) => voice.name === selected)
    return voice !== undefined ? voice : voices[0]
  }

  onend(func) {
    this.utterance.onend = func
  }

  onerror(func) {
    this.utterance.onerror = func
  }

  speak() {
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(this.utterance)
  }

  pause() {
    window.speechSynthesis.pause()
  }

  cancel() {
    window.speechSynthesis.cancel()
  }

  resume() {
    window.speechSynthesis.resume()
  }
}

class Button extends Component {
  constructor(props) {
    super(props)
    this.state = {
      focus: false,
      hover: false,
      color: this.props.styles.button.Color,
      backgroundColor: this.props.styles.button.backgroundColor,
    }
    this.enter = this.enter.bind(this)
    this.leave = this.leave.bind(this)
  }

  enter() {
    this.setState({ hover: true })
  }

  leave() {
    this.setState({ hover: false })
  }

  render() {
    const backgroundColor = this.state.hover
      ? this.props.styles.hover.backgroundColor
      : this.state.backgroundColor

    const color = this.state.hover
      ? this.props.styles.hover.color
      : this.state.color

    const style = Object.assign({}, this.props.styles.button, {
      color: color,
      backgroundColor: backgroundColor,
    })

    return (
      <button
        type="button"
        {...this.props}
        style={style}
        onMouseEnter={this.enter}
        onMouseLeave={this.leave}
      />
    )
  }
}

Button.propTypes = {
  styles: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
}

class Speech extends Component {
  constructor(props) {
    super(props)
    this.state = {
      styles: this.props.styles || style,
    }
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.stop = this.stop.bind(this)
    this.onend = this.onend.bind(this)
    this.onerror = this.onerror.bind(this)
  }

  componentDidMount() {
    this.setButtonState('all', 'none', 'none', 'none')
  }

  setButtonState(play, stop, pause, resume) {
    var newState = update(this.state, {
      styles: {
        play: { button: { pointerEvents: { $set: play } } },
        stop: { button: { pointerEvents: { $set: stop } } },
        pause: { button: { pointerEvents: { $set: pause } } },
        resume: { button: { pointerEvents: { $set: resume } } },
      },
    })

    this.setState(newState)
  }

  setSpeechSynthesis() {
    this.speechSynthesis = new SpeechSynthesis(this.props)
    this.speechSynthesis.onend(this.onend)
    this.speechSynthesis.onerror(this.onerror)
  }

  play() {
    this.setSpeechSynthesis()
    this.speechSynthesis.speak()
    this.setButtonState('none', 'all', 'all', 'none')
  }

  pause() {
    this.speechSynthesis.pause()
    this.setButtonState('none', 'all', 'none', 'all')
  }

  resume() {
    this.speechSynthesis.resume()
    this.setButtonState('none', 'all', 'all', 'none')
  }

  stop() {
    this.speechSynthesis.cancel()
    this.setButtonState('all', 'none', 'none', 'none')
  }

  onend() {
    this.stop()
  }

  onerror() {
    this.stop()
  }

  render() {
    if (this.props.disabled || !SpeechSynthesis.supported()) {
      return (
        <span className="rs-container" style={this.state.styles.container}>
          <span className="rs-text" style={this.state.styles.text}>
            {this.props.text}
          </span>
        </span>
      )
    }

    var play
    var stop
    var pause
    var resume

    if (this.props.textAsButton) {
      play = (
        <Button
          className="rs-play"
          styles={this.state.styles.play}
          onClick={this.play}
        >
          <span className="rs-text" style={this.state.styles.text}>
            {this.props.displayText || this.props.text}
          </span>
        </Button>
      )
    } else {
      play = (
        <Button
          className="rs-play"
          styles={this.state.styles.play}
          onClick={this.play}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.play.button.width}
            height={this.state.styles.play.button.height}
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      )
    }

    if (this.props.stop) {
      stop = (
        <Button
          className="rs-stop"
          styles={this.state.styles.stop}
          onClick={this.stop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.stop.width}
            height={this.state.styles.stop.height}
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M6 6h12v12H6z" />
          </svg>
        </Button>
      )
    }

    if (this.props.pause) {
      pause = (
        <Button
          className="rs-pause"
          styles={this.state.styles.pause}
          onClick={this.pause}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.pause.button.width}
            height={this.state.styles.pause.button.height}
            viewBox="0 0 24 24"
          >
            <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      )
    }

    if (this.props.resume) {
      resume = (
        <Button
          className="rs-resume"
          styles={this.state.styles.resume}
          onClick={this.resume}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={this.state.styles.resume.button.width}
            height={this.state.styles.resume.button.height}
            viewBox="0 0 24 24"
          >
            <path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </Button>
      )
    }

    return (
      <span className="rs-container" style={this.state.styles.container}>
        {play} {stop} {pause} {resume}
      </span>
    )
  }
}

Speech.propTypes = {
  styles: PropTypes.object,
  text: PropTypes.string.isRequired,
  pitch: PropTypes.string,
  rate: PropTypes.string,
  volume: PropTypes.string,
  lang: PropTypes.string,
  voiceURI: PropTypes.string,
  voice: PropTypes.string,
  textAsButton: PropTypes.bool,
  displayText: PropTypes.string,
  disabled: PropTypes.bool,
  stop: PropTypes.bool,
  pause: PropTypes.bool,
  resume: PropTypes.bool,
}

function App4() {
  const [text, setText] = useState('Type anything')
  const [language, setLanguage] = useState('hu-HU')

  return (
    <div className="App">
      <h1>Text to Speech Translator</h1>
      <textarea
        onChange={({ target: { value } }) => setText(value)}
        style={{ width: '50%', minHeight: 100 }}
        value={text}
      />
      <br />
      <br />
      <select
        value={language}
        onChange={({ target: { value } }) => setLanguage(value)}
      >
        <option value="hu-HU">magyar</option>
        <option value="en-EN">angol</option>
        <option value="de-DE">német</option>
        <option value="fr-FR">franica</option>
      </select>
      <br />
      <br />
      <Speech lang={language} text={text} pause resume />
      <br />
      <br />
      <p style={{ fontSize: 11 }}>info@gazdagergo.com</p>
    </div>
  )
}

/* const rootElement = document.getElementById('root')
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
) */

show(<App4 />)
