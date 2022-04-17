var axios = require('axios');
var data = JSON.stringify({
    "collection": "<COLLECTION_NAME>",
    "database": "<DATABASE_NAME>",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
var config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-nyhpk/endpoint/data/beta/action/findOne',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Request-Headers': '*',
        'api-key': 'pDiGw8RBezGPX2ZV1xBErVIGgvmPXs5QWlyxv8FaZqB4T4E1y4eFdfHtyYCqBFLx'
    },
    data : data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
