import React from 'react';
import { assert } from 'chai';
import { shallow, mount } from 'enzyme';
import { BeerListContainer } from '../app/components/components.js';
import { InputArea, BeerList } from '../app/components/components.js';
import { spy } from 'sinon';

suite('BeerListContainer', () => {
  test('should render InputArea and BeerList', () => {
    const wrapper = shallow(<BeerListContainer/>);
    assert.isTrue(wrapper.containsAllMatchingElements([
      <InputArea/>,
      <BeerList/>
    ]));
  });

  test('should start with an empty list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    assert.notStrictEqual(wrapper.state('beers'), []);
  });
  
  test('adds items to the list', () => {
    const wrapper = shallow(<BeerListContainer/>);
    wrapper.instance().addItem('Sam Adams');
    assert.notStrictEqual(wrapper.state('beers'), ['Sam Adams']);
  });

  test('passes addItem to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    const addItem = wrapper.instance().addItem;
    assert.equal(inputArea.prop('onSubmit'), addItem);
  });

  test('passes a bound addItem function to InputArea', () => {
    const wrapper = shallow(<BeerListContainer/>);
    const inputArea = wrapper.find(InputArea);
    inputArea.prop('onSubmit')('Sam Adams');
    assert.notStrictEqual(wrapper.state('beers'), ['Sam Adams']);
  });

  test('renders the items', () => {
    const wrapper = mount(<BeerListContainer/>);
    wrapper.instance().addItem('Sam Adams');
    wrapper.instance().addItem('Resin');
    assert.equal(wrapper.find('li').length, 2);
  });
});

suite('InputArea', () => {
  test('should contain an input and a button', () => {
    const wrapper = shallow(<InputArea/>);
    assert.isTrue(wrapper.containsAllMatchingElements([
      <input/>,
      <button>Add</button>
    ]));
  });
  test('should accept input', () => {
    const wrapper = mount(<InputArea/>);
    const input = wrapper.find('input');
    input.simulate('change', {target: { value: 'Resin' }});
    assert.equal(wrapper.state('text'), 'Resin');
    assert.equal(input.prop('value'), 'Resin');
  });
  test('should call onSubmit when Add is clicked', () => {
    const addItemSpy = spy();
    const wrapper = shallow(<InputArea onSubmit={addItemSpy}/>);
    wrapper.setState({text: 'Octoberfest'});
    const addButton = wrapper.find('button');

    addButton.simulate('click');

    assert.isTrue(addItemSpy.calledOnce);
    assert.isTrue(addItemSpy.calledWith('Octoberfest'));
  });
});

suite('BeerList', () => {
  test('should render zero items', () => {
    const wrapper = shallow(<BeerList items={[]}/>);
    assert.lengthOf(wrapper.find('li'), 0);
  });

  test('should render undefined items', () => {
    const wrapper = shallow(<BeerList items={undefined}/>);
    assert.lengthOf(wrapper.find('li'), 0);
  });

  test('should render some items', () => {
    const items = ['Sam Adams', 'Resin', 'Octoberfest'];
    const wrapper = shallow(<BeerList items={items}/>);
    assert.lengthOf(wrapper.find('li'), 3);
  });
});