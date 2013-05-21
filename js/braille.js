/* The symbol for "sh" is prefered to "c", and comes from the English Braille,
 * as well as the punctuation. I don't know how those differ in other braille
 * system, and hope it is sufficiently culturaly neutral. Stress is marked by
 * adding "⠠" (capital letter) before a letter. When using the empty braille
 * character, for a space, we also include a invisible space (\u200B) to enable
 * line-break on spaces.
 */
maps.braille = {
  letters: '⠁⠃⠩⠙⠑⠋⠛⠊⠚⠅⠇⠍⠝⠕⠏⠗⠎⠞⠥⠧⠭⠽⠵⠲⠂⠄⠀',
  capital: '⠠',
  space:   '⠀\u200B'
};
to.braille = function (text) {
  return to.latin(text).replace(tests.each, function (match) {
    var letter = maps.braille.letters[index(match, 'letters')];
    if (tests.isUpperCase(match)) return maps.braille.capital+letter;
    if (match == ' ') return maps.braille.space;
    return letter;
  });
};

