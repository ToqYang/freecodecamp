import { useRef, useState, useEffect } from "react";
import "./Drumpad.css";

const DrumPad = ({ letter, url, on, titles, titleClicked, volume }) => {
  const btn = useRef(null);
  const [click, setClick] = useState(false);

  function ReproduceAudio() {
    console.log("power: ", on);
    if (on === true) {
      setClick(true);
      console.log(titles);
      titleClicked(titles);
      btn.current.volume = volume;
      btn.current.play();
      let time = setTimeout(() => {
        setClick(false);
      }, 500);
    }
  }

  useEffect(() => {
    const keyPress = (event) => {
      let char = letter.toLowerCase();
      char = char.charCodeAt(0) - 32;

      if (event.keyCode === char) {
        ReproduceAudio();
      }
    };
    window.addEventListener("keyup", keyPress);
    return () => {
      window.removeEventListener("keyup", keyPress);
    };
  }, [titles]);

  return (
    <button
      id={titles}
      className={click ? "drum-pad drum-click" : "drum-pad drum-clicknot"}
      onClick={ReproduceAudio}
    >
      <h1>{letter}</h1>
      <audio id={letter} className="clip" src={url} ref={btn} />
    </button>
  );
};

export default DrumPad;
