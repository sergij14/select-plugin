import { Config } from "./../models/Config";

export const getTemplate = (data: Config["data"], placeHolderText: string) => {
  const items = data
    .map(
      ({ id, value }) =>
        `<li tabindex="0" class="select__item" data-type="item" data-id="${id}">${value}</li>`
    )
    .toString()
    .replace(/,/g, "");

  return `
           <div class="select__input">
              <div class="select__backdrop" data-type="backdrop"></div>
              <span data-type="value">${placeHolderText}</span>
              <i class="fa-solid fa-caret-up" data-type="arrow"></i>
           </div>
           <div class="select__dropdown">
              <div class="select__dropdown__inner">              
                  <ul class="select__list">
                      ${items}
                  </ul>
              </div>
          </div>
   `;
};
