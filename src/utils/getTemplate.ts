import { Config } from "./../models/Config";

export const getTemplate = (data: Config["data"], placeHolderText: string) => {
  const items = data
    .map(
      ({ id, value }) =>
        `<li class="select__item" data-type="item" data-id="${id}">${value}</li>`
    )
    .toString()
    .replace(/,/g, "");

  return `
       <div class="select__input" data-type="input">
           <div class="select__backdrop" data-type="backdrop"></div>
           <span data-type="value">${placeHolderText}</span>
           <i class="fa-solid fa-caret-up" data-type="arrow"></i>
           </div>
           <div class="select__dropdown el-hi">
           <ul class="select__list">
               ${items}
           </ul>
       </div>
   `;
};
