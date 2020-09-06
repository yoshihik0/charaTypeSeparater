// 分割のための正規表現
const regNumber = /^[0-9]*$/;
const regAlpha = /^[a-zA-Z !-/:-@¥[-`{-~]*$/;
const regNumber2byte = /^[０-９]*$/;
const regHiragana = /^[ぁ-ん]*$/;
const regKatakana = /^[ァ-ンヴー]*$/;
const regKigo = /^[？／]*$/;
const regKigoL = /^[「［『【（(〈]*$/;
const regKigoR = /^[」、。／］』】）〉]*$/;
const regKigoC = /^[・：；]*$/;

// style名の定義
const charaTypeArray = ["def", "number", "alpha", "number2byte", "hiragana", "katakana", "kigo", "kigoL", "kigoR", "kigoC", "kanji"];

function CharacterTypeSeparator(txtObj) {
    let txt = txtObj.innerText;
    let charaType = 0;
    let newHtml = "";

    function separate(myCharaType) {
        if (charaType != myCharaType) {

            // style名の割当て
            let charaTypeName = charaTypeArray[myCharaType];

            // 同種の文字の続きではない場合
            if (i == 0) {
                // １文字目の場合
                newHtml = newHtml + '<span class=' + charaTypeName + '>' + txt[i];
            } else {
                // １文字目ではない場合
                newHtml = newHtml + '</span><span class=' + charaTypeName + '>' + txt[i];
            }
            charaType = myCharaType;
        } else {
            // 同種の文字が続いた場合
            newHtml = newHtml + txt[i];
        }
    }

    for (i = 0; i < txt.length; i++) {
        if (regNumber.test(txt[i])) {
            // 数字の場合
            separate(1);
        } else if (regAlpha.test(txt[i])) {
            // 欧文＋半角記号の場合
            separate(2);
        } else if (regNumber2byte.test(txt[i])) {
            // カタカナの場合
            separate(3);
        } else if (regHiragana.test(txt[i])) {
            // ひらがなの場合
            separate(4);
        } else if (regKatakana.test(txt[i])) {
            // カタカナの場合
            separate(5);
        } else if (regKigo.test(txt[i])) {
            // 記号の場合
            separate(6);
        } else if (regKigoL.test(txt[i])) {
            // 記号の場合
            separate(7);
        } else if (regKigoR.test(txt[i])) {
            // 記号の場合
            separate(8);
        } else if (regKigoC.test(txt[i])) {
            // 記号の場合
            separate(9);
        } else {
            // 漢字の場合
            separate(10);
        }
    }
    newHtml = newHtml + '</span>';
    document.getElementById(txtObj.id).innerHTML = newHtml;
    console.log(newHtml);
}