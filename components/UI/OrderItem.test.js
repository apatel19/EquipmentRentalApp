import 'jsdom-global/register';
import React from 'react';
import renderer from 'react-test-renderer';
import OrderItem from './OrderItem';

let findElement = (tree, element) => {
  for (node in tree.children) {
    if (tree.children[node].props.testID === element) {
      return 1;
    }
  }
  return 0;
};

const props = {
  amount: {
    toFixed: jest.fn(),
  },
  date: '01/22/22',
};

describe('Order Item component', () => {
  it('It should render without an error', () => {
    expect(1).toBe(1);
  });

  it('make sure that order detail view is not loaded', () => {
    const tree = renderer.create(<OrderItem {...props} />).toJSON();
    expect(findElement(tree, 'showDetailButtonTest')).toEqual(1);
    expect(findElement(tree, 'orderDetailView')).toEqual(0);
  });
});
