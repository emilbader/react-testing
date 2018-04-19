import React from 'react';
import axios from 'axios';
import App, { doIncrement, doDecrement, Counter} from "./App";
// Mocha
describe('Local State', () => {
  it('should increment the counter in state', () => {
    const state = { counter: 0 };
    const newState = doIncrement(state);

    expect(newState).to.deep.equal({ counter: 1 });
  });
  it('should decrement the counter in state', () => {
    const state = { counter: 0 };
    const newState = doDecrement(state);

    expect(newState).to.deep.equal({ counter: -1 });
  });
});
// Enzyme
describe('App component', () => {
  it('renders the Counter wrapper', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Counter)).to.have.length(1);
  });
  it('passes all props to Counter wrapper', () => {
    const wrapper = shallow(<App />);
    let counterWrapper = wrapper.find(Counter);

    expect(counterWrapper.props().counter).to.equal(0);

    wrapper.setState({ counter: -1 });

    counterWrapper = wrapper.find(Counter);
    expect(counterWrapper.props().counter).to.equal(-1);
  });
  it('counter is incremented when increment button is clicked', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().counter).to.equal(0);

    wrapper.find('.increment').simulate('click');
    expect(wrapper.state().counter).to.equal(1);
  });
  it('counter is decremented when increment button is clicked', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state().counter).to.equal(0);

    wrapper.find('.decrement').simulate('click');
    expect(wrapper.state().counter).to.equal(-1);
  });
});
// Sinon (for testing asynchronous logic)
describe('App component', () => {
  const result = '144.63.247.10';
  const promise = Promise.resolve(result);

  before(() => {
    sinon.stub(axios, 'get').withArgs('https://httpbin.org/ip').returns(promise);
  });

  after(() => {
    axios.get.restore();
  });

  it('calls componentDidMount', () => {
    sinon.spy(App.prototype, 'componentDidMount');
    const wrapper = shallow(<App />);

    expect(wrapper.state().asyncIp).to.equal(null);
    promise.then(() => {
      expect(wrapper.state().asyncIp).to.equal(result);
    });
  });
});