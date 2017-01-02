var title = '组织结构';
var model = 'cdSetting';
var editIndex = undefined;
var prUrl = '/OrganizationalStructure/';
var editCompanyUrl=basicUrl+prUrl+'editCompany.do'; //公司CU操作
var editDeptUrl=basicUrl+prUrl+'editDept.do'; //部门CU操作
var editPostUrl=basicUrl+prUrl+'editPost.do';   //岗位CU操作
var saerchPostUrl=prUrl+"searchPostByPage.do";  //岗位查询
var deletePostUrl=prUrl+'deletesPost.do';  //岗位删除
var deleteCompanyUrl=prUrl+'deleteCompany.do' //公司删除
var deleteDeptUrl=prUrl+'deleteDept.do' //部门删除

$(function() {
	//初始化公司树
	initTreeData();
	
	//var linkField= new Array('companyType');
	//var linkCode= new Array('COMPANY_TYPE');
	xnCdCombobox({
		id:'companyClass',
		typeCode:'COMPANY_CLASS',
		required:true,
		linkCode:'COMPANY_TYPE',
		linkField:'companyType'
	});
	xnCdCombobox({
		id:'companyType',
		typeCode:'COMPANY_TYPE',
		required:true
	});

	// 是否集团
	xnRadioBox({
		id:'isBloc',
		name:'isBloc',
		typeCode:'IS_BLOC'
	});	
	//上级公司
	$('#cname').searchbox({
		searcher:function(value,name){	
			var node = $('#treeTable').treegrid('getSelected');
			if(node){
				leftSilpFun('supSearch');
				$('#supTreeTable').treegrid('unselectAll');
				$('#supTreeTable').treegrid({
					url:basicUrl+'/OrganizationalStructure/searchOnlyCompanyTree.do?endCompanyId='+node.farmId
				});
			}
		}
	});
	//上级部门
	$('#supDeptName').searchbox({
		searcher:function(value,name){	
			var node = $('#treeTable').treegrid('getSelected');
			if(node && node.deptId != undefined){
				leftSilpFun('supSearch');
				$('#supTreeTable').treegrid('unselectAll');
				$('#supTreeTable').treegrid({
					url:basicUrl+'/OrganizationalStructure/searchDepTree.do?endDeptId='+node.deptId+'&farmId='+node.farmId
				});
			}
		}
	});
	initSupTreeData();
	
	$('#houseTable').datagrid(
			j_grid_view({
				width:'auto',
				height:'auto',
				url:'/basicInfo/searchHouseDeptToList.do',
				columnFields:'houseName',
				columnTitles:'猪舍名称',
				hiddenFields:'',
				fit:false,
				pagination:false
			},'houseTable')
		)
		
	//放大镜猪舍
	$('#houseNames').searchbox({
		editable:false,
		searcher:function(value,name){
			// 清空选中的猪场
			$('#houseTable').datagrid('uncheckAll');
			// 获取上一次选中的猪场，并且勾选上一次勾选的猪场
			var data = $('#houseTable').datagrid('getRows');
			
			var row = $('#houseIds').val().split(',');
			for(var i = 1;i<row.length;i++){
				for(var j = 0;j<data.length;j++){
					if(row[i] == data[j].rowId){
						$('#houseTable').datagrid('checkRow',j);
						break;
					}
				}
			}
			
			leftSilpFun('houseSearch');
		}
	});
	
	//省份
	xnCdCombobox({
	    id:'province',
	    typeCode:'PROVINCE',
	    linkField:'city',
	    linkCode:'CITY',
	    panelHeight:200
	    
	});
	//市
	xnCdCombobox({
	    id:'city',
	    typeCode:'CITY',
	    linkField:'county',
	    linkCode:'COUNTY',
	    panelHeight:200
	});
	//县
	xnCdCombobox({
	    id:'county',
	    typeCode:'COUNTY',
	    panelHeight:200
	});
	
})

//初始化组织结构树
function initTreeData() {
	
	$('#treeTable').treegrid(
			j_treeGrid({
				url : '/OrganizationalStructure/searchCompanyTree.do',
			    columns:[[
			        {field:'text',title:'名称',width:600},
			        {field:'type',title:'类别',width:150},
			    ]],
			    toolbar : '#treeTableToolbar',
				onContextMenu : onContextMenu,
				onClickRow:onClickRow
			},function(){
				$('#treeTable').treegrid('collapseAll');
				var node = $('#treeTable').treegrid('getSelected');
				if(node){
					var parentId = [node.id];
					getParentIds(node,parentId);
					$.each(parentId,function(index,data){
						$('#treeTable').treegrid('expand',data);
					})
				}
			})
	);
}	

function initSupTreeData(){
	$('#supTreeTable').treegrid(
			j_treeGrid({
			    columns:[[
			        {field:'text',title:'名称',width:600},
			    ]],
			    width:'auto',
				height:'auto',
			    toolbar : [],
				fit:false
			},function(){
				$('#supTreeTable').treegrid('collapseAll');
			})
		)
}
//折叠
function collapseAll(){
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		$('#treeTable').treegrid('collapseAll', node.id);
	} else {
		$('#treeTable').treegrid('collapseAll');
	}
}
//展开
function expandAll(){
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		$('#treeTable').treegrid('expandAll', node.id);
	} else {
		$('#treeTable').treegrid('expandAll');
	}
}
//刷新
function refresh(){
	$('#treeTable').treegrid('reload');
}
//右键菜单
function onContextMenu(e, row) {
	e.preventDefault();
	$(this).treegrid('unselectAll');
	$(this).treegrid('select', row.id);
	/*$('#editPost').panel({closed : true });*/
	if ((row.type != null) && row.type == '部门') {		
		$('#meuDept').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		/*$('#editCompany').panel({closed : true });
		$('#postPanel').panel({closed : true });*/
	} else if ((row.cname != '部门') && row.type == '公司') {		
		$('#meuCompany').menu('show', {
			left : e.pageX,
			top : e.pageY
		});
		/*$('#editDept').panel({closed : true });
		$('#postPanel').panel({closed : true });*/
	}
}
/**
 * 单击
 * @param row
 */
function onClickRow(row){
	if((row.type != null) && row.type == '公司'){
		editCompany();
	}
	if ((row.type != null) && row.type == '部门') {	
		editDept();
	}
}
//岗位管理
function postManage(){
	$('#editCompany').window('close');
	$('#editDept').window('close');
	$('#editPost').window('close');
	/*$('#editCompany').panel({closed : true });
	$('#editDept').panel({closed : true });
	$('#editPost').panel({closed : true });*/
	$('#postPanel').panel({closed : false });
	var node = $('#treeTable').treegrid('getSelected');
	$('#postList').datagrid(
		j_grid({
			toolbar:"#posthd",
			url:saerchPostUrl+'?deptId='+node.deptId,
			columnFields:'rowId,deletedFlag,deptId,duty,jobTitle,dutyLvl,qualification',
			columnTitles:'ID,deletedFlag,deptId,岗位,职称,职级,任职资格',
			hiddenFields:'rowId,deletedFlag,deptId',
			onDblClickRowFun:onDblClickRowPost
		})
	);
}
//编辑公司
function editCompany() {
	$('#editDept').window('close');
	$('#editPost').window('close');
	$('#postPanel').panel({closed : true });
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		$('#editFormCompany').form('reset');
		var data = jAjax.submit('/OrganizationalStructure/searchCompanyById.do?id=' + node.farmId);
		$('#editFormCompany').form('load',data);
		$.each($('#isBloc').find('input[type=radio]'),function(index,isBlocData){
			if(data.isBloc == '1'){
				isBlocData.disabled = true;
			}else{
				isBlocData.disabled = false;
			}
			
		});
		
		if(node.parentId != null){
			var father = $('#treeTable').treegrid('find',node.parentId);
			if(father!=null){
				$('#editFormCompany').form('load',{'cname':father.text});
			}
		}
		$('#editCompany').panel({	title : '编辑公司',closed : false });
	}
}
//添加子公司
function addChildCompany() {
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		if(node.isBloc == '0'){
			$.messager.alert('提示','该公司不是集团，不能添加子公司！');
		}else{
			$('#editDept').window('close');
			$('#editPost').window('close');
			$('#postPanel').panel({closed : true });
			$('#editFormCompany').form('reset');
			$("#registerTime").datebox("setValue", getDate(new Date()));
			$("#openTime").datebox("setValue", getDate(new Date()));
			$('#editFormCompany').form('load',{'cname':node.text,'supCompanyId':node.farmId});
			$.each($('#isBloc').find('input[type=radio]'),function(index,isBlocData){
				isBlocData.disabled = false;
			});
			$('#editCompany').panel({	title : "添加公司",closed : false });
		}
	
	}
}
//删除公司
function deleteCompany(){
	var node = $('#treeTable').treegrid('getSelected');
	if(node){
		console.log(node);
		if(node['children'].length == 0){
			$.messager.confirm('提示', '确定要删除该公司吗？', function(r){
				if (r){
					$.ajax({
					    type: 'POST',
					    url: basicUrl+deleteCompanyUrl ,
					    data: {
					    	'companyId':node.id
					    } ,
					    success: function(response){
					    	if(response.success){
					    		$.messager.alert('警告','删除成功！');
					    		$('#treeTable').treegrid('reload');
					    	}else{
					    		$.messager.alert({	                     
					    			title: '错误',
					                msg: response.errorMsg
					    		});
					    	}
					    	
					    },
					    dataType:'JSON'
					});
				}
			});
		}else{
			$.messager.alert('警告','该公司下尚有子公司或部门,请先删除其下的子公司或部门！');
		}
	}
}
//添加部门
function addDept() {
	$('#editCompany').window('close');
	$('#editPost').window('close');
	/*$('#editCompany').panel({closed : true });
	$('#editPost').panel({closed : true });*/
	$('#postPanel').panel({closed : true });
	var node = $('#treeTable').treegrid('getSelected');	
	if (node){
		$('#editFormDept').form('reset');
		$('#supDeptId').val(null);
		if( node.type == '公司' ){
			$('#editFormDept').form('load',{ farmName:node.text,farmId: node.farmId});
		}	
		$('#editDept').panel({	title : "添加部门",closed : false });
	}
}
//编辑部门
function editDept() {
	$('#editCompany').window('close');
	$('#editPost').window('close');
	$('#postPanel').panel({closed : true });
	var father=null;
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		$.getJSON( basicUrl + '/OrganizationalStructure/searchDeptById.do?id='+node.deptId,function(result){
			var supDeptName = null;
			if(node.parentId != null){
				var supDept = $('#treeTable').treegrid('find',node.parentId);
				if(supDept.type == '部门'){
					supDeptName = supDept.text;
				}
			}
			$('#editFormDept').form('reset');
			$('#supDeptId').val(null);
			$('#editFormDept').form('load',{ farmName:node.companyName,supDeptName:supDeptName});
			$('#editFormDept').form('load',result.rows);
			
			$('#houseNames').searchbox('setText',result.rows.houseNames);
			$('#houseIds').val(result.rows.houseIds);
		});
		$('#editDept').panel({	title : "编辑部门",closed : false });
	}
}
//添加子部门
function addDeptChild() {
	$('#editCompany').window('close');
	$('#editPost').window('close');
	$('#postPanel').panel({closed : true });
	var node = $('#treeTable').treegrid('getSelected');
	if (node) {
		$('#editFormDept').form('reset');
		var data = $('#treeTable').treegrid('getData');
		$('#editFormDept').form('load',{ 
			farmName:node.companyName,
			farmId:node.farmId,
			supDeptName: node.text,
			supDeptId: node.deptId
		});
		$('#editDept').panel({	title : "添加部门",closed : false });
	}
}
//删除部门
function deleteDept(){
	var node = $('#treeTable').treegrid('getSelected');
	if(node){
		if(node['children'].length == 0){
			$.messager.confirm('提示', '确定要删除该部门吗？', function(r){
				if (r){
					$.ajax({
					    type: 'POST',
					    url: basicUrl+deleteDeptUrl ,
					    data: {
					    	'deptId':node.deptId
					    } ,
					    success: function(response){
					    	if(response.success){
					    		$.messager.alert('警告','删除成功！');
					    		$('#treeTable').treegrid('reload');
					    	}else{
					    		$.messager.alert({	                     
					    			title: '错误',
					                msg: response.errorMsg
					    		});
					    	}
					    	
					    },
					    dataType:'JSON'
					});
				}
			});
		}else{
			$.messager.alert('警告','该部门下尚有子部门，请先删除其下的子部门！');
		}
	}
}
//取消
function onBtnCancel(str) {
	var formstr = 'editForm' + UpperFirstLetter(str);
	var divstr = 'edit' + UpperFirstLetter(str);
	$('#' + formstr).form('reset');
	$('#' + divstr).window('close');
}
//保存事件
function onBtnSave(str) {
	var formstr = 'editForm' + UpperFirstLetter(str);
	var divstr = 'edit' + UpperFirstLetter(str);
	var  queryParams = {
		status:1,
		deletedFlag:0
	};
	var saveUrl = '';
	if(formstr == 'editFormCompany'){
		saveUrl=editCompanyUrl;
	}else if(formstr == 'editFormDept'){
		saveUrl=editDeptUrl;
	}else{
		saveUrl=editPostUrl;
	}
	$('#'+formstr).form('submit', {
		url : saveUrl,
		queryParams : queryParams,
		onSubmit : function() {
			var isValid = $('#' + formstr).form('validate');
			if (!isValid) {
				$.messager.progress('close');
			}
			return isValid;
		},
		success : function(response) {
			response = eval('(' + response + ')');
			if (response.success) {
				$('#' + divstr).window('close');
				/*$('#' + divstr).panel({closed : true });*/
				if(formstr == 'editFormPost' && divstr == 'editPost'){
					$('#postList').datagrid('reload');
					$('#postPanel').panel({closed : false });
				}else{
					$('#treeTable').treegrid('reload');
				}
			    $.messager.alert('提示','保存成功！');
			} else {
				$.messager.show({
					title : '错误',
					msg : response.errorMsg
				});
			}
			$.messager.progress('close');
		}
	});
}

//格式化时间（date类型参数）
function getDate(date) {
	var day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
	var month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : "0" + (date.getMonth() + 1);
	return date.getFullYear() + '-' + month + '-' + day;
}

//新增岗位
function appendPost(){
	var node = $('#treeTable').treegrid('getSelected');
	$('#editFormPost').form('reset');
	if((node.type != null) && node.type=='部门'){
		$('#editFormPost').form('load',{ 
			deptName:node.text,
			deptId:node.deptId
		});
		//$('#btnPostSave').linkbutton('enable');
		//$('#postPanel').panel({	closed : true });
		$('#editPost').window({
			title:"添加岗位"
		});
		$('#editPost').window('open');
		/*$('#editPost').panel({	title : "添加岗位",closed : false });*/
		$('#btnPostSave').css('display','inline-block');	
	}else{
		$.messager.alert('警告','请选择所属部门！');
	}
}
//编辑岗位
function editPost(){
	var record = $('#postList').datagrid('getSelections');
	var node = $('#treeTable').treegrid('getSelected');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		if ((node.type != null) && node.type=='部门') {
			$('#editFormPost').form('load',{ deptName:node.text});
			//$('#postPanel').panel({	closed : true });
			$('#editPost').window({
				title:"编辑岗位"
			});
			$('#editPost').window('open');
			//$('#editPost').panel({	title : "编辑岗位",closed : false });
			$('#editFormPost').form('load',record[0]);
			//$('#btnPostSave').linkbutton('enable');
			$('#btnPostSave').css('display','inline-block');	
		}else{
			$.messager.alert('警告','请选择所属部门！');
		}		
	}
}
//查看岗位
function onBtnViewPost(){
	var record = $('#postList').datagrid('getSelections');
	var node = $('#treeTable').treegrid('getSelected');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		if ((node.type != null) && node.type=='部门') {
			$('#editFormPost').form('load',{ deptName:node.text});
			//$('#postPanel').panel({	closed : true });
			$('#editPost').window({
				title:"查看岗位"
			});
			$('#editPost').window('open');
			//$('#editPost').panel({	title : "查看岗位",closed : false });
			$('#editFormPost').form('load',record[0]);
			//$('#btnPostSave').linkbutton('disable');
			$('#btnPostSave').css('display','none');	
		}else {
			$.messager.alert('警告','请选择所属部门！');
		}		
	}
}
//删除岗位
function deletePost(){
	var record = $('#postList').datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除这'+record.length+'条记录吗？', function(r){
			if (r){
				var ids = [];
				$.each(record,function(index,data){
					if(data.ROW_ID!=null){
						ids.push(data.ROW_ID);
					}else{
						ids.push(data.rowId);
					}
					
				});
				$.ajax({
				    type: 'POST',
				    url: basicUrl+deletePostUrl ,
				    data: {
				    	'ids':ids
				    } ,
				    success: function(response){
				    	if(response.success){
				    		$.messager.alert('警告','删除成功！');
				    		$('#postList').datagrid('reload');
				    	}else{
				    		$.messager.alert({	                     
				    			title: '错误',
				                msg: response.errorMsg
				    		});
				    	}
				    	
				    },
				    dataType:'JSON'
				});
			}
		});
		
	}
}

function copAddPost(){
	var record = $('#postList').datagrid('getSelections');
	var length = record.length;
	var node = $('#treeTable').treegrid('getSelected');
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else if(length > 1){
		$.messager.alert('警告','只能选择一条数据！');
	}else{
		if ((node.type != null) && node.type=='部门') {
			//$('#postPanel').panel({	closed : true });
			$('#editPost').window({
				title:"复制新增岗位"
			});
			$('#editPost').window('open');
			//$('#editPost').panel({	title : "复制新增岗位",closed : false });
			record[0].rowId = null;	
			$('#editFormPost').form('load',{ deptName:node.text});
			$('#editFormPost').form('load',record[0]);			
			//$('#btnPostSave').linkbutton('enable');
			$('#btnPostSave').css('display','inline-block');	
		}else{
			$.messager.alert('警告','请选择所属部门！');
		}
	}
}

//双击查看岗位
function onDblClickRowPost(index,row){
	var node = $('#treeTable').treegrid('getSelected');
	$('#editFormPost').form('load',{ deptName:node.text});
	//$('#postPanel').panel({	closed : true });
	//$('#editPost').panel({	title : "查看岗位",closed : false });
	$('#editPost').window({
		title:"查看岗位"
	});
	$('#editPost').window('open');
	$('#editFormPost').form('load',row);
	$('#btnPostSave').css('display','none');	
}
//获取元素父节点Id
function getParentIds(node,parentIds){
	if(node.parentId != null){
		parentIds.push(node.parentId);
		var parentNode = $('#treeTable').treegrid('find',node.parentId);
		getParentIds(parentNode,parentIds);
	}
}
//上级公司选择确定
function onSupSure(){
	var node = $('#supTreeTable').treegrid('getSelected');
	if(node){
		rightSlipFun('supSearch',390);
		var treeTableSelect = $('#treeTable').treegrid('getSelected');
		if(treeTableSelect.type == '公司'){
			$('#cname').searchbox('setValue',node.text);
			$('#supCompanyId').val(node.id);
		}else{
			$('#supDeptName').searchbox('setValue',node.text);
			$('#supDeptId').val(node.deptId);
		}
	}
}
//关闭上级公司弹框
function closeSup(){
	rightSlipFun('supSearch',390);
}
