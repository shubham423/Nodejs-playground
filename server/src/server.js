const http = require('http');

const app = require('./app');
const mongoose = require('mongoose');

require('dotenv').config();

const { loadPlanetsData } = require('./models/planets.model');

const mongoUrl = process.env.MONGO_URL

const PORT = process.env.PORT || 8000;
const server = http.createServer(app);


mongoose.connection.once('open', () => {
  console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
  console.log('MongoDB error!');
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

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

startServer();