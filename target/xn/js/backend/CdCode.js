var title = 'cdCode设置';
var model = 'cdCode';
var editIndex = undefined;
var prUrl='/backEnd/';
var saveUrl=prUrl+'editCdCode.do';
var deleteUrl=prUrl+'deleteCdCode.do';
var searchMainListUrl=prUrl+'searchCdCodeTypeToPage.do';
var searchDetailListUrl=prUrl+'searchCdCodeDetailToList.do';
/** *********页面渲染开始*************************************************************************/
var detailDefaultValues = {
		status:'1',
		deletedFlag:'0',
		//设置默认值
		isDefault:'N'
};
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
				columnFields:'rowId,deletedFlag,typeCode,typeName,supName,codeValue,notes',
				columnTitles:'ID,deletedFlag,分类代码,分类名称,上级分类,明细数量,备注',
				hiddenFields:'rowId,deletedFlag,supName',
				rightColumnFields:'listQty'
			})
	);
	//延时加载细表
	setTimeout(function () { 
		/**
		 * 细表加载
		 */
		$('#listTable').datagrid(
				j_detailGrid({
				columns:[[
			              	{field:'ck',checkbox:true},
			              	j_gridText({field:'rowId',title:'ID',hidden:true}),
			              	j_gridText({field:'deletedFlag',title:'deletedFlag',hidden:true}),
			              	j_gridText({field:'codeValue',title:'值',editor:'textbox'}),
			              	j_gridText({field:'codeName',title:'名称',editor:'textbox'}),
			              	j_gridText({field:'linkValue',title:'关联值',editor:
			              		xnGridComboGrid({
			              			field:'linkValue',
				        			idField:'codeValue',
				        			textField:'codeName',
				        			width:550,
				        			columns:[[ 	
				        			           	{field:'rowId',title:'ID',width:100,hidden:true},
				        				        {field:'codeValue',title:'值',width:100},
				        				        {field:'codeName',title:'名称',width:100},
				        				        {field:'linkValue',title:'关联值',width:100},
				        				        {field:'isDefault',title:'是否默认值',width:100}
				        				    ]]
				              	})
			              	}),
			              	j_gridText({
			              		field:'isDefault',
			              		title:'是否默认值',
			              		editor:{type:'checkbox',options:{on: 'Y',off: 'N'}}
			              	}),
					    ]]
			})
		);
		/**
		 * 封装控件调用方法
		 */
		//上级分类
		xnComboGrid({
			id:'supType',
			idField:'typeCode',
			textField:'typeName',
			url:prUrl+'searchCodeListToList.do',
			width:550,
			columns:[[ 	
			           	{field:'rowId',title:'ID',width:100,hidden:true},
				        {field:'typeCode',title:'分类代码',width:100},
				        {field:'typeName',title:'分类名称',width:100},
				        {field:'supType',title:'上级分类',width:100},
				        {field:'notes',title:'备注',width:100}
				    ]],
			onChange:supTypeOnChangeFun
		});
    },500);
});

/*************页面渲染结束******************************************************************************/

/********************页面特殊方法开始***************************************************************************/
/**
 * 上级分类选择事件方法,主表选择上级分类，明细表必填
 */
function supTypeOnChangeFun(newValue,oldValue){
	var listTable = $('#listTable');
	listTable.datagrid('selectAll');
	var record = listTable.datagrid('getSelections');
	$.each(record,function(index,data){
		var row = listTable.datagrid('getRowIndex',data);
		data.deletedFlag = "1";
		listTable.datagrid('deleteRow',row);
	});
	listTable.datagrid('unselectAll');
	var supTypeValue = newValue;
	var option = listTable.datagrid('getColumnOption','linkValue');
	if(supTypeValue == null || supTypeValue == ''){
		option.editor.options.required = false;
	}else{
		option.editor.options.required = true;
		option.editor.options.url = basicUrl+searchDetailListUrl+'?typeCode='+supTypeValue;
	}
}
function onDblClickRow(index,row){
    $('#editWin').window({
	title:'查看'+ title
    });
    $('#editWin').window('open');
    $('#editForm').form('load',row);
    $('#btnSave').css('display','none');
    var listTable = document.getElementById('listTable');
        if(listTable!=null){
        	var typeCode = row.typeCode;
        	$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?typeCode='+typeCode);
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
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			var typeCode=record[0].typeCode;
		    $('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?typeCode='+typeCode);
		}
		record[0].rowId = 0;
		$('#editForm').form('load',record[0]);
		$('#btnSave').css('display','inline-block');
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
		var listTable = document.getElementById('listTable');
		if(listTable!=null){
			 var typeCode=record[0].typeCode;
		     $('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?typeCode='+typeCode);
		}
	}
}

/**
 * 保存
 */
function onBtnSave(){
	var queryParams = null;
	var listTable = document.getElementById("listTable");
	//判断是否有明细表
	if(listTable!= null){
		queryParams = collectDetailData();
	}else{
		queryParams = {
			status:1,
			deletedFlag:0,
		};
	}
	//判断是否是事件保存
	if(typeof(eventName) != "undefined"){
		queryParams.eventName = eventName;
	}
	
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
				if(typeof(eventName) == "undefined"){
					$('#editWin').window('close');
				}else{
					//重置
					$('#editForm').form('reset');
					if(listTable!= null){
						$('#listTable').datagrid('loadData',{success:true,total: 0, rows: [] });
					}
				}
				var table = document.getElementById("table");
				if(table != null){
					$('#table').datagrid('reload');
				}
				
				$.messager.alert('提示','保存成功！');
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
 * 删除
 * pms{
 * 	model:模块代码
 * }
 */
function onBtnDelete(){
	var record = $('#table').datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除这'+record.length+'条记录吗？', function(r){
			if (r){
				var type_code = [];
				$.each(record,function(index,data){
					if(data.typeCode!=null){
					    type_code.push(data.typeCode);
					}else{
					    type_code.push(data.typeCode);
					}
					
				});
				var data= {'type_code':type_code};
				jAjax.submit(deleteUrl,data,function(){
				    	$.messager.alert('警告','删除成功！');
			    		$('#table').datagrid('reload');
				});
//				$.ajax({
//				    type: 'POST',
//				    url: basicUrl+deleteUrl ,
//				    data: {
//				    	'type_code':type_code
//				    } ,
//				    success: function(response){
//				    	if(response.success){
//				    		$.messager.alert('警告','删除成功！');
//				    		$('#table').datagrid('reload');
//				    	}else{
//				    		$.messager.alert({
//			                     title: '错误',
//			                     msg: response.errorMsg
//			                 });
//				    	}
//				    	
//				    },
//				    dataType:'JSON'
//				});
			}
		});
		
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
		    var typeCode=record[0].typeCode;
		    $('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?typeCode='+typeCode);
		}
	}
}
/********************页面特殊方法结束***************************************************************************/