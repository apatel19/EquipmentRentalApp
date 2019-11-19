import React from 'react';
import CartItem from './CartItem';
import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<CartItem />).toJSON();
  expect(tree).toMatchSnapshot();
});
