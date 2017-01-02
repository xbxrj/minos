var basicUrl = getRootPath(true);
//var basicUrl = "http://192.168.1.246:8080/pigfarm";

//js获取项目根路径，如： http://localhost:8083/pigfarm
function getRootPath(hasPath){
    //获取当前网址，如： http://localhost:8083${base_url}/share/meun.jsp
    var curWwwPath=window.document.location.href;
    //获取主机地址之后的目录，如： pigfarm/share/meun.jsp
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht=curWwwPath.substring(0,pos);
    //获取带"/"的项目名，如：/pigfarm
    if(hasPath){
    	 var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    	 return(localhostPaht+projectName);
    }else{
    	return localhostPaht;
    }
}
