import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import postcss from 'postcss';

const stylesheet = postcss.parse(
  readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')
);

describe('global stylesheet reduced-motion settings', () => {
  it('keeps smooth scrolling as the default', () => {
    const htmlRule = stylesheet.nodes.find(
      (node) => node.type === 'rule' && node.selector === 'html'
    );

    expect(htmlRule?.toString()).toContain('scroll-behavior: smooth');
  });

  it('uses automatic scrolling when reduced motion is requested', () => {
    const reducedMotionRule = stylesheet.nodes.find(
      (node) =>
        node.type === 'atrule' &&
        node.name === 'media' &&
        node.params === '(prefers-reduced-motion: reduce)'
    );

    expect(reducedMotionRule?.toString()).toContain('scroll-behavior: auto');
  });
});
