require('mocha');
const { expect } = require('chai');
const { composeUseLoop, composeUseReduce } = require('../compose');

describe('compose', () => {
  it('compose multi functions', async () => {
    const fn = composeUseLoop(
      x => x + 1,
      x => x + 2,
      x => x + 3,
    );
    expect(typeof fn).equal('function');
    expect(fn(0)).equal(0 + 1 + 2 + 3);
  });

  it('compose one function', async () => {
    const fn = composeUseLoop(
      x => x + 3,
    );
    expect(typeof fn).equal('function');
    expect(fn(0)).equal(0 + 3);
  })
});

describe('compose use Array.reduce', () => {
  it('compose multi functions', async () => {
    const fn = composeUseReduce(
      x => x + 1,
      x => x + 2,
      x => x + 3,
    );
    expect(typeof fn).equal('function');
    expect(fn(0)).equal(0 + 1 + 2 + 3);
  });

  it('compose one function', async () => {
    const fn = composeUseReduce(
      x => x + 3,
    );
    expect(typeof fn).equal('function');
    expect(fn(0)).equal(0 + 3);
  })
});
