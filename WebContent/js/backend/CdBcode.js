var title = '用户业务编码';
var model = 'cdBcodeType';
var editIndex = undefined;
var prUrl='/backEnd/';
var saveUrl=prUrl+'editBcode.do';
var deleteUrl=prUrl+'deleteBcodes.do';
var searchMainListUrl=prUrl+'searchBcodeToPage.do';
var searchDetailListUrl=prUrl+'searchBcodeToList.do';
//var searchCdBcodeToPageForAdvancedSearchUrl = prUrl+'searchCdBcodeToPageForAdvancedSearch.do'; //高级查询
/** *********页面渲染开始*************************************************************************/
//查询按钮
var buttonList = getButtonByLimit({});
$(document).ready(function(){
	/**
	 * 主表加载
	 */
//	//猪舍
//	xnComboGrid({
//		id:'houseId',
//		idField:'rowId',
//		textField:'houseName',
//		url:'/backEnd/searchHouseToList.do',
//		width:550,
//		columns:[[ 	
//		           	{field:'rowId',title:'ID',width:100,hidden:true},
//			        {field:'businessCode',title:'猪舍代码',width:100},
//			        {field:'houseName',title:'猪舍名称',width:100},
//			        {field:'houseVolume',title:'猪舍容量',width:100},
//			        {field:'pigQty',title:'猪只数量',width:100},
//			        {field:'houseTypeName',title:'猪舍类别',width:100},
//			        {field:'notes',title:'备注',fitColumns:true}
//			    ]]
//	});
	
	//编码级别
	xnCdCombobox({
		id:'level',
		typeCode:'LEVEL'
	});
	//是否使用日期
	xnCdCombobox({
		id:'isUseBdate',
		typeCode:'IS_USE_BDATE'
	});
	
	$('#table').datagrid(
			j_grid({				
				toolbarList:buttonList,
				url:searchMainListUrl,
				columnFields:'rowId,deletedFlag,typeCode,bcodeName,serialLength,prifixCode,isUseBdate,limitNum,level',
				columnTitles:'ID,deletedFlag,类型编码,业务编码名称,流水码长度,前缀,是否时间,起始编码,编码级别',
				hiddenFields:'rowId,deletedFlag',
				rightColumnFields:''
			})
	);
	
//	//高级查询用猪舍
//	xnComboGrid({
//		id:'houseIdForAdvancedSearch',
//		idField:'rowId',
//		textField:'houseName',
//		url:'/backEnd/searchHouseToListForAdvancedSearch.do',
//		width:550,
//		columns:[[ 	
//		           	{field:'rowId',title:'ID',width:100,hidden:true},
//			        {field:'businessCode',title:'猪舍代码',width:100},
//			        {field:'houseName',title:'猪舍名称',width:100},
//			        {field:'houseVolume',title:'猪舍容量',width:100},
//			        {field:'pigQty',title:'猪只数量',width:100},
//			        {field:'houseTypeName',title:'猪舍类别',width:100},
//			        {field:'notes',title:'备注',fitColumns:true}
//			    ]]
//	});
//	
//	$('#houseIdForAdvancedSearch').combogrid({onLoadSuccess:function(data){
//		$('#houseIdForAdvancedSearch').combogrid('setValue',-1);
//	}});
	
});

/*************页面渲染结束******************************************************************************/

///**
// * 高级查询重置
// */
//function onBtnReSearch(){
//	$('#searchForm').form('reset');
//	$('#houseIdForAdvancedSearch').combogrid('setValue',-1);
//}
