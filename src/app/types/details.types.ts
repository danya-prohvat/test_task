export interface IDetail {
  id: number;
  article: string;
  title: string;
  displayBrand: string;
  yourPriceUAH: {
    amount: number;
  };
}

export type IDetails = IDetail[];
