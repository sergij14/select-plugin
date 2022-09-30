import { Select } from "./select";

const select = new Select("#select", {
    placeHolder: "Please select an element"
});

(window as any).select = select;
