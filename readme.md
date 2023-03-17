# I18n package that gets definitions Google Spreadsheets

This is a library that you can use in your JS projects to retrieve translation definitions from Google spreadsheets. I needed a repo like this but thought maybe someone else might want to use it as well. 

The premise is that you get a nice editor with Google Spreadsheets and can sync definitions when you want. 

Server and client libraries are provided, as client should not have the access keys to the google docs in case you want to transalte something on the frontend. How the server hands over the dictionary is your choice. See examples below.

## Usage

Install

`npm i i18n-googledocs`

Code (server-side)
`````
import idg from 'i18n-googledocs';

const i18n = await igd.init('[GOOGLE-DOC-ID]','[API service email]', '[API secret]');
console.log(i18n.t('Name'));  //outputs: 'Nombre'
`````

Code (client-side)
`````
import idg from 'i18n-googledocs/client.js';



`````



## How to get authenticate

Register a service key account to access Google APIs:
https://developers.google.com/identity/protocols/oauth2/service-account

This repo uses
https://github.com/theoephraim/node-google-spreadsheet
for retrieving documents. Please read more about authentication on their page.

## Translation

This repo uses i18n-js for translation. Please read their docs for reference.
https://github.com/fnando/i18n
