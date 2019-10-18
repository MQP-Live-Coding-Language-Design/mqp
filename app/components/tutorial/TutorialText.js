export const tutorial1 = 'To start playing, simply create a sequence of notes and send it to an instrument. A note is any letter between `a` and `g`. This sequence can then be played on an instrument by writing `>>` followed by the instrument name as seen below. A full list of instruments can be found in the Documentation tab.';
export const tutorial2 = 'Notes can be modified before you play them. You make a note sharp or flat adding a `#` or `b` respectively to the end of the note. The octave of a note defaults to 4, but can be changed either by specifying an octave (e.g. `a5` sets the octave to 5) or by using `+`/`-` to raise and lower this value (e.g. `a+` sets the octave to 5).';
export const tutorialaltchars = 'In addition to notes, you can also put rests in a sequence by using the `_` character. You can also make notes longer by putting any number of `~`s after them. Each `~` will take the length of a normal note.';
export const tutorialmods = 'Entire sequences can be modified using the `>>` followed by the modification. The modifiers include `octave`, `pitch`, and `duration`. Octave and Pitch can be followed by either a series of `+`/`-` symbols or a sign and an integer. Using a series of `+`/`-` symbols will increase or decrease the octave or pitch by the number of symbols put. Using a sign and an integer will increase or decrease the ocatave or pitch by the integer after the sign.';
export const tutorialduration = 'The `duration` modifier can be followed by a decimal or a fraction, and multiplies the length of each note in the sequence by that value.';
export const tutorialdrums = 'In addition to notes, you can also play drums! Just use `k` (kick drum), `sn` (snare drum), `h` (high hat), and `oh` (open high hat) instead of note names. A full list of drum types can be found in the documentation. Drums can be played with the `drums` instrument or the `electricdrums` instrument.';
export const exampledrums = '"k sn oh sn" >> drums\n"h" >> duration .5 >> drums';
export const tutorialmult = 'You can play the same notes with multiple instruments as well. You can even modify the notes between the instruments. Below we play `"c e f g"` on the `soft` instrument, increase the pitch, then play the sequence on the `triangle` synth.';
export const tutorialpatterns = 'Make multiple patterns!';
export const examplepatterns = '"c e f g" >> soft >> pitch +7 >> triangle\n"c e g" >> duration 1/2 >> octave + >> saw';
export const tutorialconclusion = 'Feel free to combine anything you\'ve used!';
export const examplesong = '"ab f db eb" >> duration 2 >> octave - >> soft >> pitch +7 >> soft\n"k sn" >> drums\n"c+ ab g ab c+ ab g ab db ab g ab bb ab g ab" >> duration .5 >> triangle\n"ab _ _ eb _ _ c _ _ eb _ _ ab _ _ f _ _ db _ f _ ab _ bb _ _ ab _ _ g _" >> octave >> duration 1/4 >> saw\n"rand((g ab) (ab ab)) eb+" >> duration 1/4 >> triangle\n"ab _ _ eb _ _ f ab ~ _ _ g _ _ ab bb" >> octave ++ >> duration .5 >> triangle & > pingpong .5\n"(h)*4 oh (h)*3" >> duration .5 >> drums';
export const welcome = 'Language Name\n===\nWelcome to Language! This is a live coding language designed for coders and non-coders alike. Below is an editor in which you can see the code for some music. It might look complicated but don\'t worry, it will all make sense soon. Feel free to alter the text in this or any other box. Press stop then start again to hear your changes.';
export const examplesong2 = '"f# d a e" >> duration 4 >> octave -- >> save bass2 >> pitch +7 >> save bass3\n"chord(!bass2 !bass3)" >> soft > volume 10\n\n"_ _ a g# a _ c#+ _" >> save mel1\n"_ _ a g# a _ d+ _" >> save mel2\n"_ _ g# f# g# _ b _" >> save mel3\n"_ _ f# e f# _ a _" >> save harm1\n"_ _ e e e _ a _" >> save harm2\n"_ _ e e e _ g# _" >> save harm3\n"(!mel1)*2 (!mel2)*2 (!mel1)*2 (!mel3)*2" >> duration .25 >> triangle\n"(!harm1)*4 (!harm2)*2 (!harm3)*2" >> duration .25 >> triangle\n\n"c#+ 5~ b a 8~ c#+ 5~ b b 8~" >> duration .5 >> fatsaw\n"a 5~ g# f# 8~ a 5~ g# g# 8~" >> duration .5 >> fatsaw\n"f# 5~ e d 8~ e 5~ e e 8~" >> duration .5 >> fatsaw\n\n"f# f# a f# f# a f# f#" >> save blip1\n"e e a e e a e e" >> save blip2\n"e e g# e e g# e e" >> save blip3\n"a a c#+ a a c#+ a a" >> save bliph1\n"a a d+ a a d+ a a" >> save bliph2\n"a a b a a b a a" >> save bliph3\n"g# g# b g# g# b g# g#" >> save bliph4\n"(chord(!blip1 !bliph1))*2 (chord(!blip1 !bliph2))*2 (chord(!blip2 !bliph1))*2 chord((!blip3)*2 (!bliph3 !bliph4))"\n>> duration .25 >> octave ++ >> saw > volume -10\n"chord(!blip1 !bliph1) chord(!blip1 !bliph2) chord(!blip2 !bliph1) chord(!blip3 !bliph4)"\n>> octave + >> duration .5 >> triangle wave sine > volume -5\n\n"h h sn h" >> duration .5 >> drums\n"cr" >> duration 16 >> drums > volume 5\n"k" >> electricdrums';
