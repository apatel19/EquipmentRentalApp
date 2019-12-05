import React from 'react';
import {shallow} from 'enzyme';
import CartItem from './CartItem';
import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<CartItem />).toJSON();
  expect(tree).toMatchSnapshot();
});

describe('testing CartItem', () => {
  it('function and state test care', () => {
    const wrapper = shallow(<CartItem />);
    console.log(wrapper);
  });
});
