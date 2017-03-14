const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 4001;

// Edit these keys here ///
const object = 'accounts';
const organizationKey = '37f2ac51ca442358d68b049a2ded06fa';
const userKey = 'ttukeudZINFrn6OOCmCiAasU3RUKhguvjdKi3bK8di4=';
const elementKey = 'WLR+MhJpbiarDhxd/kFPVC8FCaIQDvcBUTRpckg1Hh4=';
const environment = 'staging'   // should be set to : 'api' or 'staging'
////////////////////////

let requestOptions = {
  url: `https://${environment}.cloud-elements.com/elements/api-v2/hubs/crm/objects/${object}/metadata`,
  headers: {
    'Authorization' : `User ${userKey}, Organization ${organizationKey}, Element ${elementKey}`
  }
}

let fieldsArray;
let choicesMapping = {};

console.log(requestOptions);

const server = http.createServer((req, res) => {
  request(requestOptions, (err, response) => {
    if(err) {
      console.log(err, response.body);
      return;
    }
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
            console.log(choicesMapping);
          }
          choicesMapping[field.vendorDisplayName][`${choice.id}`] = choice.label; 
        })
      }
    })
    res.end(JSON.stringify(choicesMapping));
  })
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});