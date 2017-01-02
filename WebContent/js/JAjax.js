var jAjax = {
		
	/**
	 * 提示错误信息
	 * 
	 * @param errorMsg
	 */
	errorFunc : function(errorMsg) {
		$.messager.alert({
			title : '错误',
			msg : errorMsg
		});
	},
	/**
	 * 返回参数直接返回
	 * 
	 * @param j_url url
	 * @param j_data 入参
	 * @param sucFunc 成功方法
	 * @param errorFunc 失败方法
	 * @param j_type 通讯的方式
	 * @param j_async 是否异步
	 * @param j_dataType 数据类型，一般都为json
	 * @returns
	 */
	submit_dir : function(j_url, j_data, sucFunc, errorFunc, j_type, j_async, j_dataType) {

		return this.submit(j_url, j_data, sucFunc, errorFunc, j_type, j_async, j_dataType, true);
	},

	/**
	 * @param j_url url
	 * @param j_data 入参
	 * @param sucFunc 成功方法
	 * @param errorFunc 失败方法
	 * @param j_type 通讯的方式
	 * @param j_async 是否异步
	 * @param j_dataType 数据类型，一般都为json
	 * @returns
	 */
	submit : function(j_url, j_data, sucFunc, errorFunc, j_type, j_async, j_dataType, j_dir_flag) {
		var data;
		var j_dir_flag = j_dir_flag == null ? false : j_dir_flag;
		$.ajax({
			type : j_type != null ? j_type : 'POST',
			url : basicUrl + j_url,
			data : j_data,
			dataType : j_dataType != null ? j_dataType : 'JSON',
			async : j_async != null ? j_async : false,
			success : function(response) {
				if (j_dir_flag) {
					data = response;
					if ($.isFunction(sucFunc)) {
						sucFunc(data);
					}
				} else {
					if (response.success) {
						data = response.rows;
						if ($.isFunction(sucFunc)) {
							sucFunc(data);
						}
					} else {
						if (errorFunc != null) {
							if ($.isFunction(errorFunc)) {
								errorFunc(response);
							}
						} else {
							jAjax.errorFunc(response.errorMsg);
						}
					}
				}
			},
			error : function(response) {
				if(j_async){
					$.messager.progress('close');
				}
				jAjax.errorFunc("网络异常。。。请联系维护人员");
			}
		});
		return data;
	},

	/**
	 *  提交Form后刷新dataGrid
	 *  
	 * @param j_formid
	 * @param j_url
	 * @param sucFunc
	 * @param errorFunc
	 * @param j_queryParams
	 * @param j_async
	 */
	submit_form_grid : function(j_formid,j_grid, j_url, sucFunc, errorFunc, j_queryParams, j_async) {
		
		$('#'+j_grid).datagrid("loading");
		return this.submit_form_dir(j_formid, j_url,
				function(data){
					$('#'+j_grid).datagrid("loadData",data);
					$('#'+j_grid).datagrid("loaded");
				}, errorFunc, j_queryParams, j_async,true);
	},
	
	/**
	 *  form直接提交
	 *  
	 * @param j_formid
	 * @param j_url
	 * @param sucFunc
	 * @param errorFunc
	 * @param j_queryParams
	 * @param j_async
	 */
	submit_form_dir : function(j_formid, j_url, sucFunc, errorFunc, j_queryParams, j_async) {
		
		return this.submit_form(j_formid, j_url, sucFunc, errorFunc, j_queryParams, j_async,true); 
	},
	
	/**
	 * form的提交
	 * @param j_formid
	 * @param j_url
	 * @param j_queryParams
	 */
	submit_form : function(j_formid,j_url,sucFunc, errorFunc,j_queryParams,j_async, j_dir_flag) {
		
		var data;
		j_dir_flag = j_dir_flag == null ? false : j_dir_flag;
		$('#'+j_formid).form('submit',{
			url:j_url!=null?basicUrl+j_url:null,
			queryParams:j_queryParams,
			async:j_async != null ? j_async:false,
			onSubmit: function(){
				var isValid = $('#'+j_formid).form('validate');
				if (!isValid){
					$.messager.progress('close');	
				}
				return isValid;
			},
			success: function(response){
				response=eval('('+response+')');
				if (j_dir_flag) {
					data = response;
					if ($.isFunction(sucFunc)) {
						sucFunc(data);
					}
				} else{
					if(response.success){
						data=response.rows;
						if ($.isFunction(sucFunc)) {
							sucFunc(data);
						}
					}else{
						if (errorFunc != null) {
							if ($.isFunction(errorFunc)) {
								errorFunc(response);
							}
						} else {
							this.errorMsg(response.errorMsg);
						}
					}
				}
				$.messager.progress('close');
			},
			error : function(response) {
				if(j_async){
					$.messager.progress('close');
				}
				jAjax.errorFunc("网络异常。。。请联系维护人员");
			}
		});
		return data;
	}

}