export default class Tab {
  menu: NodeListOf<HTMLElement>;
  contents: NodeListOf<HTMLElement>;

  /**
   * 項目とコンテンツを指定してタブを作成する
   * @param menuSelector 項目(クリック部分)のselector属性値
   * @param contentsSelector コンテンツ(表示切り替え部分)のselector属性値
   */
  constructor(menuSelector: string, contentsSelector: string) {
    this.menu = document.querySelectorAll(`[data-selector=${menuSelector}]`);
    this.contents = document.querySelectorAll(
      `[data-selector=${contentsSelector}]`
    );
  }

  /**
   * 指定したセレクタを利用してタブのイベントを作成する
   */
  init = (): void => {
    const hide = () => {
      this.menu.forEach((elem) => delete elem.dataset.isActive);
      this.contents.forEach((elem) => delete elem.dataset.isActive);
    };

    this.menu.forEach((elem, index) =>
      elem.addEventListener('click', () => {
        hide();
        elem.dataset.isActive = 'true';
        this.contents[index].dataset.isActive = 'true';
      })
    );
  };
}
