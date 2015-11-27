window.onload = function(){//index.js goes here
	var id
	var htmlElement = document.getElementById('container')

	function printTime(){

		var current = $('audio').prop('currentTime')
		console.debug('Current time: ' + current);
	}

	var searchSong = function(query){

		$.ajax({

			url:'https://api.spotify.com/v1/search',
			data:{

				q:query,
				type:'track'
			},
			success:function(response){

				console.log(response)
				//track name
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

}

