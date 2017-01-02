var isShift = false;
var isCtrl = false;
window.onresize = function(){  
	changeRightSlipWinHight();
} 
document.onkeydown = function(e) {
   /* if (e.which == 9 || e.keyCode == 9) {  //屏蔽 tab  
       return false; //非常重要
    }*/
    //获取事件对象  
    var elem = event.relatedTarget || event.srcElement || event.target ||event.currentTarget;   
      
    if(event.keyCode == 8 || e.which == 8){//判断按键为backSpace键  
      
        //获取按键按下时光标做指向的element  
        elem = event.srcElement || event.currentTarget;   
          
        //判断是否需要阻止按下键盘的事件默认传递  
        var name = elem.nodeName;  
          
        if(name!='INPUT' && name!='TEXTAREA'){  
            return _stopIt(event);  
        }  
        var type_e = elem.type.toUpperCase();  
        if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){  
                return _stopIt(event);  
        }  
        if(name=='INPUT' && (elem.readOnly || elem.disabled )){  
                return _stopIt(event);  
        }  
    }  
}  
function _stopIt(e){  
    if(e.returnValue){  
        e.returnValue = false ;  
    }  
    if(e.preventDefault ){  
        e.preventDefault();  
    }                 

    return false;  
} 
document.onmousedown = function(e){
	if (e.shiftKey && e.which == 1) {  //屏蔽 shift+leftClick  
		return false; //非常重要
	}
	//鼠标点击菜单其他地方时隐藏菜单
	var clientHeight = document.documentElement.clientHeight + 66;
	if(e.clientX < 85 || e.clientX > 830 || e.clientY < clientHeight - 506){
		var menuList = $(window.parent.parent.parent.document).find('.menuList');
		if(menuList.css('display') == 'block'){
			menuList.css('display','none');
		}
	}
}
$(document).ready(function(){
	//隐藏备注
	if(document.getElementById('notes') != null){
		upOrDown(document.getElementById('notes'));
	}
	//禁止编辑窗口的tab默认事件
	$('#editWin').bind("keydown",function(event){
		if(event.which == 9 || event.keyCode == 9){
			return false;
		}
	})
	changeRightSlipWinHight();
	if(typeof(eventName) != "undefined" && $('#billDate') != null){
		$('#billDate').datebox({
			value:getCurrentDate()
		});
	}
	$(document).bind({  
	    copy: function(e) {//copy事件  
	        var cpTxt = copyGridDataToExcel(); 
	        var clipboardData = window.clipboardData; //for IE  
	        if (!clipboardData) { // for chrome  
	            clipboardData = e.originalEvent.clipboardData;  
	        }  
	        clipboardData.setData('Text', cpTxt);  
	        return false;//否则设不生效  
	    },paste: function(e) {//paste事件  
	    	
	        var eve = e.originalEvent  
	        var cp = eve.clipboardData;  
	        var data = null;  
	        var clipboardData = window.clipboardData; // IE  
	        if (!clipboardData) { //chrome  
	            clipboardData = e.originalEvent.clipboardData  
	        }  
	        data = clipboardData.getData('Text');  
	        var textArray = data.split("\n");
	        if (textArray[textArray.length - 1].length == 0) {
	            textArray.splice(textArray.length - 1, 1);
	        }
	        var array = [];
	        for (var i = 0; i < textArray.length; i++) {
	            array.push(textArray[i].split('\t'));
	        }
	        var listTable = $('#listTable');
	        if(listTable != null){
		        pasteExcelToGrid(array);
	        }
	    }  
	}); 
});
/**
 * 页面基本方法
 */
/** *********************************公共方法开始*************************************************/
/**
 * 获取系统当前时间
 */
function getCurrentDate(){
	var date = new Date();
	return date.format("yyyy-MM-dd");
}
function changeRightSlipWinHight(){
	$.each(document.getElementsByClassName('rightSlipWin_390'),function(index,data){
		data.style.height = document.documentElement.clientHeight + 'px';
	});
	$.each(document.getElementsByClassName('rightSlipWin_780'),function(index,data){
		data.style.height = document.documentElement.clientHeight + 'px';
	});
	$.each(document.getElementsByClassName('heightFiexd'),function(index,data){
		if($(data).next('.rightSlipFooter_height_50').length > 0){
			data.style.height = document.documentElement.clientHeight - 112 + 'px';
		}else{
			data.style.height = document.documentElement.clientHeight - 152 + 'px';
		}
	});
}
/**
 * 遮罩
 * @param pms
 */
function openWindowMask(pms){
	$('<div class="window-mask" style="z-index:'+pms.z_index+'"></div>').insertAfter($('body'));
}
/**
 * 左滑显示
 */
function leftSilpFun(id,openMask,z_index){
	var curZ_index = strToInt($('#editWin').parent().css('z-index'));
	var openMaskFlag = openMask == null || z_index == null? false : openMask;
	if(openMaskFlag){
		//z_index = z_index == null ? 9002 : z_index;
		openWindowMask({z_index:curZ_index});
	}
	$('#' + id).css('z-index',curZ_index + 1);
	$('#' + id).animate({right:'0'});
}
/**
 * 右滑隐藏
 * @param para
 */
function rightSlipFun(id,width,closeMask){
	var closeMaskFlag = closeMask == null ? false : closeMask;
	if(closeMaskFlag){
		$('.window-mask').remove();
	}
	$('#'+id).animate({right:'-' + width + 'px'})
}
/**
 * 高级查询搜索
 */
function onBtnSearch(para,url){
	var winId = $(para).parent().parent().attr('id');
    rightSlipFun(winId,390);
	 $("#table").datagrid('load',form2Json("searchForm"));
}
/**
 * 将表单数据转为json
 */
function form2Json(id) {
   var arr = $("#" + id).serializeArray()
   var jsonStr = "";
   jsonStr += '{';
   for (var i = 0; i < arr.length; i++) {
       jsonStr += '"' + arr[i].name + '":"' + arr[i].value + '",'
   }
   jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
   jsonStr += '}'
   var json = JSON.parse(jsonStr)
   return json
}

/**
 * 高级查询重置
 */
function onBtnReSearch(){
	$('#searchForm').form('reset');
}
/**
 * field收缩展开方法
 */
function upOrDown(para){
	if(para.className == 'arrowUp'){
		para.className = 'arrowDown';
		para.parentNode.nextElementSibling.style.display = 'none';
	}else{
		para.className = 'arrowUp';
		para.parentNode.nextElementSibling.style.display = 'block';
	}
}
/**
 * 检查日期是否合法
 */
function checkDate(strInputDate){
	  if (strInputDate == "") return false;
	  if(strInputDate.length != 10) return false;
	  strInputDate = strInputDate.replace(/-/g, "/");
	  var d = new Date(strInputDate);
	  if (isNaN(d)) return false;
	  var arr = strInputDate.split("/");
	  return ((parseInt(arr[0], 10) == d.getFullYear()) && (parseInt(arr[1], 10) == (d.getMonth() + 1)) && (parseInt(arr[2], 10) == d.getDate()));
}
/**
 * 字符串首字母大写
 */
function UpperFirstLetter(str)   
{   
   return str.replace(/\b\w+\b/g, function(word) {   
   return word.substring(0,1).toUpperCase( ) +  word.substring(1);   
 });   
}
/**
 * 获取按钮
 * pms{
 * }
 */
function getButtonByLimit(pms){
	var buttonList = null;
	$.ajax({
		url:basicUrl+"/param/searchButtonByUserId.do",
		method:'get',
		async:false,
		success:function(result){
			var data = JSON.parse(result);
			buttonList = data.rows;
		}
	});
	return buttonList;
}
/**
 * 双击查看方法
 * pms{
 * 	model:模块代码
 * 	title:模块名称
 * }
 */
function onDblClickRow(index,row){
	$('#editWin').window({
		title:'查看'+ title
	});
	$('#editWin').window('open');
	$('#editForm').form('load',row);
	$('#btnSave').css('display','none');
	var listTable = document.getElementById('listTable');
	if(listTable!=null){
		var rowId = row.rowId;
		$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+rowId);
	}
}
/**
 * 保存
 * pms{
 * 	model:模块代码
 * }
 */
function onBtnSave(){
	var queryParams;
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
					$.messager.alert('提示','保存成功！');
				}else{
					//重置
					var preRecord = $('#listTable').datagrid('getData');
					$('#editForm').form('reset');
					leftSilpFun('preSaveRecord',true,9002);
					if(preRecord.success == undefined){
						preRecord.success = true;
					}
					$('#preSaveRecordTable').datagrid('loadData',preRecord);
					if(listTable!= null){
						$('#listTable').datagrid('loadData',{success:true,total: 0, rows: [] });
					}
				}
				var table = document.getElementById("table");
				if(table != null){
					$('#table').datagrid('reload');
				}
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
 * 取消
 * pms{
 * 	model:模块代码
 * }
 */
function onBtnCancel(){
	$('#editForm').form('reset');
	$('#editWin').window('close');
}
/**
 * 新增
 * pms{
 * 	model:模块代码
 * 	title:模块名称
 * }
 */
function onBtnAdd(){
	$('#editWin').window({
		title:'新增'+ title
	});
	$('#editWin').window('open');
	$('#editForm').form('reset');
	$('#btnSave').css('display','inline-block');
	var listTable = document.getElementById('listTable');
	if(listTable!=null){
		$('#listTable').datagrid('loadData',{success:true,total: 0, rows: [] });
	}
}
/**
 * 编辑
 * pms{
 * 	model:模块代码
 * 	title:模块名称
 * }
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
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
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
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
	}
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
				$.messager.progress();	
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
				    url: basicUrl+deleteUrl ,
				    data: {
				    	'ids':ids
				    } ,
				    success: function(response){
				    	$.messager.progress('close');
				    	if(response.success){
				    		$.messager.alert('警告','删除成功！');
				    		$('#table').datagrid('reload');
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
			var mainId;
			if(record[0].ROW_ID!=null){
				mainId=record[0].ROW_ID;
			}else{
				mainId=record[0].rowId;
			}
			$('#listTable').datagrid('load',basicUrl+searchDetailListUrl+'?mainId='+mainId);
		}
		var rowId = record[0].rowId;
		record[0].rowId = 0;
		$('#editForm').form('load',record[0]);
		record[0].rowId = rowId;
		$('#btnSave').css('display','inline-block');
	}
}
/**
 * 重置方法
 */
function onBtnReset(){
	$.messager.confirm('提示', '重置将清空数据，确定要重置吗？', function(r){
		if (r){
			$('#editForm').form('reset');
			var listTable = document.getElementById("listTable");
			if(listTable!= null){
				$('#listTable').datagrid('loadData',{success:true,total: 0, rows: [] });
			}
		}
	});
}
/**
 *给控件添加获取焦点时刷新方法 
 * @param id
 * @param type
 */
function addFocus(id,type,url){
	$("#"+id).next().find('input.validatebox-text').focus(function(){
		if(type == 'grid'){
			$("#"+id).combogrid('grid').datagrid('reload');
		}
		if(type == 'combobox'){
			if(url != null){
				var data = jAjax.submit(url);
				$("#"+id).combobox('loadData',data);
			}else{
				$("#"+id).combobox('reload');
			}
			
		}
	});
}
/**
 * 判断是否为undefined,'',null
 * @param arry
 *  @param isUndefined 默认true 是否判断为undefined
 * @param isEmpty 是否判断为''
 * @param isNull 是否判断为null
 * @returns {Boolean}
 */
function isDefined(arry,isUndefined,isEmpty,isNull){
	isUndefined = isUndefined == null ? true : isUndefined;
	isEmpty = isEmpty == null ? false : isEmpty;
	isNull = isNull == null ? false : isNull;
	var returnFalg = true;
	if(arry.length>0){
		$.each(arry,function(i,item){
			if(isUndefined){
				if(item == undefined){
					returnFalg = false;
				}
			}
			if(isEmpty){
				if(item == ''){
					returnFalg = false;
				}
			}
			if(isNull){
				if(item == null){
					returnFalg = false;
				}
			}
		})
	}
	return returnFalg;
}
/**
 * 字符串转float
 * @param str
 * @param isEmpty 是否转''为0，默认true
 */
function strToFloat(str,isEmpty){
	isEmpty = isEmpty == null ? true : isEmpty;
	if(isEmpty){
		return parseFloat(str == '' ? 0 : str);
	}else{
		return parseFloat(str);
	}
}
/**
 * 字符串转int
 * @param str
 * @param isEmpty 是否转''为0，默认true
 */
function strToInt(str,isEmpty){
	isEmpty = isEmpty == null ? true : isEmpty;
	if(isEmpty){
		return parseInt(str == '' ? 0 : str);
	}else{
		return parseInt(str);
	}
}
/** *********************************公共方法结束**************************************************/

/** **************************************明细表方法开始*******************************************/
/**
 * 获取明细表提交数据数据（有一个明细表，如有多个明细表需重写）
 */
function collectDetailData(){
	var listTable = $('#listTable');
	var rows =  listTable.datagrid('getRows');
	for(var i = 0 ; i < rows.length ; i ++){
		listTable.datagrid('endEdit',i);
	}
	var queryParams;
	//明细表获取数据
	var rowId;
	if(document.getElementById('ROW_ID')!=null){
		rowId=document.getElementById('ROW_ID');
	}else{
		rowId=document.getElementById('rowId');
	}
	var rowIdValue = rowId.value;
	if(rowIdValue == '' || rowIdValue == 0){
		//获取新增行
		var insertRows = listTable.datagrid('getRows');
		//给提交数据加上行号
		$.each(insertRows,function(index,data){
			insertRows[index].lineNumber = listTable.datagrid('getRowIndex',data)+1;
		})
		var jsonString = JSON.stringify(insertRows);
		queryParams = {
				status:1,
				deletedFlag:0,
				gridList:jsonString
			};
	}else{
		//获取新增行
		var insertRows = listTable.datagrid('getChanges','inserted');
		//获取更新行
		var upDataRows = listTable.datagrid('getChanges','updated');
		//获取删除行
		var deleteRows = listTable.datagrid('getChanges','deleted');
		//合并行
		var editRows = insertRows.concat(upDataRows,deleteRows);
		//给提交数据加上行号
		$.each(editRows,function(index,data){
			editRows[index].lineNumber = listTable.datagrid('getRowIndex',data)+1;
		})
		var jsonStr = JSON.stringify(editRows);
		queryParams = {
				status:1,
				deletedFlag:0,
				gridList:jsonStr
			};
	}
	return queryParams;
}
/**
 * 单元格编辑方法
 */
$.extend($.fn.datagrid.methods, {
	editCell: function(jq,param){
		return jq.each(function(){
//			var opts = $(this).datagrid('options');
			var fields = $(this).datagrid('getColumnFields',true).concat($(this).datagrid('getColumnFields'));
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor1 = col.editor;
				if (fields[i] != param.field){
					col.editor = null;
				}
			}
			$(this).datagrid('beginEdit', param.index);
			for(var i=0; i<fields.length; i++){
				var col = $(this).datagrid('getColumnOption', fields[i]);
				col.editor = col.editor1;
			}
		});
	}
});
/**
 * 结束编辑
 * @returns {Boolean}
 */
function endEditing(){
	if (editIndex == undefined){return true}
	if ($('#listTable').datagrid('validateRow', editIndex)){
		$('#listTable').datagrid('endEdit', editIndex);
		editIndex = undefined;
		return true;
	} else {
		return false;
	}
}
/**
 * 单击编辑单元格
 * @param index
 * @param field
 */
function onClickCell(index, field){
	if (endEditing()){
		var listTable = $('#listTable');
		
		listTable.datagrid('editCell', {index:index,field:field}).datagrid('unselectAll');
		var editor = listTable.datagrid('getEditor', {index:index,field:field});
		if(editor == null){
			editIndex = index;
			return;
		}
		//单元格获取焦点
		var eidtCellInput = $(editor.target[0].parentNode).find('.textbox-text.validatebox-text');
		if(eidtCellInput.length == 0){
			$(editor.target)[0].focus();
			$(editor.target).keydown(function(e){
		    	editCellTabDownFun(e,listTable,index,field);
		    });
		}else{
			eidtCellInput[0].focus();
			eidtCellInput.keydown(function(e){
		    	editCellTabDownFun(e,listTable,index,field);
		    });
		}
		editIndex = index;
	}
}
/**
 * 单击选中单元格
 * @param index
 * @param field
 * @param value
 */
function onSelectCell(index,field,value){
	var listTable = $('#listTable');
	var cell = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+index+'"].datagrid-row').find('td[field='+field+']');
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	var beginX = null;
	var beginY = null;
	var endX = null;
	var rowLength = listTable.datagrid('getRows').length;
	if(isShift){
		if(editIndex != undefined){
			for(var i = 0 ; i < fields.length ; i ++){
				var editor = listTable.datagrid('getEditor',{index:editIndex,field:fields[i]});
				if(editor != null){
					beginX = i;
					beginY = editIndex;
					break;
				}
			}
		}else{
			outer:for(var i = 0 ; i < rowLength ; i ++){
				var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
				for(var j = 0 ; j < cellRow.length ; j ++){
					if($(cellRow[j]).css('background-color') == 'rgb(252, 237, 217)'){
						beginY = i;
						beginX = j;
						break outer;
					}
				}
			}
		}
		for(var fieldIndex in fields){
			if(fields[fieldIndex] == field){
				endX = parseInt(fieldIndex);
			}
		}
		if(endEditing()){
			for(var i = 0 ; i < rowLength ; i ++){
				var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
				$.each(cellRow,function(cellRowIndex,data){
					if($(data).css('background-color') == 'rgb(252, 237, 217)'){
						$(data).css('background-color','');
					}
				});
			}
			if(beginX != null && beginY != null && endX != null){
				if(index > beginY){
					for(var i = beginY ; i <= index ; i ++){
						var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
						if(endX > beginX){
							for(var j = beginX ; j <= endX ; j ++){
								if($(cellRow[j]).css('background-color') != 'rgb(252, 237, 217)' && $(cellRow[j]).css('background-color') != 'rgb(247, 247, 247)' && $(cellRow[j]).css('background-color') != 'rgb(231, 233, 234)'){
									$(cellRow[j]).css('background-color','rgb(252, 237, 217)');
								}
							}
						}else{
							for(var j = endX ; j <= beginX ; j ++){
								if($(cellRow[j]).css('background-color') != 'rgb(252, 237, 217)' && $(cellRow[j]).css('background-color') != 'rgb(247, 247, 247)' && $(cellRow[j]).css('background-color') != 'rgb(231, 233, 234)'){
									$(cellRow[j]).css('background-color','rgb(252, 237, 217)');
								}
							}
						}
					}
				}else{
					for(var i = index ; i <= beginY ; i ++){
						var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
						if(endX > beginX){
							for(var j = beginX ; j <= endX ; j ++){
								if($(cellRow[j]).css('background-color') != 'rgb(252, 237, 217)' && $(cellRow[j]).css('background-color') != 'rgb(247, 247, 247)' && $(cellRow[j]).css('background-color') != 'rgb(231, 233, 234)'){
									$(cellRow[j]).css('background-color','rgb(252, 237, 217)');
								}
							}
						}else{
							for(var j = endX ; j <= beginX ; j ++){
								if($(cellRow[j]).css('background-color') != 'rgb(252, 237, 217)' && $(cellRow[j]).css('background-color') != 'rgb(247, 247, 247)' && $(cellRow[j]).css('background-color') != 'rgb(231, 233, 234)'){
									$(cellRow[j]).css('background-color','rgb(252, 237, 217)');
								}
							}
						}
					}
				}
			}else{
				if(cell.css('background-color') != 'rgb(247, 247, 247)' && cell.css('background-color') != 'rgb(231, 233, 234)'){
					if(cell.css('background-color') == 'rgb(252, 237, 217)'){
						cell.css('background-color','');
					}else{
						cell.css('background-color','rgb(252, 237, 217)');
					}
				}
			}
		}
	}else{
		if(endEditing()){
			for(var i = 0 ; i < rowLength ; i ++){
				var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
				$.each(cellRow,function(cellRowIndex,data){
					if($(data).attr('field') == field && i == index){
						 if($(data).css('background-color') != 'rgb(247, 247, 247)' && $(data).css('background-color') != 'rgb(231, 233, 234)'){
							 if($(data).css('background-color') == 'rgb(252, 237, 217)'){
								 $(data).css('background-color','');
							 }else{
								 $(data).css('background-color','rgb(252, 237, 217)');
							 }
						 }
					}else{
						 if($(data).css('background-color') != 'rgb(247, 247, 247)' && $(data).css('background-color') != 'rgb(231, 233, 234)'){
							 $(data).css('background-color','');
						 }
					}
				});
			}
		}
	}
}
/**
 * 非事件新增明细行
 */
function noEventDetailAdd(){
	var isValid = $('#addNum').numberspinner('isValid');
	if(isValid){
		var listTable = $('#listTable');
		var allRows = listTable.datagrid('getRows');
		var length = allRows.length;
		var num = parseInt($('#addNum').val(),10);
		if(length + num > 999){
			$.messager.alert('警告','明细表数据不能超过999行！');
		}else{
			for(var i = 0 ; i < num ; i++){
				var defaultValues = new Object(); 
				if(typeof(detailDefaultValues) == "undefined"){
					defaultValues ={
						status:'1',
						deletedFlag:'0'	
					};
				}else{
					//复制detailDefaultValues
					for(var p in detailDefaultValues) { 
						var name=p;//属性名称 
						var value=detailDefaultValues[p];//属性对应的值 
						defaultValues[name]=detailDefaultValues[p]; 
					} 
				}
				listTable.datagrid('appendRow',defaultValues);
			}
			if (endEditing()){
				editIndex = length;
				var fistEditField = getFistEditField(listTable);
				listTable.datagrid('editCell', {index:editIndex,field:fistEditField});
				var editor = listTable.datagrid('getEditor', {index:editIndex,field:fistEditField});
				var eidtCellInput = $(editor.target[0].parentNode).find('.textbox-text.validatebox-text');
				if(eidtCellInput.length == 0){
					$(editor.target)[0].focus();
					$(editor.target).keydown(function(e){
						editCellTabDownFun(e,listTable,editIndex,fistEditField);
				    });
				}else{
					eidtCellInput[0].focus();
					eidtCellInput.keydown(function(e){
						editCellTabDownFun(e,listTable,editIndex,fistEditField);
				    });
				}
			}
		}
	}
}
/**
 * 新增明细
 */
function detailAdd(){
	var isValid = $('#addNum').numberspinner('isValid');
	if(isValid){
		var listTable = $('#listTable');
		var allRows = listTable.datagrid('getRows');
		var length = allRows.length;
		var num = parseInt($('#addNum').val(),10);
		if(length + num > 999){
			$.messager.alert('警告','明细表数据不能超过999行！');
		}else{
			if (endEditing()){
				var rows = [];
				for(var i = 0 ; i < num ; i++){
					var defaultValues = new Object(); 
					if(typeof(detailDefaultValues) == "undefined"){
						defaultValues ={
							status:'1',
							deletedFlag:'0'	
						};
					}else{
						//复制detailDefaultValues
						for(var p in detailDefaultValues) { 
							var name=p;//属性名称 
							var value=detailDefaultValues[p];//属性对应的值 
							defaultValues[name]=detailDefaultValues[p]; 
						} 
					}
					var data = {success:true,total: length + num};
					if(length != 0){
						rows = allRows;
					}
					rows.push(defaultValues);
				}
				data.rows = rows;
				listTable.datagrid('loadData',data);
				editIndex = length;
				var fistEditField = getFistEditField(listTable);
				listTable.datagrid('editCell', {index:editIndex,field:fistEditField});
				var editor = listTable.datagrid('getEditor', {index:editIndex,field:fistEditField});
				var eidtCellInput = $(editor.target[0].parentNode).find('.textbox-text.validatebox-text');
				if(eidtCellInput.length == 0){
					$(editor.target)[0].focus();
					$(editor.target).keydown(function(e){
						editCellTabDownFun(e,listTable,editIndex,fistEditField);
				    });
				}else{
					eidtCellInput[0].focus();
					eidtCellInput.keydown(function(e){
						editCellTabDownFun(e,listTable,editIndex,fistEditField);
				    });
				}
			}
		}
	}
}
/**
 * 删除明细
 */
function detailDelete(){
	var listTable = $('#listTable');
	var record = listTable.datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除这'+record.length+'条记录吗？', function(r){
			if (r){
				if(endEditing()){
					$.each(record,function(index,data){
						var row = listTable.datagrid('getRowIndex',data);
						data.deletedFlag = "1";
						listTable.datagrid('deleteRow',row);
					});
				}
			}
		});
	}
}
/**
 * 获取第一个可编辑field
 * @param listTable
 * @returns
 */
function getFistEditField(listTable){
	var firstField = null;
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	for(var i=0; i<fields.length; i++){
		var col = listTable.datagrid('getColumnOption', fields[i]);
		if(col.editor != undefined){
			firstField = fields[i];
			break;
		}
	}
	return firstField;
}
/**
 * 获取下一个可编辑field
 * @param i
 * @param listTable
 * @returns
 */
function getNextEditField(i,listTable){
	var nextEditField = null;
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	for(var i= i+1; i<fields.length; i++){
		var col = listTable.datagrid('getColumnOption', fields[i]);
		if(col.editor != undefined){
			nextEditField = fields[i];
			break;
		}
	}
	return nextEditField;
}
/**
 * 获取最后一个可编辑field
 * @param listTable
 * @returns
 */
function getLastEditField(listTable){
	var lastEditField = null;
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	for(var i= fields.length - 1; i >= 0; i--){
		var col = listTable.datagrid('getColumnOption', fields[i]);
		if(col.editor != undefined){
			lastEditField = fields[i];
			break;
		}
	}
	return lastEditField;
}
/**
 * 获取前一个可编辑field
 * @param i
 * @param listTable
 * @returns
 */
function getPreEditField(i,listTable){
	var preEditField = null;
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	for(var i= i-1; i >= 0; i--){
		var col = listTable.datagrid('getColumnOption', fields[i]);
		if(col.editor != undefined){
			preEditField = fields[i];
			break;
		}
	}
	return preEditField;
}
/**
 * 单元格编辑键盘事件
 * @param e
 * @param listTable
 * @param index
 * @param field
 */
function editCellTabDownFun(e,listTable,index,field){
	var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
	 var keyCode = e.which;
	 //tab →
	 if(keyCode == 9 || keyCode == 39){
		 var newField = null;
		 for(var i=0; i<fields.length; i++){
			 if(fields[i] == field){
				 if(i == fields.length - 1){
					 var rowsLength = listTable.datagrid('getRows').length;
					 if(index != rowsLength - 1){
						 newField = getFistEditField($('#listTable'));
   					 onClickCell(index+1,newField);
   					 listTable.datagrid('unselectRow', index+1);
					 }
				 }else{
					 newField = getNextEditField(i,listTable);
					 onClickCell(index,newField);
					 listTable.datagrid('unselectRow', index);
				 }
				 break;
			 }
		 }
	 }
	 //←
	 if(keyCode == 37){
		 var newField = null;
		 for(var i=0; i<fields.length; i++){
			 if(fields[i] == field){
				 var editFlag = 0;
				 if( i != 0){
					 for(var j = i-1; j >= 0 ; j --){
						 var col = listTable.datagrid('getColumnOption', fields[j]);
						 if(col.editor != undefined){
							 editFlag = 1;
							 break;
						 }
					 }
				 }
				 if(i == 0 || editFlag == 0){
					 if(index != 0){
						 newField = getLastEditField($('#listTable'));
   					 onClickCell(index-1,newField);
   					 listTable.datagrid('unselectRow', index-1);
					 }
				 }else{
					 newField = getPreEditField(i,listTable);
					 onClickCell(index,newField);
					 listTable.datagrid('unselectRow', index);
				 }
				 break;
			 }
		 }
	 }
	 //↑
	 if(keyCode == 38){
		 for(var i=0; i<fields.length; i++){
			 if(fields[i] == field){
				 if(index != 0){
					 onClickCell(index - 1,field);
					 listTable.datagrid('unselectRow', index - 1);
				 }
				 break;
			 }
		 }
	 }
	 //↓
	 if(keyCode == 40){
		 for(var i=0; i<fields.length; i++){
			 if(fields[i] == field){
				 var rowsLength = listTable.datagrid('getRows').length;
				 if(index != rowsLength - 1){
					 onClickCell(index + 1,field);
					 listTable.datagrid('unselectRow', index + 1);
				 }
				 break;
			 }
		 }
	 }
}
/*//*
function onClickRow(index){
	var listTable = $('#listTable');
	if(editIndex != undefined){
		var valid = listTable.datagrid('validateRow',editIndex);
		if(valid){
			listTable.datagrid('endEdit', editIndex);
		}else{
			return;
		}
		listTable.datagrid('endEdit', editIndex);
	}
	listTable.datagrid('unselectRow', index)
	.datagrid('beginEdit', index);
	editIndex = index;
}*/

/**新增行
 * pms{
 * model:明细模块代码
 * }*//*
function detailAdd(){
	var isValid = $('#addNum').numberspinner('isValid');
	if(isValid){
		var listTable = $('#listTable');
		if(editIndex != undefined){
			var valid = listTable.datagrid('validateRow',editIndex);
			if(valid){
				listTable.datagrid('endEdit', editIndex);
			}else{
				return;
			}
		}
		var allRows = listTable.datagrid('getRows');
		var length = allRows.length;
		var num = parseInt($('#addNum').val(),10);
		if(length + num > 999){
			$.messager.alert('警告','明细表数据不能超过999行！');
		}else{
			var defaultValues = new Object(); 
			if(typeof(detailDefaultValues) == "undefined"){
				defaultValues ={
					status:'1',
					deletedFlag:'0'	
				};
			}else{
				//复制detailDefaultValues
				for(var p in detailDefaultValues) { 
					var name=p;//属性名称 
					var value=detailDefaultValues[p];//属性对应的值 
					defaultValues[name]=detailDefaultValues[p]; 
				} 
			}
			var data = {success:true,total: length + num};
			var rows = [];
			if(length != 0){
				rows = allRows;
			}
			for(var i = 0 ; i < num ; i++){
				rows.push(defaultValues);
			}
			data.rows = rows;
			listTable.datagrid('loadData',data);
			editIndex = length;
			listTable.datagrid('beginEdit', length);
		}
	}
}
*//**删除行
 * pms{
 * model:明细模块代码
 * }*//*
function detailDelete(){
	var listTable = $('#listTable');
	var record = listTable.datagrid('getSelections');
	var length = record.length;
	if(length < 1){
		$.messager.alert('警告','请选择一条数据！');
	}else{
		$.messager.confirm('提示', '确定要删除这'+record.length+'条记录吗？', function(r){
			if (r){
				if(editIndex != undefined){
					var valid = listTable.datagrid('validateRow',editIndex);
					if(valid){
						listTable.datagrid('endEdit', editIndex);
					}else{
						return;
					}
				}
				editIndex = undefined;
				$.each(record,function(index,data){
					var row = listTable.datagrid('getRowIndex',data);
					data.deletedFlag = "1";
					listTable.datagrid('deleteRow',row);
				});
			}
		});
	}
}*/
/**
 * 清空
 */
function detailClear(){
	var listTable = $('#listTable');
	$.messager.confirm('提示', '确定要清空吗？', function(r){
		if (r){
			$('#listTable').datagrid('loadData',{success:true,total: 0, rows: [] });
		}
	});
}
var nav4 = window.Event ? true : false; //初始化变量
/**
 * 键盘按下事件方法
 * @param e
 * @returns {Boolean}
 */
function keyBoardDown(e) { //函数:判断键盘Shift按键
	if(nav4) { //对于Netscape浏览器
		//判断是否按下Shift按键
		if((typeof(e.shiftKey) != 'undefined') ? e.shiftKey : e.modifiers && Event.CONTROL_MASK > 0) {
			isShift = true;
		}
		//判断是否按下Ctrl按键
		if((typeof(e.ctrlKey) != 'undefined') ? e.ctrlKey : e.modifiers && Event.CONTROL_MASK > 0) {
			isCtrl = true;
		}
		if(e.keyCode == 80){
			var listTable = $('#listTable');
			if(listTable != null){
				var rows = listTable.datagrid('getRows');
				var rowLength = rows.length;
				//获取listTable field
				var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
				var beginX = [];
				var beginY = [];
				//获取选中的单元格
				for(var i = 0 ; i < rowLength ; i ++){
					var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
					for(var j = 0 ; j < cellRow.length ; j ++){
						if($(cellRow[j]).css('background-color') == 'rgb(252, 237, 217)'){
							if($.inArray(j,beginX)== -1) {
								beginX.push(j);
							}
							if($.inArray(i,beginY)== -1) {
								beginY.push(i);
							}
						}
					}
				}
				var rows = listTable.datagrid('getRows');
				//给选中的单元格赋值
				for(var i = 1 ; i < beginY.length ; i ++){
					var cellTdArry = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+beginY[i]+'"].datagrid-row').find('td[field]');
					for(var j = 0 ; j < beginX.length ; j ++){
						var field = $(cellTdArry[beginX[j]]).attr('field');
						if(field != 'earBrand' && field != 'breedBoarFirst' && field != 'breedBoarSecond' && field != 'breedBoarThird' &&  field != 'boardSowId'){
							rows[beginY[i]][field] = rows[beginY[0]][field];
							if(rows[beginY[0]][field+'Name'] != undefined){
								rows[beginY[i]][field+'Name'] = rows[beginY[0]][field+'Name'];
							}
						}else{
							$.messager.alert('警告',field + '不支持p功能请重新选择！');
							return;
						}
					}
				}
				//刷新选中单元格
				setTimeout(function () {
					for(var i = 0 ; i < beginY.length ; i ++){
						if(typeof(eventName) != 'undefined'){
							if(eventName == 'GOOD_PIG_SELL'){
								var row = $('#listTable').datagrid('getRows')[beginY[i]];
								if(row.saleNum != undefined && row.baseWeight != undefined){
									var saleNum = parseInt(row.saleNum == ''? 0 : row.saleNum),
									baseWeight = parseFloat(row.baseWeight == ''? 0 : row.baseWeight),
									baseUnitPrice = parseFloat(row.baseUnitPrice == '' || row.baseUnitPrice == undefined ? 0 : row.baseUnitPrice);
									row.unitPricePrice = (saleNum  * baseWeight * baseUnitPrice).toFixed(2);
								}
								if(row.saleNum != undefined && row.totalWeight != undefined && row.baseWeight != undefined){
									var saleNum = parseInt(row.saleNum == ''? 0 : row.saleNum),
									baseWeight = parseFloat(row.baseWeight == ''? 0 : row.baseWeight),
									totalWeight = parseFloat(row.totalWeight == ''? 0 : row.totalWeight);
									row.overWeight = (totalWeight - saleNum  * baseWeight ).toFixed(2);
									if(row.overUnitPrice != undefined){
										var overUnitPrice = parseFloat(row.overUnitPrice == ''? 0 : row.overUnitPrice);
										row.overPrice = ((totalWeight - saleNum  * baseWeight )*overUnitPrice).toFixed(2);
									}
								}
								if(row.saleNum != undefined && row.baseWeight != undefined && row.overWeight != undefined && row.overUnitPrice != undefined ){
									var saleNum = parseInt(row.saleNum == ''? 0 : row.saleNum),
									baseWeight = parseFloat(row.baseWeight == ''? 0 : row.baseWeight),
									baseUnitPrice = parseFloat(row.baseUnitPrice == '' || row.baseUnitPrice == undefined ? 0 : row.baseUnitPrice),
									overWeight = parseFloat(row.overWeight == ''? 0 : row.overWeight),
									overUnitPrice = parseFloat(row.overUnitPrice == ''? 0 : row.overUnitPrice);
									row.totalPrice = (baseWeight*saleNum*baseUnitPrice + overWeight  * overUnitPrice).toFixed(2);
								}else if(row.saleNum != undefined && row.preUnitPrice != undefined){
									var saleNum = parseInt(row.saleNum == ''? 0 : row.saleNum),
									preUnitPrice = parseFloat(row.preUnitPrice == ''? 0 : row.preUnitPrice);
									overWeight = parseFloat(row.overWeight == '' || row.overWeight == undefined? 0 : row.overWeight),
									overUnitPrice = parseFloat(row.overUnitPrice == '' || row.overUnitPrice == undefined? 0 : row.overUnitPrice);
									row.totalPrice = (saleNum*preUnitPrice + overWeight  * overUnitPrice).toFixed(2);
								}else if(row.totalWeight != undefined && row.totalUnitPrice != undefined){
									var totalWeight = parseFloat(row.totalWeight == ''? 0 : row.totalWeight),
									totalUnitPrice = parseFloat(row.totalUnitPrice == ''? 0 : row.totalUnitPrice);
									row.totalPrice = (totalWeight*totalUnitPrice).toFixed(2);
								}
							}
							if(eventName == 'DELIVERY'){
								var row = $('#listTable').datagrid('getRows')[beginY[i]];
								var healthyNum = parseInt(row.healthyNum == undefined || row.healthyNum == '' ? 0 : row.healthyNum),
								weakNum = parseInt(row.weakNum == undefined || row.weakNum == '' ? 0 : row.weakNum);
								if(RZBSCL_flag == "OFF" || RZBSCL_flag == 'off'){
									//活仔公
									var zeroFlag = false;
									if(parseInt(row.aliveLitterY) + parseInt(row.aliveLitterX) > parseInt(row.healthyNum) + parseInt(row.weakNum)){
										$.messager.alert('提示', '第'+(beginY[i]+1)+'行活仔公数量+活仔母数量大于健仔数+弱仔数,请重新输入！');
										zeroFlag = true;
									}else{
										if(row.aliveLitterY != undefined && row.aliveLitterY != ''){
											row.aliveLitterX =  healthyNum + weakNum - parseInt(row.aliveLitterY);
										}else if(row.aliveLitterX != undefined && row.aliveLitterX != ''){
											row.aliveLitterY = healthyNum + weakNum - parseInt(row.aliveLitterX);
										}
									}
									if(zeroFlag){
										row.aliveLitterY = 0;
										row.aliveLitterX = 0;
									}
								}else{
									//活仔公
									var zeroFlag = false;
									if(parseInt(row.aliveLitterY) + parseInt(row.aliveLitterX) > parseInt(row.healthyNum)){
										$.messager.alert('提示', '第'+(beginY[i]+1)+'行活仔公数量+活仔母数量大于健仔数,请重新输入！');
										zeroFlag = true;
									}else{
										if(row.aliveLitterY != undefined && row.aliveLitterY != ''){
											row.aliveLitterX =  healthyNum - parseInt(row.aliveLitterY);
										}else if(row.aliveLitterX != undefined && row.aliveLitterX != ''){
											row.aliveLitterY = healthyNum - parseInt(row.aliveLitterX);
										}
									}
									if(zeroFlag){
										row.aliveLitterY = 0;
										row.aliveLitterX = 0;
									}
								}
							}
							if(eventName == 'WEAN'){
								var row = $('#listTable').datagrid('getRows')[beginY[i]];
								var weanNum = parseInt(row.weanNum == undefined || row.weanNum == '' ? 0 : row.weanNum),
								dieNum = parseInt(row.dieNum == undefined || row.dieNum == '' ? 0 : row.dieNum),
								pigQty = parseInt(row.pigQty == undefined || row.pigQty == '' ? 0 : row.pigQty);
								var zeroFlag = false;
								if(weanNum + dieNum> pigQty){
									$.messager.alert('提示', '第'+(beginY[i]+1)+'断奶仔猪数+死亡仔猪数大于带仔数,请重新输入！');
									zeroFlag = true;
								}else{
									if(row.weanNum != undefined && row.weanNum != ''){
										row.dieNum = pigQty - strToInt(row.weanNum);
									}else if(row.dieNum != undefined && row.dieNum != ''){
										row.weanNum = pigQty - strToInt(row.dieNum);
									}
								}
								if(zeroFlag){
									row.weanNum = pigQty;
									row.dieNum = 0;
								}
							}
						}
						listTable.datagrid('refreshRow',beginY[i]);
					}
					if(typeof(eventName) != 'undefined'){
						if(eventName == 'GOOD_PIG_SELL'){
							var rows = $('#listTable').datagrid('getRows');
							var sellNumSum = 0,totalWeightSum = 0,totalPriceSum = 0;
							$.each(rows,function(i,item){
								sellNumSum += parseInt(item.saleNum == '' || item.saleNum == undefined ? 0 : item.saleNum);
								totalWeightSum += parseFloat(item.totalWeight == '' || item.totalWeight == undefined? 0 : item.totalWeight);
								totalPriceSum += parseFloat(item.totalPrice == '' || item.totalPrice == undefined? 0 : item.totalPrice);
							});
							$('#sellNumSum').html(sellNumSum);
							$('#weightSum').html(totalWeightSum.toFixed(2));
							$('#weightAvg').html((totalWeightSum/sellNumSum).toFixed(2));
							$('#moneySum').html(totalPriceSum.toFixed(2));
							$('#moneyAvg').html((totalPriceSum/sellNumSum).toFixed(2));
						}
						if(eventName == 'DELIVERY'){
							var rows = $('#listTable').datagrid('getRows');
							var healthyNumSum = 0,weakNumSum = 0;
							$.each(rows,function(i,item){
								healthyNumSum += parseInt(item.healthyNum == '' || item.healthyNum == undefined ? 0 : item.healthyNum);
								weakNumSum += parseInt(item.weakNum == '' || item.weakNum == undefined ? 0 : item.weakNum);
							});
							$('#healthyNumSum').html(healthyNumSum);
							$('#weakNumSum').html(weakNumSum);
						}
						if(eventName == 'FOSTER'){
							var rows = $('#listTable').datagrid('getRows');
							var fosterQtySum = 0;
							$.each(rows,function(i,item){
								fosterQtySum += parseInt(item.fosterQty == '' || item.fosterQty == undefined ? 0 : item.fosterQty);
							});
							$('#fosterQtySum').html(fosterQtySum);
						}
						if(eventName == 'WEAN'){
							var rows = $('#listTable').datagrid('getRows');
							var weanNumSum = 0,dieNumSum = 0;
							$.each(rows,function(i,item){
								weanNumSum += parseInt(item.weanNum == '' || item.weanNum == undefined ? 0 : item.weanNum);
								dieNumSum += parseInt(item.dieNum == '' || item.dieNum == undefined ? 0 : item.dieNum);
							});
							$('#weanNumSum').html(weanNumSum);
							$('#dieNumSum').html(dieNumSum);
						}
					}
					
				 },100);
			}
		}
		if(e.keyCode == 86 && isCtrl){
			if(window.clipboardData != undefined){
				var data = window.clipboardData.getData("text");
		        var textArray = data.split("\n");
		        if (textArray[textArray.length - 1].length == 0) {
		            textArray.splice(textArray.length - 1, 1);
		        }
		        var array = [];
		        for (var i = 0; i < textArray.length; i++) {
		            array.push(textArray[i].split('\t'));
		        }
		        pasteExcelToGrid(array);
			}
		}
		if(e.keyCode == 67 && isCtrl){
			if(window.clipboardData != undefined){
				var cpTxt = copyGridDataToExcel(); 
		        var clipboardData = window.clipboardData; //for IE  
		        clipboardData.setData('Text', cpTxt);  
			}
		}
	} else {
		//对于IE浏览器，判断是否按下Shift按键
		if(window.event.shiftKey) {
			isShift = true;
			isCtrl = true;
		}
	}
	if(e.which == 1 && (e.shiftKey || e.ctrlKey)){
    	return false; //非常重要
    }
}
/**
 * 键盘上升方法
 * @param e
 */
function keyBoardUp(e){
	isShift = false;
	isCtrl = false;
}
/**
 * 显示导入页面
 */
function importWinShow(){
	if($('#eventImport') != null){
		leftSilpFun('eventImport',true,9001);
	}
}
/**
 * 导入重置方法
 */
function onBtnReImport(){
	$('#importImport').form('reset');
}
/**
 * 下载事件导入模板
 */
function downLoadEventTemplate(downTemplateParam){
//		window.location.href= basicUrl +'/ImpExp/downExcelTemplate.do?'+downTemplateParam;
    	var downLoadUrl = '/ExpImp/downExcelTemplate.do?'+downTemplateParam+'&downFlag=false';
    	var downLoadData = {};
    	jAjax.submit(downLoadUrl,downLoadData,function(response){
    	window.location.href= basicUrl +'/ExpImp/downExcelTemplate.do?'+downTemplateParam+'&downFlag=true';
    	},null,null,true,null,false);
}
/**
 * 导入
 */
function onBtnImport(importParam){
    
    var formData = new FormData($("#importForm")[0]);
    formData.append("xmlName",importParam.xmlName);
    $.messager.progress();	

	    $.ajax({
		url : basicUrl + "/excel/upload.do",
		type : "POST",
		data : formData,
		async : true,
		cache : false,
		contentType : false,
		processData : false,
		success : function(response) {
			$.messager.progress('close');
			response = eval('(' + response + ')');
			if (response.success) {
				// var data = response.rows;
				$('#table').datagrid('loadData', response);
				rightSlipFun('eventImport', 390, true);
			} else {
				jAjax.errorFunc(response.errorMsg);
			}
		},
		error : function(response) {
			$.messager.progress('close');
			jAjax.errorFunc("网络异常。。。请联系维护人员");
		}
	});
    
// var formData = new FormData($("#importForm")[0]);
// $.ajax({
//	       url: basicUrl+"/excel/upload.do",  
//	       type: 'POST',  
//               data : formData,  
//               processData : false,  
//               contentType : false,
//	       success: function (returndata) {  
//	            alert(returndata);  
//	       },  
//	       error: function (returndata) {  
//	            alert(returndata);  
//	       }  
//	     });  
	
}
/**
 * 返回目标显示值
 * @param pms
 * pms.tarType 目标元素类型
 * pms.target 目标元素
 * pms.tarName 目标元素Row中可以现实的field
 * pms.tarFiled 目标元素field
 * @param row
 */
function returnTarName(pms,row){
	var tarRows = null;
	var text = null;
	if(pms.tarType == 'grid'){
		tarRows = $(pms.target).combogrid('grid').datagrid('getRows');
		text = $(pms.target).combogrid('getText');
	}
	if(pms.tarType == 'combobox'){
		tarRows = $(pms.target).combobox('getData');
		text = $(pms.target).combobox('getText')
	}
	var i = -1;
	$.each(tarRows,function(t,tData){
		if(tData[pms.tarName] == text){
			i = t;
			return false;
		}
	});
	if(i != -1){
		row[pms.tarFiled + 'Name'] = tarRows[i][pms.tarName];
	}else{
		row[pms.tarFiled + 'Name'] = '';
		row[pms.tarFiled] = '';
	}
}
//从excel复制数据到grid
function pasteExcelToGrid(arry){
	var listTable = $('#listTable');
	if(listTable != null){
		var rows = listTable.datagrid('getRows');
		var rowLength = rows.length;
		//获取listTable field
		var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
		var beginX = [];
		var beginY = [];
		//获取选中的单元格
		for(var i = 0 ; i < rowLength ; i ++){
			var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
			for(var j = 0 ; j < cellRow.length ; j ++){
				if($(cellRow[j]).css('background-color') == 'rgb(252, 237, 217)'){
					if($.inArray(j,beginX)== -1) {
						beginX.push(j);
					}
					if($.inArray(i,beginY)== -1) {
						beginY.push(i);
					}
				}
			}
		}
		var rows = listTable.datagrid('getRows');
		//给选中的单元格赋值
		var pigData = [];
		for(var i = 0 ; i < beginY.length ; i ++){
			var cellTdArry = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+beginY[i]+'"].datagrid-row').find('td[field]');
			if(i < arry.length){
				for(var j = 0 ; j < beginX.length ; j ++){
					if(j < arry[i].length){
						var field = $(cellTdArry[beginX[j]]).attr('field');
						rows[beginY[i]][field] = arry[i][j];
						var copyIndex = i;
						if(field == 'earBrand' && typeof(eventName) != 'undefined'){
							if(i == 0){
								pigData = jAjax.submit('/production/searchValidPigToPage.do',{
									queryType:1,
					            	pigType:oldPigType,
					            	specifyPigs:0,
					            	choice:1,
					            	eventName:eventName
								});
							}
							var pigRow = searchPigByEarBrand(arry[i][j],pigData);
							if(pigRow != null){
								rows[beginY[i]].pigId = pigRow.pigId;
								rows[beginY[i]].earBrand = pigRow.earBrand;
								rows[beginY[i]].pigInfo = pigRow.pigInfo;
								rows[beginY[i]].minValidDate = pigRow.minValidDate;
								rows[beginY[i]].maxValidDate = pigRow.maxValidDate;
								rows[beginY[i]].enterDate = pigRow.lastEventDate;
								rows[beginY[i]].houseId = pigRow.houseId;
								if(eventName == 'WEAN' || eventName == 'CHILD_PIG_DIE' || eventName == 'FOSTER'){
									rows[editIndex].pigQty = pigRow.pigQty;
									if(eventName == 'WEAN' && (dnflag == 'ON' || dnflag == 'on')){
										rows[beginY[i]].weanNum = pigRow.pigQty;
										rows[beginY[i]].dieNum = 0;
										var weanNumSum = 0,dieNumSum = 0;
										$.each(rows,function(n,item){
											weanNumSum += strToInt(item.weanNum);
											dieNumSum += strToInt(item.dieNum);
										});
										$('#weanNumSum').html(weanNumSum);
										$('#dieNumSum').html(dieNumSum);
									}
								}
							}
						}
					}
				}
			}
		}
		setTimeout(function () {
			for(var i = 0 ; i < beginY.length ; i ++){
				listTable.datagrid('refreshRow',beginY[i]);
			}
		},100);
	}
}
//从grid中复制数据到excel
function copyGridDataToExcel(){
	var resultDate = "";
	var listTable = $('#listTable');
	if(listTable != null){
		var rows = listTable.datagrid('getRows');
		var rowLength = rows.length;
		//获取listTable field
		var fields = listTable.datagrid('getColumnFields',true).concat(listTable.datagrid('getColumnFields'));
		var beginX = [];
		var beginY = [];
		//获取选中的单元格
		for(var i = 0 ; i < rowLength ; i ++){
			var cellRow = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+i+'"].datagrid-row').find('td[field]');
			for(var j = 0 ; j < cellRow.length ; j ++){
				if($(cellRow[j]).css('background-color') == 'rgb(252, 237, 217)'){
					if($.inArray(j,beginX)== -1) {
						beginX.push(j);
					}
					if($.inArray(i,beginY)== -1) {
						beginY.push(i);
					}
				}
			}
		}
		var rows = listTable.datagrid('getRows');
		for(var i = 0 ; i < beginY.length ; i ++){
			var cellTdArry = $('#editWin').find('.datagrid-view').find('tr[datagrid-row-index="'+beginY[i]+'"].datagrid-row').find('td[field]');
				for(var j = 0 ; j < beginX.length ; j ++){
					var field = $(cellTdArry[beginX[j]]).attr('field');
					if( j !=  beginX.length - 1){
						if(rows[beginY[i]][field+'Name'] != undefined){
							resultDate += rows[beginY[i]][field+'Name'] + '\t';
						}else{
							resultDate += rows[beginY[i]][field] + '\t';
						}
					}else{
						if(rows[beginY[i]][field+'Name'] != undefined){
							resultDate += rows[beginY[i]][field+'Name'];
						}else{
							resultDate += rows[beginY[i]][field];
						}
					}
				}
				if(i != beginY.length - 1){
					resultDate += '\n';
				}
		}
	}
	return resultDate;
}
function searchPigByEarBrand(earBrand,pigData){
	var returnData = null;
	$.each(pigData,function(i,item){
		if(item.earBrand == earBrand){
			returnData = item;
			return false;
		}
	});
	return returnData;
}
/** ***************明细表方法结束**************************************************************/
