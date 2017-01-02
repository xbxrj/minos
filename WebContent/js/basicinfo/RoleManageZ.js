var title = '角色管理';
var editIndex = undefined;
var prUrl='/RoleManage/';
var saveUrl=prUrl+'editRole.do'; //角色CU操作
var deleteUrl=prUrl+'deletesRole.do'; //角色删除
var searchMainListUrl=prUrl+'searchRoleByFarmIdPage.do'; //角色分页查询
var searchDetailListUrl='/UserManage/searchEmpByRoleId.do';
//查询按钮
var buttonList = getButtonByLimit({});
$(document).ready(function(){
	
	//角色table
	$('#table').datagrid(
			j_grid({
				toolbarList:buttonList,
				url:searchMainListUrl,
				columnFields:'rowId,deletedFlag,businessCode,roleName,templateName,notes',
				columnTitles:'ID,deletedFlag,角色编码,角色名称,菜单模版,备注',
				hiddenFields:'rowId,deletedFlag',
				but:function(val,row,index){
					var btn = '<a class="editcls" onclick="setMenuLimit('+index+')" href="javascript:void(0)">设置权限</a>';  
	                return btn;  
				},
				btnName:'设置权限'
			})
	);
	//延时加载细表
	setTimeout(function () { 
		//角色类型
		xnCdCombobox({ 
			id:'roleType',
			typeCode:'ROLE_TYPE',
			readonly:true,
			onChange:onRoleTypeChange
		});
//		//菜单模板
//		xnCdCombobox({ 
//			id:'templateId',
//			typeCode:'TEMPLATE_TYPE',
//		},4);
		//菜单模板下拉框
		xnCombobox({
			id:"templateId",
			url:prUrl+'searchTemplateTypeForRole.do',
			valueField:"rowId",
			textField:"templateName",
			required:true,
		});
		
		$('#listTable').datagrid(
			j_grid_view({
				toolbarList:'#toolbar',
				pagination:false,
				columnFields:'rowId,deletedFlag,employeeCode,employeeName,sex,birthday,nationality,employeeTypeName,entryDate',
				columnTitles:'ID,deletedFlag,工号,姓名,性别,出生日期,民族,人员类型,入职日期',
				hiddenFields:'rowId,deletedFlag'
			},'listTable')
		);
		$('#EmpLoyeeTable').datagrid(
				j_grid_view({
					width:'auto',
					height:'auto',
					url:'/UserManage/searchEmployeeToList.do',
					columnFields:'rowId,employeeCode,employeeName,sex',
					columnTitles:'ID,工号,姓名,性别',
					hiddenFields:'rowId,deletedFlag',
					fit:false,
					pagination:false
				},'EmpLoyeeTable')
			)
	},500);
})
//角色类型改变方法
function onRoleTypeChange(newValue,oldValue){
	var data = jGetCdCode('TEMPLATE_TYPE',newValue);
	$('#templateId').combobox('loadData',data);
}
//选择人员方法
function personSelectFun(){
	leftSilpFun('personSelect');
	var row=$('#listTable').datagrid('getRows');
	$('#EmpLoyeeTable').datagrid('reload');
	$('#EmpLoyeeTable').datagrid({onLoadSuccess:function(data){
			var employeeRow = data.rows;
			for (var int = 0; int < row.length; int++) {
				if(row[int].rowId != null){
					for (var i = 0; i < employeeRow.length; i++) {
						if(employeeRow[i].rowId == row[int].rowId){
							$('#EmpLoyeeTable').datagrid('deleteRow',$('#EmpLoyeeTable').datagrid('getRowIndex',employeeRow[i]));
						}
					}
				}
			}
		}
	});
}
//选择人员确定
function onBtnPersonSure(){
	var row=$('#EmpLoyeeTable').datagrid('getChecked');
	for (var int = 0; int < row.length; int++) {
		$('#EmpLoyeeTable').datagrid('deleteRow',$('#EmpLoyeeTable').datagrid('getRowIndex',row[int]));
		if(row[int].rowId != null){
			row[int].operate='C';
			
			 $('#listTable').datagrid('appendRow',row[int]);
		}
	}
}
//listTable删除按钮
function detailEmpDelete(){	
	var row=$('#listTable').datagrid('getChecked');
	for (var int = 0; int < row.length; int++) {
		$('#listTable').datagrid('deleteRow',$('#listTable').datagrid('getRowIndex',row[int]));
		if(row[int].rowId != null){
			 row[int].operate='D';
			 $('#EmpLoyeeTable').datagrid('appendRow',row[int]);
		}
	}
}
onSetMenu = {
		onMenuWin:function(str){
			var nodes = $('#'+str).tree('getRoots');
			nodes=recursiveNodes(nodes);
			nodes=JSON.stringify(nodes);
			jAjax.submit(
				prUrl+'setLimit.do',
				{roleId:this.roleId,nodes:nodes},
				function(data){
					if(data.success){
						$.messager.alert('提示','保存成功！');							 
					}
				},
				null,	   
				'post' ,
				null,
				null,
				true
			);
			rightSlipFun('menuLimit',390);
		},
		roleId:null
}
//设置权限
function setMenuLimit(index){
	$('#table').datagrid('selectRow',index);// 关键在这里  
    var row = $('#table').datagrid('getSelected'); 

    if (row){
    	onSetMenu.roleId=row.rowId;
    	initMenuTreeData(row);   		
    	leftSilpFun('menuLimit');
    }
}
//初始化权限树
function initMenuTreeData(row){
	$('#MenuTree').tree({
		url : basicUrl + '/RoleManage/searchMenuView.do?farmId='+row.companyId+'&roleId='+row.rowId+'&templateId='+row.templateId,
		rownumbers : true,
		border : false,
		checkbox:true,
		cascadeCheck:false,
		onCheck:function(node,checked){
			if (checked) {
                var parentNode = $("#MenuTree").tree('getParent', node.target);
                if (parentNode != null) {
                    $("#MenuTree").tree('check', parentNode.target);
                }
            } else {
                var childNode = $("#MenuTree").tree('getChildren', node.target);
                if (childNode.length > 0) {
                    for (var i = 0; i < childNode.length; i++) {
                        $("#MenuTree").tree('uncheck', childNode[i].target);
                    }
                }
            }   				   			 			
		}
	})
}
function recursiveNodes(root){
	var nodes=new Array();
	for (var i = 0; i < root.length; i++) {
		
		if(root[i].children != null ){
			
			var children = recursiveNodes(root[i].children);
			for (var j = 0; j < children.length; j++) {
				nodes.push(children[j]);
			}
		}
		root[i].children=null;
		root[i].target=null;
		nodes.push(root[i]);
	}
	
	return nodes;
}