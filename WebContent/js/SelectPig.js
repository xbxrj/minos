var init = 0;
$(function(){
    initSelectPig();
    initSearchPig();
}) 

function initSearchPig(){
	  $('#selectPigListTable').datagrid({
	    	url:basicUrl+'/production/searchValidPigToPage.do',
	    	queryParams:{
			queryType:2,
	        	pigType:oldPigType,
	        	specifyPigs:0,
	        	choice:1,
	        	eventName:eventName
	    	}
	    });
}

function initSelectPig(){
	//批次
	xnComboGrid({
		id:'swineryId',
		idField:'rowId',
		textField:'swineryName',
		width:550,
		columns:[[ 	
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'批次代码',width:100},
			        {field:'swineryName',title:'批次名称',width:100},
			        {field:'pigQty',title:'猪只数量',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]]
	});
	//猪舍
	xnComboGrid({
		id:'houseId',
		idField:'rowId',
		textField:'houseName',
		url:'/basicInfo/searchHouseToList.do?lineId=0',
		width:550,
		columns:[[ 	
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'猪舍代码',width:100},
			        {field:'houseName',title:'猪舍名称',width:100},
			        {field:'houseVolume',title:'猪舍容量',width:100},
			        {field:'pigQty',title:'猪只数量',width:100},
			        {field:'houseTypeName',title:'猪舍类别',width:100},
			        {field:'notes',title:'备注',fitColumns:true}
			    ]]
	});
	//猪只状态
	xnComboGrid({
		id:'pigClassId',
		idField:'rowId',
		textField:'pigClassName',
		width:550,
		columns:[[ 	
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'状态代码',width:100},
			        {field:'pigClassName',title:'状态名称',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]]
	});
	//品种
	xnComboGrid({
		id:'breedId',
		idField:'rowId',
		textField:'breedName',
		url:'/backEnd/searchBreedToList.do',
		width:550,
		columns:[[ 	
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'breedCode',title:'品种代码',width:100},
			        {field:'breedName',title:'品种名称',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]]
	});
	//查询结果表
	$('#selectPigListTable').datagrid({
		wdith:'98.5%',
		height:'100%',
		fitColumns:true, 
		pagination:true, 
		rownumbers:true, 
		remoteSort:false, 
		multiSort:true, 
		onLoadSuccess:function(data){
			if(!data.success){
				$.messager.alert({
					title: '错误',
					msg: data.errorMsg
				});
	    	}
		},
		rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
		columns:[[ 	
		          	{field:'ck',checkbox:true},
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'earBrand',title:'耳牌号',width:100},
			        {field:'breedName',title:'品种',width:100,hidden:true},
			        {field:'swineryName',title:'批次名称',width:100,hidden:true},
			        {field:'pigInfo',title:'耳缺号-品种-状态(胎次)-日龄-猪舍-猪栏',width:300},
			        {field:'pigpenName',title:'猪栏名称',width:100,hidden:true},
			        {field:'pigClassName',title:'生产状态',width:100},
			        {field:'notes',title:'备注',width:100,hidden:true}
			    ]]
	});
}
/**
 * 选择猪只
 */
function selectPig(){

	var selectClassAndSwineryPigType = '';
	if(eventName == "BREED_PIG_DIE" || eventName == "BREED_PIG_OBSOLETE"){
		selectClassAndSwineryPigType = '1,2';
	}else{
		selectClassAndSwineryPigType = oldPigType;
	}
	leftSilpFun('selectPigWin',true,9001);
	var swineryGrid = $('#swineryId').combogrid('grid');
	swineryGrid.datagrid('load',basicUrl+'/production/searchSwineryToList.do?lineId=0&pigType='+selectClassAndSwineryPigType);
	var pigClassGrid = $('#pigClassId').combogrid('grid');
	pigClassGrid.datagrid('reload',basicUrl+'/backEnd/searchPigClassToList.do?pigType='+selectClassAndSwineryPigType);
	var hasSelectRows = $('#listTable').datagrid('getData').rows;
	var pigIdsArray = [];
	$.each(hasSelectRows,function(i,data){
		if(data.pigId != null && data.pigId != ''){
			pigIdsArray.push(data.pigId);
		}
	});
	var pigIds = '';
	$.each(pigIdsArray,function(i,data){
		if(i == pigIdsArray.length - 1){
			pigIds += data;
		}else{
			pigIds += data + ',';
		}
	});
	selectPigSearch();
}

/**
 * 搜索猪只
 */
function selectPigSearch(){
	var houseId = $('#houseId').combogrid('getValue');
	var swineryId = $('#swineryId').combogrid('getValue');
	var earBrand =  $('#earBrand').textbox('getValue');
	var pigClassId = $('#pigClassId').combogrid('getValue');
	var breedId = $('#breedId').combogrid('getValue');
	var minDateage = Number($('#minDateage').numberspinner('getValue'));
	var maxDateage = Number($('#maxDateage').numberspinner('getValue'));
	var hasSelectRows = $('#listTable').datagrid('getData').rows;
	var pigIdsArray = [];
	$.each(hasSelectRows,function(i,data){
		if(data.pigId != null && data.pigId != ''){
			pigIdsArray.push(data.pigId);
		}
	});
	var pigIds = '';
	$.each(pigIdsArray,function(i,data){
		if(i == pigIdsArray.length - 1){
			pigIds += data;
		}else{
			pigIds += data + ',';
		}
	});
	$('#selectPigListTable').datagrid('load',{
    	queryType:2,
    	pigType:oldPigType,
    	specifyPigs:0,
    	choice:1,
    	eventName:eventName,
    	houseIds:houseId,
    	swineryIds:swineryId,
    	earBrand:earBrand,
    	pigClassIds:pigClassId,
    	breedIds:breedId,
    	minDateage:minDateage,
    	maxDateage:maxDateage,
    	pigIds:pigIds
    });
}
/**
 * 确定
 */
function selectPigSure(){
	var selectRows = $('#selectPigListTable').datagrid('getSelections');
	if(selectRows.length < 1){
		$.messager.alert('警告', '请选择一条以上的数据！');
	}else{
		var weanNum = 0;
		$.each(selectRows,function(index,data){
			var row = new Object(); 
			if(typeof(detailDefaultValues) == "undefined"){
				row ={
					status:'1',
					deletedFlag:'0'	
				};
			}else{
				for(var p in detailDefaultValues) { 
					var name=p;//属性名称 
					var value=detailDefaultValues[p];//属性对应的值 
					row[name]=detailDefaultValues[p]; 
				} 
			}
			if(eventName == 'WEAN' || eventName == 'CHILD_PIG_DIE' || eventName == 'FOSTER'){
				row.pigId = data.pigId;
				row.earBrand = data.earBrand;
				row.pigInfo = data.pigInfo,
				row.minValidDate = data.minValidDate;
				row.maxValidDate = data.maxValidDate;
				row.enterDate = data.lastEventDate;
				row.pigQty = data.pigQty;
				row.houseId = data.houseId;
				if(eventName == 'WEAN' && (dnflag == 'ON' || dnflag == 'on')){
					row.weanNum = data.pigQty;
					row.dieNum = 0;
					weanNum += parseInt(data.pigQty);
				}
			}else{
				row.pigId = data.pigId;
				row.earBrand = data.earBrand;
				row.pigInfo = data.pigInfo,
				row.minValidDate = data.minValidDate;
				row.maxValidDate = data.maxValidDate;
				row.enterDate = data.lastEventDate;
				row.houseId = data.houseId;
			}
			$('#listTable').datagrid('appendRow',row);
		});
		if(eventName == 'WEAN' && (dnflag == 'ON' || dnflag == 'on')){
			var weanNumSum = parseInt($('#weanNumSum').html());
			weanNumSum += weanNum;
			$('#weanNumSum').html(weanNumSum);
		}
		var hasSelectRows = $('#listTable').datagrid('getData').rows;
		var pigIdsArray = [];
		$.each(hasSelectRows,function(i,data){
			if(data.pigId != null && data.pigId != ''){
				pigIdsArray.push(data.pigId);
			}
		});
		var pigIds = '';
		$.each(pigIdsArray,function(i,data){
			if(i == pigIdsArray.length - 1){
				pigIds += data;
			}else{
				pigIds += data + ',';
			}
		});
		var houseId = Number($('#houseId').combogrid('getValue'));
		var swineryId = Number($('#swineryId').combogrid('getValue'));
		var earBrand =  $('#earBrand').textbox('getValue');
		var pigClassId = $('#pigClassId').combogrid('getValue');
		var breedId = Number($('#breedId').combogrid('getValue'));
		var minDateage = Number($('#minDateage').numberspinner('getValue'));
		var maxDateage = Number($('#maxDateage').numberspinner('getValue'));
		$('#selectPigListTable').datagrid('load',{
        	queryType:2,
        	pigType:oldPigType,
        	specifyPigs:0,
        	choice:1,
        	eventName:eventName,
        	houseId:houseId,
        	swineryId:swineryId,
        	earBrand:earBrand,
        	pigClassIds:pigClassId,
        	breedId:breedId,
        	minDateage:minDateage,
        	maxDateage:maxDateage,
        	pigIds:pigIds
        });
	}
}
/**
 * 重置
 */
function selectPigReset(){
	$('#selectPigSearchForm').form('reset');
	var hasSelectRows = $('#listTable').datagrid('getData').rows;
	var pigIdsArray = [];
	$.each(hasSelectRows,function(i,data){
		if(data.pigId != null && data.pigId != ''){
			pigIdsArray.push(data.pigId);
		}
	});
	var pigIds = '';
	$.each(pigIdsArray,function(i,data){
		if(i == pigIdsArray.length - 1){
			pigIds += data;
		}else{
			pigIds += data + ',';
		}
	});
	$('#selectPigListTable').datagrid('load',{
    	queryType:2,
    	pigType:oldPigType,
    	specifyPigs:0,
    	choice:1,
    	eventName:eventName,
    	pigIds:pigIds
    });
}

/**
 * 左滑显示
 */
function leftSilpFun(id,openMask,z_index){
	var openMaskFlag = openMask == null || z_index == null? false : openMask;
	if(openMaskFlag){
		z_index = z_index == null ? 9002 : z_index;
		openWindowMask({z_index:z_index});
	}
	$('#' + id).animate({right:'0'});
}