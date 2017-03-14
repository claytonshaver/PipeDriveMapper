const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 4000;

// Edit these keys here ///
const object = 'contacts';
const organizationKey = '';
const userKey = '';
const elementKey = '';
////////////////////////

let requestOptions = {
  url: `https://api.cloud-elements.com/elements/api-v2/hubs/crm/objects/${object}/metadata`,
  headers: {
    'Authorization' : `User ${userKey}, Organization ${organizationKey}, Element ${elementKey}`
  }
}

let fieldsArray;
let choicesMapping = {};

const server = http.createServer((req, res) => {
  request(requestOptions, (err, response) => {
    if(err) console.log(err);
    body = JSON.parse(response.body);
    fieldsArray = body.fields;
    // Loop through the field
    fieldsArray.forEach(field => {
      if(Object.keys(field).includes('choices')){
        console.log(field.vendorDisplayName)
        field.choices.forEach(choice =>{
          console.log(choice)
          if(!choicesMapping[field.vendorDisplayName]){
            choicesMapping[field.vendorDisplayName] = {};
          }
          choicesMapping[field.vendorDisplayName][`${choice.id}`] = choice.label; 
        })
        res.end(JSON.stringify(choicesMapping));
      }
    })
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});