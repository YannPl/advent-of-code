#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile("2023/3-input.txt");

const lines: string[] = fileContent.split("\n");
const partNumbers: string[] = [];

lines.forEach((line: string, index: number) => {
  const previousLine: string = lines[index - 1];
  const nextLine: string = lines[index + 1];

  const numbers: string[] | null = line.match(/\d+/g);

  if (numbers !== null) {
    let previousPosition = 0;
    numbers.forEach((number: string) => {
      const numberPosition: number = line.indexOf(number, previousPosition);
      previousPosition = numberPosition + 1;
      const start: number = numberPosition > 0 ? numberPosition - 1 : 0;
      const end: number =
        numberPosition + number.length + 1 < line.length
          ? numberPosition + number.length + 1
          : line.length;

      const previousLineSubstring = previousLine?.substring(start, end) ?? "";
      let currentLineSubstring = line.substring(start, end);
      const nextLineSubstring = nextLine?.substring(start, end) ?? "";

      // concat all substrings
      const concatSubstrings = `${previousLineSubstring}${currentLineSubstring}${nextLineSubstring}`;

      if (concatSubstrings.match(/[^0-9\.]/g)) {
        partNumbers.push(number);
      }
    });
  }
});

console.log(
  "partNumbers => ",
  partNumbers.reduce((acc, number) => acc + parseInt(number), 0)
);
