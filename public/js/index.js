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
	$(".searchQuery > .error_message").remove()
	$.ajax({
		url: "/blog-post?author=" + author, 
		method: "GET",
		dataType: "json",
		success: function(response) {
			updatePots(response);
		},
		error: function(error) {
			$(".searchQuery").append(`<span class="error_message">${error.statusText}</span>`)
		}
	});
});

$("#clearSearch").on("click", function() {
	init();
	$("#searchValue").val("");
});


$("#new_post").on("submit", function(event) {
	event.preventDefault();
	$("#new_post > fieldset > .error_message").remove()
	$("#new_post > fieldset > .success_message").remove()
	let newPost = {
		author: $("#new_author").val(),
		title: $("#new_title").val(),
		content: $("#new_content").val()
	};
	$.ajax({
		url: "/blog-posts",
		method: "POST",
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		data: JSON.stringify(newPost),
		success: function(response) {
			$("#new_post > fieldset").append(`<span class="success_message">Succesfully created post.</span>`);
			$("#new_author").val("");
			$("#new_title").val("");
			$("#new_content").val("");
			init();
			$("#searchValue").val("");
		},
		error: function(error) {
			$("#new_post > fieldset").append(`<span class="error_message">${error.statusText}</span>`)
		}
	});
});

$("#del_post").on("submit", function(event) {
	event.preventDefault();
	$("#del_post > fieldset > .error_message").remove()
	$("#del_post > fieldset > .success_message").remove()
	let id = $("#dl_list").val();
	$.ajax({
		url: "/blog-posts/" + id,
		method: "DELETE",
		success: function() {
			$("#del_post > fieldset").append(`<span class="success_message">Succesfully deleted post.</span>`);
			init();
			$("#searchValue").val("");
		},
		error: function(error) {
			console.log(error);
			$("#del_post > fieldset").append(`<span class="error_message">${error.statusText}</span>`)
		}
	});
});

init();