const fs = require('fs');

module.exports  = generate;

const fourspace = "    ";
const eightpace = "        ";
const twelvespace = "            ";
let classArray = [];

function generate(json, filename = "json", arrayNames) {
    let stream = fs.createWriteStream(filename + ".js");
    if (Array.isArray(json)) {
        if (Array.isArray(arrayNames) && (json.length == arrayNames.length)) {
            for (let elem in json) {
                __generateClass(json[elem], arrayNames[elem], stream)
            }
        } else {
            throw new Error("arrayNames is not an array or it's size is different from size of JSON Array");
        }
    } else {
        __generateClass(json, filename, stream);
    }
    for (let i in classArray) {
        var str = capFirst(classArray[i]);
        stream.write("module.exports." + str + " = " + str + ";\n");
    }
    classArray = [];
    stream.end();
}

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function __generateClass(obj, name, stream) {
    stream.write("class " + capFirst(name) + " {\n");
    classArray.push(name);
    stream.write(fourspace + "constructor(json) {\n");
    stream.write(eightpace + "if (typeof json !== \"undefined\") {\n");
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newObj = obj[key];
            let firstKey = key;
            let valueName = "json." + key;
            if (Array.isArray(newObj)) {
                firstKey = firstKey + "Array"
            } else if (typeof newObj !== "string" &&
                typeof newObj !== "boolean" &&
                typeof newObj !== "number") {
                valueName = "new " + capFirst(key) + "(" + valueName + ")"
            }
            stream.write(twelvespace + "this." + firstKey + " = " + valueName + ";\n")
        }
    }
    stream.write(eightpace + "}\n");
    stream.write(fourspace + "}\n");
    stream.write("}\n\n");

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            let newObj = obj[key];
            if (Array.isArray(newObj)) {
                if (classArray.indexOf(key) === -1 && newObj.length > 0) {
                    for (let i in newObj) {
                        if (typeof newObj[i] !== "string" &&
                            typeof newObj[i] !== "boolean" &&
                            typeof newObj[i] !== "number") {
                            __generateClass(newObj[0], key, stream);
                        }
                    }
                }
            } else {
                if (classArray.indexOf(key) === -1 &&
                    typeof newObj !== "string" &&
                    typeof newObj !== "boolean" &&
                    typeof newObj !== "number") {
                    __generateClass(newObj, key, stream);
                }
            }
        }
    }
}


const artistSearch = {"resultsPage":
    {"results":
        {"artist":
            [{"uri":"http://www.songkick.com/artists/253846-radiohead",
                "displayName":"Radiohead",
                "id":253846,
                "onTourUntil":"2010-01-01"}
            ]
        },"totalEntries":1,"perPage":50,"page":1,"status":"ok"}};

const artistEvents = {
    "resultsPage": {
        "results": { "event": [
            {
                "id":11129128,
                "type":"Concert",
                "uri":"http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
                "displayName":"Wild Flag at The Fillmore (April 18, 2012)",
                "start":{"time":"20:00:00",
                    "date":"2012-04-18",
                    "datetime":"2012-04-18T20:00:00-0800"},
                "performance":[{"artist":{"uri":"http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner",
                    "displayName":"Wild Flag","id":29835,"identifier":[]},
                    "displayName":"Wild Flag",
                    "billingIndex":1,
                    "id":21579303,
                    "billing":"headline"}],
                "location":{"city":"San Francisco, CA, US","lng":-122.4332937,"lat":37.7842398},
                "venue":{"id":6239,
                    "displayName":"The Fillmore",
                    "uri":"http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
                    "lng":-122.4332937, "lat":37.7842398,
                    "metroArea":{"uri":"http://www.songkick.com/metro_areas/26330-us-sf-bay-area?utm_source=PARTNER_ID&utm_medium=partner",
                        "displayName":"SF Bay Area","country":{"displayName":"US"},"id":26330,"state":{"displayName":"CA"}}},
                "status":"ok",
                "popularity":0.012763
            },
]},
"totalEntries":24,
    "perPage":50,
    "page":1,
    "status":"ok"
}
};

var locationEvents = {
    "resultsPage": {
        "results": { "event": [
            {
                "id":11129128,
                "type":"Concert",
                "uri":"http://www.songkick.com/concerts/11129128-wild-flag-at-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
                "displayName":"Wild Flag at The Fillmore (April 18, 2012)",
                "start":{"time":"20:00:00",
                    "date":"2012-04-18",
                    "datetime":"2012-04-18T20:00:00-0800"},
                "performance":[{"artist":{"uri":"http://www.songkick.com/artists/29835-wild-flag?utm_source=PARTNER_ID&utm_medium=partner",
                    "displayName":"Wild Flag","id":29835,"identifier":[]},
                    "displayName":"Wild Flag",
                    "billingIndex":1,
                    "id":21579303,
                    "billing":"headline"}],
                "location":{"city":"San Francisco, CA, US","lng":-122.4332937,"lat":37.7842398},
                "venue":{"id":6239,
                    "displayName":"The Fillmore",
                    "uri":"http://www.songkick.com/venues/6239-fillmore?utm_source=PARTNER_ID&utm_medium=partner",
                    "lng":-122.4332937, "lat":37.7842398,
                    "metroArea":{"uri":"http://www.songkick.com/metro_areas/26330-us-sf-bay-area?utm_source=PARTNER_ID&utm_medium=partner",
                        "displayName":"SF Bay Area","country":{"displayName":"US"},"id":26330,"state":{"displayName":"CA"}}},
                "status":"ok",
                "popularity":0.012763
            },
]},
"totalEntries":24,
    "perPage":50,
    "page":1,
    "status":"ok"
}
};

var locationSearch = {"resultsPage":
    {"results":
        {"location":[{
            "city":{"displayName":"London",
                "country":{"displayName":"UK"},
                "lng":-0.128,"lat":51.5078},
            "metroArea":{"uri":"http://www.songkick.com/metro_areas/24426-uk-london",
                "displayName":"London",
                "country":{"displayName":"UK"},
                "id":24426,
                "lng":-0.128,"lat":51.5078}},
            {"city":{"displayName":"London",
                "country":{"displayName":"US"},
                "lng":null,"lat":null,
                "state":{"displayName":"KY"}},
                "metroArea":{"uri":"http://www.songkick.com/metro_areas/24580",
                    "displayName":"Lexington",
                    "country":{"displayName":"US"},
                    "id":24580,
                    "lng":-84.4947,"lat":38.0297,
                    "state":{"displayName":"KY"}}}
        ]},
        "totalEntries":2,"perPage":10,"page":1,"status":"ok"}};


generate(artistSearch, "ArtistSearch");
generate(locationSearch, "LocationSearch");
generate(artistEvents, "ArtistEvents");
generate(locationEvents, "LocationEvents");
console.log("Finished.");