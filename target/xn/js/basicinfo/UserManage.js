var title = '人员管理';
//var model = 'cdCode';
var editIndex = undefined;
var prUrl='/UserManage/';
var saveUrl=prUrl+'editUserEmployee.do'; //人员CU操作
var deleteUrl=prUrl+'deletesEmployee.do'; //人员删除
var searchMainListUrl=prUrl+'searchEmployeeToPage.do'; //人员分页查询
//查询按钮
var buttonList = getButtonByLimit({});
$(document).ready(function(){
	/**
	 * 主表加载
	 */
	$('#table').datagrid(
			j_grid({
				toolbarList:buttonList,
				url:searchMainListUrl,
				columnFields:'rowId,deletedFlag,employeeCode,employeeName,sex,birthday,nationality,employeeTypeName,postName,entryDate',
				columnTitles:'ID,deletedFlag,工号,姓名,性别,出生日期,民族,人员类型,岗位,入职日期',
				hiddenFields:'rowId,deletedFlag',
				but:function(val,row,index){
					var btn = '<a class="editcls" onclick="updatePas('+index+')" href="javascript:void(0)">用户管理</a>';  
	                return btn;  
				},
				btnName:'用户管理',
				onDblClickRowFun:function(index,row){
					$('#editWin').window({
						title:'查看'+ title
					});
					$('#editWin').window('open');
					$('#editForm').form('load',row);
					$('#btnSave').css('display','none');
					var listTable = document.getElementById('listTable');
					if(listTable!=null){
						var rowId = row.rowId;
						$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+rowId);
					}
					
					// 隐藏添加用户功能
					$("#userManage").css('display','none');
					$("#userName").textbox('disable');
					$("#roleId").combobox('disable');
					$("#moduleId").combobox('disable');
				}
			})
	);
	
	xnCdCombobox({
		id:'cardType',
		typeCode:'CARD_TYPE'
	});
	xnCdCombobox({
		id:'marryCd',
		typeCode:'MARRY_CD'
	});
	
	xnCdCombobox({
		id:'employeeType',
		typeCode:'EMPLOYEE_TYPE'
	});
	
	/*$('#deptIdWin').window({
		title:"选择部门",
		collapsible:false,
		minimizable:false,
		maximizable:false
	});*/
	
	$('#deptName').searchbox({
		searcher:function(value,name){		
			leftSilpFun('deptSearch');
			$('#treeTable').treegrid('reload');
			$('#treeTable').treegrid('unselectAll');
			//$('#deptIdWin').window('open');			
		}
		
	});
	$('#editForm').form({
		onLoadSuccess:function(data){
			postComBobox(data.deptId);
			$('#postId').combobox('setValue',data.postId);
			$('#userName').textbox('disable');
		}
	})
	
	initTreeData();
		
	xnRadioBox({
		id:'sex',
		name:'sex',
		typeCode:'SEX'
	});
	
	/*$('#updatePasWin').window({
		title:"修改密码",
		collapsible:false,
		minimizable:false,
		maximizable:true
	});*/
	
	var data = $('#employeeType').combobox('getData');
	var newData = [{
		codeName:"任意类型",
		codeValue:" ",
		isDefault:"Y",
		typeCode:"EMPLOYEE_TYPE"
	}];
	$.each(data,function(index,row){
		row.isDefault="N";
		newData.push(row);
	});
	var pms = {id:'employeeTypeForSearch'};
	jCdCombobox(pms,newData,newData[0].codeValue);
	
	xnCombobox({
		id:'roleId',
		url:'/RoleManage/searchRoleByFarmIdToList.do',
		textField:'roleName',
		valueField:'rowId',
		editable:false,
		multiple:true,
		required:true,
		onChange:function(newValue,oldValue){
			var allData = $(this).combobox('getData');
			var resultData = [];
			// 循环选中的数据
			for (var n = 1; n < newValue.length; n++) {
				// 循环全部的data寻找moduleId和moduleName
				for (var x = 0; x < allData.length; x++) {
					// 匹配插入到moduleId选择框
					if(allData[x].rowId == newValue[n]){
						var moduleId = allData[x].moduleId;
						// 排除已经在循环内的resultData中重复的moduleId
						// 跳出外部循环existFlag
						var existFlag = false;
						for(var z = 0; z < resultData.length; z++){
							if(resultData[z].id==moduleId){
								existFlag = true;
								break;
							}
						}
						if(existFlag){
							break;
						}
						
						resultData.push({
							"id":moduleId,
							"text":allData[x].moduleName
						});
						break;
					}
				}
			}
			
			$("#moduleId").combobox('loadData',resultData);
			$("#moduleId").combobox('clear');
			
			// 只有一条默认选择第一项
			if($("#moduleId").combobox('getData').length == 1){
				$("#moduleId").combobox('setValue',$("#moduleId").combobox('getData')[0].id);
			}
		}
	});
	addFocus('roleId','combobox','/RoleManage/searchRoleByFarmIdToList.do');
	xnCombobox({
		id:'roleIdUser',
		url:'/RoleManage/searchRoleByFarmIdToList.do',
		textField:'roleName',
		valueField:'rowId',
		editable:false,
		multiple:true,
		required:true,
		onChange:function(newValue,oldValue){
			var allData = $(this).combobox('getData');
			var resultData = [];
			// 循环选中的数据
			for (var n = 1; n < newValue.length; n++) {
				// 循环全部的data寻找moduleId和moduleName
				for (var x = 0; x < allData.length; x++) {
					// 匹配插入到moduleId选择框
					if(allData[x].rowId == newValue[n]){
						var moduleId = allData[x].moduleId;
						// 排除已经在循环内的resultData中重复的moduleId
						// 跳出外部循环existFlag
						var existFlag = false;
						for(var z = 0; z < resultData.length; z++){
							if(resultData[z].id==moduleId){
								existFlag = true;
								break;
							}
						}
						if(existFlag){
							break;
						}
						
						resultData.push({
							"id":moduleId,
							"text":allData[x].moduleName
						});
						break;
					}
				}
			}
			
			$("#moduleIdUser").combobox('loadData',resultData);
			$("#moduleIdUser").combobox('clear');
			
			// 只有一条默认选择第一项
			if($("#moduleIdUser").combobox('getData').length == 1){
				$("#moduleIdUser").combobox('setValue',$("#moduleIdUser").combobox('getData')[0].id);
			}
		}
	});
	addFocus('roleIdUser','combobox','/RoleManage/searchRoleByFarmIdToList.do');
});


function updatePas(index){
	var rows = $('#table').datagrid('getRows');
	/*$('#table').datagrid('selectRow',index);// 关键在这里  
    var row = $('#table').datagrid('getSelected'); */
	$('#table').datagrid('unselectAll');
	$("#userNameUser").textbox('enable');
	var row = rows[index];
    $('#updatePasForm').form('reset');
    if (row){
    	var response = jAjax.submit(prUrl+'saerchUserInfoByEmployeeId.do',{employeeId:row.rowId},null,function(){
    		return false;
    	});
    	if (response.length != 0) {
    			var data = response[0];
    			$('#updatePasForm').form('load',{
    				rowId:data.rowId
    			});
    			$('#employeeIdUser').val(row.rowId);
    			$('#userNameLabel').html(data.userName);
    			$("#userNameTextDiv").css('display','none');
    			$("#userNameLabelDiv").css('display','inline-block');
    			$('#roleIdUser').combobox('setValues',data.roleId);
    			$('#moduleIdUser').combobox('setValue',data.moduleId);
    			leftSilpFun('updatePassWord');
			} else {
			    $('#userRowId').val("");
			    $('#employeeIdUser').val(row.rowId);
			    $('#employeeName').val(row.employeeName);
			    $("#userNameLabelDiv").css('display','none');
			    $("#userNameTextDiv").css('display','inline-block');
				leftSilpFun('updatePassWord');
			}
    }  
}


function editUser(formId){
		var userRowId = $('#userRowId').val();
		if(userRowId != ""){
			$("#userNameUser").textbox('disable');
		}
		
		$('#'+formId).form('submit', {
			url : basicUrl+prUrl+'editUser.do',
			onSubmit : function() {
				var isValid = $('#' + formId).form('validate');
				if (!isValid) {
					$.messager.progress('close');
				}
				return isValid;
			},
			success : function(response) {
				response = eval('(' + response + ')');
				if (response.success) {
					$.messager.alert('提示','修改成功!');
					rightSlipFun('updatePassWord',390);
					//$('#updatePasWin').window('close');
					$('#updatePasForm').form('reset');
					$('#table').datagrid('reload');
				} else {
					$.messager.show({
						title : 'Error',
						msg : response.errorMsg
					});
				}
				$.messager.progress('close');
			}
		})
}

function initTreeData() {
	
	$('#treeTable').treegrid(
			j_treeGrid({
				url : '/OrganizationalStructure/searchDepTree.do',
			    columns:[[
			        {field:'text',title:'名称',width:600},
			        {field:'type',title:'类别',width:150},
			    ]],
			    width:'auto',
				height:'auto',
			    toolbar : '#treeTableToolbar',
				fit:false
			},function(){
				$('#treeTable').treegrid('collapseAll');
			})
	);
	
//	$('#treeTable').treegrid({
//		url : basicUrl + '/basicInfo/searchCompanyByFarmId.do',
//		idField : 'cid',
//		treeField : 'cname',
//		rownumbers : true,
//		parentField : 'pid',
//		border : false,
//		columns : [ [ {
//			field : 'cname',
//			title : '名称',
//			width : 200
//		}, {
//			field : 'type',
//			title : '类别',
//			width : 50
//		} ] ]
//	});
}

function onDeptId(){
	var node = $('#treeTable').treegrid('getSelected');

	if ((node.type != null) && node.type == '部门') {	
		//$('#deptIdWin').window('close');
		rightSlipFun('deptSearch',390);
		$('#deptName').searchbox('setValue',node.text);
		$('#deptId').val(node.deptId);
		$('#companyId').val(node.farmId);
		postComBobox(node.deptId);
	} else {
		$.messager.alert('警告','请选择部门！');
	}
}

function postComBobox(deptCId){
	$('#postId').combobox({
        valueField:'rowId', // 值字段
        textField:'duty', // 显示的字段
        url:basicUrl+'/OrganizationalStructure/searchByDeptId.do?deptId='+deptCId,
        panelHeight:'auto',
        editable:true// 不可编辑，只能选择
    });
	addFocus('postId','combobox');
}

function closeDept(){
	rightSlipFun('deptSearch',390);
	//$('#deptIdWin').window('close');
}

function onBtnAdd(){
	$('#editWin').window({title:'新增'+ title});
	$('#editWin').window('open');
	$('#editForm').form('reset');
	$('#postId').combobox('loadData',[]);
	//$('#postId').combobox("clear")
	$('#btnSave').css('display','inline-block');
	$('#employeeInfo')[0].className = 'arrowUp';
	$('#employeeInfo')[0].parentNode.nextElementSibling.style.display = 'block';
	// 添加成为用户所用操作
	$('#userManage').css('display','block');
	$("#userInfo").css('display','none');
	$("#userName").textbox('disable');
	$("#roleId").combobox('disable');
	$("#moduleId").combobox('disable');
	
}

/**
 * 编辑
 * pms{
 * 	model:模块代码
 * 	title:模块名称
 * }
 */
function onBtnEdit(){
	var record = $('#table').datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		$('#editWin').window({
			title:'编辑'+ title
		});
		$('#editWin').window('open');
		$('#editForm').form('load',record[0]);
		$('#btnSave').css('display','inline-block');
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
		
		// 隐藏添加用户功能
		$("#userManage").css('display','none');
		$("#userName").textbox('disable');
		$("#roleId").combobox('disable');
		$("#moduleId").combobox('disable');
	}
}

/**
 * 查看
 * pms{
 * 	model:模块代码
 * 	title:模块名称
 * }
 */
function onBtnView(){
	var record = $('#table').datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		$('#editWin').window({
			title:'查看'+ title
		});
		$('#editWin').window('open');
		$('#editForm').form('load',record[0]);
		$('#btnSave').css('display','none');
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
		
		// 隐藏添加用户功能
		$("#userManage").css('display','none');
		$("#userName").textbox('disable');
		$("#roleId").combobox('disable');
		$("#moduleId").combobox('disable');
	}
}

/**
 * 复制新增
 * pms{
 * 	model:模块代码
 * }
 */
function onBtnCopyAdd(){
	$('#editForm').form('reset');
	var record = $('#table').datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		$('#editWin').window({
			title:'复制新增'+ title
		});
		$('#editWin').window('open');
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
		record[0].rowId = "";
		$('#editForm').form('load',record[0]);
		$('#btnSave').css('display','inline-block');
		
		// 添加成为用户所用操作
		$('#userManage').css('display','block');
		$("#userInfo").css('display','none');
		$("#userName").textbox('disable');
		$("#roleId").combobox('disable');
		$("#moduleId").combobox('disable');
	}
}

/**
 * 是否添加成用户
 */
function upOrDownForUserInfo(para){
	if(para.checked){
		$('#userInfo').css('display','block');
		$("#userName").textbox('enable');
		$("#roleId").combobox('enable');
		$("#moduleId").combobox('enable');
	}else{
		$('#userInfo').css('display','none');
		$("#userName").textbox('disable');
		$("#roleId").combobox('disable');
		$("#moduleId").combobox('disable');
	}
}

function resetPassword(formId){
	var userRowId = $('#userRowId').val();
	if(userRowId == ""){
		$.messager.alert('提示','当前还不是用户，无法重置密码！');
		return false;
	}
	
	$('#'+formId).form('submit', {
		url : basicUrl+prUrl+'editUserResetPassword.do',
		onSubmit : function() {
			return true;
		},
		success : function(response) {
			response = eval('(' + response + ')');
			if (response.success) {
				$.messager.alert('提示','修改成功!密码重置为123456');
				rightSlipFun('updatePassWord',390);
				//$('#updatePasWin').window('close');
				$('#updatePasForm').form('reset');
				$('#table').datagrid('reload');
			} else {
				$.messager.show({
					title : 'Error',
					msg : response.errorMsg
				});
			}
			$.messager.progress('close');
		}
	})
}