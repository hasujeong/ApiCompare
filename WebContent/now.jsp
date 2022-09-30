<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>벅스 API 비교 페이지</title>
<link href="css/bootstrap-5.2.0/bootstrap.css" rel="stylesheet">
<link href="css/custom.css" rel="stylesheet">

</head>
<body class="h-100">

	<div class="container-fluid h-100 fixed">
		<div class="h50"></div>
		<div id="top" class="wh-center h50 whiteBack">

			<div class="center">
				<select id="selectSearch" class="form-select header">
					<option value="lZjTO0HlFg91HwD">곡</option>
					<option value="vbmKja0BuYy35Ok">앨범</option>
					<option value="7S4pV1yEaFoWJsj">아티스트</option>
					<option value="58IHeEjp2lyoR4M">영상</option>
					<option value="7ZEz9GaqpMRc5DH">뮤직캐스트</option>
					<option value="6Jfys7XEvdQ0KuU">뮤직PD앨범</option>
					<option value="lZjTO0HlFg91HwD">가사</option>
					<option value="SVmCkyjdYM9n3go">뮤직포스트</option>
					<option value="0WleItZOyGJbrVF">클래식</option>
				</select> <input id="inputSearch" class="form-control header" />
				<button id="search" class="form-control header">검색</button>
			</div>
		</div>

		<div class="row h100-50px">
			<!-- 		<div class="row h-100"> -->
			<div class="col-6 w-center">
				<h6><b>운영 (http://public.cloudsearch.nhnent.com)</b></h6>
				<div id="itemBox">

				</div>
				<nav aria-label="Page navigation example">
					<ul class="pagination pagination-sm justify-content-center">
						<li class="page-item disabled"><a class="page-link">&lt;</a></li>
						<li class="page-item active"><a class="page-link" href="#">1</a></li>
						<li class="page-item"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">&gt;</a>
						</li>
					</ul>
				</nav>
			</div>

			<div class="col-6 w-center">
				<h6><b>개발 (http://alp-search.bugs.co.kr:9090)</b></h6>
				<div id="itemBox2">

				</div>
				<nav aria-label="Page navigation example">
					<ul class="pagination pagination-sm justify-content-center">
						<li class="page-item disabled"><a class="page-link">&lt;</a></li>
						<li class="page-item active"><a class="page-link" href="#">1</a></li>
						<li class="page-item"><a class="page-link" href="#">2</a></li>
						<li class="page-item"><a class="page-link" href="#">3</a></li>
						<li class="page-item"><a class="page-link" href="#">&gt;</a>
						</li>
					</ul>
				</nav>
			</div>	
		</div>
	</div>
	<!-- 	<script src="https://code.jquery.com/jquery-3.6.0.js"></script> -->
	<script src="js/jquery/jquery-3.6.0.js"></script>
	<%-- 	<script src="${pageContext.request.contextPath}/js/custom.js"> --%>
	<script src="js/custom.js"></script>

</body>
</html>