const http = require('http');
const request = require('request');

const hostname = '127.0.0.1';
const port = 4000;

// Edit these keys here ///
const object = 'contacts';
const orgKey = '8e8bd0fd341545566652b4e97cd1e8ac';
const userKey = '4G+QWCPwoUKo62MEmVBjWfaMGv8BgNXngKqT5mbiJvQ=';
const elementKey = 'jxg0lbluTZ9kX57fo1pyoQptJimOvPy0oXVvVe7JIoI=';
////////////////////////

let requestOptions = {
  url: `https://api.cloud-elements.com/elements/api-v2/hubs/crm/objects/${object}/metadata`,
  headers: {
    'Authorization' : `User ${userKey}, Organization ${orgKey}, Element ${elementKey}`
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