const http = require('http');
const mongoose = require('mongoose');

require('dotenv').config();

const app = require('./app');

const { loadPlanetsData } = require('./models/planets.model');
const { loadLaunchData } = require('./models/launches.model');

const PORT = process.env.PORT || 8000;

const mongoUrl = 'mongodb+srv://nodejsapi:Idqo6G40bMVrQvOC@cluster0.77smfew.mongodb.net/?retryWrites=true&w=majority';

const server = http.createServer(app);

mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });
  await loadPlanetsData();
  await loadLaunchData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();