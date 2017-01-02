function uploadData(){
	
	$('#uploadForm').form('submit',{
		url:basicUrl+'/fileOperate/upload.do',
		async:false,
		success:function(data){
			data=eval('('+data+')');
			if(data.success){
				 $.messager.alert({
                     title: '成功',
                     msg: data.successMsg
                 });
			}else{
				$.messager.alert(data.errorMsg);
			}
		}
	});
	
}
	