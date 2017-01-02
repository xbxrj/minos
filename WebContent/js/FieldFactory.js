/**
 * 批次comboGird
 * @param pms
 * @returns
 */
function swineryComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'swineryId' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'swineryName' : pms.textField,
		width:pms.width == null ? 550 :pms.width,
		required:pms.required == null ? false : pms.required,
		url:pms.url == null ? null :pms.url,
		columns:pms.columns == null ? [[ 	
		           	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'批次代码',width:100},
			        {field:'swineryName',title:'批次名称',width:100},
			        {field:'pigQty',title:'猪只数量',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 猪舍comboGird
 * @param pms
 * @returns
 */
function houseComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'houseId' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'houseName' : pms.textField,
		url:pms.url == null ? null :pms.url,
		width:pms.width == null ? 550 :pms.width,
		required:pms.required == null ? false : pms.required,
		columns:pms.columns == null ? [[ 	
                	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'猪舍代码',width:100},
			        {field:'houseName',title:'猪舍名称',width:100},
			        {field:'houseVolume',title:'猪舍容量',width:100},
			        {field:'pigQty',title:'猪只数量',width:100},
			        {field:'houseTypeName',title:'猪舍类别',width:100},
			        {field:'notes',title:'备注',fitColumns:true}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 猪只状态ComboGrid
 * @param pms
 * @returns
 */
function pigClassComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'pigClass' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'pigClassName' : pms.textField,
		width:pms.width == null ? 550 :pms.width,
		url:pms.url,
		required:pms.required == null ? false : pms.required,
		columns:pms.columns == null ? [[ 	
                	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'状态代码',width:100},
			        {field:'pigClassName',title:'状态名称',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 供应商ComboGrid
 * @param pms
 * @returns
 */
function supplierComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'supplierId' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'companyName' : pms.textField,
		width:pms.width == null ? 550 :pms.width,
		url:pms.url == null ?  '/basicInfo/searchCustomerAndSupplierToList.do?cussupType=S' :pms.url,
		required:pms.required == null ? false : pms.required,
		columns:pms.columns == null ? [[ 	
                	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'companyCode',title:'供应商编码',width:100},
			        {field:'companyName',title:'供应商名称',width:100},
			        {field:'companyNameEn',title:'英文名称',width:100}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 客户ComboGrid
 * @param pms
 * @returns
 */
function customerComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'customerId' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'companyName' : pms.textField,
		width:pms.width == null ? 550 :pms.width,
		url:pms.url == null ?  '/basicInfo/searchCustomerAndSupplierToList.do?cussupType=C' :pms.url,
		required:pms.required == null ? false : pms.required,
		columns:pms.columns == null ? [[ 	
                	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'companyCode',title:'客户编码',width:100},
			        {field:'companyName',title:'客户名称',width:100},
			        {field:'companyNameEn',title:'英文名称',width:100}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 物料名称comboGird
 * @param psm
 * @returns
 */
function materialComboGrid(pms){
	var result = xnComboGrid({
		id:pms.id == null ? 'materialId' : pms.id,
		idField:pms.idField == null ? 'rowId' : pms.idField,
		textField:pms.textField == null ? 'materialName' : pms.textField,
		width:pms.width == null ? 550 :pms.width,
		url:pms.url,
		required:pms.required == null ? false : pms.required,
		columns:pms.columns == null ? [[ 	
                	{field:'rowId',title:'ID',width:100,hidden:true},
			        {field:'businessCode',title:'物料代码',width:100},
			        {field:'materialName',title:'物料名称',width:100},
			        {field:'materialTypeName',title:'物料类型',width:100},
			        {field:'notes',title:'备注',width:100}
			    ]] : pms.columns
			});
	return result;
}
/**
 * 物料grid编辑
 * @param pms
 * @returns
 */
function materialGridComboGrid(pms){
	var result = {
		width:pms.width == null ? null : pms.width,
		field:pms.field == null ? 'materialId' : pms.field,
		title:pms.title == null ? '物料名称' : pms.title,
        formatter:pms.formatter == null ? function(value,row){
           return row.materialIdName;  
		} : pms.formatter,
		editor:
			xnGridComboGrid({
				field:pms.field == null ? 'materialId' : pms.field,
				idField:pms.idField == null ? 'rowId' : pms.idField,
				textField:pms.textField == null ? 'materialName' : pms.textField,
				width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
				url:pms.url,
				columns:pms.columns == null ? [[ 	
							{field:'rowId',title:'ID',width:100,hidden:true},
							{field:'businessCode',title:'物料代码',width:100},
							{field:'materialName',title:'物料名称',width:100},
							{field:'materialTypeName',title:'物料类型',width:100},
							{field:'notes',title:'备注',width:100}
					    ]] : pms.columns
  			})
      	}	
	return result;
}
/**
 * 猪舍grid编辑
 * @param pms
 * @returns {___anonymous4549_5528}
 */
function houseGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'houseId' : pms.field,
			title:pms.title == null ? '猪舍名称' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.houseIdName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'houseId' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'houseName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url == null ? null : pms.url,
					onChange:pms.onChange == null ? function(newValue,oldValue){
						return;
						}:pms.onChange,
					onSelect:pms.onSelect == null ? function(index,row){
					return;
					}:pms.onSelect,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'businessCode',title:'猪舍代码',width:100},
						        {field:'houseName',title:'猪舍名称',width:100},
						        {field:'houseVolume',title:'猪舍容量',width:100},
						        {field:'pigQty',title:'猪只数量',width:100},
						        {field:'houseTypeName',title:'猪舍类别',width:100},
						        {field:'notes',title:'备注',fitColumns:true}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 猪栏grid编辑
 * @param pms
 * @returns {___anonymous4549_5528}
 */
function pigpenGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'pigpen' : pms.field,
			title:pms.title == null ? '猪栏' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.pigpenName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'pigpen' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'pigpenName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url == null ? null : pms.url,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'businessCode',title:'猪栏代码',width:100},
						        {field:'pigpenName',title:'猪栏名称',width:100},
						        {field:'length',title:'长度',width:100},
						        {field:'width',title:'宽度',width:100},
						        {field:'pigNum',title:'猪只容量',width:100},
						        {field:'pigQty',title:'已有猪只数',width:100},
						        {field:'notes',title:'备注',fitColumns:true}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 批次grid编辑
 * @param pms
 * @returns {___anonymous4549_5528}
 */
function swineryGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'swineryId' : pms.field,
			title:pms.title == null ? '批次名称' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.swineryIdName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'swineryId' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'swineryName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url == null ? null : pms.url,
					onChange:pms.onChange == null ? function(newValue,oldValue){
						return;
						}:pms.onChange,
					onSelect:pms.onSelect == null ? function(index,row){
					return;
					}:pms.onSelect,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'businessCode',title:'批次代码',width:100},
						        {field:'swineryName',title:'批次名称',width:100},
						        {field:'pigQty',title:'猪只数量',width:100},
						        {field:'notes',title:'备注',width:100}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 猪只状态grid编辑
 * @param pms
 * @returns {___anonymous5759_6817}
 */
function pigClassGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'pigClass' : pms.field,
			title:pms.title == null ? '猪只状态' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.pigClassName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'pigClass' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'pigClassName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'businessCode',title:'状态代码',width:100},
						        {field:'pigClassName',title:'状态名称',width:100},
						        {field:'notes',title:'备注',width:100}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 人员grid编辑
 * @param pms
 * @returns {___anonymous5759_6817}
 */
function workerGridComboGrid(pms){
	var result = {
			width:pms.width == null ? 50 : pms.width,
			field:pms.field == null ? 'worker' : pms.field,
			title:pms.title == null ? '技术员' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.workerName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'worker' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'employeeName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url: pms.url,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
								{field:'employeeName',title:'人员名称',width:100},
						        {field:'employeeCode',title:'人员编码',width:100}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 供应商grid编辑
 * @param pms
 * @returns {___anonymous5759_6817}
 */
function supplierGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'supplierId' : pms.field,
			title:pms.title == null ? '供应商' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.supplierIdName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'supplierId' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'companyName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url == null ? '/basicInfo/searchCustomerAndSupplierToList.do?cussupType=S': pms.url,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'companyCode',title:'客户编码',width:100},
						        {field:'companyName',title:'客户名称',width:100},
						        {field:'companyNameEn',title:'英文名称',width:100}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 客户grid编辑
 * @param pms
 * @returns {___anonymous5759_6817}
 */
function customerGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'customerId' : pms.field,
			title:pms.title == null ? '客户' : pms.title,
	        formatter:pms.formatter == null ? function(value,row){
	           return row.customerName;  
			} : pms.formatter,
			editor:
				xnGridComboGrid({
					field:pms.field == null ? 'customerId' : pms.field,
					idField:pms.idField == null ? 'rowId' : pms.idField,
					textField:pms.textField == null ? 'companyName' : pms.textField,
					width:pms.combogridWidth == null ? 550 : pms.combogridWidth,
					url:pms.url == null ? '/basicInfo/searchCustomerAndSupplierToList.do?cussupType=S': pms.url,
					columns:pms.columns == null ? [[ 	
								{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'companyCode',title:'客户编码',width:100},
						        {field:'companyName',title:'客户名称',width:100},
						        {field:'companyNameEn',title:'英文名称',width:100}
						    ]] : pms.columns
	  			})
	      	}	
		return result;
}
/**
 * 耳牌号gird编辑
 * @param pms
 * @returns {___anonymous6847_6856}
 */
function earBrandGridComboGrid(pms){
	var result = {
			width:pms.width == null ? 100 : pms.width,
			field:pms.field == null ? 'earBrand' : pms.field,
			title:pms.title == null ? '耳牌号' : pms.title,
			editor:{
				type:'combogrid',
				options:{
					panelWidth:pms.combogridWidth == null ? 500 : pms.combogridWidth,
					idField:pms.idField == null ? 'earBrand' : pms.idField,
					textField:pms.textField == null ? 'earBrand' : pms.idField,
					required:pms.required == null ? false : pms.required,
					validType:'numOrLetterOr_',
					rowStyler: function(index,row){
						if ((index+1) % 2 == 0){
							return 'background-color:#f7f7f7;';
						}
					},
					columns:pms.columns == null ? [[
								{field:'rowId',title:'ID',width:100,hidden:true},
								{field:'houseId',title:'HID',width:100,hidden:true},
								{field:'earBrand',title:'耳牌号',width:200},
								{field:'breedName',title:'品种',width:80},
								{field:'swineryName',title:'批次名称',width:100},
								{field:'houseName',title:'猪舍名称',width:100},
								{field:'pigTypeName',title:'猪只类别',width:100},
								{field:'pigpenName',title:'猪栏名称',width:100},
								{field:'pigClassName',title:'生产状态',width:100}  
	                       ]] : pms.columns,
				    fitColumns: true,
				    rownumbers:true,
				    onChange:pms.onChange == null ? function(newValue,oldValue){
				    	if(editIndex == undefined){
				    		return;
				    	}
				    	var hasSelectRows = $('#listTable').datagrid('getData').rows;
			        	var pigIdsArray = [];
			        	$.each(hasSelectRows,function(i,data){
			        		if(data.pigId != null && data.pigId != '' && i != editIndex){
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
				    	var earBrandGrid = $(this).combogrid('grid');
				    	var newData = [];
				    	$.ajax({  
				            url : basicUrl+'/production/searchValidPigToPage.do', 
				            data:{
				            	queryType:1,
				            	query:newValue,
				            	pigType:oldPigType,
				            	specifyPigs:0,
				            	choice:1,
				            	eventName:eventName,
				            	pigIds:pigIds
				            },
				            async : false, 
				            type : "POST",  
				            dataType : "json",  
				            success : function(response) {
				            	if(response.success){
				            		newData = response.rows;
				            	}else{
				            		 $.messager.alert({
				                         title: '错误',
				                         msg: response.errorMsg
				                     });
				            	}
				            }  
				        }); 
				    	earBrandGrid.datagrid('loadData',newData)
					}:pms.onChange,
					onSelect:pms.onSelect == null ? function(index,row){
						if(editIndex == undefined){
							return;
						}
						var rows = $('#listTable').datagrid('getRows');
						rows[editIndex].pigId = row.pigId;
						rows[editIndex].earBrand = row.earBrand;
						rows[editIndex].pigInfo = row.pigInfo;
						rows[editIndex].minValidDate = row.minValidDate;
						rows[editIndex].maxValidDate = row.maxValidDate;
						rows[editIndex].enterDate = row.lastEventDate;
						rows[editIndex].houseId = row.houseId;
						if(eventName == 'WEAN' || eventName == 'CHILD_PIG_DIE' || eventName == 'FOSTER'){
							rows[editIndex].pigQty = row.pigQty;
							if(eventName == 'WEAN' && (dnflag == 'ON' || dnflag == 'on')){
								rows[editIndex].weanNum = row.pigQty;
								rows[editIndex].dieNum = 0;
								var weanNumSum = 0,dieNumSum = 0;
								$.each(rows,function(i,item){
									weanNumSum += strToInt(item.weanNum);
									dieNumSum += strToInt(item.dieNum);
								});
								$('#weanNumSum').html(weanNumSum);
								$('#dieNumSum').html(dieNumSum);
							}
						}
						setTimeout(function () {
							$('#listTable').datagrid('endEdit',editIndex);
							$('#listTable').datagrid('updateRow',{
								index:editIndex,
								row:rows[editIndex]
							});
							var field = pms.field == null ? 'earBrand' : pms.field;
							$('#listTable').datagrid('editCell', {index:editIndex,field:field});
							var editor = $('#listTable').datagrid('getEditor', {index:editIndex,field:field});
							if(editor != undefined){
								var eidtCellInput = $(editor.target[0].parentNode).find('.textbox-text.validatebox-text');
								eidtCellInput[0].focus();
								eidtCellInput.keydown(function(e){
							    	editCellTabDownFun(e,$('#listTable'),editIndex,field);
							    });
							}
						 },100);
					}:pms.onSelect,
					onShowPanel:function(){
						var hasSelectRows = $('#listTable').datagrid('getData').rows;
			        	var pigIdsArray = [];
			        	$.each(hasSelectRows,function(i,data){
			        		if(data.pigId != null && data.pigId != '' && i != editIndex){
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
				    	var earBrandGrid = $(this).combogrid('grid');
				    	var data = earBrandGrid.datagrid('getData');
				    	if(data.rows.length > 0){
				    		return;
				    	}
				    	/*var newData = [];
				    	$.ajax({  
				            url : basicUrl+'/production/searchValidPigToPage.do', 
				            data:{
				            	queryType:1,
				            	pigType:oldPigType,
				            	specifyPigs:0,
				            	choice:1,
				            	eventName:eventName,
				            	pigIds:pigIds
				            },
				            async : false, 
				            type : "POST",  
				            dataType : "json",  
				            success : function(response) {
				            	if(response.success){
				            		newData = response.rows;
				            	}else{
				            		 $.messager.alert({
				                         title: '错误',
				                         msg: response.errorMsg
				                     });
				            	}
				            }  
				        }); */
				    	var earBrandOptions = earBrandGrid.datagrid('options');
				    	if(earBrandOptions.url == null){
				    		earBrandGrid.datagrid({
				    			url:basicUrl+'/production/searchValidPigToPage.do'
				    		});
				    	}
				    	earBrandGrid.datagrid('load',{
				    		queryType:1,
			            	pigType:oldPigType,
			            	specifyPigs:0,
			            	choice:1,
			            	eventName:eventName,
			            	pigIds:pigIds
				    	});
					},
					filter: function(q, row){
						var opts = $(this).combogrid('options');
						return row[opts.textField].indexOf(q) == 0;
					}
				}
			}
	}
	return result;
}
/**
 * 配种公猪gird编辑
 * @param pms
 * @returns {___anonymous6847_6856}
 */
function breedBoarGridComboBox(pms){
	var breedBoarField = pms.field == null ? 'breedBoarFirst' : pms.field;
	var breedBoarTextField = pms.textField == null ? 'earBrand' : pms.textField;
	var result = {
			width:pms.width == null ? null : pms.width,
			field:breedBoarField,
			title:pms.title == null ? '配种公猪' : pms.title,
			formatter:pms.formatter == null ? function(value,row){
	           return row.breedBoarFirstEarBrand;  
			} : pms.formatter,
			editor:{
				type:'combobox',
				options:{
					valueField:pms.valueField == null ? 'pigId' : pms.valueField,
					textField:breedBoarTextField,
					required:pms.required == null ? false : pms.required,
					panelHeight:200,
					validType:'grid_combobox_validateExist["'+breedBoarField+'","'+breedBoarTextField+'"]',
				    onChange:pms.onChange == null ? function(newValue,oldValue){
				    	if(oldValue == '' || newValue == ''){
				    		return;
				    	}
				    	var field = pms.field == null ? 'breedBoarFirst' : pms.field;
				    	var hasSelectRows = $('#listTable').datagrid('getData').rows;
				    	var pigId = null;
				    	if(field == 'breedBoarFirst'){
				    		pigId = hasSelectRows[editIndex].breedBoarFirst;
				    	}else if(field == 'breedBoarSecond'){
				    		pigId = hasSelectRows[editIndex].breedBoarSecond;
				    	}else{
				    		pigId = hasSelectRows[editIndex].breedBoarThird;
				    	}
				    	var sememIds = '';
			        	$.each(sememIdsArray,function(i,data){
			        		if(data != pigId){
			        			if(i == 0){
			        				sememIds += data;
				        		}else{
				        			sememIds += ',' + data;
				        		}
			        		}
			        	});
			        	if(sememIds.substring(0,1) == ','){
			        		sememIds = sememIds.substring(1,sememIds.length);
			        	}
				    	var breedType = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'breedType'
					    });
				    	var enterDate = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'enterDate'
					    });
				    	if(breedType != null && enterDate != null){
				    		var breedDateValue = $(enterDate.target).combobox('getValue');
				    		var breedTypeValue = $(breedType.target).combobox('getValue');
				    		if(breedDateValue != null && breedDateValue != '' && breedTypeValue != null && breedTypeValue != ''){
								var data = [];
								$.ajax({  
							        url : basicUrl+'/production/searchSemenToList.do', 
							        data:{
							        	queryType:1,
							        	query:$(this).combobox('getText'),
							        	breedType:breedTypeValue,
							        	breedDate:breedDateValue,
							        	sememIds:sememIds
							        },
							        async : false, 
							        type : "POST",  
							        dataType : "json",  
							        success : function(response) { 
							        	data = response.rows;
							        }  
							    }); 
								$(this).combobox('loadData',data);
				    		}
				    	}
					}:pms.onChange,
					onSelect:pms.onSelect == null ? function(row){
						var field = pms.field == null ? 'breedBoarFirst' : pms.field;
						var hasSelectRows = $('#listTable').datagrid('getData').rows;
						sememIdsArray = [];
						var breedBoarFirst = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'breedBoarFirst'
					    });
						if(breedBoarFirst != null){
							var pigId = $(breedBoarFirst.target).combobox('getValue');
							if(pigId != '' && pigId != null){
								sememIdsArray.push(pigId);
							}
						}
						var breedBoarSecond = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'breedBoarSecond'
					    });
						if(breedBoarSecond != null){
							var pigId = $(breedBoarSecond.target).combobox('getValue');
							if(pigId != '' && pigId != null){
								sememIdsArray.push(pigId);
							}
						}
						var breedBoarThird = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'breedBoarThird'
					    });
						if(breedBoarThird != null){
							var pigId = $(breedBoarThird.target).combobox('getValue');
							if(pigId != '' && pigId != null){
								sememIdsArray.push(pigId);
							}
						}
						$.each(hasSelectRows,function(i,data){
							if(i != editIndex){
								if(data.breedBoarFirst != null && data.breedBoarFirst != ''){
				        			sememIdsArray.push(data.breedBoarFirst);
				        		}
				        		if(data.breedBoarSecond != null && data.breedBoarSecond != ''){
				        			sememIdsArray.push(data.breedBoarSecond);
				        		}
				        		if(data.breedBoarThird != null && data.breedBoarThird != ''){
				        			sememIdsArray.push(data.breedBoarThird);
				        		}
							}
			        	});
						var enterDate = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'enterDate'
					    });
						var breedDateValue = enterDate == null ? '' : $(enterDate.target).datebox('getValue');
						var breedType = $('#listTable').datagrid('getEditor', {
					        index: editIndex,
					        field: 'breedType'
					    });
						var breedTypeValue =  breedType == null ? '' : $(breedType.target).combobox('getValue');
			    		if(breedTypeValue != null && breedTypeValue != '' && breedDateValue != null && breedDateValue != ''){
			    			if(breedBoarFirst != null){
			    				var pigId = $(breedBoarFirst.target).combobox('getValue');
			    				var sememIds = '';
					        	$.each(sememIdsArray,function(i,data){
					        		if(data != pigId){
					        			if(i == 0){
					        				sememIds += data;
						        		}else{
						        			sememIds += ',' + data;
						        		}
					        		}
					        	});
					        	if(sememIds.substring(0,1) == ','){
					        		sememIds = sememIds.substring(1,sememIds.length);
					        	}
					        	$.ajax({  
							        url : basicUrl+'/production/searchSemenToList.do', 
							        data:{
							        	queryType:1,
							        	breedType:breedTypeValue,
							        	breedDate:breedDateValue,
							        	sememIds:sememIds
							        },
							        async : false, 
							        type : "POST",  
							        dataType : "json",  
							        success : function(response) { 
						        		$(breedBoarFirst.target).combobox('loadData',response.rows);
							        }  
							    }); 
			    			}
			    			if(breedBoarSecond != null){
			    				var pigId = $(breedBoarSecond.target).combobox('getValue');
			    				var sememIds = '';
					        	$.each(sememIdsArray,function(i,data){
					        		if(data != pigId){
					        			if(i == 0){
					        				sememIds += data;
						        		}else{
						        			sememIds += ',' + data;
						        		}
					        		}
					        	});
					        	if(sememIds.substring(0,1) == ','){
					        		sememIds = sememIds.substring(1,sememIds.length);
					        	}
					        	$.ajax({  
							        url : basicUrl+'/production/searchSemenToList.do', 
							        data:{
							        	queryType:1,
							        	breedType:breedTypeValue,
							        	breedDate:breedDateValue,
							        	sememIds:sememIds
							        },
							        async : false, 
							        type : "POST",  
							        dataType : "json",  
							        success : function(response) { 
						        		$(breedBoarSecond.target).combobox('loadData',response.rows);
							        }  
							    }); 
			    			}
			    			if(breedBoarThird != null){
			    				var pigId = $(breedBoarThird.target).combobox('getValue');
			    				var sememIds = '';
					        	$.each(sememIdsArray,function(i,data){
					        		if(data != pigId){
					        			if(i == 0){
					        				sememIds += data;
						        		}else{
						        			sememIds += ',' + data;
						        		}
					        		}
					        	});
					        	if(sememIds.substring(0,1) == ','){
					        		sememIds = sememIds.substring(1,sememIds.length);
					        	}
					        	$.ajax({  
							        url : basicUrl+'/production/searchSemenToList.do', 
							        data:{
							        	queryType:1,
							        	breedType:breedTypeValue,
							        	breedDate:breedDateValue,
							        	sememIds:sememIds
							        },
							        async : false, 
							        type : "POST",  
							        dataType : "json",  
							        success : function(response) { 
						        		$(breedBoarThird.target).combobox('loadData',response.rows);
							        }  
							    }); 
			    			}
			    		}
					}:pms.onSelect,
					filter: function(q, row){
						var opts = $(this).combobox('options');
						return row[opts.textField].indexOf(q) == 0;
					}
				}
			}
	}
	return result;
}

/**
 * 代养母猪gird编辑
 * @param pms
 * @returns {___anonymous6847_6856}
 */
function boardSowGridComboGrid(pms){
	var result = {
			width:pms.width == null ? null : pms.width,
			field:pms.field == null ? 'boardSowId' : pms.field,
			title:pms.title == null ? '代养母猪' : pms.title,
			formatter:pms.formatter == null ? function(value,row){
	           return row.boardSowEarBrand;  
			} : pms.formatter,
			editor:{
				type:'combobox',
				options:{
					valueField:pms.valueField == null ? 'pigId' : pms.valueField,
					textField:pms.textField == null ? 'earBrand' : pms.idField,
					required:pms.required == null ? false : pms.required,
					panelHeight:200,
					onChange:function(newValue,oldValue){
						if(editIndex == undefined){
				    		return;
				    	}
						var rows = $('#listTable').datagrid('getRows');
						var sowCombobox = $(this);
			    		$.ajax({  
					        url : basicUrl+'/production/searchValidPigToPage.do', 
					        data:{
					        	queryType:1,
					        	query:sowCombobox.combobox('getText'),
				            	pigType:2,
				            	specifyPigs:0,
				            	choice:1,
				            	eventName:'BOAR_FOSTER',
				            	date1:rows[editIndex].enterDate,
				            	pigIds:rows[editIndex].pigId
					        },
					        type : "POST",  
					        dataType : "json",  
					        success : function(response) { 
					        	sowCombobox.combobox('loadData',response.rows);
					        }  
					    }); 
					},
					filter: function(q, row){
						var opts = $(this).combobox('options');
						return row[opts.textField].indexOf(q) == 0;
					}
				}
			}
	}
	return result;
}
