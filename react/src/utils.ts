interface ArrayType {
  Item: string;
  Price: string;
  Quantity: number;
}

export const totalItems = (arr: ArrayType[]) => {
  return arr.reduce((sum, num) => sum + num.Quantity, 0);
};
