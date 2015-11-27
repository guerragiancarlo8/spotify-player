window.onload = function(){//index.js goes here
	var id
	var htmlElement = document.getElementById('container')

	function printTime(){

		var current = $('audio').prop('currentTime')
		console.debug('Current time: ' + current);
	}

	function fill_modal(information){

		//remove any images from any previous fill_modal()s
		$("li").remove()

		$.ajax({

			url: information['tracks']['items'][0]['artists'][0]['href'],
			success: function(response){

				console.log(response)
				$("#name").text(response['name'])

				
				//iterate through artist object's images array to display them in modal
				$("#images").append('<li> <img src='+"'"+response['images'][0]['url']+"'"+' style="width:200px; height:200px;"></li>')
				

				$("#popularity").text(response['popularity'])

			}

		})
	}

	var searchSong = function(query){

		$.ajax({

			url:'https://api.spotify.com/v1/search',
			data:{

				q:query,
				type:'track'
			},
			success:function(response){

				//console.log(response)
				//track name
				fill_modal(response)
				$('.title').text(response['tracks']['items'][0]['name'])
				//artist name
				$('.author').text(response['tracks']['items'][0]['artists'][0]['name'])
				//cover for album
				$('.cover img').attr("src",(response['tracks']['items'][0]['album']['images'][0]['url']))
				//preview_url
				$('audio').attr("src",(response['tracks']['items'][0]['preview_url']))
			}
		})
	}


	document.getElementById('search-form').addEventListener('submit',function(e){

		e.preventDefault();
		searchSong(document.getElementById('query').value);
	},false);

	//fill the modal with the initial artist when page loads
	searchSong($('.title').text())

	$('.btn-play').on('click',function(){

		if($('.btn-play').hasClass('disabled')){
			$('.btn-play').addClass('playing').removeClass('disabled')
			$('audio').trigger('play');
		}

		else if($('.btn-play').hasClass('playing')){
			$('.btn-play').addClass('disabled').removeClass('playing')
			$('audio').trigger('pause');
		}
	})

	$('audio').on('timeupdate',function(){

		$('progress').attr("value",$('audio').prop('currentTime'))

	})

	$('#display-artist').on('click',function(){

		$('.js-modal').modal("show");
	})

}

