/* Cyrillic maps one to one with the latin letters.
 *
 * I did not have details on how the cyrillic conversion was meant to occur. I
 * just had access to the letters used - and, I believe, not in the lojbanic
 * order. I used the letters that sounded the more like the lojban letters:
 * from "абвгдежзиклмнопрстуфхшъ", I ended up with "абшдефгижклмнопрстувхъз".
 */
maps.cyrillic = {
  letters: "абшдефгижклмнопрстувхъз.,' ",
};

to.cyrillic = function (text) {
  return to.latin(text).replace(tests.each, function (match) {
    var result = maps.cyrillic.letters[index(match, 'letters')];
    if (tests.isUpperCase(match)) result = result.toUpperCase();
    return result;
  });
};

