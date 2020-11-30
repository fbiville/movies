// npm install --save neo4j-driver
// node example.js
const neo4j = require('neo4j-driver');
const driver = neo4j.driver('neo4j+s://demo.neo4jlabs.com:7687',
                  neo4j.auth.basic('movies', 'movies'), 
                  {/* encrypted: 'ENCRYPTION_OFF' */});

const query =
  `
  MATCH (movie:Movie {title:$favorite})<-[:ACTED_IN]-(actor)-[:ACTED_IN]->(rec:Movie)
  RETURN distinct rec.title as title LIMIT 20
  `;

const params = {"favorite": "The Matrix"};

const session = driver.session({database:"movies"});

session.run(query, params)
  .then((result) => {
    result.records.forEach((record) => {
        console.log(record.get('title'));
    });
    session.close();
    driver.close();
  })
  .catch((error) => {
    console.error(error);
  });
