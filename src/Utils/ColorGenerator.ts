const colorList = [
  "#f6685e",
  "#f44336",
  "#ed4b82",
  "#e91e63",
  "#af52bf",
  "#9c27b0",
  "#8561c5",
  "#673ab7",
  "#6573c3",
  "#3f51b5",
  "#2196f3",
  "#33c9dc",
  "#009688",
  "#6fbf73",
  "#4caf50",
  "#357a38",
  "#a2cf6e",
  "#d7e360",
  "#cddc39",
  "#ffeb3b",
  "#ffc107",
  "#ff9800",
  "#ffac33",
  "#ff5722",
];

export class Colors {
  private colors: string[];

  constructor() {
    this.colors = colorList;
    for (let i = colorList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [colorList[i], colorList[j]] = [colorList[j], colorList[i]];
    }
  }

  generate(index: number): string {
    return this.colors[index % this.colors.length];
  }
}
