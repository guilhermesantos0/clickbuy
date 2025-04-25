const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `"mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.qfu7qrl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

async function run () {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 })
        console.log('Ping realizado')
    } finally {
        await client.close();
    }
}

run().catch(console.dir)