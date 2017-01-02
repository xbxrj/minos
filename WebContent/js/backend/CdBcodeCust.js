var prUrl='/backEnd/';
var searchCdBcodeCustToListForAdvancedSearchUrl = prUrl+'searchCdBcodeCustToListForAdvancedSearch.do';

var editIndex = undefined;
$(document).ready(function(){
	$('#listTable').datagrid(
		j_detailGrid({	
			width:'100%',
			height:'100%',
			fit:true,
			url:'/backEnd/searchBcodeCustToList.do',
			columns:[[
		              	{field:'ck',checkbox:true},
		              	j_gridText({field:'rowId',title:'ID',hidden:true}),
		              	j_gridText({field:'isUseBdateName',title:'isUseBdateName',hidden:true}),
		              	j_gridText({field:'bcodeName',title:'业务编码名称',style:true}),
		              	j_gridText({field:'serialLength',title:'流水码长度',editor:'numberspinner',style:true,color:'#66CDAA'}),
		              	j_gridText({field:'prifixCode',title:'前缀',editor:'textbox',style:true,color:'#66CDAA'}),
		              	j_gridText({field:'isUseBdate',title:'是否时间',
		              		formatter:function(value,row){
								return row.isUseBdateName == null ? value : row.isUseBdateName;
							},
		              		editor:
			              		xnGridCdComboBox({
			              			field:'isUseBdate',
			              			typeCode:'IS_USE_BDATE'
			              		})
	              		,style:true,color:'#66CDAA'})
				    ]], 
		    onEndEdit:function(index,row){
		    	var isUseBdate = $('#listTable').datagrid('getEditor', {
	                index: index,
	                field: 'isUseBdate'
	            });
	            if(isUseBdate != null){
	            	row.isUseBdateName = $(isUseBdate.target).combogrid('getText');
	            }
		    }
			
		})
	);
});
/**
 * 保存
 */
function doSave(){
	$('#listTable').datagrid('endEdit',editIndex);
	var changes  = $('#listTable').datagrid('getChanges','updated');
	if(changes.length > 0){
		$.messager.progress();
		var rows = $('#listTable').datagrid('getRows');
		var jsonString = JSON.stringify(rows);
		$.post({
			url:basicUrl + '/backEnd/editBcodeCust.do',
			data:{
				gridList:jsonString
			},
			success:function(response){
				response=eval('('+response+')');
				if(response.success){
					$.messager.progress('close');
					$('#listTable').datagrid('reload');
					$.messager.alert('提示','保存成功！');
				}else{
					$.messager.alert({
	                    title: '错误',
	                    msg: response.errorMsg
	                });
				}
			}
		});
	}else{
		$.messager.alert('提示','没有修改任何数据！');
	}
	
}
/**
 *恢复
 */
function doRecover(){
	$.messager.confirm('提示', '恢复后数据将与系统标准值一致，确定恢复吗？', function(r){
		if(r){
			var rows = $('#listTable').datagrid('getRows');
			var ids = [];
			$.each(rows,function(index,data){
				if(data.rowId != null){
					ids.push(data.rowId);
				}
			});
			$.post({
				url:basicUrl + '/backEnd/recoverBcodeCust.do',
				data:{
					ids:ids
				},
				success:function(response){
					response=eval('('+response+')');
					if(response.success){
						$.messager.progress('close');
						$('#listTable').datagrid('reload');
						$.messager.alert('提示','恢复成功！');
					}else{
						$.messager.alert({
		                    title: '错误',
		                    msg: response.errorMsg
		                });
					}
				}
			});
		}
	});
}

/**
 * 高级查询搜索
 */
function onBtnSearch(para,url){
	var winId = $(para).parent().parent().attr('id');
    rightSlipFun(winId,390);
    jAjax.submit_form_grid('searchForm','listTable',url);
}
