import { className, dataAttrs } from "../constants";
import { Config } from "../models/Config";
import { getTemplate } from "../utils/getTemplate";

export class Select {
  private config: Config;

  private element: HTMLElement | null;

  private arrow?: HTMLElement | null;

  private value?: HTMLElement | null;

  private selectedId?: number;

  constructor(selector: string, config: Config) {
    this.element = document.querySelector(selector);
    this.config = config;
    this.render();
    this.setup();
  }

  private render() {
    const { placeHolder, data } = this.config;
    const template = getTemplate(data, placeHolder);
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
    this.value = this.element?.querySelector(
      `[data-type="${dataAttrs.VALUE}"]`
    );
    this.element?.addEventListener("click", this.clickHandler);
  }

  get isOpen() {
    return this.element?.classList.contains(className.OPEN);
  }

  get currentItem() {
    if (this.selectedId)
      return this.config.data.find((item) => item.id === this.selectedId);
    return undefined;
  }

  clickHandler(ev: Event) {
    const evTarget = ev.target as HTMLElement;
    const dataAttr = evTarget.dataset.type;

    if (dataAttr === dataAttrs.INPUT) {
      this.toggle();
    }
    if (dataAttr === dataAttrs.ITEM) {
      const id = evTarget.dataset.id;
      this.select(id);
    }
  }

  select(id?: string) {
    if (id) {
      this.element
        ?.querySelectorAll(`[data-type="${dataAttrs.ITEM}"]`)
        .forEach((el) => el.classList.remove(className.SELECTED));
      this.element
        ?.querySelector(`[data-id="${id}"]`)
        ?.classList.add(className.SELECTED);

      this.selectedId = +id;
      this.close();
      if (this.value && this.currentItem) {
        this.value.textContent = this.currentItem.value;
      }
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
