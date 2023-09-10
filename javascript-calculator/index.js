class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currOperand: "0",
      prevOperand: "",
      decimal: false,
    };

    this.handleAppendNumber = this.handleAppendNumber.bind(this);
    this.handleAllClear = this.handleAllClear.bind(this);
    this.handlechooseOperator = this.handlechooseOperator.bind(this);
    this.handleComputation = this.handleComputation.bind(this);
  }

  handleAllClear() {
    this.setState({
      currOperand: "0",
      prevOperand: "",
      decimal: false,
    });
  }

  handleAppendNumber(e) {
    const value = e.target.value;
    if (value === "." && this.state.decimal) return;

    if (
      this.state.currOperand.length === 1 &&
      this.state.currOperand[0] === "0" &&
      value !== "."
    ) {
      this.setState({
        currOperand: value,
      });
      return;
    }

    if (value === "." && this.state.decimal === false) {
      this.setState((prevState) => ({
        currOperand: prevState.currOperand + value,
        decimal: true,
      }));
      return;
    }

    this.setState((prevState) => ({
      ...prevState,
      currOperand: prevState.currOperand + value,
    }));
  }

  handlechooseOperator(e) {
    const value = e.target.value;
    if (this.state.currOperand === "") return;

    const n = this.state.currOperand.length;

    if (
      (this.state.currOperand[n - 2] === "*" ||
        this.state.currOperand[n - 2] === "/") &&
      value !== "-"
    ) {
      const newCurrValue = this.state.currOperand.slice(0, n - 2) + value;
      this.setState((prevState) => ({
        currOperand: newCurrValue,
        decimal: false,
      }));
      return;
    }

    if (
      isNaN(this.state.currOperand[n - 1]) &&
      this.state.currOperand[n - 1] !== value &&
      !(
        (this.state.currOperand[n - 1] === "*" ||
          this.state.currOperand[n - 1] === "/") &&
        value === "-"
      )
    ) {
      const newCurrValue = this.state.currOperand.slice(0, n - 1) + value;
      this.setState((prevState) => ({
        currOperand: newCurrValue,
        decimal: false,
      }));
      return;
    } else if (this.state.currOperand[n - 1] === value) {
      return;
    }

    this.setState((prevState) => ({
      currOperand: `${prevState.currOperand}${value}`,
      decimal: false,
    }));
  }

  handleComputation() {
    const n = this.state.currOperand.length;
    if (isNaN(this.state.currOperand[n - 1])) {
      this.setState((prevState) => ({
        currOperand: eval(prevState.currOperand.slice(0, n - 1)).toString(),
        decimal: false,
      }));
    }
    this.setState((prevState) => ({
      currOperand: eval(prevState.currOperand).toString(),
      decimal: false,
    }));
  }

  render() {
    return (
      <div className="container h-100 d-flex justify-content-center align-items-center">
        <div className="calculator">
          <div
            className="d-flex  p-1 flex-column justify-content-end align-items-end"
            style={{ height: "60px" }}
          >
            <div id="answer" className="fs-6">
              {this.state.prevOperand}
            </div>
            <div id="display" className="fs-5">
              {this.state.currOperand}
            </div>
          </div>

          <div>
            <button
              value={"ac"}
              className="big-btn"
              id="clear"
              onClick={this.handleAllClear}
            >
              AC
            </button>
            <button value={"/"} id="divide" onClick={this.handlechooseOperator}>
              /
            </button>
            <button
              value={"*"}
              id="multiply"
              onClick={this.handlechooseOperator}
            >
              x
            </button>
            <button value={"7"} id="seven" onClick={this.handleAppendNumber}>
              7
            </button>
            <button value={"8"} id="eight" onClick={this.handleAppendNumber}>
              8
            </button>
            <button value={"9"} id="nine" onClick={this.handleAppendNumber}>
              9
            </button>
            <button
              value={"-"}
              id="subtract"
              onClick={this.handlechooseOperator}
            >
              -
            </button>
            <button value={"4"} id="four" onClick={this.handleAppendNumber}>
              4
            </button>
            <button value={"5"} id="five" onClick={this.handleAppendNumber}>
              5
            </button>
            <button value={"6"} id="six" onClick={this.handleAppendNumber}>
              6
            </button>
            <button value={"+"} id="add" onClick={this.handlechooseOperator}>
              +
            </button>
            <button value={"1"} id="one" onClick={this.handleAppendNumber}>
              1
            </button>
            <button value={"2"} id="two" onClick={this.handleAppendNumber}>
              2
            </button>
            <button value={"3"} id="three" onClick={this.handleAppendNumber}>
              3
            </button>
            <button value={"="} id="equals" onClick={this.handleComputation}>
              =
            </button>
            <button
              value={"0"}
              className="big-btn"
              id="zero"
              onClick={this.handleAppendNumber}
            >
              0
            </button>
            <button value={"."} id="decimal" onClick={this.handleAppendNumber}>
              .
            </button>
          </div>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
