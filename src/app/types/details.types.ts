export interface IDetail {
  id: number;
  article: string;
  title: string;
  displayBrand: string;
  yourPriceUAH: {
    amount: number;
  };
}

export interface ICharacteristic {
  value: string
  attribute: {
    title: string
  }
}

export type IDetails = IDetail[];
export type ICharacteristics = ICharacteristic[];

