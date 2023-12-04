#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile("2023/2-input.txt");
const red = 12;
const green = 13;
const blue = 14;

processLine(fileContent.split("\n")[0]);

const ids: number[] = fileContent.split("\n").map((line: string) => {
  return processLine(line);
});
console.log(ids.reduce((a, b) => a + b, 0));

function processLine(line: string): number {
  const game = line.split(":")[0].split(" ")[1];
  const turns = line.split(":")[1].split(";");

  return turns.reduce((acc, turn) => {
    if (!acc) {
      return false;
    }

    const redMatch = /(\d+) red/.exec(turn);
    const greenMatch = /(\d+) green/.exec(turn);
    const blueMatch = /(\d+) blue/.exec(turn);

    const redNumber = redMatch ? parseInt(redMatch[1]) : 0;
    const greenNumber = greenMatch ? parseInt(greenMatch[1]) : 0;
    const blueNumber = blueMatch ? parseInt(blueMatch[1]) : 0;

    if (redNumber > red || greenNumber > green || blueNumber > blue) {
      return false;
    }

    return acc;
  }, true)
    ? parseInt(game)
    : 0;
}
