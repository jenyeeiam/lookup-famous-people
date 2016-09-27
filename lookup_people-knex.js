const pg = require("pg");
const settings = require("./settings"); // settings.json

var knex = require('knex')({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database,
    ssl: true
  },
});

knex('famous_people').where('first_name', process.argv[2]).orWhere('last_name', process.argv[2])
  .asCallback(function(err, rows){
    if (err) return err
    console.log(rows);
    knex.destroy(function(){
      console.log("I'm done");
    });
  });

// knex('famous_people').insert({first_name: process.argv[2], last_name: process.argv[3], birthdate: process.argv[4]})
//   .asCallback(function(err, rows) {
//     console.log(rows);
//   });



