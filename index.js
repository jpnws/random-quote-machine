function App() {
  return (
    <div className="quote-container">
      <div className="quote-box">
        <div className="quote-box-top">
          <p className="quote-text">
            Code is expensive to change, but design is cheaper to change, and
            requirements are even cheaper to change.
          </p>
          <p className="quote-author">Daniel T. Barry</p>
        </div>
        <div className="quote-box-bottom">
          <img
            src="icons8-twitter.svg"
            alt="Share via Twitter"
            className="quote-twitter"
          />
          <button className="quote-button">New Quote</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
