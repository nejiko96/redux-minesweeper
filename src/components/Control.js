import React from 'react';

const Control = () => (
  <div>
    Lang:
    <select
      value="ja"
      >
      <option value="en">en(default)</option>
      <option value="ja">ja</option>
    </select>
    <br/>
    Level:
    <select
      value="easy"
      >
      <option value="easy">easy(default)</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
      <option value="custom">custom</option>
    </select>
    <br/>
    Width:
    <input
      type="text"
      value="9"
      placeholder="9 - 30"
      />
    <br/>
    Height:
    <input
      type="text"
      value="9"
      placeholder="9 - 24"
      />
    <br/>
    Mines:
    <input
      type="text"
      value="10"
      placeholder="10 - 999"
      />
  </div>
);

export default Control;
