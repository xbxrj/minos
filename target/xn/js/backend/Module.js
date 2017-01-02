var title = '系统菜单建模';
var model = 'cdModule';
var editIndex = undefined;
var prUrl='/backEnd/';
var saveUrl=prUrl+'editCdModuel.do';
var deleteUrl=prUrl+'deleteCdModuels.do';
var searchMainListUrl=prUrl+'searchCdModuelToPage.do';
var searchDetailListUrl=prUrl+'searchCdModuelDetailToList.do';
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
				columnFields:'rowId,deletedFlag,moduleName,component,moduleUrl,usingFlag,notes',
				columnTitles:'ID,deletedFlag,菜单名称,功能代码,模块地址,是否启用,备注',
				hiddenFields:'rowId,deletedFlag'
			})
	);
	//延时加载细表
	setTimeout(function () { 
		/**
		 * 细表加载
		 */
		$('#listTable').datagrid(
				j_detailGrid({
				height:'55%',
				columns:[[
			              	{field:'ck',checkbox:true},
			              	j_gridText({field:'rowId',title:'ID',hidden:true}),
			              	j_gridText({field:'deletedFlag',title:'deletedFlag',hidden:true}),
			              	j_gridText({field:'btnType',title:'按钮类型',editor:'textbox'}),
			              	j_gridText({field:'btnCode',title:'按钮编码',editor:'textbox'}),
			              	j_gridText({field:'btnName',title:'名称',editor:'textbox'}),
			            	j_gridText({field:'iconCls',title:'图标',editor:'textbox'}),
			              	j_gridText({field:'funName',title:'方法名',editor:'textbox'})
					    ]]
			})
		);
		/**
		 * 封装控件调用方法
		 */
		//点击事件
		xnCdCombobox({ 
			id:'clickEvent',
			typeCode:'CLICK_EVENT'
		});
		//类型
		xnCdCombobox({
			id:'menuType',
			typeCode:'MENU_TYPE'
		});
	},500);
});
/*************页面渲染结束******************************************************************************/
