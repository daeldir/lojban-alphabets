/* Tengwar mode isn't trivial. See here: 
 * http://vodka-pomme.net/projects/tengwar-for-lojban/lojteng
 * We split diphtongs in one symbol, then consonant+vowels, then
 * remaining consonants, vowels and punctuation are on their own.
 *
 * The map is composed of mostly unmeaningful latin characters: we are using
 * the Dan Smith's encoding for tengwars.
 */
maps.tengwar = {
  vowels: {
    full:  "]l`hy~",
    /* Vowels may be diacritics on top of the preceding tengwar. Only one set
     * of diacritics is used, whereas the Dan Smith encoding provide many, with
     * slightly different offset to adapt the diacritic to it's supporting
     * tengwar.  This may result in bad positionned diacritics. If it is really
     * annoying, we may make our functions more complex. 
     */
    small: "ERTYUO"
  },
  consonants:   "wd2exfzjt5q681rck",
  /* There is no comma punctuation. Putting a comma in the latin version will
   * prevent a diphtong from being detected, and so the sounds in tengwar will
   * be displayed as separate vowels, which has the same effect as a comma.
   */
  punctuations: "= œ ",
  /* A stress is an line under the stressed letter.
   */
  stress:       "'"
};

/* Return the stress character if the letter given in argument has a stress in
 * it's latin version (which is marked by that letter being in upper case).
 */
var tengwarStress = function (character) {
  if (tests.isUpperCase(character)) return maps.tengwar.stress;
  return '';
};

/* Return the full vowel equivalent of a latin vowel.
 */
var tengwarFullVowel = function (character) {
  return maps.tengwar.vowels.full[index(character, 'vowels')];
}

/* Return the diacritic vowel equivalent of a latin vowel. 
 */
var tengwarSmallVowel = function (character) {
  return maps.tengwar.vowels.small[index(character, 'vowels')];
}

/* Return the consonant equivalent of a latin consonant.
 */
var tengwarConsonant = function (character) {
  return maps.tengwar.consonants[index(character, 'consonants')];
}

/* Return the punctuation equivalent of a latin punctuation. 
 */
var tengwarPunctuation = function (character) {
  return maps.tengwar.punctuations[index(character, 'punctuations')];
}

/* The translation function handle many cases: it will replace the text with
 * different characters if:
 *
 *  - we have a comma: nothing is printed
 *  - we have a lonely vowel: a full vowel is printed
 *  - we have a consonant: a consonant is printed
 *  - we have a dipthong: a full and a small vowel are printed
 *  - we have a syllable: a consonant and a small vowel are printed
 *  - we have a punctuation that is not a comma: a punctuation is printed.
 *
 * In addition, every time we print a consonant or vowel, if the original one
 * is stressed, we add a stress to the tengwar. In the case were we have many
 * letters at once (diphtong, syllable), we add only one stress, if either one
 * or the two letter have a stress.
 */
to.tengwar = function (text) {
  return to.latin(text).replace(tests.groups, function (match) {
    if (match == ',')               return '';
    if (tests.isVowel(match))       return ''+
      tengwarFullVowel(match)                +
      tengwarStress(match);
    if (tests.isConsonant(match))   return ''+
      tengwarConsonant(match)                +
      tengwarStress(match);
    if (tests.isDiphtong(match))    return ''+
      tengwarFullVowel(match[0])             +
      tengwarSmallVowel(match[1])            +
      tengwarStress(match);
    if (tests.isSyllable(match))    return ''+
      tengwarConsonant(match[0])             +
      tengwarSmallVowel(match[1])            +
      tengwarStress(match);
    if (tests.isPunctuation(match)) return ''+
      tengwarPunctuation(match);
  });
};


