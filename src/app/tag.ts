export class Tag {
  name: string;
  public selected: boolean;
  count: number;
  order: number;

  constructor(name: string) {
    this.name = name;
    this.count = 1;
  }

  incrementCount() {
    this.count++;
  }
}
