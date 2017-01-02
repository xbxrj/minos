<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"
 import="org.apache.shiro.SecurityUtils,xbp.core.shiro.MyPrincipal,org.apache.shiro.subject.Subject" %>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>模板</title>
    <link href="${base_url}/css/reset.css?v=${webVersion}" rel="stylesheet">
    <link href="${base_url}/css/login.css?v=${webVersion}" rel="stylesheet">
    <script src="${base_url}/js/GetRootPath.js?v=${webVersion}"></script>
    <script src="${base_url}/lib/jQuery/jquery-1.12.3.min.js?v=${webVersion}"></script>
    <script src="${base_url}/js/JAjax.js?v=${webVersion}"></script>
    <script src="${base_url}/lib/jquery-easyui-1.4.5/jquery.easyui.min.js?v=${webVersion}"></script>
	<script src="${base_url}/lib/jquery-easyui-1.4.5/locale/easyui-lang-zh_CN.js?v=${webVersion}"></script>
    <script type="text/javascript">
	    function upload(){
			var width = window.screen.width;
			var height = window.screen.height;
			document.getElementById("width_id").value = width;
			document.getElementById("height_id").value = height;
		    /* var username =document.getElementById("username").value;        
		    var password =document.getElementById("password").value;
		    var companyCode =document.getElementById("password").value;
		    $.ajax({    
			    url:"http://116.236.130.126:4380/WebReport/ReportServer?op=fs_load&cmd=sso",//单点登录的报表服务器    
			    dataType:"jsonp",//跨域采用jsonp方式    
			  	data:{"fr_username":username,"fr_password":password,"companyCode":companyCode},   
				jsonp:"callback"
			});      */    
	    }
		<%
			String username = "";
			String companycode = "";
			String password="";
	  		Subject subject = SecurityUtils.getSubject();
			if(subject!=null&& (subject.isRemembered()||subject.isAuthenticated())){
				MyPrincipal myPrincipal = (MyPrincipal)subject.getPrincipal();
				if(myPrincipal!=null){
				    username=myPrincipal.getUserName();
				    companycode=myPrincipal.getCompanyCode();
				}
			}
	    %>
	    if (window != top) 
		top.location.href = location.href; 
	    
	    function loginFormSubmit(){
	    	$('#loading').css('display','block');
			var width = window.screen.width;
			var height = window.screen.height;
			document.getElementById("width_id").value = width;
			document.getElementById("height_id").value = height;
	    	jAjax.submit('/login/login.do', $('#loginForm').serialize(), 
	    		function() {
					window.location.href="jsp/Main.jsp";
				},function (response){
					$('#loading').css('display','none');
					$("#message").text(response.errorMsg);
				},null,true); 
	    }
	    
	    document.onkeydown = function(e) {
	    	//判断按键为回车ENTER键  
		   	 if(event.keyCode == 13 || e.which == 13){
		   		loginFormSubmit();
		   	 }
	    }
	   	      
    </script>
  </head>
  
  <body>
  	<div id="loading">
		<div id="loading-center">
			<div id="loading-center-absolute">
				<div class="object" id="object_one"></div>
				<div class="object" id="object_two" style="left:20px;"></div>
				<div class="object" id="object_three" style="left:40px;"></div>
				<div class="object" id="object_four" style="left:60px;"></div>
				<div class="object" id="object_five" style="left:80px;"></div>
			</div>
		</div>
	</div>
	<div class="header">
		<div class="contain_header">
			<div class="logo fl"></div>
			<div class="link fr">
				<ul>
					<li class="xn_group" >
						<a href="http://www.xinnongfeed.com">新农集团</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
	<div class="main">
		<div class="contain_main">
			<div class="login_pic fl">
				<img alt="图片" src="${base_url}/img/xn_pic.png">
			</div>
			<div class="login_form fr">
				<div class="login_please">
					<span class="please">请登录</span>
				</div>
				<div class="login_message">
					<span id="message" style="color:red"></span>
				</div>
				<div class="login">
					<form  id="loginForm" >
						<div class="loginItem">
							<span class="inSpan company"></span>
							<input class="intext" type="text" name="companycode" placeholder="公司编码" value="<%=companycode%>">
						</div>
						<div class="loginItem mt_30">
							<span class="inSpan userName"></span>
							<input class="intext" type="text" id="username" name="username" placeholder="用户名" value='<%=username%>' >
						</div>
						<div class="loginItem mt_30">
							<span class="inSpan password"></span>
							<input class="intext" type="password" id="password" name="password" placeholder="密码" value='<%=password%>'>
						</div>
						<div class="remberItem">
							<input type="checkbox" name="isUseCookie" id="isUseCookie" checked="checked"/>
							<span style="font-size:16px;">七天内记住我的登录状态</span>
						</div>
							<input id = "width_id" type="hidden" name="width" value="" />
							<input id = "height_id" type="hidden" name="height" value="" />
						<button type="button" class="loginBtn" onclick="loginFormSubmit()">登录</button>
					</form>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<span class="footer_span">公司名称：</span><br>
		<span class="footer_span">联系电话：</span><br>
		<span class="footer_span">2013-2016 版权所有</span>
	</div>
  </body>
</html>