import sheetManager from "./sheetManager.js";


let dict;
let locale;
let scope;
const missing = {};
let syncTimeout;

const defaultMissingSheetTitle = 'Missing';

function init(dictionary) {
    dict = dictionary;
    locale = Object.keys(dictionary)[0];
}

function getDictionary() {
    return dict
}

function setLocale(newlocale) {
    locale = newlocale
}

function setScope(newscope) {
    scope = newscope
}

function t(input) {
    let result;

    console.log(dict)
    if (!dict[locale]) {
        console.warn(`Translation locale not existing [${locale}]. Adding to sheet.`);
        addMissingTranslation(input, locale, scope);
        dict[locale] = {[input]: ''};
        return input;
    }
    result = dict[locale][input];
    if (input in dict[locale] && typeof result === 'undefined') {
        console.warn('Translation added but not defined, defaulting to [key]');
        return input;
    }

    if (result) return result;
    else if (result !== '') {
        console.warn(`Missing [${locale}] translation for: ${input}`);
        addMissingTranslation(input, locale, scope);

    }
    return '';
}

function addMissingTranslation(input, locale, scope = defaultMissingSheetTitle) {
    if (syncTimeout) syncTimeout = clearTimeout(syncTimeout);

    const sheetTitle = `${scope}`;
    if (!missing[sheetTitle]) missing[sheetTitle] = {locale, scope, items: []};

    if (missing[sheetTitle].items.indexOf(input) !== -1) {
        console.log('[i18n] missing translation is already in waiting list to be pushed.');
        return;
    }
    missing[sheetTitle].items.push(input);
    setTimeout(async function(){
        await sheetManager.syncMissing(missing);
        for(let sheetName in missing){
            console.log(sheetName);
            for(let item in missing[sheetName]){}
        }
    }, 1000);
}

function syncMissing(){
    sheetManager.syncMissing(missing);
}

export default{
    t,
    init,
    setLocale,
    setScope,
    syncMissing
}

