'use strict'

const axios = require('axios');
const zlib = require('zlib');
const { Client } = require('@elastic/elasticsearch')

const API_TOKEN = process.env.SCREEPS_TOKEN || 'd7ec02fc-56a9-492f-bfd0-947ebaa27e89';
const SHARD = process.env.SCREEPS_SHARD || 'shard3';
const UPDATE_FREQUENCY = process.env.UPDATE_FREQUENCY_SECONDS * 1000 || 15000;
const elastic_index = 'screeps';

const client = new Client({ node: 'http://192.168.0.24:9200' });

// delete all indexes
const clean_all = async () => {
  try {
    await client.indices.delete({index: '_all'});
    console.log('Indices deleted');
  } catch (e) {
    console.log('Indices NOT deleted', e);
  }
}

// delete all indexes
const create_index = async () => {
  try {
    await client.indices.create({
      index: elastic_index,
      body: {
        mappings: {
          properties: {
            'timestamp': {'type': 'date', 'format': 'strict_date_optional_time||epoch_millis'}
          }
        }
      }
    });
    console.log('Index created');
  } catch (e) {
    console.log('Index NOT created', e);
  }
}

const get_health = async () => client.cluster.health();
// const health = await get_health();

clean_all();
create_index();
// await health;

// client.indices.getMapping({  
//   index: elastic_index,
// },
// function (error,response) {  
//   if (error){
//     console.log(error.message);
//   }
//   else {
//     console.log("Mappings:\n",response.body[elastic_index].mappings);
//   }
// });



setInterval(() => {
    axios.get('https://screeps.com/api/user/memory?path=stats&shard='+SHARD,
        { headers: { 'X-Token': API_TOKEN }})
    .then(response => {
        let zipped = response.data.data.split('gz:')[1];
        let data = JSON.parse(zlib.gunzipSync(new Buffer.from(zipped, 'base64')).toString());
        console.log(data);
        client.index({
          index: elastic_index,
          body: data
        },function(err,resp,status) {
          console.log(resp);
        });
    })
    .catch(error => {
      console.log(error);
    });
}, UPDATE_FREQUENCY)