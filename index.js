import {GoogleSpreadsheet} from 'google-spreadsheet';
import {config} from 'dotenv';
import i18n from "./services/i18n.js";
import sheetManager from "./services/sheetManager.js";

config();

const store = {
    auth: {},
    doc: null,
    lang: 'es',
    dictionary: {}
};

let translator;


async function init(docId, key, secret) {
    if (!docId) throw new Error('Please provide a docId');
    if (!key) throw new Error('Please provide a google auth key');
    if (!secret) throw new Error('Please provide a google auth secret');

    store.doc = await sheetManager.getDoc(docId, key, secret);
    store.dictionary = await sync(store.doc);
    i18n.init(store.dictionary);
    return i18n;
}

function setLocale(locale) {
    translator.setLocale(locale);
    return translator;
}
function setScope(scope) {
    translator.setScope(scope);
    return translator;
}
function toKebabCase(inputString) {
    return inputString.trim().replace(/\W+/g,'-').toLowerCase();
}
async function sync(doc) {
    let languages;
    const dictionary = {};
    for (let sheet of doc.sheetsByIndex) {
        // console.log(sheet.title)
        let rows;
        try {
            rows = await sheet.getRows();
        } catch(e){
            console.warn('Empty sheet found, skipping to next sheet');
            continue;
        }
        // console.log(sheet.headerValues);
        if (!languages) {
            languages = sheet.headerValues;
        } else {
            if (languages.sort().join('|') !== sheet.headerValues.sort().join('|')) {
                console.error(`There is an issue with the google document: Languages defined in "${sheet.title}" don't match languages on other sheets. Languages should be the same on all sheets. ${languages.toString()} -> ${sheet.headerValues.toString()}`)
            }
        }

        for(let row of rows){
            if(!row['key']) continue;
            for( let l of languages){
                if(!dictionary[l]) dictionary[l] = {};
                dictionary[l][row['key']] = row[l];
                dictionary[l][`[${toKebabCase(sheet.title)}]${row['key']}`] = row[l];
            }
        }
        // console.log(dictionary['es']);
    } // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    // console.log('dictionary', dictionary);
    return dictionary;
}
function getDictionary(lang){
    if(lang) return store.dictionary[lang];
    return store.dictionary;
}
function getDoc(lang){
    return store.doc;
}
function t(key, lang = store.lang) {
    if (!key) {
        console.error('Empty key was passed to $');
        return '';
    }
    translator.setLocale(lang);
    return translator.t(key);

}


export default {
    init,
    setLocale,
    setScope,
    t,
    getDoc
}
