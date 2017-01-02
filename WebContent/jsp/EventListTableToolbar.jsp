<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<div id="toolbar">
		<input id="addNum" class="easyui-numberspinner" style="width:80px;height:26px;" data-options="value:1,required:true,validType:'range[1,999]'">
		<button type="button" onclick="detailAdd()" class="listTableToolbarBtn">新增</button>
		<button type="button" onclick="detailDelete()" class="listTableToolbarBtn">删除</button>
		<button type="button" onclick="detailClear()" class="listTableToolbarBtn">清空</button>
		<button type="button" onclick="selectPig()" class="listTableToolbarBtn">选择猪只</button>
		<!-- <button type="button" onclick="importWinShow()" class="listTableToolbarBtn">导入</button> -->
</div>