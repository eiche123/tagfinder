export class Tag {
  media_count: number;
  name: string;
  public selected: boolean;
  count: number;

  constructor(name: string) {
    this.name = name;
    this.count = 1;
  }

  incrementCount() {
    this.count++;
  }
}
