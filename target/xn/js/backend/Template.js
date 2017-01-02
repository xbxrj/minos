var title = '菜单建模';
var model = 'template';
var editIndex = undefined;
var prUrl='/backEnd/';
var saveUrl=prUrl+'editTemplate.do';
var deleteUrl=prUrl+'deleteTemplate.do';
var searchMainListUrl=prUrl+'searchCdTemplateToPage.do';
var searchDetailListUrl=prUrl+'searchCdModuelToPage.do';
/** *********页面渲染开始*************************************************************************/
//查询按钮
var buttonList = getButtonByLimit({});

$(document).ready(function(){
	/**
	 * 主表加载
	 */
	$('#table').datagrid(
			j_grid({
				url:searchMainListUrl,
				toolbarList:buttonList,
				columnFields:'rowId,deletedFlag,templateName,notes,moduleId',
				columnTitles:'ID,deletedFlag,模板名称,备注,主页ID',
				hiddenFields:'rowId,deletedFlag,moduleId'
			})
	);
	//延时加载细表
	setTimeout(function () { 
		//隐藏备注
		upOrDown(document.getElementById('notes'));
		/**
		 * 树形表格加载
		 */
		
		$('#treeTable').treegrid(
			j_treeGrid({
			    columns:[[
			        {field:'text',title:'模块名称',width:100},
			    ]]
			})
			);

		/**
		 * 明细列表加载
		 */
		$('#listTable').datagrid({
			width:'100%',
			height:'100%',
			fitColumns:true,
			rownumbers:true,
			toolbar:[{
				iconCls: 'icon-add',
				text:'新增至根节点',
				handler: addToRoot
			},{
				iconCls: 'icon-add',
				text:'新增至子节点',
				handler:addToChildNode
			}],
			rowStyler : function(index, row) {
				if ((index + 1) % 2 == 0) {
					return 'background-color:#f7f7f7;';
				}
			},
			columns:[[
			        {field:'ck',checkbox:true},
			        {field:'moduleName',title:'模块名称',width:100}
			    ]]
		});
		/**
		 * 封装控件调用方法
		 */
		//角色类型
		xnCdCombobox({ 
			id:'roleType',
			typeCode:'ROLE_TYPE',
			editable:false,
			required:true,
		});
		//点击事件
		xnCombobox({ 
			id:'moduleId',
			valueField:'moduleId',
			textField:'moduleName',
			url:'/backEnd/searchModuleToList.do',
			required:true,
			editable:false
		});
    },500);
});

/*************页面渲染结束******************************************************************************/

/********************页面特殊方法开始***************************************************************************/
function removeNode(){
	var row = $('#treeTable').treegrid('getSelected');
	if(row == null){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除'+row.text+'吗？', function(r){
			if (r){
				$('#treeTable').treegrid('remove',row.id);
				var data = $('#treeTable').treegrid('getData');
				treeTraverseDeleteData(data,row);
				var treeData = {
						success:true,
						total:data.length,
						rows:data
				};
				$('#treeTable').treegrid('loadData',treeData);
				var ids = [];
				treeTraverse(data,ids);
				$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
			}
		});
	}
}
/**
 * 新增
 */
function onBtnAdd(){
	$('#editWin').window({
		title:'新增'+ title
	});
	$('#editWin').window('open');
	$('#editForm').form('reset');
	$('#btnSave').css('display','inline-block');
	
	var treeTable = document.getElementById('treeTable');
	if(treeTable!=null){
		$('#treeTable').treegrid('loadData', {success:true,total: 0, rows: [] });
	}

	var listTable = document.getElementById('listTable');
	if(listTable!=null){
		var ids = [];
		$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
	}
}
/**
 * 编辑
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
		var ids = [];
		var treeTable = document.getElementById('treeTable');
		if(treeTable!=null){
			$.ajax({  
		        url : basicUrl+'/backEnd/searchModuleByTemplateId.do?templateId='+record[0].rowId, 
		        async : false, 
		        type : "POST",  
		        dataType : "json",  
		        success : function(data) {  
		        	$('#treeTable').treegrid('loadData',data);
					treeTraverse(data.rows,ids);
		        }  
		    });  
		}
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
		}
	}
}
/**
 * 查看
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
		var ids = [];
		var treeTable = document.getElementById('treeTable');
		if(treeTable!=null){
			$.ajax({  
		        url : basicUrl+'/backEnd/searchModuleByTemplateId.do?templateId='+record[0].rowId, 
		        async : false, 
		        type : "POST",  
		        dataType : "json",  
		        success : function(data) {  
		        	$('#treeTable').treegrid('loadData',data);
					treeTraverse(data.rows,ids);
		        }  
		    });  
		}
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
		}
	}
}
/**
 * 双击查看
 * @param index
 * @param row
 */
function onDblClickRow(index,row){
	$('#editWin').window({
		title:'查看'+ title
	});
	$('#editWin').window('open');
	$('#editForm').form('load',row);
	$('#btnSave').css('display','none');
	var ids = [];
	var treeTable = document.getElementById('treeTable');
	if(treeTable!=null){
		$.ajax({  
	        url : basicUrl+'/backEnd/searchModuleByTemplateId.do?templateId='+row.rowId, 
	        async : false, 
	        type : "POST",  
	        dataType : "json",  
	        success : function(data) {  
	        	$('#treeTable').treegrid('loadData',data);
				treeTraverse(data.rows,ids);
	        }  
	    });  
	}
	var listTable = document.getElementById('listTable');
	if(listTable!=null){
		$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
	}
}
/**
 * 复制新增
 */
function onBtnCopyAdd(){
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
		var ids = [];
		var treeTable = document.getElementById('treeTable');
		if(treeTable!=null){
			$.ajax({  
		        url : basicUrl+'/backEnd/searchModuleByTemplateId.do?templateId='+record[0].rowId, 
		        async : false, 
		        type : "POST",  
		        dataType : "json",  
		        success : function(data) {  
		        	$('#treeTable').treegrid('loadData',data);
					treeTraverse(data.rows,ids);
		        }  
		    });  
		}
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
		}
		record[0].rowId = 0;
		$('#editForm').form('load',record[0]);
		$('#btnSave').css('display','inline-block');
	}
}
/**
 * 保存
 */
function onBtnSave(){
	var treeTable = $('#treeTable');
	var nodes = treeTable.treegrid('getData');
	var data = [];
	treeTraverseGetData(nodes,data);	
	var jsonString = JSON.stringify(data);
	var queryParams = {
		status:1,
		deletedFlag:0,
		treeList:jsonString
	};
	$.messager.progress();	
	$('#editForm').form('submit',{
		url:basicUrl+saveUrl,
		queryParams:queryParams,
		onSubmit: function(){
			var isValid = $('#editForm').form('validate');
			if (!isValid){
				$.messager.progress('close');	
			}
			return isValid;
		},
		success: function(response){
			response=eval('('+response+')');
			if(response.success){
				$('#editWin').window('close');
				$('#table').datagrid('reload');
			}else{
				 $.messager.alert({
                     title: '错误',
                     msg: response.errorMsg
                 });
			}
			$.messager.progress('close');
		}
	});
}
/**
 * 新增至根节点
 */
function addToRoot(){
	var rows = $('#listTable').treegrid('getSelections');
	if(rows.length == 0){
		$.messager.alert('警告','请选择至少一条数据！');
	}else{
		$.each(rows,function(index,data){
			$('#treeTable').treegrid('append',{
				parent:0, 
				data: [{
					id: data.rowId,
					text: data.moduleName,
					parentId:1,
					leaveNum:1
				}]
			});
		})
		var data = $('#treeTable').treegrid('getData');
		var ids = [];
		treeTraverse(data,ids);
		$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
	}
}
/**
 * 新增至子节点
 */
function addToChildNode(){
	var node = $('#treeTable').treegrid('getSelected');
	var rows = $('#listTable').treegrid('getSelections');
	if(node == null){
		$.messager.alert('警告','请选择一个父节点！');
	}else if(rows.length == 0){
		$.messager.alert('警告','请选择至少一条数据！');
	}else{
		$.each(rows,function(index,data){
			$('#treeTable').treegrid('append',{
				parent:node.id, 
				data: [{
					id: data.rowId,
					text: data.moduleName,
					parentId:node.id,
					leaveNum:node.leaveNum + 1
				}]
			});
		});
		var data = $('#treeTable').treegrid('getData');
		var ids = [];
		treeTraverse(data,ids);
		$('#listTable').datagrid('load',basicUrl+'/backEnd/searchModuleExcludeById.do?ids[]='+ids);
	}
}
/**
 * 递归遍历树形结构获取Id
 * @param node
 */
function treeTraverse(nodes,ids){
	$.each(nodes,function(index,node){
		ids.push(node.id);
		if(node.children != null){
			treeTraverse(node.children,ids);
		}
	});
}
/**
 * 递归遍历树形结构获取数据
 * @param node
 */
function treeTraverseGetData(nodes,data){
	$.each(nodes,function(index,node){
		var newData = {};
		newData.parentId = node.parentId;
		newData.id = node.id;
		newData.leaveNum = node.leaveNum;
		data.push(newData);
		if(node.children != null){
			treeTraverseGetData(node.children,data);
		}
	});
}
/**
 * 递归删除选择的数据
 * @param data
 * @param row
 */
function treeTraverseDeleteData(data,row){
	$.each(data,function(i,item){
		if(item.id == row.id){
			data.splice(i,1);
			return false;
		}else{
			if(item.children != null){
				treeTraverseDeleteData(item.children,row)
			}
		}
	});
}
/********************页面特殊方法结束***************************************************************************/