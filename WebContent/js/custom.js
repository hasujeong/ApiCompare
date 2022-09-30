$(document).ready(function() {
	$('#inputSearch').focus();
});


$('#inputSearch').keypress(function(e) {

	if (e.keyCode === 13) {
		//테스트할 alert
		search();
	}

});

$("#search").on("click", search);

function search() {
	let id = $('#selectSearch').val();
	let value = $('#inputSearch').val();
	selectSearch(id, value);
	selectSearch2(id, value);
}

//운영
function selectSearch(id, value) {
	let returns = "_ID";
	
	if(id == "lZjTO0HlFg91HwD") {				// 곡
		returns = "_ID,TRACK_TITLE,ARTIST_NM,ALBUM_TITLE,POPULAR,RELEASE_YMD,MASTER_STR_RIGHTS_YN,ALBUM_ID";
	} else if(id == "vbmKja0BuYy35Ok") {				// 앨범
		returns = "_ID,TITLE,ARTIST_NM,ALBUM_TP,RELEASE_YMD,RELEASE_LOCAL_YMD,POPULAR,PUBLIC_STR_YN";
	}
	
	var param = {
		url : "http://public.cloudsearch.nhnent.com/" + id 
			+ "/v1/search/advanced.search?q=" + value 
			+ "&size=20"
			+ "&start=1"
			+ "&return=" + returns
	}

	$.ajax({
		//url : "http://public.cloudsearch.nhnent.com/lZjTO0HlFg91HwD/v1/search/advanced.search?q=%EC%95%84%EC%9D%B4%EC%9C%A0&size=10&start=1&return=_ID,TRACK_TITLE,ARTIST_NM,ALBUM_TITLE,SCORE,RELEASE_YMD,MASTER_STR_RIGHTS_YN,ALBUM_ID",
		url: "api_call.jsp",
		type: "POST",
		data: param,
		//			dataType: "jsonp",
		success: function(result) {
			if (result) {
				setItem(result, id);
			} else {
				alert("불러오기 실패");
			}
		},
		error: function(error) {
			console.log('에러', error);
		}
	});

}

//개발
function selectSearch2(id, value) {
	let returns = "_ID";
	
	if(id == "lZjTO0HlFg91HwD") {				// 곡
		returns = "_ID,track_title,artist_nm,album_title,score,release_ymd,master_str_rights_yn,album_id";
	} else if(value == "vbmKja0BuYy35Ok") {				// 앨범
		returns = "_ID,title,artist_nm,album_tp,release_ymd,release_local_ymd,score,public_str_yn";
	}
	
	var param = {
		url : "http://alp-search.bugs.co.kr:9090/" + id 
			+ "/v1/search/advanced.search?q=" + value 
			+ "&size=20"
			+ "&start=1"
			+ "&return="  + returns
	}
	
	$.ajax({
		url: "api_call.jsp",
		type: "POST",
		data: param,
		//			dataType: "jsonp",
		success: function(result) {
			if (result) {
				setItem2(result, id);
			} else {
				alert("불러오기 실패");
			}
		},
		error: function(error) {
			console.log('에러', error);
		}
	});

}

// 운영서버
function setItem(result, value) {
	result = JSON.parse(result);
	let item = result.message.result.itemList.item;
	let str = [];
	let ii = 0;
	$("#itemBox").html("");

	for (let i = 0; i < item.length; i++) {
		let rank = item[i].rank;
		let id_idx = item[i]._ID;
		
		if(value == "lZjTO0HlFg91HwD") {				// 곡
			let trackTitle = item[i].TRACK_TITLE;
			let artistNm = item[i].ARTIST_NM;
			let albumTitle = item[i].ALBUM_TITLE;
			let score = item[i].POPULAR;
			let releaseYmd = item[i].RELEASE_YMD;
			let masterStrRightsYn = item[i].MASTER_STR_RIGHTS_YN;
			let albumId = item[i].ALBUM_ID;
			
			str[ii++] =
				'<div class="card center w800 m-2"><div class="row">'
				+ '<div class="col-3"><div class="p-2">'
				+ '<img src="https://image.bugsm.co.kr/album/images/140/' + division(albumId) + '/' + albumId + '.jpg" class="img-fluid">'
				+ '</div></div>'
				+ '<div class="col-9"><div class="card-body"><h5 class="card-title">'
				+ rank
				+ '</h5>'
				+ '<div>곡 ID : ' + id_idx + '</div>'
				+ '<div>곡명 : ' + trackTitle + '</div>'
				+ '<div>아티스트명: ' + artistNm + '</div>'
				+ '<div>앨범명 : ' + albumTitle + '</div>'
				+ '<div>발매일 : ' + releaseYmd + '</div>'
				+ '<div>스트리밍 권리 : ' + masterStrRightsYn + '</div>'
				+ '<div>인기도 점수 : ' + score + '</div>'
				+ '</div></div></div></div>';
			
		} else if(value == "vbmKja0BuYy35Ok") {				// 앨범
			let albumTitle = item[i].TITLE;
			let artistNm = item[i].ARTIST_NM;
			let albumTp = item[i].ALBUM_TP;
			let publicStrYn = item[i].PUBLIC_STR_YN;
			let releaseYmd = item[i].RELEASE_YMD;
			let releaseLocalYmd = item[i].RELEASE_LOCAL_YMD;
			let score = item[i].POPULAR;

			str[ii++] =
				'<div class="card center w800 m-2"><div class="row">'
				+ '<div class="col-3"><div class="p-2">'
				+ '<img src="https://image.bugsm.co.kr/album/images/140/' + division(id_idx) + '/' + id_idx + '.jpg" class="img-fluid">'
				+ '</div></div>'
				+ '<div class="col-9"><div class="card-body"><h5 class="card-title">'
				+ rank
				+ '</h5>'
				+ '<div>앨범 ID : ' + id_idx + '</div>'
				+ '<div>앨범명 : ' + albumTitle + '</div>'
				+ '<div>아티스트명: ' + artistNm + '</div>'
				+ '<div>국내 발매일 : ' + releaseLocalYmd + '</div>'
				+ '<div>원발매일 : ' + releaseYmd + '</div>'
				+ '<div>앨범 타입: ' + albumTp + '</div>'
				+ '<div>스트리밍 권리 : ' + publicStrYn + '</div>'
				+ '<div>인기도 점수 : ' + score + '</div>'
				+ '</div></div></div></div>';
		}

	}
	$('#itemBox').append(str.join(''))

}

// DQ개발서버
function setItem2(result, value) {
	result = JSON.parse(result);
	let item = result.result.itemList.item;
	let str = [];
	let ii = 0;
	$("#itemBox2").html("");

	for (let i = 0; i < item.length; i++) {

		let rank = item[i].rank;
		let id_idx = item[i]._ID
		
		if(value == "lZjTO0HlFg91HwD") {				// 곡
			let albumId = item[i].source.album_id;
			let albumTitle = item[i].source.album_title;
			let artistNm = item[i].source.artist_nm;
			let masterStrRightsYn = item[i].source.master_str_rights_yn;
			let releaseYmd = item[i].source.release_ymd;
			let trackTitle = item[i].source.track_title;
			let score = item[i].source.score;

			str[ii++] =
				'<div class="card center w800 m-2"><div class="row">'
				+ '<div class="col-3"><div class="p-2">'
				+ '<img src="https://image.bugsm.co.kr/album/images/140/' + division(albumId) + '/' + albumId + '.jpg" class="img-fluid">'
				+ '</div></div>'
				+ '<div class="col-9"><div class="card-body"><h5 class="card-title">'
				+ rank
				+ '</h5>'
				+ '<div>곡 ID : ' + id_idx + '</div>'
				+ '<div>곡명 : ' + trackTitle + '</div>'
				+ '<div>아티스트명: ' + artistNm + '</div>'
				+ '<div>앨범명 : ' + albumTitle + '</div>'
				+ '<div>발매일 : ' + releaseYmd + '</div>'
				+ '<div>스트리밍 권리 : ' + masterStrRightsYn + '</div>'
				+ '<div>인기도 점수 : ' + score + '</div>'
				+ '</div></div></div></div>';
			
		} else if(value == "vbmKja0BuYy35Ok") {				// 앨범
			let albumTitle = item[i].source.title;
			let artistNm = item[i].source.artist_nm;
			let albumTp = item[i].source.album_tp;
			let publicStrYn = item[i].source.public_str_yn;
			let releaseYmd = item[i].source.release_ymd;
			let releaseLocalYmd = item[i].source.release_local_ymd;
			let score = item[i].source.score;
console.log(albumTitle);
			str[ii++] =
				'<div class="card center w800 m-2"><div class="row">'
				+ '<div class="col-3"><div class="p-2">'
				+ '<img src="https://image.bugsm.co.kr/album/images/140/' + division(id_idx) + '/' + id_idx + '.jpg" class="img-fluid">'
				+ '</div></div>'
				+ '<div class="col-9"><div class="card-body"><h5 class="card-title">'
				+ rank
				+ '</h5>'
				+ '<div>앨범 ID : ' + id_idx + '</div>'
				+ '<div>앨범명 : ' + albumTitle + '</div>'
				+ '<div>아티스트명: ' + artistNm + '</div>'
				+ '<div>국내 발매일 : ' + releaseLocalYmd + '</div>'
				+ '<div>원발매일 : ' + releaseYmd + '</div>'
				+ '<div>앨범 타입: ' + albumTp + '</div>'
				+ '<div>스트리밍 권리 : ' + publicStrYn + '</div>'
				+ '<div>인기도 점수 : ' + score + '</div>'
				+ '</div></div></div></div>';
		}

	}
	$('#itemBox2').append(str.join(''))

}

function division(albumId) {
	let a = (Number(albumId) / 100).toString();
	let division = 0;

	if (a.indexOf('.') >= 0) {
		division = a.substring(0, a.indexOf('.'));
	} else {
		division = a
	}

	return division;
}