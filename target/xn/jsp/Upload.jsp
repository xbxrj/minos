<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>  
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/jsp/Head.jsp" />
	<script src="${base_url}/js/Upload.js?v=${webVersion}"></script>
</head>
<body>
	<h2>上传</h2>
	<div style="margin:20px 0;"></div>
	
	<div class="easyui-panel" title="Upload File" style="width:400px;padding:30px 70px 50px 70px">
	
		<form id="uploadForm" enctype="multipart/form-data" method="post">  
			<div style="margin-bottom:20px">
				<div>上传模板:</div>
				<p>width: 50%</p>
				<input class="easyui-filebox" name="fileId" data-options="prompt:'上传'" style="width:100%">
			</div>
			
			<button type="submit" class="easyui-linkbutton" onclick="uploadData()">上传</button>
			<!-- <a class="easyui-linkbutton" style="width:80px" onclick="uploadData()">上传</a>  -->
			<!-- <div>
			
				<a href="#" class="easyui-linkbutton" style="width:100%">Upload</a>
			</div> -->
		</form>
	</div>
	
<!-- 	<table class="easyui-datagrid" title="上传文件列表" style="width:700px;height:250px" 
			data-options="singleSelect:true,collapsible:true',method:'get'">
		<thead>
			<tr>
				<th data-options="field:'id',width:80">ID</th>
				<th data-options="field:'name',width:100">名字</th>
			</tr>
		</thead>
	</table> -->
	
</body>
</html>
