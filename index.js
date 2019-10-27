
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

app.get("/blog-post", function(req, res) {
	let author = req.query.author
	if (author == "") {
		res.statusMessage = "No author was provided for the search";
		return res.status(406).json({
			message: "No author was provided for the search",
			status: 406
		});
	}
	let post_list = posts.find(object => object.author == author);
	if(post_list == undefined) {
		res.statusMessage = "Author provided does not exist";
		return res.status(404).json({
			message: "Author provided does not exist",
			status: 404
		});
	}

	post_list = posts.filter(object => object.author == author);
	return res.status(200).json(post_list);
});

app.listen("8080", function() {
	console.log("Welcome to the Blog-Post server.")
});