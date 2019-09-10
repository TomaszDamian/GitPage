var itemSearched;

$(document).ready(function(){
		$("button").click(function(){
			$("#Objects").html("");
		$("#Objects").append("<img src='https://media.giphy.com/media/u3ixOBgotIfMQ/giphy.gif'/>")
			$(".btn-danger").html("Search")
			input = $("input").val();
			if(input != ""){
				itemSearched = input
			}
			$("input").val("");
			$("#Objects").removeClass("center")
			$.ajax({
			  	url: "https://www.giantbomb.com/api/search/",
			  	type: "GET",
			  	data: {
			  		'api_key': "815b269b7f9d19b9e7746568dd04cac2d0241af5", 
			  		'query': itemSearched,
			  		'format': "jsonp",
			  		"field_list" : ["name","image","description"],
			  		'json_callback': "gamer"
			  	},
			  	//use thumb_url as the picture
			  	dataType: "jsonp",
			  	success: function(response) {		  		
			  	},
			  	error: function(xhr,status,error){
				}

			});
		});
	});
function gamer(response){
	$("#Objects").html("");
	if(response["number_of_total_results"] == 0 || response == [])
		{
			$("#Objects").append("<h1 style='text-align:center;'>The item you searched for doesn't exist in the GiantBomb API</h1>");
		};
	for (x in response["results"])
	{
		if (response["results"][x]["image"] == null || response["results"][x]["name"] == null)
		{

		}
		else{
			var $div = $("<div class='OneGame'></div>");
			$div.append("<h3><img class='image' src='" + response["results"][x]["image"]["thumb_url"] + "'/>" + response["results"][x]["name"] + "</h3>" + "<h1 class='GameID'>"+response["results"][x]["id"] + "</h1>");
			$("#Objects").append($div);
		};
	};
	$(".OneGame").click(function(){
		$(".btn-danger").html("Search/Back")
		$("#Objects").addClass("center");
		$(".ButtonBack").css("display","inline-block");
		var clicked = $(this).find("h1").text();
		for(y in response["results"])
			if(response["results"][y]["id"] == clicked)
			{
				$("#Objects").html("");
				//console.log(response["results"][y]);
				if (response["results"][y]["description"] == null || response["results"][y]["description"] == "")
				{
					$("#Objects").html("<h1>there is no description for this item </h1>")
				}
				else {
					$("#Objects").html(response["results"][y]["description"])
					return false;
				}
			}
		//console.log(response["results"][clicked]["description"])
		});
}
/*$(document).ready(function(){

});*/
	