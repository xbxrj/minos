<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" isErrorPage="true"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>出错了！</title>
</head>
<body>
	出错了！<br> 发生了以下的错误：<br>
	<hr>
	<font color=red>
		<hr> getMessage():
		<br> <%=exception.getMessage()%><br>
		<hr> getLocalizedMessage():
		<br> <%=exception.getLocalizedMessage()%><br>
		<hr> PrintStatckTrace():<br> 
		<br> 
	</font>
</body>