#! /usr/bin/env node
/** @format */

const yargs = require("yargs");
const utils = require("./utils.js");
const translate = require("@vitalets/google-translate-api");
//(http://twitter.com/vitalets/google-translate-api)");
const usage = "\nUsage: tran <lang_name> sentence to be translated";
const options = yargs
  .usage(usage)
  .option("l", {
    alias: "languages",
    describe: "List all supported languages",
    type: "boolean",
    demandOption: false,
  })
  .help(true).argv;

console.log(yargs.argv);
console.log(Object.keys(yargs.argv).length);

// === if no arg provided =====
if (yargs.argv._[0] == null && Object.keys(yargs.argv).length == 2) {
  console.log("if null");
  utils.showHelp();
  return;
}

if (yargs.argv.l == true || yargs.argv.languages == true) {
  console.log("if -l");
  utils.showAll();
  return;
}

if (yargs.argv._[0]) {
  var language = yargs.argv._[0].toLowerCase();
  language = utils.parseLanguage(language);
}
console.log(language);
let sentence = "";
sentence = utils.parseSentence(yargs.argv._);
console.log("theSentence - " + sentence);

if (sentence == "") {
  console.error("\nThere is no sentence");
  console.log("Enter tran --help to get started\n");
  return;
}
translate(sentence, { to: language })
  .then((res) => console.log("\n" + "\n" + res.text + "\n" + "\n"))
  .catch((err) => console.log(err));
