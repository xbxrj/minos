$(document).ready(function(){
	document.getElementById('settingContent').style.height = document.documentElement.clientHeight - 56 + 'px';
	settingSearch();
});
/**
 * 设置类型点击方法
 * @param para
 */
function settingClassClickFun(para){
	if(para.className != 'classSelected'){
		$.each($('.settingClass').find('li'),function(index,data){
			if(data.className == 'classSelected'){
				data.className = '';
			}
		});
		para.className = 'classSelected';
		$.each(document.getElementById('settingFrom').childNodes,function(index,data){
			if(data.dataset.groupcode == para.dataset.groupcode){
				data.style.display = 'block';
			}else{
				if(data.style.display == 'block'){
					data.style.display = 'none';
				}
			}
		});
	}
}
/**
 * 查询设置项
 */
function settingSearch(){
	$.ajax({  
        url : basicUrl+'/backEnd/searchSettingModuleToList.do', 
        type : "POST",  
        dataType : "json",  
        success : function(data) {  
        	var rows = data.rows;
        	var settingClassHtml = '<ul>';
        	var classContentHtml = '';
        	$.each(rows,function(index,rowsData){
        		if(index == 0){
        			settingClassHtml += '<li class="classSelected" data-groupcode="'+rowsData.groupCode+'" onClick="settingClassClickFun(this)">'+rowsData.groupName+'</li>';
        			classContentHtml += '<div data-groupcode="'+rowsData.groupCode+'" style="display:block;">';
        			classContentHtml = addClassContentHtmlFun (classContentHtml,rowsData);
        		}else{
        			if(rowsData.groupCode != rows[index-1].groupCode){
        				settingClassHtml +='<li data-groupcode="'+rowsData.groupCode+'" onClick="settingClassClickFun(this)">'+rowsData.groupName+'</li>';
        				classContentHtml +='</div><div data-groupcode="'+rowsData.groupCode+'" style="display:none;">';
        			}
        			classContentHtml = addClassContentHtmlFun (classContentHtml,rowsData);
        		}
        	});
        	settingClassHtml += '</ul>';
        	classContentHtml +='</div>';
        	document.getElementById('settingGroup').innerHTML = settingClassHtml;
        	document.getElementById('settingFrom').innerHTML = classContentHtml;
        }  
    });  
}
/**
 * 添加设置项
 * @param classContentHtml
 * @param rowsData
 * @returns
 */
function addClassContentHtmlFun (classContentHtml,rowsData){
	if(rowsData.sowType == 'checkbox'){
		if(rowsData.settingValue == 'ON'){
			classContentHtml += '<input type="checkbox" name="'+rowsData.settingCode+'"  id="'+rowsData.settingCode+'" class="checkboxStyle" checked value="ON"/>'
								+'<label for="'+rowsData.settingCode+'"></label><span>'+rowsData.settingName+'</span><br>';
		}else{
			classContentHtml += '<input type="checkbox" name="'+rowsData.settingCode+'"  id="'+rowsData.settingCode+'" class="checkboxStyle"/>'
								+'<label for="'+rowsData.settingCode+'"></label><span>'+rowsData.settingName+'</span><br>';
		}
	}else{
		classContentHtml += '<input name="'+rowsData.settingCode+'" type="'+rowsData.sowType+'" value="'+rowsData.settingValue+'"/><span>'+rowsData.settingName+'</span><br>';
	}
	return classContentHtml;
};
/**
 * 保存
 */
function onBtnSaveSetting(){
	$.messager.progress();	
	$('#settingFrom').form('submit',{
		url:basicUrl+'/backEnd/editSetting.do',
		success: function(response){
			response=eval('('+response+')');
			if(response.success){
				$.messager.alert('提示','保存成功！');
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
 * 撤销
 */
function onBtnBackSetting(){
	$('#settingFrom').form('reset');
}
/**
 * 恢复默认
 */
function onBtnResetSetting(){
	$.messager.confirm('提示', '恢复后数据将与系统标准值一致，确定恢复吗？', function(r){
		if(r){
			$.post({
				url:basicUrl + '/backEnd/deleteSetting.do',
				success:function(response){
					response=eval('('+response+')');
					if(response.success){
						$.messager.progress('close');
						$.messager.alert('提示','恢复成功！');
						settingSearch();
					}else{
						$.messager.alert({
		                    title: '错误',
		                    msg: response.errorMsg
		                });
					}
				}
			});
		}
	});
}