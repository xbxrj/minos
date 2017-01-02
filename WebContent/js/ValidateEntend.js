/**输入框验证文件/
/**
 * 验证数字输入框输入范围
 */
$.extend($.fn.validatebox.defaults.rules, {
    range: {
        validator: function(value, param){
            return value >= param[0] && value <= param[1];
        },
        message: '请输入 {0}到{1}之间的数字'
    }
});
/**
 * 验证数字输入框最小值
 */
$.extend($.fn.validatebox.defaults.rules, {
    min: {
        validator: function(value, param){
            return value >= param[0];
        },
        message: '请输入大于 {0}数'
    }
});
/**
 * 验证数字输入框最大值
 */
$.extend($.fn.validatebox.defaults.rules, {
    max: {
        validator: function(value, param){
            return value <= param[0];
        },
        message: '请输入小于 {0}数'
    }
});
/**
 * 验证数字输入框不能为负
 */
$.extend($.fn.validatebox.defaults.rules, {
	noNegative: {
        validator: function(value){
            return value >= 0;
        },
        message: '不能输入负数'
    }
});
/**
 * 验证账号是否存在,存在报错
 */
$.extend($.fn.validatebox.defaults.rules, {
	userExists: {
        validator: function(value){
        	var url = '/UserManage/searchUserIsExists.do';
        	var result = jAjax.submit(url,"userName="+value);

        	if(result.length > 0){
        		// 用户存在
        		return false
        	}else{
        		// 用户不存在
        		return true;
        	}
        },
        message: '账户已存在！'
    }
});
/**
 * 验证输入是否合法
 */
$.extend($.fn.validatebox.defaults.rules, {
	combogrid_validateExist: {
        validator: function(value, param){
        	var flag = false;
        	var result = $('#'+param[0]).combogrid('grid').datagrid('getRows');
        	$.each(result,function(i,data){
        		if(data[param[1]] == value){
        			flag = true;
        		}
        	});
            return flag;
        },
        message: '请输入不合法'
    }
});
/**
 * 验证输入是否合法
 */
$.extend($.fn.validatebox.defaults.rules, {
	grid_combogrid_validateExist: {
        validator: function(value, param){
        	var flag = false;
        	var editor = $('#listTable').datagrid('getEditor', {
                index: editIndex,
                field: param[0]
            });
        	if(editor != null){
        		var editorGrid = $(editor.target).combogrid('grid');
        		var result = editorGrid.datagrid('getRows');
            	$.each(result,function(i,data){
            		if(data[param[1]] == value){
            			flag = true;
            		}
            	});
        	}else{
        		flag = true;
        	}
        	
            return flag;
        },
        message: '输入不合法'
    }
});
/**
 * 验证只能输入数字字母和减号
 */
$.extend($.fn.validatebox.defaults.rules, {
	numOrLetterOr_: {
        validator: function(value){
        	var reg = /^[-a-zA-Z0-9]+$/;
            return reg.test(value);
        },
        message: '请输入字母、数字或减号'
    }
});
/**
 * 验证只能输入数字字母中文和减号
 */
$.extend($.fn.validatebox.defaults.rules, {
	numOrLetterOrChineseOr_: {
        validator: function(value){
        	var reg = /^[-a-zA-Z0-9-#\u4e00-\u9fa5]+$/;
            return reg.test(value);
        },
        message: '请输入字母、数字、中文、#号或减号'
    }
});
/**
 * 验证只能输入中文
 */
$.extend($.fn.validatebox.defaults.rules, {
	chinese: {
        validator: function(value){
        	var reg = /^[\u4e00-\u9fa5]+$/;
            return reg.test(value);
        },
        message: '请输入中文'
    }
});
/**
 * 验证只能输入英文
 */
$.extend($.fn.validatebox.defaults.rules, {
	english: {
        validator: function(value){
        	var reg = /^[a-zA-Z]+$/;
            return reg.test(value);
        },
        message: '请输入英文'
    }
});
/**
 * 输入复杂性验证（6-12位数字字母或者下划线组合）
 */
$.extend($.fn.validatebox.defaults.rules, {
	passwordComplexity: {
        validator: function(value){
        	var reg = /^[\w]{6,12}$/;
            return reg.test(value);
        },
        message: '请输入6-12位数字或字母或下划线'
    }
});
/**
 * 验证输入是否合法
 */
$.extend($.fn.validatebox.defaults.rules, {
	combobox_validateExist: {
        validator: function(value, param){
        	var flag = false;
        	var result = $('#'+param[0]).combobox('getData');
        	$.each(result,function(i,data){
        		if(data[param[1]] == value){
        			flag = true;
        		}
        	});
            return flag;
        },
        message: '请输入不合法'
    }
});
/**
 * 验证输入是否合法
 */
$.extend($.fn.validatebox.defaults.rules, {
	grid_combobox_validateExist: {
        validator: function(value, param){
        	var flag = false;
        	var editor = $('#listTable').datagrid('getEditor', {
                index: editIndex,
                field: param[0]
            });
        	if(editor != null){
        		var result = $(editor.target).combobox('getData');
            	$.each(result,function(i,data){
            		if(data[param[1]] == value){
            			flag = true;
            		}
            	});
        	}else{
        		flag = true;
        	}
        	
            return flag;
        },
        message: '输入不合法'
    }
});
/**
 * 验证日期不能大于系统日期
 */
$.extend($.fn.datebox.defaults.rules,{  
    ltCurrentDate: {  
        validator: function(value,param){  
            if(value)  
            {  
                if(value.length > 10)  
                {  
                    value = value.substring(0,10);  
                }  
                var ed_arr = value.split('-');  
                var selectedDate = new Date(ed_arr[0],ed_arr[1]-1,ed_arr[2]);  
                var currentDate = new Date();  
                if((currentDate.getTime() - selectedDate.getTime()) >= 0)  
                {  
                    return true;  
                }  
            }  
        return false;  
    },  
    message:"日期必须小于等于当前日期"  
        }  
    }); 
/**
 * 验证输入1-2位数字+%
 */
$.extend($.fn.validatebox.defaults.rules, {
	numAddPercent: {
		 validator: function(value){
	        	var reg1 = /^[0-9]{1,2}%$/;
	        	var reg2 = /^\d+(\d)*\/+(\d){1,}$/;
	   
	            return reg1.test(value) || reg2.test(value);
	        },
	        message: '输入百分比或者分数，例如22%，2/3'
    }
});
/**
 * 正整数
 */
$.extend($.fn.validatebox.defaults.rules, {
	integer_: {
		 validator: function(value){
	        	var reg = /^[1-9]\d*$/;
	   
	            return reg.test(value);
		    },
	        message: '请输入数字'
    }
});