import React from 'react';
import Card from './Card';
import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

let findElement = (tree, element) => {
  for (node in tree.children) {
    if (tree.children[node].props.testID === element) {
      return true;
    }
  }
  return false;
};

test('Card view is present', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(findElement(tree, 'view')).toBeDefined();
});
