import React, { Component } from "react";
import axios from "axios";
import "./css/style.css";
import $ from "jquery";
import jQuery from "jquery";
window.jQuery = jQuery;
require("jquery-color");

class App extends Component {
  state = {
    quotes: [],
    quote: {},
    colours: [
      "#16a085",
      "#27ae60",
      "#2c3e50",
      "#f39c12",
      "#e74c3c",
      "#9b59b6",
      "#FB6964",
      "#342224",
      "#472E32",
      "#BDBB99",
      "#77B1A9",
      "#73A857",
    ],
  };

  componentDidMount() {
    axios.get("https://type.fit/api/quotes").then((response) => {
      this.setState({ quotes: response.data }, this.getQuote);
    });
  }

  getQuote = () => {
    const number = Math.floor(Math.random() * 1643);
    this.setState({ quote: this.state.quotes[number] });
  };
  handleClick = (event) => {
    const colour = this.state.colours[
      Math.floor(Math.random() * this.state.colours.length)
    ];
    this.getQuote();
    $(".quote").animate({ opacity: 0, color: colour }, 0, function () {
      $(this).animate({ opacity: 1 }, 1000);
    });
    $("#body, .button").animate({ backgroundColor: colour }, 1200);
  };

  render() {
    const { quote } = this.state;
    return (
      <div className="App" id="body">
        <h1>Quote Box</h1>
        <div className="quoteBox">
          <p id="text" className="quote">
            "{quote.text}"
          </p>
          <p id="author" className="quote">
            -{quote.author}
          </p>
          <div className="links">
            <a
              className="button"
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text="${quote.text}" ${quote.author}`}
              id="tweet-quote"
              target="_blank"
            >
              Tweet
            </a>
            <button className="button" onClick={this.handleClick}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
