# json-object-generator
JSON object mapper for JavaScript

Allows to generate ECMAScript 6 classes based on JSON.

Installation  
`npm i json-object-generator`

Example of generation of an object  
```
var json =   
{  
  "key":"value",  
  "data" : {
      "dataKey":"dataValue"
  }
};    

var filename = "MyJSON";  
var generate = require("json-object-generator");  
generate(json, filename);  
```
  
Output:  
```
class MyJSON {  
  constructor(json) {  
      if (typeof json !== "undefined") {
          this.key = json.key;
          this.data = new Data(json.data);
      }
  }  
}

class Data {  
  constructor(json) {  
    if (typeof json !== "undefined) {  
        this.datakey = json.datakey;  
    }  
  }  
}  
```

Usage:  
```
var json =   
{  
  "key":"value",  
  "data" : {
      "dataKey":"dataValue"
  }
}; 
var MyJSON = require("./MyJSON").MyJSON;
var keyFromData = new MyJSON(json).data.key;
```  
