import { Config } from "./../models/Config";

export const getTemplate = (data: Config["data"], placeHolderText: string) => {
  const items = data
    .map(
      ({ id, value }) =>
        `<li class="select__item" data-type="item" data-value="${id}">${value}</li>`
    )
    .toString()
    .replace(/,/g, "");

  return `
       <div class="select__input" data-type="input">
           <span>${placeHolderText}</span>
           <i class="fa-solid fa-caret-up" data-type="arrow"></i>
           </div>
           <div class="select__dropdown el-hi">
           <ul class="select__list">
               ${items}
           </ul>
       </div>
   `;
};
