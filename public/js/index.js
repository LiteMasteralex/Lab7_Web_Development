console.log("Script has been loaded")
let blog_posts = [];

let updateSelect = function() {
	$("select").empty();
	$("select").append(`<option value="">Select Post</option>`)
	blog_posts.forEach( function(post) {
		let option = `<option value=${post.id}>${post.title.substr(0, 15)}...</option>`;
		$("select").append(option);
	});
}

let updatePots = function(posts) {
	let mainCotainer = $("main");
	mainCotainer.empty()
	blog_posts = [];
	posts.forEach(function(post) {
		blog_posts.push(post);
		let blog_t = `<div class="post_title"><h2>${post.title}</h2></div>`;
		let blog_h = `<div class="blog_header">${blog_t}<div class="user_image"><img src="" alt="user_image"></div></div>`;
		let blog_c = `<div class="blog_content"><p>${post.content}</p></div>`;
		let blog_f = `<div class="blog_footer"><div>${post.publishDate}</div><div>${post.author}</div></div>`;
		let newHtml = `<div class="blog_container">${blog_h}${blog_c}${blog_f}`;
		mainCotainer.append(newHtml);
	});
	updateSelect();
};

let init = function() {
	$.ajax({
		url: "/blog-posts", 
		method: "GET",
		dataType: "json",
		success: function(response) {
			updatePots(response);
		},
		error: function(error) {
			console.log(error);
		}
	})
};

$("#searchAuthor").on("click", function() {
	let author = $("#searchValue").val();
	console.log(author)
	$.ajax({
		url: "/blog-post?author=" + author, 
		method: "GET",
		dataType: "json",
		success: function(response) {
			updatePots(response);
		},
		error: function(error) {
			console.log(error);
		}
	});
});

$("#clearSearch").on("click", function() {
	init();
	$("#searchValue").val("");
});


init();