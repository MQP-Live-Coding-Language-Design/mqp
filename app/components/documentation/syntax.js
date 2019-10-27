export default `
User Documentation: Language Syntax
===

# Sequences
## Groups
### Notes
A note is any letter between \`a\` and \`g\`, uppercase or lowercase, corresponding to the musical notes. A note has multiple optional specifiers and modifiers that determine the pitch and octave of the note. The order in which these are applied matters, and is the following:
  - **Accidentals**: the \`#\` or \`b\` characters can be added to the right of a note to **sharp** or **flat** it. For example, \`b#\` would be a \`b\` sharp and \`bb\` would be an \`b\` flat.
  - **Octave number**: any positive integer can be added to the right of a note (or to the right of its accidental if it has one) to specify the octave. For example \`b5\` is a \`b\` note in the 5th octave. If no octave number is specified, the default value is 4.
  - **Octave modifier**: any number of \`-\` or \`+\` can be added to the right of a note and its accidental to increase or decrease the octave of the note. For example \`b+++\` is a \`b\` note in the 7th octave. \`b+++\` is equivalent to writing \`b+3\` or \`b7\`.

### Numbers
A number can be any integer, and will correspond to a note in a scale. The scale is specified with the \`scale\` sequence modifier, described in more detail in the modifiers section. The default scale is C major.
\`\`\`
"1 3 5"
>> scale c major
\`\`\`
The above example is equivalent to \`"c e f"\`.

### Percussion
Percussion symbols correspond to the following predetermined sounds. Percussion can only be played with the \`drums\` instrument.
- \`sn\`: snare
- \`k\`: kick
- \`h\`: hi-hat
- \`oh\`: open hi-hat
- \`r\`: ride cymbal
- \`be\`: ride bell
- \`t1\`: tom 1
- \`t2\`: tom 2
- \`t3\`: tom 3
- \`t4\`: tom 4

### Extensions
Notes, numbers, and percussion can be followed by any number of \`~\`s. This will cause it to be extended by the number of \`~\`s used.
\`\`\`
"a ~ ~ b ~ c"
\`\`\`
In the example above, the \`a\` will be three times as long as the \`c\` and the \`b\` will be twice as long as the \`c\`.

### Group behaviors
- **sequential**: plays groups in order when written as \`(a b c)\`
- **chord**: plays groups at the same time when written as \`chord(e g)\`
- **step**: plays one group per loop, cycling through groups each loop, when written as \`step(c e g)\`. This plays \`c e g\` in the time of 3 loops. (NOT YET IMPLEMENTED)
- **random**: plays one group per loop, selected at random, when written as \`rand(c e g)\`.
- **repeat**: repeat a group a number of times when written as \`(c)*3\` or \`(c e)*3\`. The latter is interpreted the same as \`(c e c e c e)\`.

## Sequence modifiers
A sequence modifier is added after the phrase is defined as:
\`\`\`
"phrase"
  >> sequence modifier
\`\`\`
Sequence modifiers are executed in order, and each sequence modifier acts without knowledge of future sequence modifiers. For example, consider the following code.
\`\`\`
"a b c"
  >> octave 3
  >> octave ++
\`\`\`
When \`"a b c" >> octave 3\` has been executed, the result is equivalent to \`"a3 b3 c3"\`. This result is then passed into the \`>> octave ++\` modifier, and the resulting output is equivalent to \`"a5 b5 c5"\`.

### Octave
The \`octave\` modifier accepts 3 types of input:
  - Numbers: \`3\` (NOT YET IMPLEMENTED)
  - A sign and a number: \`+3\` or \`-3\`
  - A number of signs: \`+++\` or \`---\`

The number input will set the octave corresponding to that number.

The input with signs will increase or decrease the octave relative to a previous \`octave\` modifier if a number was specified, or from the default value if nothing was specified before.

For example, below the entire sequence will be changed to octave 3, since the default octave is the 4th.
\`\`\`
"a b c"
  >> octave -
\`\`\`

### Pitch
The \`pitch\` modifier changes a sequence by a number of half-steps. It accepts 2 types of input:
  - A sign and a number: \`-3\`
  - A number of signs: \`---\`
When modifying numbers, the pitch modifier is equivalent to changing the numbers by that amount (so \`"1" >> pitch +\` is equivalent to \`"2"\`).

### Duration
The \`duration\` modifier changes the duration of each individual group in the phrase. It accepts a fraction or decimal as input, and the duration of each group in a sequence will be multiplied by this value.

### Stutter
The \`stutter\` modifier repeats each of the highest level groups a given number of times.
\`\`\`
"a b c d"
  >> stutter 2
  >> triangle
\`\`\`
For example, the above example would play \`"a a b b c c d d"\`, but the below example would play \`"(a b) (a b) (c d) (c d)"\` because the parentheses are the highest level group.
\`\`\`
"(a b) (c d)"
  >> stutter 2
  >> triangle
\`\`\`

### Scale
The \`scale\` modifier only changes numbers, and changes the scale against which the number will be evaluated. It accepts a key (eg. \`C\`, \`f#\`, \`Bb\`) and a scale type (see below), in that order. Both parameters are optional, and any parameters not used remain the same.
\`\`\`
"1 3 5"
  >> scale c major >> piano
  >> scale d >> flute
  >> scale minor >> cello
\`\`\`
In the above example, \`"c e g"\` would be played on the piano, \`"d f# a\` (D major) would be played on the flute, and \`"d f a"\` (D minor) would be played on the cello.

The scale types are:
- \`major\`: Can be abbreviated to \`maj\` or \`M\`
- \`naturalminor\`: Can be abbreviated to \`minor\`, \`min\`, \`nm\`, or \`m\`
- \`harmonicminor\`: Can be abbreviated to \`hm\`
- \`chromatic\`: Can be abbreviated to \`ch\`
- \`majortriad\`: Can be abbreviated to \`Mtriad\`, \`Mt\`, or \`M3\`
- \`minortriad\`: Can be abbreviated to \`mtriad\`, \`mt\`, or \`m3\`

### Copy
The \`copy\` modifier can be used to make use of multiple instances of the same sequence at once. It takes a type of group (\`seq\`, \`chord\`, or \`rand\`), and a series of modifier sequences.
\`\`\`
"c e g"
  >> copy seq
  (>> pitch +,
  >> octave +)
  >> triangle
\`\`\`
The above example will first play \`"c e g" >> pitch+\` then play \`"c e g" >> octave +\`. To play both of these at once, the word \`seq\` could be replaced with \`chord\`, and to randomly select one of them it could be replaced with \`rand\`.
\`\`\`
"1 2 3"
  >> copy chord
  ( , >> pitch ++)
  >> triangle
\`\`\`
The above example plays \`"1 2 3"\` unmodified by having only a space between the open paren and the first comma. It is equivalent to \`"chord((1 2 3) (3 4 5))"\`.

## Sequence storage
The \`save\` command allows you to save any sequence as it is when the command is reached. The \`save\` command will only save **sequences**, which does not include any parts or part modifiers (i.e. instruments and its modifiers).
\`\`\`
"a b c"
  >> octave 4
  >> save abc_1
  >> pitch ---
  >> save abc_2
\`\`\`
In the example above, \`abc_1\` would contain the sequence and its \`octave\` modifier. Then, \`abc_2\` would contain all of that, plus the \`pitch\` modifier. Saved sequences can be used in place of notes by using \`!name\`:
\`\`\`
"!abc_1"
  >> <any sequence modifier or part definition>
\`\`\`
Saved sequences can be combined into groups in the same way as notes.
\`\`\`
"chord(!abc_1 !abc_2)"
  >> <any sequence modifier or part definition>
\`\`\`

# Parts
A part is defined once the **instrument** of a phrase has been defined in the case of notes and numbers:
\`\`\`
"a b c"
  >> octave +
  >> saw      // this is the beginning of a part
\`\`\`
Instruments can be divided into two categories, synths and samplers.

The synths are as follows:
- \`triangle\`: Simple synth with a triangle wave
- \`soft\`: Sine wave synth with a rich tone quality
- \`fatsaw\`: Fat synth with a saw wave, distorted sound
- \`saw\`: Saw wave with very bright tone
- \`square\`: Fat square wave similar to fatsaw but more forcecful
- \`pls no\`: Pulse oscillator with harsh tone quality
- \`alien\`: Smooth but strange sound

The samplers are made from instrument samples and include:
- \`drums\` or \`acousticdrums\`: Used to play drums
- \`electricdrums\`: Used to play drums
- \`piano\`
- \`electricbass\` or \`bass\`
- \`bassoon\`
- \`cello\`
- \`clarinet\`
- \`contrabass\`
- \`flute\`
- \`frenchhorn\` or \`horn\`
- \`acousticguitar\`
- \`electricguitar\` or \`guitar\`
- \`nylonguitar\`
- \`harmonium\`
- \`harp\`
- \`organ\`
- \`saxophone\`
- \`trombone\`
- \`trumpet\`
- \`tuba\`
- \`violin\`
- \`xylophone\`

## Synth Attributes
Synths may be followed by one or more attributes which will change the sound of the instrument:
\`\`\`
"a b c"
  >> triangle volume 10
\`\`\`
Attributes can only be applied once each. Specifying the same attribute multiple times will override previous changes to that attribute.

Attributes can be any of:
- \`volume\`: Takes a fraction or decimal, positive or negative, and changes the volume of the instrument by that number of decibals
- \`wave\`: Takes one of \`sine\`, \`triangle\`, \`sawtooth\`, or \`square\`, and sets the wave of the instrument to that type.

## Filters
Filters change the way an instrument or percussion element sounds. To add a filter:
\`\`\`
"a b c"
  >> piano
    > <filter>
    > <filter>
  >> <any sequence modifier>
\`\`\`
Filters act similarly to sequence modifiers in that they are processed sequentially, and every filter acts without knowledge of filters which follow it.

The \`&\` symbol may also be inserted between filters. This will cause the sound to be played at the point at which the \`&\` symbol is inserted. The sound will always be played at the end of a sequence of filters, regardless of whether a \`&\` is used.
\`\`\`
"a b c"
  >> piano
    > pingpong 0.5
\`\`\`
As an example, the example above will only play the pingpong echo, not the original note. However, the example below will play both the unmodified notes as well as the echo.
\`\`\`
"a b c"
  >> piano &
    > pingpong 0.5
\`\`\`

Filters can be any of:
- \`pingpong\`: Makes the sound echo between speakers. Takes a delay between echos.
- \`volume\`: Changes volume. Takes a number in decibals where negative values make it quieter and positive values make it louder.
- \`distort\`: Adds distortion to the sound. Takes a positive number, recommended values between 0 and 1.
- \`pan\`: Moves sounds from left to right. Takes a number from -1 to 1 as input. -1 corresponds to left, and 1 corresponds to right.
- \`chebyshev\`: Applies a Chebyshev distortion. Takes a positive integer, recommended values between 1 and 100. Note that odd numbers are very different from even numbers.
- \`tremolo\`: Quickly pans between left and right ears. Takes two numbers, a frequency in Hz and a maximum pan value (0.0 - 1.0)
- \`vibrato\`: Quickly shifts the pitch up and down. Takes two numbers, a frequency in Hz and an amount the pitch is modulated (0.0 - 1.0)


NOT YET IMPLEMENTED:
- \`lo\`: low pass filter attenuates frequencies above the cutoff. This takes as input any number of values between 0 and 1.
- \`hi\`: high pass filter attenuates frequencies below the cutoff. This takes as input any number of values between 0 and 1.
- \`bandpass\`: band pass filter attenuates any frequencies outside of a range. This takes as input two values between 0 and 1, corresponding to the low and high value of the range.

## Part storage (NOT YET IMPLEMENTED)
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
