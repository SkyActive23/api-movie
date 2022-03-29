const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    uuid = require('uuid');
// const res = require('express/lib/response');
    


const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());


app.use(bodyParser.urlencoded({
    extended: true
  }));



let top10Movies = [
    {
        "Title": 'Lucky Number Slevin',
        "Description": "A case of mistaken identity lands Slevin into the middle of a war being plotted by two of the city's most rival crime bosses. Under constant surveillance by Detective Brikowski and assassin Goodkat, he must get them before they get him.",
        "Genre": {
            "Name": "Drama"
        },
        "Director": {
            "Name": 'Paul McGuigan',
            "Bio": "Paul McGuigan was born on September 19, 1963 in Bellshill, Scotland. He is a director and producer, known for Lucky Number Slevin (2006), Wicker Park (2004) and Victor Frankenstein (2015). He is married to Natasha Noramly. They have one child. He was previously married to Elisabeth McGuigan.",
        },
        "ImageURL": "https://www.imdb.com/title/tt0425210/mediaviewer/rm288767744/",
        "Featured": false
    },
    {
        "Title": 'The Gentlemen',
        "Description": "An American expat tries to sell off his highly profitable marijuana empire in London, triggering plots, schemes, bribery and blackmail in an attempt to steal his domain out from under him.",
        "Genre": {
            "Name": "Action"
        },
        "Director": {
            "Name": 'Guy Ritchie',
            "Bio": "Guy Ritchie was born in Hatfield, Hertfordshire, UK on September 10, 1968. After watching Butch Cassidy and the Sundance Kid (1969) as a child, Guy realized that what he wanted to do was make films. He never attended film school, saying that the work of film school graduates was boring and unwatchable. At 15 years old, he dropped out of school and in 1995, got a job as a runner, ultimately starting his film career. He quickly progressed and was directing music promos for bands and commercials by 1995.",
        },
        "ImageURL": "https://www.imdb.com/title/tt8367814/mediaviewer/rm1937148929/",
        "Featured": false
    },
    {
        "Title": 'Batman: The Dark Night',
        "Description": "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        "Genre": {
            "Name": "Action"
        },
        "Director": {
            "Name": 'Christopher Nolan',
            "Bio": "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made."
        },
        "ImageURL": "https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/",
        "Featured": false
    },
    {
        "Title": 'Deadpool',
        "Description": "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
        "Genre": {
            "Name": "Comedy"
        },
        "Director": {
            "Name": 'Tim Miller',
            "Bio": "Tim Miller is an American animator, film director, creative director and visual effects artist. He was nominated for the Academy Award for Best Animated Short Film for the work on his short animated film Gopher Broke. He made his directing debut with Deadpool. Miller is also famous for creating opening sequences of The Girl with the Dragon Tattoo and Thor: The Dark World."
        },
        "ImageURL": "https://www.imdb.com/title/tt1431045/mediaviewer/rm351021568/",
        "Featured": false
    },
    {
        "Title": 'Deadpool 2',
        "Description": "Foul-mouthed mutant mercenary Wade Wilson (a.k.a. Deadpool) assembles a team of fellow mutant rogues to protect a young boy with supernatural abilities from the brutal, time-traveling cyborg Cable.",
        "Genre": {
            "Name": "Comedy"
        },
        "Director": {
            "Name": 'David Leitch',
            "Bio": "David Leitch is a billion dollar film director, actor, stuntman, writer, producer, and stunt coordinator. He co-directed John Wick (2014) with Chad Stahelski, which he also served as producer. David directed Atomic Blonde (2017) starring Charlize Theron. David also directed the box office smash and critically acclaimed Deadpool 2 (2018). He is the director of Fast and Furious spin off: Hobbs and Shaw (2019)."
        },
        "ImageURL": "https://www.imdb.com/title/tt5463162/mediaviewer/rm1218472448/",
        "Featured": false
    },
    {
        "Title": 'No Country For Old Men',
        "Description": "Violence and mayhem ensue after a hunter stumbles upon a drug deal gone wrong and more than two million dollars in cash near the Rio Grande.",
        "Genre": {
            "Name": "Thriller"
        },
        "Director": {
            "Name":'Coen\'s',
            "Bio": "The younger brother of Joel, Ethan Coen is an Academy Award and Golden Globe winning writer, producer and director coming from small independent films to big profile Hollywood films. He was born on September 21, 1957 in Minneapolis, Minnesota. In some films of the brothers- Ethan & Joel wrote, Joel directed and Ethan produced - with both editing under the name of Roderick Jaynes; but in 2004 they started to share the three main duties plus editing. Each film bring its own quality, creativity, art and with one project more daring the other. Joel Daniel Coen is an American filmmaker who regularly collaborates with his younger brother Ethan. They made Raising Arizona, Barton Fink, Fargo, The Big Lebowski, True Grit, O Brother Where Art Thou?, Burn After Reading, A Serious Man, Inside Llewyn Davis, Hail Caesar and other projects. Joel married actress Frances McDormand in 1984 and had an adopted son."
        },
        "ImageURL": "https://www.imdb.com/title/tt0477348/mediaviewer/rm1263244032/",
        "Featured": false
    },
    {
        "Title": 'Matrix',
        "Description": "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
        "Genre": {
            "Name": "Sci-Fi"
        },
        "Director": {
            "Name": 'Wachowski\'s',
            "Bio": "Lana Wachowski and her sister Lilly Wachowski, also known as the Wachowskis, are the duo behind such ground-breaking movies as The Matrix (1999) and Cloud Atlas (2012). Born to mother Lynne, a nurse, and father Ron, a businessman of Polish descent, Wachowski grew up in Chicago and formed a tight creative relationship with her sister Lilly. After the siblings dropped out of college, they started a construction business and wrote screenplays. Their 1995 script, Assassins (1995), was made into a movie, leading to a Warner Bros contract. After that time, the Wachowskis devoted themselves to their movie careers. In 2012, during interviews for Cloud Atlas and in her acceptance speech for the Human Rights Campaign's Visibility Award, Lana spoke about her experience of being a transgender woman, sacrificing her much cherished anonymity out of a sense of responsibility. Lana is known to be extremely well-read, loves comic books and exploring ideas of imaginary worlds, and was inspired by Stanley Kubrick's 2001: A Space Odyssey (1968) in creating Cloud Atlas. Director, writer, and producer Lilly Wachowski was born in 1967 in Chicago, the daughter of Lynne, a nurse and painter, and Ron, a businessman. Lilly was educated at Kellogg Elementary School in Chicago, before moving on to Whitney M. Young High School. After graduating from high school, she attended Emerson College in Boston but dropped out."
        },
        "ImageURL": "https://www.imdb.com/title/tt0133093/mediaviewer/rm525547776/",
        "Featured": false
    },
    {
        "Title": 'Knives Out',
        "Description": "A detective investigates the death of the patriarch of an eccentric, combative family.",
        "Genre": {
            "Name": "Crime"
        },
        "Director": {
            "Name": 'Rian Johnson',
            "Bio": "Rian Johnson was born in Maryland and at a young age his family moved to San Clemente, California, where he was raised. After graduating from high school, he went on to attend the University of Southern California School of Cinematic Arts. His first feature film, Brick (2005), was released in 2005 and was the metaphorical building block that launched his career. He is a director, writer, and musician, among other areas of expertise."
        },
        "ImageURL": "https://www.imdb.com/title/tt8946378/mediaviewer/rm2569376769/",
        "Featured": false
    },
    {
        "Title": 'The Other Guys',
        "Description": "A detective investigates the death of the patriarch of an eccentric, combative family.",
        "Genre": {
            "Name": "Comedy"
        },
        "Director": {
            "Name": 'Adam McKay',
            "Bio": "Adam McKay (born April 17, 1968) is an American screenwriter, director, comedian, and actor. McKay has a comedy partnership with Will Ferrell, with whom he co-wrote the films Anchorman, Talladega Nights, and The Other Guys. Ferrell and McKay also founded their comedy website Funny or Die through their production company Gary Sanchez Productions. He has been married to Shira Piven since 1999. They have two children."
        },
        "ImageURL": "https://www.imdb.com/title/tt1386588/mediaviewer/rm2586368513/",
        "Featured": false
    },
    {
        "Title": 'Live Free or Die Hard',
        "Description": "John McClane and a young hacker join forces to take down master cyber-terrorist Thomas Gabriel in Washington D.C.",
        "Genre": {
            "Name": "Action"
        },
        "Director": {
            "Name": 'Len Wiseman',
            "Bio": "Filmmaker Len Wiseman's career began through his work in the art department on the blockbuster hits like Godzilla (1998), Men in Black (1997), and Independence Day (1996). His design talents soon got him behind the camera directing commercials for PlayStation, Time Warner, Oracle, Intel, and Activision, and quickly lead to work in music videos. Len received numerous award nominations, including Best Art Direction at the 2002 MTV Awards for Quarashi's Screaming Masterpiece (2005) (aka Stick 'Em Up) and Best Director at the 2002 MVPA Awards for the Rufus Wainwright video \"Across the Universe.\" In addition, Wiseman directed music videos for Megadeth, En Vogue, Static-X, Paul Oakenfold and Brooke Allison."
        },
        "ImageURL": "https://www.imdb.com/title/tt0337978/mediaviewer/rm2447281408/",
        "Featured": false
    }
];
  
let users = [
    {
        id: 1,
        name: 'Tina',
        favoriteMovies: ['Rush Hour 2']
    },
    {
        id: 2,
        name: 'Turner',
        favoriteMovies: ['Gladiator']
    }
];

// Create
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser)
    } else {
        res.status(400).send('users need name')
    }
})

// Update
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const updatedUser = req.body;

    let user = users.find( user => user.id == id); 
    // double == means a string value like '2' can equal integer value 2
    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('no such user')
    }
})

// Create
app.post('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id); 
    // double == means a string value like '2' can equal integer value 2
    if (user) {
        user.favoriteMovies.push(movieTitle);
        res.status(200).send(movieTitle + ' has been added to user ' + id + 's array');
    } else {
        res.status(400).send('no such user')
    }
})

// Delete
app.delete('/users/:id/:movieTitle', (req, res) => {
    const { id, movieTitle } = req.params;

    let user = users.find( user => user.id == id); 
    // double == means a string value like '2' can equal integer value 2
    if (user) {
        user.favoriteMovies = user.favoriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(movieTitle + ' has been removed from user ' + id + 's array');
    } else {
        res.status(400).send('no such user')
    }
})

// Delete
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    let user = users.find( user => user.id == id); 
    // double == means a string value like '2' can equal integer value 2
    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send('User ' + id + ' has been deleted');
    } else {
        res.status(400).send('no such user')
    }
})


  // GET requests
app.get('/', (req, res) => {
    res.send('Welcome to ApiFlix!');
});
  
app.get('/documentation', (req, res) => {                  
    res.sendFile('public/documentation.html', { root: __dirname });
});

// Read
app.get('/movies', (req, res) => {
    res.status(200).json(top10Movies);
});

// Read
app.get('/movies/:title', (req, res) => {
    // const title = req.params.title; -this is the same as the bottom code
    const { title } = req.params;
    const movie = top10Movies.find(movie => movie.Title === title);
    
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('no such movie')
    }
});

// Read
app.get('/movies/genre/:genreName', (req, res) => {
    // const genre = req.params.genre; -this is the same as the bottom code
    const { genreName } = req.params;
    const genre = top10Movies.find(movie => movie.Genre.Name === genreName).Genre;
    
    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('no such genre')
    }
});

// Read
app.get('/movies/director/:directorName', (req, res) => {
    // const genre = req.params.genre; -this is the same as the bottom code
    const { directorName } = req.params;
    const director = top10Movies.find(movie => movie.Director.Name === directorName).Director;
    
    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('no such director')
    }
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