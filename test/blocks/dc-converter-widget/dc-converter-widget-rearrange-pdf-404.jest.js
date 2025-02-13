/**
 * @jest-environment jsdom
 */
/* eslint-disable no-undef */
/* eslint-disable compat/compat */

import path from 'path';
import fs from 'fs';

describe('dc-converter-widget', () => {
  beforeEach(async () => {
    document.body.innerHTML = fs.readFileSync(
      path.resolve(__dirname, './mocks/body-rearrange-pdf.html'),
      'utf8',
    );
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('loads rearrange-pdf widget 404', async () => {
    const { default: init } = await import('../../../acrobat/blocks/dc-converter-widget/dc-converter-widget.js');
    window.fetch = jest.fn(() => Promise.resolve({
      status: 404,
      text: () => Promise.resolve('Not Found'),
    }));
    window.browser = { isMobile: true };
    delete window.location;
    window.location = new URL('https://www.adobe.com/acrobat/online/rearrange-pdf.html');
    const block = document.querySelector('.dc-converter-widget');
    window.performance.mark = jest.fn();
    await init(block);
    jest.runAllTimers();
    // expect(document.querySelector('.skeleton-wrapper')).toBeTruthy();
  });
});
