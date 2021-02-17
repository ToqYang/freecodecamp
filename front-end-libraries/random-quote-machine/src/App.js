import React, { Component, createRef } from "react";
import "./App.css";
import { phrases } from "./data";
import { AiOutlineTwitter } from "react-icons/ai";
import { FaQuoteLeft } from "react-icons/fa";

export class App extends Component {
  constructor() {
    super();

    this.state = {
      text: "",
      author: "",
    };
    this.choosePhrase = this.choosePhrase.bind(this);

    this.backgroundColor = createRef();
    this.boxColor = createRef();
    this.btnColor1 = createRef();
    this.btnColor3 = createRef();
    this.quote = createRef();
  }

  checkRange(color = 0) {
    if (color >= 256) {
      color = 255;
    } else if (color < 0) {
      color = 0;
    }

    return color;
  }

  randomRgb() {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);

    r = this.checkRange(r);
    g = this.checkRange(g);
    b = this.checkRange(b);

    return { r, g, b };
  }

  choosePhrase() {
    let idx = Math.floor(Math.random() * 10);
    let phrase = phrases[idx];
    this.setState({ text: phrase.text, author: phrase.author });
  }

  componentDidMount() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
    script.async = true;

    document.body.appendChild(script);
    this.choosePhrase();
  }

  componentDidUpdate() {
    let { r, g, b } = this.randomRgb();
    this.boxColor.current.style.color = `rgb(${r}, ${g}, ${b})`;
    this.backgroundColor.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    this.btnColor1.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    this.btnColor3.current.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    let quote = encodeURIComponent(this.quote.current.textContent);
    let href = `https://twitter.com/intent/tweet?text=${quote}`;
    this.btnColor1.current.href = href;
  }

  render() {
    return (
      <div id="background" ref={this.backgroundColor}>
        <div id="quote-box" ref={this.boxColor}>
          <blockquote id="text">
            <div id="phrase">
              <span id="quotes-logo">
                <FaQuoteLeft />
              </span>
              <p ref={this.quote}>{this.state.text}.</p>
            </div>
            <cite id="author">
              <span>-</span>
              {this.state.author}
            </cite>
          </blockquote>
          <div className="footer">
            <div className="logo">
              <a
                className="logo__icon"
                id="tweet-quote"
                target="_blank"
                href=""
                ref={this.btnColor1}
              >
                <AiOutlineTwitter size="25" color="white" />
              </a>
            </div>
            <button
              id="new-quote"
              onClick={this.choosePhrase}
              ref={this.btnColor3}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
