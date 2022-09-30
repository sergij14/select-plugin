import { className, dataAttrs } from "../constants";
import { Config } from "../models/Config";
import { getTemplate } from "../utils/getTemplate";

export class Select {
  private element: HTMLElement | null;

  private arrow?: HTMLElement | null;

  private config: Config;

  constructor(selector: string, config: Config) {
    this.element = document.querySelector(selector);
    this.config = config;
    this.render();
    this.setup();
  }

  private render() {
    const { placeHolder } = this.config;
    const template = getTemplate(placeHolder);
    this.element?.classList.add(className.SELECT);

    if (this.element) {
      this.element.innerHTML = template;
    }
  }

  private setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.arrow = this.element?.querySelector(
      `[data-type="${dataAttrs.ARROW}"]`
    );
    this.element?.addEventListener("click", this.clickHandler);
  }

  clickHandler(ev: Event) {
    const evTarget = ev.target as HTMLElement;
    const dataAttr = evTarget.dataset.type;
    
    if (dataAttr === dataAttrs.INPUT) {
      this.toggle();
    }
  }

  open() {
    this.element?.classList.add(className.OPEN);
  }

  close() {
    this.element?.classList.remove(className.OPEN);
  }

  destroy() {
    this.element?.removeEventListener("click", this.clickHandler);
  }

  get isOpen() {
    return this.element?.classList.contains(className.OPEN);
  }

  toggle() {
    if (this.isOpen) {
      this.close();
      this.arrow?.classList.remove(className.ARROW_DOWN);
      this.arrow?.classList.add(className.ARROW_UP);
    } else {
      this.open();
      this.arrow?.classList.remove(className.ARROW_UP);
      this.arrow?.classList.add(className.ARROW_DOWN);
    }
  }
}
