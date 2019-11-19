import React from 'react';
import Card from './Card';
import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});
