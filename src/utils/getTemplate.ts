import { Config } from "./../models/Config";

export const getTemplate = (data: Config["data"], placeHolderText: string) => {
  let listTemplate = "";
  data.forEach(
    ({ id, value }) =>
      (listTemplate += `<li role="option" tabindex="-1" class="select__item" data-type="item" data-id="${id}">${value}</li>`)
  );

  return `
           <div class="select__input">
              <span data-type="value">${placeHolderText}</span>
              <i class="fa-solid fa-caret-up" data-type="arrow"></i>
           </div>
           <div class="select__dropdown">
              <div class="select__dropdown__inner">              
                  <ul class="select__list" role="listbox">
                      ${listTemplate}
                  </ul>
              </div>
          </div>
   `;
};
