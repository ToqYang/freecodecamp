import { useState, useEffect } from "react";
import {
  audioWithoutBank,
  audioBank,
  meanDrumsBank,
  meansDrumsNotBank,
  letters,
} from "./audio";
import DrumPad from "./DrumPad";
import Switch from "./Switch.js";
import "./App.css";

function App() {
  const [bank, setBank] = useState(false);
  const [audiosBank, setAudioBank] = useState([]);
  const [titlesBtn, setTitlesBtn] = useState([]);
  const [titleBtn, setTitleBtn] = useState("\u00a0");
  const [power, setPower] = useState(true);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;

    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (bank) {
      setAudioBank(audioBank);
      setTitlesBtn(meanDrumsBank);
    } else {
      setAudioBank(audioWithoutBank);
      setTitlesBtn(meansDrumsNotBank);
    }
  }, [bank]);

  function handlerRange(e) {
    setVolume(e.target.value);
  }
  console.log(letters);

  return (
    <main id="menu">
      <section id="drum-machine">
        <div className="drums">
          {letters.map((char, index) => {
            return (
              <DrumPad
                letter={char}
                url={audiosBank[index]}
                on={power}
                titles={titlesBtn[index]}
                titleClicked={setTitleBtn}
                volume={volume}
              />
            );
          })}
        </div>
        <div id="options">
          <div className="options__power">
            <h1>Power</h1>
            <Switch on={power} setOn={setPower} />
          </div>
          <div className="options__display-cont">
            <p id="display">{titleBtn}</p>
          </div>
          <div className="options__slider">
            <input
              id="slider"
              type="range"
              min="0.0"
              max="1.0"
              value={volume}
              step="0.1"
              onChange={handlerRange}
            />
          </div>
          <div className="options__bank">
            <h1>Bank</h1>
            <Switch on={bank} setOn={setBank} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
