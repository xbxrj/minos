<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<jsp:include page="/jsp/Head.jsp" />
	<script src="${base_url}/js/basicinfo/CdMaterial.js?v=${param.randomnumber}"></script>
	<style>
	.form-col-4>ul {
	margin-right: -0.14rem
	}

.form-col-4>ul>li {
	width: 24%;
	float: left;
	padding-right: .14rem;
	box-sizing: border-box
}

.form-col-4>ul>li:nth-child(4n) {
	float: none;
	width: auto;
	overflow: hidden
}

.form-col-4>ul>li:nth-child(4n+1) {
	clear: both
}
	.form-col-3>ul {
		margin-right: -0.14rem
	}
	
	.form-col-3>ul>li {
		width: 33%;
		float: left;
		padding-right: .14rem;
		box-sizing: border-box
	}
	
/* 	.form-col-3>ul>li:nth-child(3n) {
		float: none;
		width: auto;
		overflow: hidden
	}
	
	.form-col-3>ul>li:nth-child(3n+1) {
		clear: both
	} */
	
	
/* 	.form-col-2>ul {
		margin-right: -0.14rem
	} */
	
	.form-col-2>ul>li {
		width: 50%;
		float: left;
	/* 	padding-right: .14rem; */
		box-sizing: border-box
	}
	 .form-col-2>ul>li:nth-child(2n) {
		float: none;
		width: auto;
		overflow: hidden
	}
	
	.form-col-2>ul>li:nth-child(2n+1) {
		clear: both
	} 

	 .label {
			/* float: left; */
			/* display: inline-block;
			cursor: default;
			box-sizing: border-box; */
			height: .4rem;
			line-height: .4rem;
			padding: 0 .14rem;
		}
	ul>li>.label {
		width: 20px
	}
	.li {
		list-style-type:none;
	} 
	</style>
</head>
<body>
	<form id="editFormTest"  class="form-col-3" method="post">
	<ul>
			<li class="li" >
				<span class="label">物料代码cdcdcd1：</span>
				<span class="e_input"><span>
					<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'">
				</span>	
			</li>
			
			<li class="li" style="display:none">
				<span class="label">物料代码2：</span>
				<span class="e_input"><span>
					<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
				</span>	
			</li>
			<li class="li" >
				<span class="label">物料代码3：</span>
				<span class="e_input"><span>
					<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
				</span>	
			</li>
			<li class="li" >
				<span class="label">物料代码4：</span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</li>
			<li class="li" >
			<span class="label">物料代码5：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		
		<li class="li">
			<span class="label">物料代码6：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		<li class="li" >
			<span class="label">物料代码7：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		<li class="li" >
			<span class="label">物料代码8：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		<li class="li" >
			<span class="label">物料代码9：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		
		<li class="li" style="display:none">
			<span class="label">物料代码11：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		<li class="li" >
			<span class="label">物料代码12：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		<li class="li" >
			<span class="label">物料代码13：</span>
			<span class="e_input"><span>
				<input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px">
			</span>	
		</li>
		</ul>
	</form>
	<table id="table"></table>
	<div id="tableToolbar">
			<span>物料类型：</span><input id="showMaterialType" />
 			<a class="easyui-linkbutton" data-options="iconCls:'icon-add'"  plain="true" onclick="onBtnAdd() ">新增</a>
 			<a class="easyui-linkbutton" data-options="iconCls:'icon-edit'"  plain="true" onclick="onBtnEdit()">编辑</a>
 			<a class="easyui-linkbutton" data-options="iconCls:'icon-edit'"  plain="true" onclick="onBtnView()">查看</a>
 			<a class="easyui-linkbutton" data-options="iconCls:'icon-remove'"  plain="true" onclick="onBtnDelete()">删除</a>
 			<a class="easyui-linkbutton" data-options="iconCls:'icon-cut'"  plain="true" onclick="onBtnCopyAdd()">复制新增</a>
	</div>
	<div id="editWin" class="easyui-window windowStyle" data-options="inline:true,left:'0px',top:'0px',closed:true,fit:true,footer:'#dlg-buttons'">
		<form id="editForm" method="post">
				<div style="display:none">
					<input class="easyui-textbox" name="rowId" id="rowId" value="0"/>
					<input class="easyui-textbox" name="materialId" id="materialId" value="0"/>
				</div>
				
				<table class="formTable">
					<colgroup width="11.11%"></colgroup>
					<colgroup width="22.22%"></colgroup>
					<colgroup width="11.11%"></colgroup>
					<colgroup width="22.22%"></colgroup>
					<colgroup width="11.11%"></colgroup>
					<colgroup width="22.22%"></colgroup>
					<tr>
						<td>物料代码:</td>
						<td><input class="easyui-textbox" name="businessCode" data-options="prompt:'请输入物料代码'" style="width:100%;height:32px"></td>
						<td>物料名称:</td>
						<td><input class="easyui-textbox" name="materialName" data-options="prompt:'请输入物料名称',required:true" style="width:100%;height:32px"></td>
						<td>物料类型:</td>
						<td><input id="materialType" name="materialType" style="width:100%;height:32px"></td>
					</tr>
					<tr>
						<td>物料组名称:</td>
						<td><input id="groupId" name="groupId" style="width:100%;height:32px"></td>
						<td>物料来源:</td>
						<td><input class="easyui-textbox" name="materialSource" data-options="prompt:'请输入物料来源'" style="width:100%;height:32px"></td>
						<td>单位:</td>
						<td><input class="easyui-textbox" name="unit" data-options="prompt:'请输入单位',required:true" style="width:100%;height:32px"></td>
					</tr>
					<tr>
						<td>仓库物料:</td>
						<td><div id="isWarehouse"></div></td>
						<td>采购物料:</td>
						<td><div id="isPurchase"></div></td>
						<td>销售物料:</td>
						<td><div id="isSell"></div></td>
					</tr>
				</table>
				<div id="include">
				</div>
			</form>
	</div>
	<jsp:include page="/jsp/WinFooter.jsp" />
</body>
</html>
