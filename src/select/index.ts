import { className, dataAttrs } from "../constants";
import { Config } from "../models/Config";
import { getTemplate } from "../utils/getTemplate";

export class Select {
  private config: Config;

  private element: HTMLElement | null;

  private arrow?: HTMLElement | null;

  private value?: HTMLElement | null;

  private selectedId?: number;

  private focusedItemNodeIdx?: number;

  constructor(selector: string, config: Config) {
    this.element = document.querySelector(selector);
    this.config = config;
    this.render();
    this.setup();

    if (config.selectedId) {
      const idStr = config.selectedId.toString();
      this.select(idStr);
    }
  }

  private render() {
    const { placeHolder, data } = this.config;
    const template = getTemplate(data, placeHolder);
    this.element?.classList.add(className.SELECT);
    this.element?.setAttribute("tabindex", "0");

    if (this.element) {
      this.element.innerHTML = template;
    }
  }

  private setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.keyPressHanlder = this.keyPressHanlder.bind(this);
    this.arrow = this.element?.querySelector(
      `[data-type="${dataAttrs.ARROW}"]`
    );
    this.value = this.element?.querySelector(
      `[data-type="${dataAttrs.VALUE}"]`
    );
    this.element?.addEventListener("click", this.clickHandler);
    this.element?.addEventListener("keydown", this.keyPressHanlder);
  }

  get isOpen() {
    return this.element?.classList.contains(className.OPEN);
  }

  get currentItem() {
    if (this.selectedId)
      return this.config.data.find((item) => item.id === this.selectedId);
    return undefined;
  }

  forceItemFocus(code: "ArrowUp" | "ArrowDown") {
    const allItemNodes = this.element?.querySelectorAll(
      `[data-type="${dataAttrs.ITEM}"]`
    );
    const selectedItemNode = this.element?.querySelector(
      `[data-id="${this.selectedId}"]`
    );

    if (allItemNodes) {
      const activeItemNodeIdx =
        selectedItemNode && Array.from(allItemNodes).indexOf(selectedItemNode);

      if (this.focusedItemNodeIdx === undefined) {
        this.focusedItemNodeIdx = activeItemNodeIdx ? activeItemNodeIdx + 1 : 0;
      } else {
        this.focusedItemNodeIdx =
          code === "ArrowDown"
            ? this.focusedItemNodeIdx + 1
            : this.focusedItemNodeIdx - 1;
      }

      if (allItemNodes[this.focusedItemNodeIdx]) {
        (allItemNodes[this.focusedItemNodeIdx] as HTMLElement).focus();
      } else {
        this.focusedItemNodeIdx =
          code === "ArrowDown" ? 0 : allItemNodes.length - 1;

        (allItemNodes[this.focusedItemNodeIdx] as HTMLElement).focus();
      }
    }
  }

  keyPressHanlder(ev: KeyboardEvent) {
    const evTarget = ev.target as HTMLElement;
    const { type } = evTarget.dataset;

    if (ev.code === "Enter") {
      if (type === "item") {
        return this.select(evTarget.dataset.id);
      }
      this.toggle();
    }
    if (ev.code === "Escape") {
      this.toggle();
    }
    if (ev.code === "ArrowUp" || ev.code === "ArrowDown") {
      ev.preventDefault();
      this.forceItemFocus(ev.code);
    }
  }

  clickHandler(ev: Event) {
    const evTarget = ev.target as HTMLElement;
    const { type } = evTarget.dataset;

    if (type === dataAttrs.ITEM) {
      const id = evTarget.dataset.id;
      this.select(id);
    } else if (type === dataAttrs.BACKDROP) {
      this.close();
    } else {
      this.toggle();
    }
  }

  select(id?: string) {
    const idIsInData = id && this.config.data.find((item) => item.id === +id);

    if (idIsInData) {
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

      if (this.config.onSelect && this.currentItem) {
        this.config.onSelect(this.currentItem);
      }
    }
  }

  open() {
    this.element?.classList.add(className.OPEN);
    this.arrow?.classList.remove(className.ARROW_UP);
    this.arrow?.classList.add(className.ARROW_DOWN);
  }

  close() {
    this.element?.classList.remove(className.OPEN);
    this.arrow?.classList.remove(className.ARROW_DOWN);
    this.arrow?.classList.add(className.ARROW_UP);
  }

  destroy() {
    if (this.element) {
      this.element.removeEventListener("click", this.clickHandler);
      this.element.removeEventListener("keypress", this.keyPressHanlder);
      this.element.innerHTML = "";
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open();
  }
}
