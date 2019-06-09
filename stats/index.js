const axios = require('axios');
const zlib = require('zlib');
const elasticsearch = require('elasticsearch');

const API_TOKEN = process.env.SCREEPS_TOKEN || 'd7ec02fc-56a9-492f-bfd0-947ebaa27e89';
const SHARD = process.env.SCREEPS_SHARD || 'shard3';
const UPDATE_FREQUENCY = process.env.UPDATE_FREQUENCY_SECONDS * 1000 || 15000;

setInterval(() => {
    axios.get('https://screeps.com/api/user/memory?path=stats&shard='+SHARD,
        { headers: { 'X-Token': API_TOKEN }})
    .then(response => {
        let zipped = response.data.data.split('gz:')[1];
        let data = JSON.parse(zlib.gunzipSync(new Buffer.from(zipped, 'base64')).toString());
        console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
}, UPDATE_FREQUENCY)