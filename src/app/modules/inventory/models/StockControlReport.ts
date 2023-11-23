export class StockControlReport{
  id: number = 0;
  batchId: number = 0;
  date: Date = new Date();
  description: string = "";
  inspectedQuantity: number = 0;
  damagedQuantity: number = 0;
  batchIsExpired: boolean = false;
}
