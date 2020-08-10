import React, { Component } from "react";
import axios from "axios";
import "../css/style.css";

class QuoteBox extends Component {
  state = {
    quotes: [],
    quote: {},
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
    this.getQuote();
  };

  render() {
    const { quote } = this.state;
    return (
      <div className="quoteBox">
        <p id="text">"{quote.text}"</p>
        <p id="author">-{quote.author}</p>
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
    );
  }
}

export default QuoteBox;
