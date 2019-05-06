export class ExchangeRateChange {
  constructor(public date: Date, public currency: string, public change: number) {}

  public static fromAny(item: any): ExchangeRateChange {
    return new ExchangeRateChange(item.date, item.currency, item.change);
  }
}
