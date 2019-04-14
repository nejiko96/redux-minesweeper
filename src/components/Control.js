import React, {Component} from 'react';

class Control extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeStr: 'green_32',
      lang: 'en',
      level: 'easy',
      width: 9,
      height: 9,
      mines: 10
    };
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleLangChange = this.handleLangChange.bind(this);
    this.handleSizeChange = this.handleSizeChange.bind(this);
  }
  handleThemeChange(ev) {
    const themeStr = ev.target.value;
    this.setState({ themeStr });
    const [theme, cellSizeStr] = themeStr.split('_');
    this.props.actions.onThemeChange(theme, parseInt(cellSizeStr, 10));
  }
  handleLangChange(ev) {
    const lang = ev.target.value;
    this.setState({ lang });
    this.props.actions.onLangChange(lang);
  }
  handleSizeChange(newValue) {
    this.setState(newValue);
    const newState = {
      ...this.state,
      ...newValue
    }
    this.props.actions.onSizeChange(
      newState.level,
      parseInt(newState.width, 10),
      parseInt(newState.height, 10),
      parseInt(newState.mines, 10)
    );
  }
  render() {
    return (
      <div>
        Theme:
        <select
          defaultValue={this.state.themeStr}
          onChange={this.handleThemeChange}
          >
          <option value="green_32">green_32px</option>
          <option value="MS_32">MS_32px</option>
          <option value="green_16">green_16px</option>
          <option value="MS_16">MS_16px</option>
        </select>
        <br/>
        Lang:
        <select
          defaultValue={this.state.lang}
          onChange={this.handleLangChange}
          >
          <option value="en">en</option>
          <option value="ja">ja</option>
        </select>
        <br/>
        Level:
        <select
          defaultValue={this.state.level}
          onChange={(ev) => this.handleSizeChange({level: ev.target.value})}
          >
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
          <option value="custom">custom</option>
        </select>
        {this.state.level === 'custom' ? (
          <div>
            Width:
            <input
              type="number"
              defaultValue={this.state.width}
              placeholder="9 - 30"
              onChange={(ev) => this.handleSizeChange({width: ev.target.value})}
              />
            <br/>
            Height:
            <input
              type="number"
              defaultValue={this.state.height}
              placeholder="9 - 24"
              onChange={(ev) => this.handleSizeChange({height: ev.target.value})}
              />
            <br/>
            Mines:
            <input
              type="number"
              defaultValue={this.state.mines}
              placeholder="10 - 999"
              onChange={(ev) => this.handleSizeChange({mines: ev.target.value})}
              />
          </div>
        ) : null}
      </div>
    );
  }
}


export default Control;
