<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>门户</title>
	<link href="${base_url}/lib/jquery-easyui-1.4.5/themes/default/easyui.css?v=${webVersion}" rel="stylesheet">
	<link href="${base_url}/lib/jquery-easyui-1.4.5/themes/icon.css?v=${webVersion}" rel="stylesheet">
	<link href="${base_url}/css/reset.css?v=${webVersion}" rel="stylesheet">
    <link href="${base_url}/css/main.css?v=${webVersion}" rel="stylesheet">
</head>
<body style="min-width:1200px;min-height:600px;">
	<div style="display:none">
		<input type="text" id="finereportUrl" name="finereportUrl" value="${finereport_url}" />
		<input type="text" id="finereportUsername" name="finereportUsername" value="${finereport_username}" />
	</div>
	
	<div id="hideTabList" class="z-index_10000">
		<ul>
		</ul>
	</div>
   	<div class="header" id="header">
   		<div class="logo fl">
   		</div>
   		<div class="hompageBorder fl listSelected" onClick="backToHomePage()">
   			<div class="homePage"></div>
   		</div>
   		<div class="tabList fl">
   			<ul>
   			</ul>
   		</div>
   		<div id="tabMore" class="fr" onClick="showMoreTable()" style="display:none;">
			<span class="rightIcon"></span>
			<span id="hideTabNum"></span>
   		</div>
   	</div>
   	<div id="main">
   		<div id="main_left" class="fl">
   			<div class="personalMessage">
   				<img alt="个人中心" src="${base_url}/img/user.png?v=${webVersion}">
   				<div class="setting">
   				<ul>
   					<li data-liname="员工姓名"><span class="personName"></span></li>
   					<li data-liname="公司名称"><span class="companyName"></span></li>
   					<li data-liname="公司编码"><span class="companyCode"></span></li>
					<li data-liname="修改密码"><span class="changePassword"></span><a href="#" onclick="openPasswordWin()">修改密码</a></li>
   					<li data-liname="退出登录"><span class="exit"></span><a href="#" onclick="onBtnExit()">退出</a></li>
   				</ul>
   			</div>
   			</div>
   			<div class="shortcutMenuDiv">
   				<ul id="shortCutList">
   				</ul>
   				<ul>
   					<li onClick="openShortcutMenu()"><span class="addShortCut_span addMenu"></span></li>
   				</ul>
   			</div>
   			<div class="navMenu" onClick="menuListShow()">
   				<span class="nav"></span>
   			</div>
   			<div class="menuList">
				<div id="menuList_left" class="menuList_left fl">
				</div>
				<div id="menuList_right" class="menuList_right fl">
				</div>
			</div>
   		</div>
   		<div id="main_right" class="fl">
   			<div id="tabContent_homePage">
   			</div>
   		</div>
   	</div>
   	<!-- 添加快捷菜单 -->
   	<div id="shortCutWin" class="rightSlipWin_780">
		<div class="rightSlipTitle">
			<span class="arrow_right" onClick="closeShortCutWin()"></span><span>快捷菜单</span>
		</div>
		<div class="rightSlipContent">
			<div class="shortCutContent" id="shortCutContent">
   			</div>
		 </div>
		<div class="rightSlipFooter">
			<button type="button" onclick="saveShortCutMenu()" class="rightSlipBtn blue">保存</button>
			<button type="button" onclick="closeShortCutWin()" class="rightSlipBtn green">取消</button>
		</div>
	</div>
	<div id="changePassword" class="rightSlipWin_390">
		<div class="rightSlipTitle">
			<span class="arrow_right" onClick="closePasswordWin()"></span><span>修改密码</span>
		</div>
		<div class="rightSlipContent">
				<div class="login_message">
					<span style="color:red" id="errorMsg"></span>
				</div>
			 <form id="passwordForm" method="post" class="form-inline">
				<div class="wd-com wd-8"><label class="label">旧密码:</label></div>
				<div class="wd-com wd-15">
					<input class="easyui-textbox" id="oldPassword" name="oldPassword" data-options="prompt:'请输入旧密码',type:'password',required:true, " style="width:100%;height:35px">
				</div>
				<div class="wd-com wd-8"><label class="label">新密码:</label></div>
				<div class="wd-com wd-15">
					<input class="easyui-textbox" id="newPassword" name="newPassword" data-options="prompt:'请输入新密码',type:'password',required:true,validType:'passwordComplexity'" style="width:100%;height:35px">
				</div>
				<div class="wd-com wd-8"><label class="label">确认密码:</label></div>
				<div class="wd-com wd-15">
					<input class="easyui-textbox" id="surePassword" name="surePassword" data-options="prompt:'请输入确认密码',type:'password',required:true,validType:'passwordComplexity'" style="width:100%;height:35px">
				</div>
				<div class="rightSlipFooter">
					<button type="button" onclick="savePassword()" class="rightSlipBtn blue">保存</button>
					<button id="cancelPassword" type="button" onclick="closePasswordWin()" class="rightSlipBtn green">取消</button>
				</div>
			</form>
		 </div>

	</div>
</body>
	<script src="${base_url}/lib/jQuery/jquery-1.12.3.min.js?v=${webVersion}"></script>
	<script src="${base_url}/lib/jquery-easyui-1.4.5/jquery.easyui.min.js?v=${webVersion}"></script>
	<script src="${base_url}/lib/jquery-easyui-1.4.5/locale/easyui-lang-zh_CN.js?v=${webVersion}"></script>
	<script src="${base_url}/lib/json/json2.js?v=${webVersion}"></script>
	<script src="${base_url}/js/ValidateEntend.js?v=${webVersion}"></script>
	<script src="${base_url}/js/GetRootPath.js?v=${webVersion}"></script>
	<script src="${base_url}/js/JAjax.js?v=${webVersion}"></script>
    <script src="${base_url}/js/Main.js?v=${webVersion}"></script>
</html>