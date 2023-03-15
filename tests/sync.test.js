import {expect} from 'chai';
import igd from '../index.js';
import dotenv from 'dotenv';
dotenv.config();

let doc;
describe('Index.js', ()=>{
    before(async function (){
        this.timeout(5000);
        doc = await igd.init('1q8jc9955E71pcs25Myb77tzWPw_72GXGo6TrMjVi2yI',process.env.GOOGLE_EMAIL, process.env.GOOGLE_PRIVATE_KEY);
    });
    it('should be able to connect and sync a sheet', async ()=>{
        expect(doc.sheetsByIndex[0].title).to.equal('Checkout Page')
    })
    it('should be able to translate a text', async ()=>{
        igd.setLanguage('es');
        expect(igd.t('Name on card')).to.equal('Nombre en la tarjeta')
    }).timeout(5*1000)
})
