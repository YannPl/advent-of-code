#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile("2023/2-input.txt");

processLine(fileContent.split("\n")[0]);

const ids: number[] = fileContent.split("\n").map((line: string) => {
  return processLine(line);
});
console.log(ids.reduce((a, b) => a + b, 0));

function processLine(line: string): number {
  const turns = line.split(":")[1].split(";");

  const minimumGame = turns.reduce(
    (acc, turn) => {
      const redMatch = /(\d+) red/.exec(turn);
      const greenMatch = /(\d+) green/.exec(turn);
      const blueMatch = /(\d+) blue/.exec(turn);

      const redNumber = redMatch ? parseInt(redMatch[1]) : 0;
      const greenNumber = greenMatch ? parseInt(greenMatch[1]) : 0;
      const blueNumber = blueMatch ? parseInt(blueMatch[1]) : 0;

      if (redNumber > acc.red) {
        acc.red = redNumber;
      }
      if (greenNumber > acc.green) {
        acc.green = greenNumber;
      }
      if (blueNumber > acc.blue) {
        acc.blue = blueNumber;
      }

      return acc;
    },
    { red: 0, green: 0, blue: 0 }
  );

  return minimumGame.red * minimumGame.green * minimumGame.blue;
}
