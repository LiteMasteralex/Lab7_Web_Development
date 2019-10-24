console.log("Script has been loaded")
let blog_post_id = [];

let init = function() {
	$.ajax({
		url: "/blog-posts", 
		method: "GET",
		dataType: "json",
		success: function(response) {
			response.forEach(function(post) {
				blog_post_id.push(post.id);
				let blog_t = `<div class="post_title"><h2>${post.title}</h2></div>`;
				let blog_h = `<div class="blog_header">${blog_t}<div class="user_image"><img src="" alt="user_image"></div></div>`;
				let blog_c = `<div class="blog_content"><p>${post.content}</p></div>`;
				let blog_f = `<div class="blog_footer"><div>${post.publishDate}</div><div>${post.author}</div></div>`;
				let newHtml = `<div class="blog_container">${blog_h}${blog_c}${blog_f}`;
				$("main").append(newHtml);
			});
		},
		error: function(error) {
			console.log(error);
		}
	})
};

init();