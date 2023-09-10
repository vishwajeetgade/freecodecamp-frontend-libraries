const Quotes = [
  {
    quote: "",
    author: "",
  },
];
function Test() {}
class App extends React.Component {
  render() {
    return (
      <div id="wrapper">
        <div id="quote-box">
          <div id="text">
            <i className="fa fa-quote-left"></i>
          </div>
          <div id="author"></div>
          <div></div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
