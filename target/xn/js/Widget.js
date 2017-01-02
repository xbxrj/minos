/**
 * 控件封装
 */
/**
 * ComboGrid表格下拉框
 * pms{
 * id:div 的Id ，必填项
 * width:宽度，
 * iDField:实际值,必填项
 * textField:显示值,必填项
 * url:数据获取路径,必填项
 * columns:表格显示列,必填项
 * required:是否必填，默认为false
 * }
 */
function xnComboGrid(pms){
	var editable = pms.editable == null ? false : pms.editable;
	$('#'+pms.id).combogrid({
		panelWidth:pms.width == null ? 450 : pms.width,
	    idField:pms.idField,
	    textField:pms.textField,
	    url:pms.url == null ? null : basicUrl+pms.url,
	    method: 'get',
	    columns:pms.columns,
	    fitColumns: true,
	    rownumbers:true,
	    multiple:pms.multiple == null ? false : pms.multiple,
		editable:editable,
	    required:pms.required == null ? false : pms.required,
		rowStyler: function(index,row){
			if ((index+1) % 2 == 0){
				return 'background-color:#f7f7f7;';
			}
		},
		validType:editable == false ? null :'combogrid_validateExist["'+pms.id+'","'+pms.textField+'"]',
	    filter: function(q, row){
			var opts = $(this).combogrid('options');
			return row[opts.textField].indexOf(q) == 0;
		},
		onChange:pms.onChange == null ? function(newValue,oldValue){
			return;
		}:pms.onChange,
		onSelect:pms.onSelect == null ? function(index,row){
			return;
		}:pms.onSelect
	});
}
/**
 * combobox通过Url获取数据下拉框
 *pms{
 * id:div 的Id ，必填项
 * valueField:实际值,必填项
 * textField:显示值,必填项
 * url:数据获取路径,必填项
 * required:是否必填，默认为false
 * } 
 */
function xnCombobox(pms){
	var editable = pms.editable==null?true:pms.editable ;
    var data = jAjax.submit(pms.url);
    var hasAll = pms.hasAll == null ? false : pms.hasAll;
	$('#'+pms.id).combobox({
	    //url:basicUrl+pms.url,
	    data:data,
	    valueField:pms.valueField,
	    textField:pms.textField,
	    required:pms.required == null ? false : pms.required,
		panelHeight:pms.panelHeight == null ? 'auto' : pms.panelHeight,
		panelMaxHeight:300,
	    value:pms.value,
	    readonly:pms.readonly == null ? false : pms.readonly,
	    editable:editable,
		multiple:pms.multiple == null ? false : pms.multiple,
		validType:editable== false ? null : 'combobox_validateExist["'+pms.id+'","'+pms.textField+'"]',
	    filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) == 0;
		},
		loadFilter:function(data){
			if(hasAll){
				var allData = new Object(); 
				allData[pms.textField] = "全部";
				allData[pms.valueField] = "";
				data.unshift(allData);
			}
			return data;
		},
		onSelect:pms.onSelect == null ? function(row){return;}:pms.onSelect,
		onChange:pms.onChange == null ? function(newValue,oldValue){return;}: pms.onChange
	});
}



/**************************************************下拉框封装BEGIN**********************************************************/
/**
 * 获取cdCode的数据 
 * j_typeCode
 * j_linkValue
 */
function jGetCdCode(j_typeCode,j_linkValue){

	return jAjax.submit_dir('/param/searchByTypeCode.do', {typeCode:j_typeCode,linkValue:j_linkValue});
}
/**
 * 组建下拉框
 * @param pms
 */
function jCdCombobox(pms,j_data,j_defaultValue){
	var editable = pms.editable==null?true:pms.editable ;
	var hasAll = pms.hasAll == null ? false : pms.hasAll;
	$('#'+pms.id).combobox({
		data:j_data,
	    valueField:pms.sameField == true ? 'codeName':'codeValue',
	    textField:'codeName',
	    panelHeight:pms.panelHeight==null?'auto':pms.panelHeight,
	    editable:editable,
	    required:pms.required == null ? false : pms.required,
	    value:pms.value == null ? j_defaultValue : hasAll ? "" : pms.value,
		readonly:pms.readonly == null ? false : pms.readonly,
	    panelMaxHeight:300,
	    filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) == 0;
		},
		loadFilter:function(data){
			if(hasAll){
				data.unshift({
					codeName:"全部",
					codeValue:""
				});
			}
			return data;
		},
		validType:editable == false ? null : 'combobox_validateExist["'+pms.id+'","codeName"]',
		onChange:pms.onChange,
		onSelect:pms.onSelect == null ? function(newValue,oldValue){
			return;
		}:pms.onSelect
	});
}

/**
 *pms{
 * CdComboBox根据CdCode获取下拉框值
 * id:div 的Id ，必填项
 * typeCode:查询的CdCodeType的typeCode值，必填项 ,
 * linkField:下级下拉框id，如有级联必填
 * linkCode:下级下拉框typeCode值，如有级联必填
 * required:是否必填，默认为false
 * } 
 */
function xnCdCombobox(pms,j_linkValue){
	var data=jGetCdCode(pms.typeCode,j_linkValue);
	var defaultValue =null;	
	$.each(data,function(index,row){
		if(row.isDefault == 'Y'){
			 defaultValue = row.codeValue;
		}
	});
	pms.onChange = pms.onChange != null ? pms.onChange:function(newValue,oldValue){
    	//如果有级联
		if(pms.linkCode != null && pms.linkField != null){ 
				if(newValue == null){
					newValue = -1;
				}
				var linkData =	jGetCdCode(pms.linkCode,newValue);
				var linkDefaultValue = null;
				$.each(linkData,function(index,row){
					if(row.isDefault == 'Y'){
						linkDefaultValue = row.codeValue;
					}
				});
				if(oldValue != '' && oldValue != null){
					$('#'+pms.linkField).combobox('setValue', linkDefaultValue);
				}
				$('#'+pms.linkField).combobox('loadData', linkData);
		}
	};
	/*pms.onSelect = pms.onSelect != null ?pms.onSelect:function(rec){
		//如果有级联
		if(pms.linkCode != null && pms.linkField != null){ 
			 var linkData =	jGetCdCode(pms.linkCode,rec.codeValue);
			 var linkDefaultValue = null;
			 $.each(linkData,function(index,row){
					if(row.isDefault == 'Y'){
						linkDefaultValue = row.codeValue;
					}
				});
			 $('#'+pms.linkField).combobox('setValue', linkDefaultValue);
			 $('#'+pms.linkField).combobox('loadData', linkData);
		}
	}*/
	
	jCdCombobox(pms,data,defaultValue);
}
/**
 * 根据cdCode获取radiobox
 * pms{
 * id:页面元素ID
 * name:页面元素name
 * typeCode:cdCode中TYPE_CODE
 * onChange：改变事件
 * }
 */
function xnRadioBox(pms){
    var excludeValue = pms.excludeValue;
	var height = pms.height == null ? 32 : pms.height,
		width = pms.width == null ? '100%' : pms.height;
	var html = '';
	var codeList = jGetCdCode(pms.typeCode);
	if(excludeValue != null){
		var newData = [];
		$.each(codeList,function(i,data){
			var isExist = false;
			$.each(excludeValue,function(i,ev){
				if(data.codeValue == ev){
					isExist = true;
				}
			});
			if(!isExist){
				newData.push(data);
			}
		});
		codeList = newData;
	}
	$.each(codeList,function(index,data){
		html += '<input type="radio" name="'+pms.name+'" value="'+data.codeValue+'"';
		if(pms.onChange){
			html += 'onclick="on'+UpperFirstLetter(pms.id)+'Change()"';
		}
		if(data.isDefault == 'Y' || pms.defaultValue == data.codeValue ){
			html += 'checked="checked" />';
		}else{
			html += '/>';
		}
		html += data.codeName;
	});
	document.getElementById(pms.id).innerHTML = html;
	
}

/**************************************************下拉框封装END**********************************************************/

/*************************************gird编辑框*******************************************************************/
/**
 * gird编辑下拉框
 *pms{
 * valueField:实际值,必填项
 * textField:显示值,必填项
 * url:数据获取路径,必填项
 * required:是否必填，默认为false
 * } 
 * } 
 */
function xnGridComboBox(pms){
	var editable = pms.editable == null ? false : pms.editable;
	var result = {};
	result.type = 'combobox';
	result.options = {
			valueField:pms.valueField,
			textField:pms.textField,
			required:pms.required == null ? false : pms.required,
			panelMaxHeight:300,		
			method:'get',
			url:basicUrl+pms.url,
			editable:pms.editable == null ? false : pms.editable,
			validType:editable == false ? null : 'grid_combobox_validateExist["'+pms.field+'","'+pms.textField+'"]',
			filter: function(q, row){
				var opts = $(this).combobox('options');
				return row[opts.textField].indexOf(q) == 0;
			}
	};
	return result;
}
/**
 * gird编辑获取CdCode下拉框
 *pms{
 * typeCode:查询的CdCodeType的typeCode值，必填项 ,
 * linkField:下级下拉框id，如有级联必填
 * linkCode:下级下拉框typeCode值，如有级联必填
 * required:是否必填，默认为false
 * } 
 */
function xnGridCdComboBox(pms){
	var editable = pms.editable == null ? true : pms.editable;
	var excludeValue = pms.excludeValue;
	var data = [];
	var defaultValue = null;
	if(pms.data == null){
		$.ajax({  
	        url : basicUrl+'/param/searchByTypeCode.do?typeCode='+pms.typeCode,
	        async : false, 
	        type : "POST",  
	        dataType : "json",  
	        success : function(response) { 
	        	data = response;
	        	$.each(data,function(index,row){
	        		if(row.isDefault == 'Y'){
	        			defaultValue = row.codeValue;
	        		}
	        	});
	        }  
	    });
	}else{
		data = pms.data;
	}
	if(excludeValue != null){
		var newData = [];
		$.each(data,function(index,row){
			var isExist = false;
			$.each(excludeValue,function(i,ev){
				if(row.codeValue == ev){
					isExist = true;
				}
			});
			if(!isExist){
				newData.push(row);
			}
    	});
		data = newData;
	}
	var result = {};
	result.type = 'combobox';
	result.options = {
		data:data,
		value:defaultValue,
	    valueField:'codeValue',
	    textField:'codeName',
	    panelHeight:'auto',
	    editable:editable,
	    required:pms.required == null ? false : pms.required,
		validType:editable == false ? null : 'grid_combobox_validateExist["'+pms.field+'","codeName"]',
		panelMaxHeight:300,	
	    filter: function(q, row){
			var opts = $(this).combobox('options');
			return row[opts.textField].indexOf(q) == 0;
		},
		onChange:pms.onChange == null ? function(newValue,oldValue){
			return;
		}:pms.onChange,
		onSelect:pms.onSelect != null ?pms.onSelect:function(rec){
			if(pms.linkCode != null && pms.linkField != null){ //如果有级联
				var url = basicUrl+'/param/searchByTypeCode.do?typeCode='+pms.linkCode+'&linkValue='+rec.codeValue;
				 $('#'+pms.linkField).combobox('setValue', null);
				 $('#'+pms.linkField).combobox('reload', url);
			}
		}
	};
	return result;
}
function xnGridComboGrid(pms){
	var editable = pms.editable == null ? false : pms.editable;
	var result = {};
	result.type = 'combogrid';
	result.options = {
			panelWidth:pms.width == null ? 450 : pms.width,
			idField:pms.idField,
			textField:pms.textField,
			required:pms.required == null ? false : pms.required,
			method:'get',
			url:pms.url == null ? null :basicUrl+pms.url,
			editable:editable,
			columns:pms.columns,
		    fitColumns: true,
		    rownumbers:true,
		    validType:editable == false ? null : 'grid_combogrid_validateExist["'+pms.field+'","'+pms.textField+'"]',
		    rowStyler: function(index,row){
				if ((index+1) % 2 == 0){
					return 'background-color:#f7f7f7;';
				}
			},
		    onChange:pms.onChange == null ? function(newValue,oldValue){
				return;
			}:pms.onChange,
			onSelect:pms.onSelect == null ? function(index,row){
				return;
			}:pms.onSelect,
			filter: function(q, row){
				var opts = $(this).combogrid('options');
				return row[opts.textField].indexOf(q) == 0;
			}
	};
	return result;
}