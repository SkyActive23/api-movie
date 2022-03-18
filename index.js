const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');


const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(bodyParser.urlencoded({
    extended: true
  }));



// let top10Movies = [
//     {
//       title: 'Lucky Number Slevin',
//       director: 'Paul McGuigan'
//     },
//     {
//       title: 'The Gentlemen',
//       director: 'Guy Ritchie'
//     },
//     {
//       title: 'Batman: The Dark Night',
//       director: 'Christopher Nolan'
//     }
//   ];
  
  // GET requests
  app.get('/', (req, res) => {
    res.send('Welcome to ApiFlix!');
  });
  
  app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
  });
  
  app.get('/movies', (req, res) => {
    res.json(top10Movies);
  });
  
// Serve static content from the public directory
app.use(express.static('public'));
  
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// listen for requests 8080
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
  });