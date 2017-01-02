var title = '系统项设置';
var model = 'cdSetting';
var editIndex = undefined;
var prUrl='/backEnd/';
var saveUrl=prUrl+'editCdSetting.do';
var deleteUrl=prUrl+'deletesCdSetting.do';
var searchMainListUrl=prUrl+'searchCdMsettingModuleByPage.do';
//var searchDetailListUrl=prUrl+'searchCdCodeDetailToList.do';
/** *********页面渲染开始*************************************************************************/
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
				columnFields:'rowId,deletedFlag,settingModule,settingName,settingCode,settingValue,sowType',
				columnTitles:'ID,deletedFlag,系统模块,设置项名称,设置项代码,设置值,显示类型',
				hiddenFields:'rowId,deletedFlag'
			})
	);
	
	//延时加载细表
	setTimeout(function () {
		/**
		 * 细表加载
		 */
//		$('#listTable').datagrid(
//				j_detailGrid({
//				title:'选项',
//				columns:[[
//			        {field:'ck',checkbox:true},
//			        j_gridText({field:'rowId',title:'ID',hidden:true}),
//			        j_gridText({field:'deletedFlag',title:'deletedFlag',hidden:true}),
//			        j_gridText({field:'value',title:'选项VALUE',editor:'textbox'}),
//			        j_gridText({field:'name',title:'选项NAME',editor:'textbox'}),			              
//			     ]]
//			})
//		);
		/**
		 * 封装控件调用方法
		 */
		//公司类型
		xnCdCombobox({ 
			id:'clickCompanyType',
			typeCode:'COMPANY_TYPE'
		});
		//显示类型
		xnCdCombobox({ 
			id:'clickSowType',
			typeCode:'SOW_TYPE'
		});	
	},500);
});

/*************页面渲染结束******************************************************************************/

/********************页面特殊方法开始***************************************************************************/

/********************页面特殊方法结束***************************************************************************/