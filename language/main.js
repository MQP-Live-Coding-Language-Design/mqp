/* eslint-disable*/
const samples = require('./samples.js');

let loaded = false;
Tone.Buffer.on('load', () => { loaded = true; });

// To do:
// add additional modifiers, instrments, filters, and attributes
// add syntax for changing defaults
// look at polysynth
// add other types of groups
// add numbers as notes
// add note extensions
// add saving phrases
// add saving filter chains
// add naming

/*
keywordformakingafilterchain name > distort 1
"a b c" >> instrument > name
*/
