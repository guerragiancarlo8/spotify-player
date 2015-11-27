window.onload = function(){//index.js goes here
	var id
	var htmlElement = document.getElementById('container')

	var searchSong = function(query){

		$.ajax({

			url:'https://api.spotify.com/v1/search',
			data:{

				q:query,
				type:'track'
			},
			success:function(response){

				//track name
				$('.title').text(response['tracks']['items'][0]['name'])
				//artist name
				$('.author').text(response['tracks']['items'][0]['artists'][0]['name'])
				//cover for album
				$('.cover img').attr("src",(response['tracks']['items'][0]['album']['images'][0]['url']))
			}
		})
	}


	document.getElementById('search-form').addEventListener('submit',function(e){

		e.preventDefault();
		searchSong(document.getElementById('query').value);
	},false);

}

/*

	var searchAlbum = function(query){

		$.ajax({

			url:'https://api.spotify.com/v1/search',
			data:{

				q: query,
				type:'album'
			},
			success: function(response){

				console.log(response)
			}
		})
	}
	var searchArtist = function(query){

		$.ajax({

			url:'https://api.spotify.com/v1/search',
			data: {

				q: query,
				type:'artist'
			},
			success: function(response){

				//remove elements from div
				while(htmlElement.firstChild){
					htmlElement.removeChild(htmlElement.firstChild)
				}
				
				//add name
				//var p = document.createElement("p")
				//$(p).attr("id",'#artist')
				var nombre = document.createTextNode(response.artists.items[0].name)
				$(".author").text(nombre)
				//var currdiv = document.getElementById("container")
				//currdiv.appendChild(p)

				//add the button to pull the albums
				
				var b = document.createElement("BUTTON")
				$(b).attr("class","btn btn-primary btn-lg")
				$(b).attr("id","#show-albums")
				
				b.addEventListener('click',function(e){

					searchAlbum(response.artists.items[0].name)

				})
				currdiv.appendChild(b)

				//add images
				var array = response.artists.items[0].images

				for(var a = 0; a<array.length; a++){
					console.log(array[a])
					var i = document.createElement("img")
					i.src = array[a]["url"]
					i.height = 200
					i.width = 200
					document.getElementById("container").appendChild(i)

				}

				

			}
		})
	}
	document.getElementById('search-form').addEventListener('submit',function(e){

		e.preventDefault();
		searchArtist(document.getElementById('query').value);
	},false);
};

*/