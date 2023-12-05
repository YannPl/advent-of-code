#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile("2023/4-input.txt");

const lines: string[] = fileContent.split("\n");

let total: number = 0;

lines.forEach((line: string, index: number) => {
  const card: string = line.split("|")[0].split(":")[1].trim();
  const hand: string = line.split("|")[1].trim();

  const cardValues: string[] = card.split(/\s+/);
  const handValues: string[] = hand.split(/\s+/);

  let winningCards = handValues.filter((value: string) =>
    cardValues.includes(value)
  );
  total += winningCards.length ? 2 ** (winningCards.length - 1) : 0;
});

console.log("total => ", total);
