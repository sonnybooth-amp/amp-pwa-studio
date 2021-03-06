import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';

import Product from '../product';

global.getComputedStyle = jest.fn().mockReturnValue({
    getPropertyValue: jest.fn().mockReturnValue('80px')
});

jest.mock('@apollo/react-hooks', () => ({
    useMutation: jest.fn().mockImplementation(() => [
        jest.fn(),
        {
            error: null
        }
    ])
}));

jest.mock('@magento/peregrine/lib/context/cart', () => {
    const state = {};
    const api = { removeItemFromCart: jest.fn() };
    const useCartContext = jest.fn(() => [state, api]);

    return { useCartContext };
});

jest.mock('react', () => {
    const React = jest.requireActual('react');
    const memoSpy = jest.spyOn(React, 'useMemo');
    const stateSpy = jest.spyOn(React, 'useState');

    return Object.assign(React, {
        useMemo: memoSpy,
        useState: stateSpy
    });
});

const renderer = new ShallowRenderer();

const props = {
    beginEditItem: jest.fn(),
    currencyCode: 'US',
    item: {
        image: {
            file: 'unittest'
        },
        name: 'Unit Test Product',
        options: [],
        price: 99,
        qty: 1
    },
    removeItemFromCart: jest.fn()
};

test('it renders correctly', () => {
    const tree = renderer.render(<Product {...props} />);

    expect(tree).toMatchSnapshot();
});
