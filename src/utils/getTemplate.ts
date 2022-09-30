export const getTemplate = (placeHolderText: string) => `
    <div class="select__input" data-type="input">
    <span>${placeHolderText}</span>
    <i class="fa-solid fa-caret-up" data-type="arrow"></i>
    </div>
    <div class="select__dropdown el-hi">
    <ul class="select__list">
    <li class="select__item">item 0</li>
    <li class="select__item">item 1</li>
    <li class="select__item">item 2</li>
    <li class="select__item">item 0</li>
    <li class="select__item">item 1</li>
    <li class="select__item">item 2</li>
    <li class="select__item">item 0</li>
    <li class="select__item">item 1</li>
    <li class="select__item">item 2</li>
    </ul>
    </div>
`;
