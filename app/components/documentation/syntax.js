export default `
User Documentation: Language Syntax
===

# Sequences
## Groups
### Notes
A note is any letter between \`a\` and \`g\` corresponding to the musical notes. A note has multiple optional specifiers and modifiers that determine the pitch and octave of the note. The order in which these are applied matters, and is the following:
  - **Accidentals**: the \`#\` or \`b\` characters can be added to the right of a note to **sharp** or **flat** it. For example, \`b#\` would be a \`b\` sharp and \`bb\` would be an \`b\` flat.
  - **Octave number**: any positive integer can be added to the right of a note (or to the right of its accidental if it has one) to specify the octave. For example \`b5\` is a \`b\` note in the 5th octave. If no octave number is specified, the default value is 4.
  - **Octave modifier**: any number of \`-\` or \`+\` can be added to the right of a note (plus any of its previous optional characters) to increase or decrease the octave of the note. For example \`b5+++\` is a \`b\` note in the 8th octave. \`b5+++\` is equivalent to writing \`b5+3\` or \`b8\`.

### Numbers
A number can be any integer, and will correspond to a note in a scale. The scale is specified with the \`scale\` sequence modifier.
\`\`\`
"1 3 5"
>> scale c major
\`\`\`
The above example is equivalent to \`"c e f"\`.

### Percussion
Percussion symbols correspond to the following predetermined sounds:
- \`sn\`: snare
- \`kk\`: kick
- \`kh\`: kick hi
- \`kl\`: kick lo
- \`th\`: tom hi
- \`tl\`: tom lo
- \`hh\`: hi-hat
- \`cp\`: clap

### Group behaviors
- **chord**: plays groups at the same time when written as \`chord(e g)\`
- **step**: plays one group per loop when written as \`step(c e g)\`. This plays \`c e g\` in the time of 3 loops.
- **random**: randomizes groups when written as \`rand()\`. This will play any random note. A range can also be specified as \`rand(c e g)\`. This will play one of the 3 notes randomly.
- **repeat**: repeat a group a number of times when written as \`c*3\`. This is interpreted the same as \`c c c\`.

## Sequence modifiers
A sequence modifier is added after the phrase is defined as:
\`\`\`
"phrase"
  >> sequence modifier
\`\`\`

### Octave
The \`octave\` modifier accepts 3 types of input:
  - Numbers: \`3\`
  - A sign and a number: \`+3\` or \`-3\`
  - A number of signs: \`+++\` or \`---\`

The number input will set the octave corresponding to that number.

The input with signs will increase or decrease the octave relative to a previous \`octave\` modifier if a number was specified, or from the default value if nothing was specified before.
\`\`\`
"a b c"
  >> octave 3
  >> octave ++
\`\`\`
In the example above, the sequence is in the 5th octave. But in the example below, it is in the 6th octave since the default octave is the 4th and nothing is specified before the \`octave\` modifier.
\`\`\`
"a b c"
  >> octave ++
\`\`\`
Below, the entire sequence will be changed to octave 3, since the default octave is the 4th.
\`\`\`
"a b c"
  >> octave -
\`\`\`

### Pitch
The \`pitch\` modifier changes a sequence by a number of half-steps. It accepts 2 types of input:
  - A sign and a number: \`-3\`
  - A number of signs: \`---\`

The top-to-bottom logic is the same as for the \`octave\` modifier, except that the "default" value corresponds to the letters and their optional accidentals in the phrase.

### Duration
The \`duration\` modifier defines the duration of each individual group in the phrase. This will take a fraction input, corresponding to the fraction of time of a loop for one individual group.

## Sequence storage
The \`save\` command allows to save any sequence as it is when the command is reached. The \`save\` command will only save **sequences**, which does not include any parts or part modifiers (i.e. instruments and its modifiers).
\`\`\`
"a b c"
  >> octave 4
  >> save abc_1
  >> pitch ---
  >> save abc_2
\`\`\`
In the example above, \`abc_1\` would contain the sequence and its \`octave\` modifier. Then, \`abc_2\` would contain all of that, plus the \`pitch\` modifier. This can be referenced later to avoid writing sequences and its modifiers multiple times:
\`\`\`
abc_1
  >> <any sequence modifier or part definition>

abc_2
  >> <any sequence modifier or part definition>
\`\`\`

## Sequence combination
**Saved sequences** can be combined to create new sequences, where different sections of the sequence have different modifiers defined earlier. The modifiers applied after a combination affect the entire combination.

## Concatenation
Concatenating sequences places sequences one after the next: \`concat(seq1 seq2 seq3)\` will create a sequence formed by \`seq1\`, followed by \`seq2\` followed by \`seq3\`.
For example, let's say we have these three sequences:
\`\`\`
"a b c" >> octave -- >> save seq1
"d e f" >> octave ++ >> save seq2
"g a b" >> octave + >> save seq3
\`\`\`
which is the same as:
\`\`\`
"a2 b2 c2" >> save seq1
"d6 e6 f6" >> save seq2
"g5 a5 b5" >> save seq3
\`\`\`
Let's say we then have a new sequence:
\`\`\`
concat(seq1 seq2 seq3)
\`\`\`
This will be interpreted as:
\`\`\`
"a2 b2 c2 d6 e6 f6 g5 a5 b5"
\`\`\`
and it can be treated as a regular sequence. For example, more modifiers can be added to it:
\`\`\`
concat(seq1 seq2 seq3)
  >> pitch --
\`\`\`

# Parts
A part is defined once the **instrument** of a phrase has been defined in the case of notes and numbers:
\`\`\`
"a b c"
  >> octave +
  >> piano      // this is the beginning of a part
\`\`\`
or once the \`play\` command is reached in the case of a **percussion** phrase:
\`\`\`
"x o x o"
  >> play // this is the beginning of a part
\`\`\`

## Part modifiers
Part modifiers change the way an instrument or percussion element sounds. To add a part modifier:
\`\`\`
"a b c"
  >> piano
    ^ <any part modifier>
    ^ <any part modifier>
  >> <any sequence modifier>
\`\`\`
Some part modifiers take more than 1 value as input. In this case, the list of values is matched to the length of phrase of the sequence this part belongs to, and is divided equally across the phrase.

### Filters
Filters modify sound **frequencies**. Filters can be any of:
- \`distort\`: adds distortion to the sound. Takes any number of values between 0 and 1.
- \`lo\`: low pass filter attenuates frequencies above the cutoff. This takes as input any number of values between 0 and 1.
- \`hi\`: high pass filter attenuates frequencies below the cutoff. This takes as input any number of values between 0 and 1.
- \`bandpass\`: band pass filter attenuates any frequencies outside of a range. This takes as input two values between 0 and 1, corresponding to the low and high value of the range.

Any of the filters follow the following syntax (with the appropriate number of inputs):
\`\`\`
"a b c"
  >> piano
    ^ lo 0.5
\`\`\`

### Effects
Effects modify the sound with no frequency modification. Effects can be any of:
- **pan**: moves sounds from left to right. This takes any number of values from 0 to 1 as input. 0 corresponds to left, and 1 corresponds to right.
- **vol**: changes volume. This takes any number of values from 0 to 1.

Any of the filters follow the following syntax (with the appropriate number of inputs):
\`\`\`
"a b c"
  >> piano
    ^ vol 0.5
\`\`\`

## Part storage
A part and can be saved to be referenced in the sound visualization UI, to stop sound without affecting any sequences (in-sequence storage), or to use the same part in another phrase (global storage);

### In-sequence storage
In-sequence storage allows a part to be saved along with the phrase it is following. This helps to visualize what is being played in the sound visualization UI, and can also make it easier to stop a sound. To store a part in-sequence:
\`\`\`
"a b c"
  >> piano as abc_1
\`\`\`

It will then be displayed in the sound visualization UI and can be stopped anywhere outside a block as: \`stop abc_1\`.

### Global storage
Global storage allows a part to be reused in multiple phrases. This will only store the part and its modifiers, and will not take into account the phrase it is used in. To store a part globally:
\`\`\`
"a b c"
  >> piano as global piano_left_distorted
    ^ pan 0.2
    ^ distort 2
\`\`\`

Part \`piano_left_distorted\` can now be used in other sequences, without having to type all of the part and its modifiers again:
\`\`\`
"d e f"
  >> piano_left_distorted
\`\`\`

`;
