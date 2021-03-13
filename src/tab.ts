export default class Tab {
  menu: NodeListOf<Element>;
  contents: NodeListOf<Element>;

  constructor(menuSelector: string, contentsSelector: string) {
    this.menu = document.querySelectorAll(`[data-js-selector=${menuSelector}]`);
    this.contents = document.querySelectorAll(`[data-js-selector=${contentsSelector}]`);
  }

  init = () => {
    this.menu.forEach((elem, index) => {
      elem.addEventListener('click', () => {
        console.log(index);
      })
    })
  }
}