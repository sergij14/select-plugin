export type Item = {
  id: number;
  value: string;
};

export interface Config {
  placeHolder: string;
  selectedId?: number;
  data: Item[];
  onSelect?: (item: Item) => void;
}
