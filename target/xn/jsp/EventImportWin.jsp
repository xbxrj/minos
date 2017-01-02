<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<div id="eventImport" class="rightSlipWin_390 z-index_10000">
	<div class="rightSlipTitle">
		<span class="arrow_right" onClick="rightSlipFun('eventImport',390,true)"></span><span>从excel中导入数据</span>
	</div>
	<div class="rightSlipContent">
		 <form id="importForm" method="post" enctype="multipart/form-data" class="form-inline">
			<div class="wd-com wd-1"></div>
			<div class="wd-com wd-22">
				<button type="button" onclick="downLoadEventTemplate(downTemplateParam)" class="downloadBtn">下载模板</button>
			</div>
			<br>
			<div class="wd-com wd-1"></div>
			<div class="wd-com wd-22">
				<input class="easyui-filebox" id="uploadFile" name="uploadFile" data-options="buttonText:'选择文件'" style="width:100%;height:35px;">
			</div>
		 </form>
	 </div>
	<div class="rightSlipFooter">
		<button type="button" onclick="onBtnImport(importParam)" class="rightSlipBtn blue">导入</button>
		<button type="button" onclick="onBtnReImport()" class="rightSlipBtn green">重置</button>
	</div>
</div>