export interface Config {
  placeHolder: string;
  selectedId?: number;
  data: {
    id: number;
    value: string;
  }[];
}
