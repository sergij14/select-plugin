import { Config } from "../models/Config";

export class Select {
  private element: HTMLElement | null;

  private config: Config;

  constructor(selector: string, config: Config) {
    this.element = document.querySelector(selector);
  }

  private open() {
    this.element?.classList.add("open");
  }

  private close() {
    this.element?.classList.remove("open");
  }
}
