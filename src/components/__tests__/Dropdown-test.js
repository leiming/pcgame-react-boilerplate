jest.dontMock('../Dropdown')

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';



// http://www.undefinednull.com/2015/05/03/react-tdd-example-unit-testing-and-building-a-react-component-with-jest-gulp-and-react-test-utils/

describe('Dropdown', () => {

  let Dropdown;

  beforeEach(()=>{
    Dropdown = require('../Dropdown')
  })

  it('should exists', () => {
    const dropdown = TestUtils.renderIntoDocument(
      <Dropdown>
        <span>Toggle</span>
        <div>
          <ul>
            <li>bar</li>
            <li>foo</li>
            <li>jam</li>
          </ul>
        </div>
      </Dropdown>);

    expect(TestUtils.isCompositeComponent(dropdown)).toBeTruthy();
  });
});