#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile("2023/1-input.txt");
const literalDigits: string[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const processLine = (line: string): number => {
  const digits = [...(line + "").matchAll(/\d/g)]
    .concat(
      ...literalDigits.map((digit: string) => [
        ...(line + "").matchAll(new RegExp(digit, "g")),
      ])
    )
    .sort((a: RegExpMatchArray, b: RegExpMatchArray) => a.index - b.index)
    .map((match: RegExpMatchArray) =>
      !Number.isNaN(parseInt(match[0]))
        ? parseInt(match[0])
        : literalDigits.indexOf(match[0]) + 1
    );

  return parseInt(digits[0] + "" + digits[digits.length - 1]);
};

console.log(
  "Sum = %o",
  fileContent
    .split("\n")
    .map((line: string) => processLine(line))
    .reduce((a, b) => a + b, 0)
);
