
let express = require("express");
let morgan = require("morgan");
let bodyParser = require('body-parser');
let uuidv4 = require('uuid/v4');

let app = express();

app.use(express.static('public'));
app.use(morgan("dev"));

let posts = [{
	id: uuidv4(),
	title: "New songs on my Profile.",
	content: "Hey guys just wanted to let you know that I added a few of my new songs to my spotify profile. Be sure to check them out!",
	author: "Jakey",
	publishDate : new Date('October 17, 2019')
}, {
	id: uuidv4(),
	title: "Profanity Warning!",
	content: "Please keep profanity to the minimum, we would like to avoid bannig people but we will if this continues.",
	author: "Moderator",
	publishDate : new Date('October 10, 2019')
}, {
	id: uuidv4(),
	title: "Happy Start of Spooktober!!!1!",
	content: "Looking forward to all your spooks, and the sugar overdose I'll get from the candy my kids gather.",
	author: "Felix",
	publishDate : new Date('October 1, 2019')
}];

app.get("/blog-posts", function(req, res) {
	return res.status(200).json(posts);
});

app.listen("8080", function() {
	console.log("Welcome to the Blog-Post server.")
});