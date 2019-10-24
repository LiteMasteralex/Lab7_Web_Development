console.log("Script has been loaded")

let init = function() {
	$.ajax({
		url: "/blog-posts", 
		method: "GET",
		dataType: "json",
		success: function(response) {
			console.log(response);
		},
		error: function(error) {
			console.log(error);
		}
	})
};

init();