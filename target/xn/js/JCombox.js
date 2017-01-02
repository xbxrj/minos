$.parser.plugins.push("departmentbox");//注册扩展组件
$.fn.departmentbox = function (options, param) {//定义扩展组件

    //当options为字符串时，说明执行的是该插件的方法。
    if (typeof options == "string") { return $.fn.combobox.apply(this, arguments); }
    options = options || {};

    //当该组件在一个页面出现多次时，this是一个集合，故需要通过each遍历。
    return this.each(function () {
        var jq = $(this);

        //$.fn.combobox.parseOptions(this)作用是获取页面中的data-options中的配置
        var opts = $.extend({}, $.fn.combobox.parseOptions(this), options);
        //把配置对象myopts放到$.fn.combobox这个函数中执行。
        var myopts = $.extend(true, {
            data: [{
                Id: '1', Name: '人事部'
            }, {
                Id: '2', Name: '财务部'
            }, {
                Id: '3', Name: '研发部'
            }, {
                Id: '4', Name: '销售部'
            }],
            valueField: 'Id',
            textField: 'Name'
        }, opts);
        $.fn.combobox.call(jq, myopts);
    });
};

$.parser.plugins.push("staticbox");//注册扩展组件
$.fn.staticbox = function (options, param) {//定义扩展组件

    //当options为字符串时，说明执行的是该插件的方法。
    if (typeof options == "string") { return $.fn.combobox.apply(this, arguments); }
    options = options || {};

    //当该组件在一个页面出现多次时，this是一个集合，故需要通过each遍历。
    return this.each(function () {
        var jq = $(this);

        //$.fn.combobox.parseOptions(this)作用是获取页面中的data-options中的配置
        var opts = $.extend({}, $.fn.combobox.parseOptions(this), options);
        
        var j_data;
        $.ajax({
    		url:basicUrl+'/param/searchByTypeCode.do?typeCode='+opts.typeCode,
    		method:'get',
    		async:false,
    		success:function(result){
    			var data = JSON.parse(result);
    			if(result.success){
    				j_data = data;
    				//把配置对象myopts放到$.fn.combobox这个函数中执行。
    		        var myopts = $.extend(true, {
    		            data: j_data,
    		            valueField:'codeValue',
    		    	    textField:'codeName'
    		        }, opts);
    		        $.fn.combobox.call(jq, myopts);
            	}else{
            		 $.messager.alert({ title: '错误',msg: result.errorMsg });
            	}
    		}
    	});
    });
};


$.parser.plugins.push("cdbox");//注册扩展组件
$.fn.cdbox = xnComboGrid({
					id:'lineId',
					idField:'rowId',
					textField:'lineName',
					url:'/basicInfo/searchLineToList.do',
					width:550,
					required:true,
					columns:[[ 	
					           	{field:'rowId',title:'ID',width:100,hidden:true},
						        {field:'businessCode',title:'产线代码',width:100},
						        {field:'lineName',title:'产线名称',width:100}
						    ]]
					});
