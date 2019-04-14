import React from 'react';

const Control = () => (
  <div>
    Theme:
    <select
      defaultValue="green_32"
      >
      <option value="green_32">green_32(default)</option>
      <option value="MS_32">MS_32</option>
      <option value="green_16">green_16</option>
      <option value="MS_16">MS_16</option>
    </select>
    <br/>
    Lang:
    <select
      defaultValue="en"
      >
      <option value="en">en(default)</option>
      <option value="ja">ja</option>
    </select>
    <br/>
    Level:
    <select
      defaultValue="easy"
      >
      <option value="easy">easy(default)</option>
      <option value="medium">medium</option>
      <option value="hard">hard</option>
      <option value="custom">custom</option>
    </select>
    <br/>
    Width:
    <input
      type="number"
      defaultValue="9"
      placeholder="9 - 30"
      />
    <br/>
    Height:
    <input
      type="number"
      defaultValue="9"
      placeholder="9 - 24"
      />
    <br/>
    Mines:
    <input
      type="number"
      defaultValue="10"
      placeholder="10 - 999"
      />
  </div>
);

export default Control;
