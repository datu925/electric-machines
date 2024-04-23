export function getUniqueStrings(values: string[]): string[] {
  return values
    .filter((val, index, self) => self.indexOf(val) === index)
    .sort((a, b) => a.localeCompare(b));
}

export function getUniqueNumbers(values: number[]): number[] {
  return values
    .filter((val, index, self) => self.indexOf(val) === index)
    .sort((a, b) => a - b);
}

export function formatNumber(value: number, decimals = 2) {
  return (Math.round(value * 100) / 100).toFixed(2);
}

export function link(cell: any, formatterParams: any) {
  var url = cell.getValue();
  return `<a href='${url}' target='_blank'>${url}</a>`;
}
