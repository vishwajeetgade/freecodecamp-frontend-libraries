marked.setOptions({
  breaks: true,
  // highlight: function (code) {
  //   return Prism.highlight(code, Prism.languages.javascript, "javascript");
  // }
});
// const renderer = new marked.Renderer();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.markedRef = React.createRef();
    this.state = {
      text: `# Welcome to my React Markdown Previewer!
  
  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`,
    };
  }

  componentDidMount() {
    this.markedRef.current.innerHTML = marked.parse(this.state.text);
  }

  render() {
    return (
      <div className="container">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div
            className="mt-3"
            style={{
              backgroundColor: "pink",
            }}
          >
            <div
              id="editor-label"
              className="px-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <i className="fa-solid fa-pen-nib"></i> Editor
              </div>
              <div>
                <i className="fa-solid fa-maximize"></i>
              </div>
            </div>
            <textarea
              id="editor"
              value={this.state.text}
              defaultValue={
                "# Welcome to my React Markdown Previewer! \n ## This is a sub-heading... \n ### And here's some other cool stuff:"
              }
              cols="70"
              rows="10"
              onChange={(e) => {
                this.setState({
                  text: e.target.value,
                });
                this.markedRef.current.innerHTML = marked.parse(e.target.value);
              }}
            ></textarea>
          </div>

          <section className="container bg-info m-5 p-0">
            <div
              id="previewer-label"
              className="px-2 d-flex justify-content-between align-items-center"
            >
              <div>
                <i className="fa-solid fa-eye"></i> Previewer
              </div>
              <div>
                <i className="fa-solid fa-maximize"></i>
              </div>
            </div>
            <div className="p-2" id="preview" ref={this.markedRef}></div>
          </section>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("root"));
