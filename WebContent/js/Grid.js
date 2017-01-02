/**
 * 整个grid（按钮+表格） 
 * @param pms : 
 * url 1 
 * columnFields 1 
 * columnTitles 1 
 * haveCheckBox ?
 * hiddenFields ? 
 * columnWidths ? 
 * rightColumnFields ? 需要右对齐字段 
 * onDblClickRowFun ? 双击事件 
 * onClickRow ？单击事件 
 * title ?  表头 
 * toolbarList ?
 */
// 主表 默认所有按钮都有
function j_grid(pms) {

	var toolbar=pms.toolbar;
	var toolbarList=pms.toolbarList;
	if(toolbar!=null){
		pms.toolbarList =toolbar;
	}else{
		if (toolbarList != null) {
			j_boolbarLimit(toolbarList);
		}
		pms.toolbarList = '#tableToolbar';
	}
	pms.onDblClickRowFun=pms.onDblClickRowFun == null ? onDblClickRow : pms.onDblClickRowFun;
	return j_grid_view(pms,'table');
}
// 查询表
function j_grid_view(pms,j_table_id) {

	var j_columns = pms.columns;
	if (j_columns == null) {
		j_columns = [ j_table(pms) ];
	}
	
	return {
		queryParams:pms.queryParams,
		width : pms.width == null ? '100%' : pms.width,
		height : pms.height == null ? '100%' : pms.height,
		fitColumns : pms.fitColumns == null ? true : pms.fitColumns,
		pagination : pms.pagination == null ? true : pms.pagination,
		rownumbers : pms.rownumbers == null ? true : pms.rownumbers,
		remoteSort : pms.remoteSort == null ? false : pms.remoteSort,
		multiSort : pms.multiSort == null ? true : pms.multiSort,
		singleSelect:pms.singleSelect == null ? false : pms.singleSelect,
		border : false,
		fit : pms.fit == null ? true : pms.fit,
		title : pms.title == null ? null : pms.title,
		toolbar : pms.toolbarList,
		url : pms.url == null ? null : basicUrl + pms.url,
		columns : j_columns,
		frozenColumns:pms.frozenColumns == null ? undefined : pms.frozenColumns,
		onDblClickRow : pms.onDblClickRowFun,
		onLoadSuccess : function(data) {
			if (!data.success) {
				$.messager.alert({
					title : '错误',
					msg : data.errorMsg
				});
			}
		},
		onHeaderContextMenu : function(e, field) {
			e.preventDefault();
			var cmenu = createColumnMenu(j_table_id);
			cmenu.menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		},
		rowStyler : function(index, row) {
			if ((index + 1) % 2 == 0) {
				return 'background-color:#f7f7f7;';
			}
		}
	}
}

//细表
function j_detailGrid(pms){	
	var j_columns = pms.columns;
	if(j_columns == null){
		j_columns = [j_table(pms)];
	}
	
	return {
		width:pms.width == null?'100%':pms.width,
		height:pms.height == null?'72%':pms.height,
		fitColumns:pms.fitColumns == null ? true: pms.fitColumns , 
		rownumbers:pms.rownumbers == null ? true: pms.rownumbers , 
		fit:pms.fit == null ? false: pms.fit, 
		title:pms.title==null?null:pms.title,
		toolbar: pms.toolbar == null ? '#toolbar' : pms.toolbar,
		url : pms.url == null ? null : basicUrl + pms.url,
		pagination : pms.pagination == null ? false : pms.pagination,
	    columns:j_columns,
	    frozenColumns:pms.frozenColumns == null ? undefined : pms.frozenColumns,
	    checkOnSelect:pms.checkOnSelect == null ? false : pms.checkOnSelect,
		onDblClickCell: pms.dbClickEdit == null || pms.dbClickEdit == false ? function(){
			return false;
		}:onClickCell,
		onClickCell:pms.dbClickEdit == null || pms.dbClickEdit == false ? onClickCell:onSelectCell,
	    onClickRow:function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        },
		onEndEdit:pms.onEndEdit == null ? function(){
			return;
		}:pms.onEndEdit,
		onBeginEdit:pms.onBeginEdit == null ? function(){
			return;
		}:pms.onBeginEdit,
		onHeaderContextMenu: function(e, field){
			e.preventDefault();
			var cmenu = createColumnMenu('listTable');
			cmenu.menu('show', {
				left:e.pageX,
				top:e.pageY
			});
		},
		rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
		onLoadSuccess:function(data){
			if(!data.success){
				$.messager.alert({
					title: '错误',
					msg: data.errorMsg
				});
	    	}
		}
	}
}
//主表（含有子网格）
function j_hasChildrenGrid(pms){	
	var j_columns = pms.columns;
	if(j_columns == null){
		j_columns = [j_table(pms)];
	}
	return {
		width:pms.width == null?'100%':pms.width,
		height:pms.height == null?'100%':pms.height,
		fitColumns:pms.fitColumns == null ? true: pms.fitColumns , 
		pagination:pms.pagination == null ? true: pms.pagination , 
		rownumbers:pms.rownumbers == null ? true: pms.rownumbers , 
		remoteSort:pms.remoteSort == null ? false: pms.remoteSort , 
		fit:pms.fit == null ? true: pms.fit , 
		title:pms.title==null?null:pms.title,
		url:pms.url == null ? null : basicUrl+pms.url,
	    columns:j_columns,
	    view: detailview,
		detailFormatter:function(index,row){
			return '<div style="padding:2px"><table class="ddv"></table></div>';
		},
		onHeaderContextMenu: function(e, field){
			var cmenu = createColumnMenu('table');
			cmenu.menu('show', {
				left:e.pageX,
				top:e.pageY
			});
		},
		rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
		onLoadSuccess:function(data){
			if(!data.success){
				$.messager.alert({
					title: '错误',
					msg: data.errorMsg
				});
	    	}
		},
		onExpandRow: function(index,row){
			var ddv = $(this).datagrid('getRowDetail',index).find('table.ddv');
			ddv.datagrid({
				url:basicUrl+'/'+model+'/searchDetailToList.do?mainId='+row.rowId,
				fitColumns:true,
				singleSelect:true,
				rownumbers:true,
				loadMsg:'',
				height:'auto',
				columns:pms.detailColumns,
				onResize:function(){
					$('#table').datagrid('fixDetailRowHeight',index);
				},
				onLoadSuccess:function(){
					setTimeout(function(){
						$('#table').datagrid('fixDetailRowHeight',index);
					},0);
				}
			});
			$('#table').datagrid('fixDetailRowHeight',index);
		}
	}
}
//树形结构表格
function j_treeGrid(pms,j_sucFunc){	
	var j_columns = pms.columns;
	if(j_columns == null){
		j_columns = [j_table(pms)];
	}
	
	var toolbar=pms.toolbar==null? [{
		text:'折叠',
		iconCls: 'icon-remove',
		handler: function(){
			$('#treeTable').treegrid('collapseAll');
		}
	},{
		text:'展开',
		iconCls: 'icon-add',
		handler: function(){
			$('#treeTable').treegrid('expandAll');
		}
	},{
		text:'删除节点',
		iconCls: 'icon-clear',
		handler: removeNode
	}]:pms.toolbar;
	return {
		onContextMenu:pms.onContextMenu,
		onClickRow:pms.onClickRow,
		width:pms.width == null ? '100%' : pms.width,
		height:pms.height == null ? '100%' : pms.height,
		toolbar:toolbar,
		rownumbers :pms.rownumbers ,
		url:pms.url == null ? null :basicUrl + pms.url,
	    idField:pms.idField == null ? 'id' : pms.idField,
	    treeField:pms.treeField == null ? 'text' : pms.treeField, 	
	    parentField : pms.parentField,
	    fit:pms.fit == null ? true: pms.fit , 
	    fitColumns:pms.fitColumns == null ? true : pms.fitColumns,
	    columns:j_columns,
	    rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
	    onLoadSuccess:function(row, data){
	    	if(data.success){
	    		if ($.isFunction(j_sucFunc)) {
	    			j_sucFunc(data);
				}
	    	}else{
				$.messager.alert({
					title: '错误',
					msg: data.errorMsg
				});
	    	}
		}
	}
}
//事件录入明细表
function j_eventGrid(pms){	
	var j_columns = pms.columns;
	if(j_columns == null){
		j_columns = [j_table(pms)];
	}
	
	return {
		width:pms.width == null?'100%':pms.width,
		height:pms.height == null?'82%':pms.height,
		fitColumns:pms.fitColumns == null ? true: pms.fitColumns , 
		rownumbers:pms.rownumbers == null ? true: pms.rownumbers , 
		fit:pms.fit == null ? false: pms.fit, 
		title:pms.title==null?"":pms.title,
		toolbar: pms.toolbar == null ? '#toolbar' : pms.toolbar,
	    columns:j_columns,
	    checkOnSelect:pms.checkOnSelect == null ? false : pms.checkOnSelect,
    	//onClickCell: onClickCell,
	    //onClickRow:pms.onClickRow == null ? onClickRow : pms.onClickRow,
    	onDblClickCell: pms.dbClickEdit == null || pms.dbClickEdit == false ? function(){
			return false;
		}:onClickCell,
		onClickCell:pms.dbClickEdit == null || pms.dbClickEdit == false ? onClickCell:onSelectCell,
	    onClickRow:function (rowIndex, rowData) {
            $(this).datagrid('unselectRow', rowIndex);
        },
		rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
		onEndEdit:pms.onEndEdit == null ? function(index,row){
			var worker = $('#listTable').datagrid('getEditor', {
                index: index,
                field: 'worker'
            });
            if(worker != null){
            	 row.workerName = $(worker.target).combogrid('getText');
            }
		}:function(index,row){
			var worker = $('#listTable').datagrid('getEditor', {
                index: index,
                field: 'worker'
            });
            if(worker != null){
            	 row.workerName = $(worker.target).combogrid('getText');
            }
            pms.onEndEdit(index,row);
		},
		frozenColumns:pms.frozenColumns == null ? undefined : pms.frozenColumns,
		onHeaderContextMenu: function(e, field){
			e.preventDefault();
			var cmenu = createColumnMenu('listTable');
			cmenu.menu('show', {
				left:e.pageX,
				top:e.pageY
			});
		},
		onLoadSuccess:function(data){
			if(!data.success){
				$.messager.alert({
					title: '错误',
					msg: data.errorMsg
				});
	    	}
		},
		onBeginEdit:pms.onBeginEdit == null ? function(index,row){
			var earBrand = $('#listTable').datagrid('getEditor', {
                index: editIndex,
                field: 'earBrand'
            });
			if(earBrand != null){
				var hasSelectRows = $('#listTable').datagrid('getData').rows;
	        	var pigIdsArray = [];
	        	$.each(hasSelectRows,function(i,data){
	        		if(data.pigId != null && data.pigId != '' && i != index){
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
	        	$.ajax({  
	                url : basicUrl+'/production/searchValidPigToPage.do', 
	                data:{
	                	queryType:1,
	                	query:hasSelectRows[index].earBrand,
	                	pigType:oldPigType,
	                	specifyPigs:0,
	                	choice:1,
	                	eventName:eventName,
	                	pigIds:pigIds
	                },
	                type : "POST",  
	                dataType : "json",  
	                success : function(data) { 
	                	if(data.success){
	                		var earBrandGrid = $(earBrand.target).combogrid('grid');
		                	earBrandGrid.datagrid('loadData',data.rows);
		            	}else{
		            		 $.messager.alert({
		                         title: '错误',
		                         msg: data.errorMsg
		                     });
		            	}
	                }  
	            });  
			}
			var worker = $('#listTable').datagrid('getEditor', {
		        index: index,
		        field: 'worker'
		    });
			if(worker != null){
				var workerGrid = $(worker.target).combogrid('grid');
				if(row.houseIds != null){
					workerGrid.datagrid('reload',basicUrl+'/UserManage/searchEmployeeByIdToList.do?houseId='+row.houseIds);
				}else{
					var houseId = row.houseId == null || row.houseId == undefined || row.houseId == ''? 0 : row.houseId;
					workerGrid.datagrid('reload',basicUrl+'/UserManage/searchEmployeeByIdToList.do?houseId='+houseId);
				}
				
			}
		}:function(index,row){
			var earBrand = $('#listTable').datagrid('getEditor', {
                index: editIndex,
                field: 'earBrand'
            });
			if(earBrand != null){
				var hasSelectRows = $('#listTable').datagrid('getData').rows;
	        	var pigIdsArray = [];
	        	$.each(hasSelectRows,function(i,data){
	        		if(data.pigId != null && data.pigId != '' && i != index){
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
	        	$.ajax({  
	                url : basicUrl+'/production/searchValidPigToPage.do', 
	                data:{
	                	queryType:1,
	                	query:hasSelectRows[index].earBrand,
	                	pigType:oldPigType,
	                	specifyPigs:0,
	                	choice:1,
	                	eventName:eventName,
	                	pigIds:pigIds
	                },
	                type : "POST",  
	                dataType : "json",  
	                success : function(data) { 
	                	if(data.success){
	                		var earBrandGrid = $(earBrand.target).combogrid('grid');
		                	earBrandGrid.datagrid('loadData',data.rows);
		            	}else{
		            		 $.messager.alert({
		                         title: '错误',
		                         msg: data.errorMsg
		                     });
		            	}
	                }  
	            });  
			}
			var worker = $('#listTable').datagrid('getEditor', {
		        index: index,
		        field: 'worker'
		    });
			if(worker != null){
				var workerGrid = $(worker.target).combogrid('grid');
				if(row.houseIds != null){
					workerGrid.datagrid('reload',basicUrl+'/UserManage/searchEmployeeByIdToList.do?houseId='+row.houseIds);
				}else{
					var houseId = row.houseId == null || row.houseId == undefined || row.houseId == ''? 0 : row.houseId;
					workerGrid.datagrid('reload',basicUrl+'/UserManage/searchEmployeeByIdToList.do?houseId='+houseId);
				}
			}
        	pms.onBeginEdit(index,row);
		}
	}
}
//datagrid表头菜单

function createColumnMenu(tableId){
	var cmenu;
	cmenu = $('<div/>').appendTo('body');
	cmenu.menu({
		onClick: function(item){
			if (item.iconCls == 'icon-ok'){
				$('#'+tableId).datagrid('hideColumn', item.name);
				cmenu.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-empty'
				});
			} else {
				$('#'+tableId).datagrid('showColumn', item.name);
				cmenu.menu('setIcon', {
					target: item.target,
					iconCls: 'icon-ok'
				});
			}
		}
	});
	var fields = $('#'+tableId).datagrid('getColumnFields');
	var forzenFields = $('#'+tableId).datagrid('getColumnFields',true);
	if(forzenFields != null && forzenFields != ''){
		fields = forzenFields.concat(fields);
	}
	for(var i=0; i<fields.length; i++){
		var field = fields[i];
		var col = $('#'+tableId).datagrid('getColumnOption', field);
		if(col.title != null && col.title != ''){
			if(col.hidden){
				cmenu.menu('appendItem', {
					text: col.title,
					name: field,
					iconCls: 'icon-empty'
				});
			}else{
				cmenu.menu('appendItem', {
					text: col.title,
					name: field,
					iconCls: 'icon-ok'
				});
			}
		}
	}
	return cmenu;
}
//删除树形结构table的节点
function removeNode(){
	var row = $('#treeTable').treegrid('getSelected');
	if(row == null){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除'+row.text+'吗？', function(r){
			if (r){
				$('#treeTable').treegrid('remove',row.id);
			}
		});
	}
}
/**
 * 按钮区域
 * 		comButtons 'add,edit,view,remove,cut'
 * 		otherButtons toolbarList [{iconCls: ,btnName: ,funName: },{}....]
 */
function j_boolbar(comButtons,otherButtons){
	
	var result=[];
	/*
	 * 常用按钮 增 删 改 查 复制新增（5个常用按钮）
	 */
	if( comButtons!=null && comButtons.length>0){
		var buttonArrys = comButtons.split(',');
		
		for(var i=0 ; i<buttonArrys.length ; i++){
			if("add"==buttonArrys[i]){
				result.push({iconCls: 'icon-add',text:'新增',handler: onBtnAdd});
			}else if("edit"==buttonArrys[i]){
				result.push({iconCls: 'icon-edit',text:'编辑',handler: onBtnEdit});
			}else if("view"==buttonArrys[i]){
				result.push({iconCls: 'icon-edit',text:'查看',handler: onBtnView});
			}else if("remove"==buttonArrys[i]){
				result.push({iconCls: 'icon-remove',text:'删除',handler: onBtnDelete});
			}else if("cut"==buttonArrys[i]){
				result.push({iconCls: 'icon-cut',text:'复制新增',handler: onBtnCopyAdd});
			}
		}
	}
	
	/*
	 *其他按钮 
	 */
	if(otherButtons != null){
		for(var i = 0;i < otherButtons.length; i++) {
			var others=otherButtons[i];
			result.push({iconCls: others.iconCls,text:others.btnName,handler:others.funName});
		}
	}
	
	return result;
}

/**
 * 按钮区域
 * 		toolbarList [{iconCls: ,btnName: ,funName: },{}....]
 */
function j_boolbarLimit(toolbarList){
	var toolbarHtml = '';
	$.each(toolbarList,function(index,data){
		toolbarHtml += '<button type="button"  onclick="'+data.funName+'()" class="tableToolbarBtn btn-middle">'+data.btnName+'</a>';
	});
	document.getElementById('tableToolbar').innerHTML = toolbarHtml;
}

/**
 * 表格区域
 * 		pms :
 * 				columnFields       1
 * 				columnTitles        1
 * 				haveCheckBox     ?
 * 				hiddenFields        ?
 * 				columnWidths      ?
 * 				leftColumnFields   ? 需要左对齐字段
 * 				editor                  ?
  */
function j_table(pms){

	//复选框
	var checkbox= pms.haveCheckBox==null ? true : pms.haveCheckBox;
	//字段
	var colField = pms.columnFields;
	//名称
	var colTitles = pms.columnTitles;
	//隐藏字段
	var hidColFields = pms.hiddenFields;
	//字段宽度
	var colWidths = pms.columnWidths;
	//需要左对齐字段
	var rightColumnFields = pms.rightColumnFields;
	
	//需要formatter
	var formatterFields=pms.formatterFields;
	var j_formatter =pms.formatter;
	//根据，拆分formatterFields
	var j_formatterFields=null;
	
	var j_editor = pms.editor;
	
	//按钮
	var colBut = pms.but;
	var fields = colField.split(',');
	var titles = colTitles.split(',');
	var hidFields = hidColFields.split(',');
	var widths ;
	
	if(fields.length==0 || titles.length==0){
		alert('columnfields或columntitles不能为空，请检查！');
		return false;
	}
	
	if(fields.length!=titles.length){
		alert('columnfields的长度和columntitles的长度不一致，请检查！');
		return false;
	}
	
	if(colWidths !=null){
		widths = colWidths.split(',');
		if(widths.length!=fields.length){
			alert('columnWidths长度必须和columnfields的长度一致，请检查！');
			return false;
		}
	}
	
	if(formatterFields !=null){
		j_formatterFields = formatterFields.split(',');
		if(j_formatter.length!=j_formatterFields.length){
			alert('formatterFields长度必须和formatter的长度一致，请检查！');
			return false;
		}
	}
	
	var result=[];
	
	//添加复选框
	if(checkbox){
		result.push({field:'ck',checkbox:true});
	}
	
	for (var i = 0 ; i < titles.length ; i++){
		//需要隐藏的字段
		var hiddenflag=false;
		if(hidColFields!=null){
			if(	hidColFields.indexOf(fields[i])!=-1){
				hiddenflag=true; 
			}
		}
		
		//没列宽度，默认是100
		var perWidth=100;
		if(colWidths !=null){
			perWidth =widths[i];
		}
		
		var perEditor = {type:'text'};
		if(j_editor!=null){
			perEditor=j_editor[i];
		}
		
		var preFormatter=null;
		if(j_formatterFields!=null){
			for(var j=0;j<j_formatterFields.length;j++){
				if(j_formatterFields[j]==fields[i]){
					preFormatter=j_formatter[j];
					j_formatterFields.splice(j,1);
					break;
				}
			}
		}
		
		var inGridText = {
				title:titles[i],
				field:fields[i],
				hidden:hiddenflag,
				width:perWidth,
				editor:perEditor,
				formatter:preFormatter
		};
		
		if(rightColumnFields!=null){
			if(	rightColumnFields.indexOf(fields[i])!=-1){
				result.push(j_gridNumber(inGridText));
				continue;
			}
		}
		result.push(j_gridText(inGridText));
	}
	
	if(colBut != null ){
		var inGridText = {
				title:pms.btnName == null ? '操作' : pms.btnName,
				field:'_operate',
				width:perWidth,
				style:true,
				formatter: colBut
		}
		result.push(j_gridText(inGridText));
	}
	return result;
}

/**
 * 
 * @param pms
 * @returns {___anonymous9661_10798}
 */
function j_gridText(pms) {
	pms.style = pms.style == undefined ? false : pms.style;
	if(pms.title == null){
		alert("列标题不能为空");
	}else if(pms.field == null){
		alert("列字段不能为空");
	}else{
		return {
			// 列标题
			title: pms.title, 
			// 列字段 与后台Model相匹配
			field: pms.field, 
			// 宽度
			width: pms.width == null ? 50: pms.width , 
			 // 允许排序
			sortable:true ,
			 // string	表明如何对其列数据，可选值：'left'，'right'，'center'。	undefined
			align: 'left',
			// 列表单字段对齐方式
			halign: pms.halign == null ? 'left': pms.halign, 
			// 设置为true将自动使列适应表格宽度以防止出现水平滚动。	默认 false
			fitColumns: pms.fitColumns == null ? true: pms.fitColumns, 
			//number	表明一个单元格跨几行。	undefined
			rowspan: 1,
			//number	表明一个单元格跨几列。	undefined
			colspan: 1,	
			//			boolean	设置为true允许对该列排序。	undefined
			sortable: true,
			//			boolean	设置为true允许该列被缩放。	undefined
			resizable: true,
			//			设置为true将隐藏列。
			hidden:	pms.hidden,
			editor: pms.editor==null?undefined:pms.editor,
			formatter: pms.formatter == null ? null : pms.formatter,
			
			styler:pms.editor==null&&pms.style == false?function(value,row,index){
				if((index+1) % 2 == 0){
					return 'background-color:#e7e9ea;';
				}else{
					return 'background-color:#f7f7f7;';
				}
				
			}:(pms.style?function(value,row,index){
				pms.color = pms.color == null ? '#000000' : pms.color;
				return 'color:'+pms.color+';';
			}:function(value,row,index){
				return;
			})
		}
	}
}

/**
 * 
 * @param pms
 * @returns {___anonymous8374_9707}
 */
function j_gridNumber(pms) {
	if(pms.title == null){
		alert("列标题不能为空");
	}else if(pms.field == null){
		alert("列字段不能为空");
	}else{
		return {
			// 列标题
			title: pms.title, 
			// 列字段 与后台Model相匹配
			field: pms.field, 
			// 宽度
			width: pms.width == null ? 50: pms.width , 
			 // 允许排序
			sortable:true ,
			 // string	表明如何对其列数据，可选值：'left'，'right'，'center'。	undefined
			align: pms.align ==  'left' ,
			// 列表单字段对齐方式
			halign: pms.halign == null ? 'left': pms.halign, 
			// 设置为true将自动使列适应表格宽度以防止出现水平滚动。	默认 false
			fitColumns: pms.fitColumns == null ? true: pms.fitColumns, 
			//number	表明一个单元格跨几行。	undefined
			rowspan: 1,
			//number	表明一个单元格跨几列。	undefined
			colspan: 1,	
			//			boolean	设置为true允许对该列排序。	undefined
			sortable: true,
			//			boolean	设置为true允许该列被缩放。	undefined
			resizable: true,
			//			设置为true将隐藏列。
			hidden:	pms.hidden,
			//单位
			formatter: pms.formatter == null ? null : pms.formatter,
			editor: {
				type:'numberspinner',
				options:{
					//默认值
					value:pms.value,
					required:pms.required == null ? false : pms.required,
					min:pms.min == null ? null : pms.min,
					max:pms.max == null ? null : pms.max,
					//小数位
					precision:pms.precision == null ? 0 : pms.precision,
					//步长
					increment:pms.increment == null ? 1 : pms.increment,
					onChange:pms.onChange == null ? function(newValue,oldValue){
						return;
					} : pms.onChange
				}
			},
			styler: function(value,row,index){
                if (value < 0){
                	// 'background-color:#ffee00;';
                    return 'color:red';
                }
                if (value > 0){
                	// 'background-color:#ffee00;';
                    return 'color:green';
                }
                if (value == 0){
                	// 'background-color:#ffee00;';
                    return 'color:black';
                }
            }
		
		}
	}
}

