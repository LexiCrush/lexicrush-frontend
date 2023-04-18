import * as React from 'react';
import Button from './Button';

class WordInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      letterInputs: [],
      currentInput: '',
    };
  }
handleChange = (e) => {
  if (e.key === 'Backspace' || e.key === 'Delete') {
    this.setState({
      letterInputs: this.state.letterInputs.slice(0, -1),
      currentInput: '',
    });
  } else {
    const letterInputs = [...this.state.letterInputs];
    const currentInput = e.target.value;
    const lastInputIndex = letterInputs.length - 1;

    if (lastInputIndex >= 0 && letterInputs[lastInputIndex] === '') {
      letterInputs[lastInputIndex] = currentInput;
    } else {
      letterInputs.push(currentInput);
    }

    this.setState({
      letterInputs,
      currentInput: '',
    });
  }
};

render() {
  return (
  <div>
    {this.state.letterInputs.map((letter, index) => (
    <input
    key={index}
    type="text"
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '10px',
      margin: '0 auto',
      fontSize: '20px',
      textAlign: 'center',
      borderColor: 'pink',
      outline: 'none',
    }}
    value={letter}
    readOnly
    />
    ))}
    <input
    type="text"
    style={{
      width: '50px',
      height: '50px',
      borderRadius: '10px',
      margin: '0 auto',
      fontSize: '20px',
      textAlign: 'center',
      borderColor: 'pink',
      outline: 'none',
    }}
    value={this.state.currentInput}
    onChange={this.handleChange}
    onKeyDown={this.handleChange}
    />
    <div style={{ display: 'flex', flexDirection: 'column' }}>
    <Button color='blue' fontSize='12px' width='150px' margin='0 auto' onClick={this.props.submitWord} label="Submit Word"></Button>
    </div>
    </div>
    );
  }
}

export default WordInput;
