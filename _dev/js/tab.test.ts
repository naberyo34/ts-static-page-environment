import Tab from './tab';

test('タブの要素が存在する', () => {
  expect(new Tab('tabMenu', 'tabContent').init()).toBe('success');
});
