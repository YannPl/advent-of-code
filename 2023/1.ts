#!/usr/bin/env -S deno run --allow-read

const fileContent: string = await Deno.readTextFile('2023/1-input.txt');
const literalDigits: { [key: string]: number } = {
    'one' : 1,
    'two' : 2,
    'three' : 3,
    'four' : 4,
    'five' : 5,
    'six' : 6,
    'seven' : 7,
    'eight' : 8,
    'nine' : 9
};

// Split file content into lines
const lines: string[] = fileContent.split('\n');


const coordinatesValues: number[] = lines.map((line: string) => {
    return processLine(line);
});
const sum = coordinatesValues.reduce((a, b) => a + b, 0);
console.log("Somme = %o", sum);

function processLine(line: string): number {
    const matches: RegExpMatchArray[]  = [
        ...(line+'').matchAll(/\d|one/g),
        ...(line+'').matchAll(/two/g),
        ...(line+'').matchAll(/three/g),
        ...(line+'').matchAll(/four/g),
        ...(line+'').matchAll(/five/g),
        ...(line+'').matchAll(/six/g),
        ...(line+'').matchAll(/seven/g),
        ...(line+'').matchAll(/eight/g),
        ...(line+'').matchAll(/nine/g)
    ];

    const digits: number[] = [];
    matches.sort((a: RegExpMatchArray, b: RegExpMatchArray) => {
        if(a.index < b.index) {
            return -1;
        }
        if(a.index > b.index) {
            return 1;
        }
        else {
            return 0;
        }
    }
    ).forEach((match: RegExpMatchArray) => {
        if(!Number.isNaN(parseInt(match[0]))) {
            digits.push(parseInt(match[0]));
        } else {
            digits.push(literalDigits[match[0]]);
        }
    });

    return parseInt(digits[0] + '' + digits[digits.length - 1]);
}
