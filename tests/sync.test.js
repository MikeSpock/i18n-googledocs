import {expect} from 'chai';
import igd from '../index.js';
import dotenv from 'dotenv';
import sheetManager from "../services/sheetManager.js";
dotenv.config();

let i18n;
describe('Index.js', ()=>{
    before(async function (){
        this.timeout(5000);
        i18n = await igd.init('1UkQvlGyYc5Phin9ZcP-t_ylrglTidGgdUhIRBUbsJ1U',process.env.GOOGLE_EMAIL, process.env.GOOGLE_PRIVATE_KEY);
    });
    it('should be able to connect and sync a sheet', async ()=>{
        expect(i18n.getDoc().sheetsByIndex[0].title).to.equal('Checkout Page')
    })
    it('should be able to add missing items to sheet', async ()=>{
        i18n.setLocale('es');
        i18n.setScope('front-page');
        const t = i18n.t('Order summaryx')
        i18n.syncMissing();
        expect(t).to.equal('Completa tu compra')

    }).timeout(5*1000)

    it('should be able to default to key', async ()=>{
        i18n.setLocale('de');
        i18n.setScope('front-page');
        const translation = i18n.t('Welcome')
        i18n.syncMissing();
        expect(translation).to.equal('Order summary')
    }).timeout(10*1000)
})
