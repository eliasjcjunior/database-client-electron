import { tmpdir } from 'os';
const Datastore = require('nedb-promises');

const dbFactory = (filename) => Datastore.create({
  filename: `${tmpdir}/data/${filename}`, 
  timestampData: true,
  autoload: true
});

export default  {
    connections: dbFactory('connections.db'),
    selectDatabase: dbFactory('selectDatabase.db')
};