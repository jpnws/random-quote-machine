class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      quote: "",
      author: "",
      imgUrl: "",
    };
    this.getNewQuote = this.getNewQuote.bind(this);
  }

  componentDidMount() {
    this.setState({
      loading: true,
    });

    fetch("https://picsum.photos/2840/2160?blur=1").then((resp) => {
      this.setState({
        imgUrl: resp.url,
      });
    });

    setTimeout(() => {
      fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            loading: false,
            quote: data.en,
            author: data.author,
          });
        });
    }, 500);
  }

  getNewQuote() {
    this.setState({
      loading: true,
    });

    fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          loading: false,
          quote: data.en,
          author: data.author,
        });
      });
  }

  render() {
    let styles;
    if (this.state.imgUrl) {
      styles = {
        background: `url(${this.state.imgUrl}) no-repeat center center fixed`,
        backgroundSize: "cover",
      };
      console.log(styles);
    }

    let qbt;
    let twitterHref;

    if (this.state.loading) {
      qbt = (
        <div className="quote-box-top">
          <p className="quote-loading">loading...</p>
        </div>
      );
    } else {
      qbt = (
        <div className="quote-box-top">
          <p className="quote-text" id="text">
            "{this.state.quote}"
          </p>
          <p className="quote-author" id="author">
            {this.state.author}
          </p>
        </div>
      );

      twitterHref =
        "https://twitter.com/intent/tweet?hashtags=quotes&amp;related=freecodecamp&amp;text=" +
        this.state.quote +
        " - " +
        this.state.author;
    }

    return (
      <div style={styles} className="quote-container">
        <div className="quote-box" id="quote-box">
          {qbt}
          <div className="quote-box-bottom">
            <a
              class="button"
              id="tweet-quote"
              title="Tweet this quote!"
              target="_blank"
              href={twitterHref}
            >
              <img
                src="https://raw.githubusercontent.com/jiparkdev/random-quote-machine/master/icons8-twitter.svg"
                alt="Share via Twitter"
                className="quote-twitter"
              />
            </a>
            <button
              className="quote-button"
              id="new-quote"
              onClick={this.getNewQuote}
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
