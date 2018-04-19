import React from 'react';
import renderer from 'react-test-renderer';

import App, { Counter } from './App';

describe('App snapshot', () => {
  test('renders', () => {
    const component = renderer.create(<App />).toJSON();
    expect(component).toMatchSnapshot();
  });
});

describe('Counter snapshot', () => {
  test('renders', () => {
    const component = renderer.create(<Counter counter={1}/>).toJSON();
    expect(component).toMatchSnapshot();
  });
});