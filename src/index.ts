import { mockData } from "./mockData";
import { Select } from "./select";

const select = new Select("#select", {
  placeHolder: "Please select an element",
  data: mockData,
});

(window as any).sl = select;
