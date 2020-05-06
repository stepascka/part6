var main = function (toDoObjects) {
	"use strict";

	var toDos = toDoObjects.map(function(toDo) {
		return toDo.description;
	});	

	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function () {
			var $element = $(element),
			$content;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				for (var i = toDos.length; i > -1; i--) {
					$content.append($("<li>").text(toDos[i]));
				}
				$("main .content").append($content);
			} 
			else if ($element.parent().is(":nth-child(2)")) {
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo));					
				});
				$("main .content").append($content);
			} 
			else if ($element.parent().is(":nth-child(3)")) {
					var tags = [];
					toDoObjects.forEach(function (toDo) {
						toDo.tags.forEach(function (tag) {
							if (tags.indexOf(tag) == -1) {
								tags.push(tag);
							}
						});
					});

					var tagObjects = tags.map(function (tag) {
						var toDosWithTag = [];
						toDoObjects.forEach(function (toDo) {
							if (toDo.tags.indexOf(tag) != -1) {
							toDosWithTag.push(toDo.description);
							}
						});
						return { "name": tag, "toDos": toDosWithTag };
					});

				tagObjects.forEach(function (tag) {
					var $tagName = $("<h3>").text(tag.name),
					$content = $("<ul>");
					tag.toDos.forEach(function (description) {
						var $li = $("<li>").text(description);
						$content.append($li);
					});
					$("main .content").append($tagName);
					$("main .content").append($content);
				});
			} 
			else if ($element.parent().is(":nth-child(4)")) {				
				var $inputLabel = $("<p>").text("Новая задача: ");
				$("main .content").append($inputLabel);
				var $input = $("<input>").addClass("description");
				$("main .content").append($input);				
				var $tagLabel = $("<p>").text("Тэги: ");
				$("main .content").append($tagLabel);
				var $tagInput = $("<input>").addClass("tags");
				$("main .content").append($tagInput);
				var $button = $("<button>").text("+");
				$("main .content").append($button);

				$button.on("click", function () {
					var description = $input.val();
					var tags = $tagInput.val().split(",");
				//add
					var newToDo = {"description":description, "tags":tags};

					$.post("todos", newToDo, function (result) {
						console.log("result");
						toDoObjects.push(newToDo);

						toDos = toDoObjects.map(function (toDo) {
							return toDo.description;
						});


						$input.val("");
						$tagInput.val("");
					});				
					
				});
			}
			else if ($element.parent().is(":nth-child(5)")) {
				var $inputLabel = $("<p>").text("Тэг: ");
				$("main .content").append($inputLabel);
				var $input = $("<input>").addClass("description");
				$("main .content").append($input);	
				var $button = $("<button>").text("Найти");
				$("main .content").append($button);
				$button.on("click", function () {
					var tag = $input.val();
					var displayPhoto = function(tag_, index_) {
						var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
									"tags=" + tag_ + "&format=json&jsoncallback=?";
						$.getJSON(url, function(flickrResponse) {
							var photo = flickrResponse.items[index_];
							var $img = $("<img>").attr("src", photo.media.m).hide();
							$(".photo").empty();				
							$(".photo").append($img);
							$img.fadeIn();
						});	
						setTimeout(function() {
							index_ ++;
							displayPhoto(tag, index_);
						}, 2000);	
					};	
					displayPhoto(tag, 0);
				});
			}

			//style
			$("li").css({
						"margin-top": "12px",
						"color": "blue",
						"font-weight": "bolder",
						"margin-left": "3%"
					});
			$("main .content, main .photo").css({
						"margin-top": "20px",
						"margin-left": "3%"
					});
			$("input").css({
						"margin-top": "7px",
						"margin-bottom": "10px"
					});
			$("button").css({
						"margin-left": "7px"
					});
			$("h3").css({
						"font-weight": "bolder",
						"margin-top": "10px"
					});
			return false;
		});
	});

	$(".tabs a:first-child span").trigger("click");

};


$(document).ready(function() {
	$.getJSON("todos.json", function(toDoObjects) {
		main(toDoObjects);
	});
});
//window.alert("hello, world!");
