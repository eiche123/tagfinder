export class Tag {
  name: string;
  public selected: boolean;
  count: number;
  thumbnail: string;
  caption: string;

  constructor(name: string) {
    this.name = name;
    this.count = 1;
    this.selected = false;
  }

  incrementCount() {
    this.count++;
  }

  getValue(): number {
    if (this.selected) {
      return Number.MAX_SAFE_INTEGER;
    } else {
      return this.count;
    }
  }
}
