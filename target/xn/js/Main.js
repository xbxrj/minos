var baseFontSize="14px";
//当浏览器改变大小时执行
window.onresize = function(){  
	changeDivHeight();
} 
var loginUser = {};
var homePage;
var weekNum = null;
document.onkeydown = function(e) {
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
	var clientHeight = document.documentElement.clientHeight;
	if(e.clientX < 85 || e.clientX > 830 || e.clientY < clientHeight - 506){
		if($('.menuList').css('display') == 'block'){
			$('.menuList').css('display','none');
		}
	}
}
var finereportUrl = null,finereportUsername = null;;
$(document).ready(function(){
	loadNavMenu();
	$('#shortCutWin').css('height',document.documentElement.clientHeight+'px');
	$('#shortCutWin').find('.rightSlipContent').css('height',document.documentElement.clientHeight - 152 +'px');
	$('#changePassword').css('height',document.documentElement.clientHeight+'px');
	$('#changePassword').find('.rightSlipContent').css('height',document.documentElement.clientHeight - 152 +'px');
	setLoginMessage();
	$.each($('.setting').find('li'),function(i,lidata){
		addToolTip(lidata,{
			content:lidata.dataset.liname,
			position:'left'
		});
	});
	$.each($('#shortCutList').find('li'),function(i,shortCut){
		addToolTip(shortCut,{
			content:shortCut.dataset.chinese
		});
	});
	firstLoginChangePassword();
	$('#tabContent_homePage').load(basicUrl+homePage.moduleUrl,function(){
		changeDivHeight();
	});
	finereportUrl = $('#finereportUrl').val();
	finereportUsername = $('#finereportUsername').val();
	weekNum = jAjax.submit("/param/getWeekInfo.do");
});
/**
 * 第一次登陆修改密码
 */
function firstLoginChangePassword(){
	var mark = loginUser.isInitPw;
	if(mark == "Y"){
		openWindowMask({z_index:3});
		$('#changePassword').animate({right:'0'});
		$('#changePassword').find('.arrow_right').css('display','none');
		$('#cancelPassword').css('display','none');
		$('#passwordForm').form('reset');
	}
}
/**
 * 在用户中心显示用户名和猪场名称
 */
function setLoginMessage(){
	$(document.getElementsByClassName('personName')[0].parentNode).append(loginUser.employName);
	$(document.getElementsByClassName('companyName')[0].parentNode).append(loginUser.farmName);
	$(document.getElementsByClassName('companyCode')[0].parentNode).append(loginUser.companyCode);
}
/**
 * 显示菜单
 */
function menuListShow(){
	if($('.menuList').css('display') != 'block'){
		$('.menuList').css('display','block');
	}
	
}
/**
 * 返回主页
 */
function backToHomePage(){
	if($('.hompageBorder')[0].className == 'hompageBorder fl'){
		$('#tabContent_homePage').css('display','block');
		$('.hompageBorder')[0].className = 'hompageBorder fl listSelected';
		$.each($('.tabList').find('li'),function(index,data){
			if(data.className == 'listSelected'){
				data.className = '';
				$('#tabContent_'+data.dataset.eventname).css('display','none');
			}
		});
	}
}
/**
 * tab点击事件方法
 * @param para
 */
function tabClickFun(para){
	//判断当前选中的是否是主页
	if($('.hompageBorder')[0].className == 'hompageBorder fl listSelected'){
		$('.hompageBorder')[0].className = 'hompageBorder fl';
		$('#tabContent_homePage').css('display','none');
	}
	//获取事件名称
	var eventName = para.parentNode.dataset.eventname;
	$.each($('.tabList').find('li'),function(index,data){
		if(data.dataset.eventname == eventName){
			if(data.className == ''){
				data.className = 'listSelected';
				$('#tabContent_'+data.dataset.eventname).css('display','block');
			}
		}else{
			if(data.className == 'listSelected'){
				data.className = '';
				$('#tabContent_'+data.dataset.eventname).css('display','none');
			}
		}
	});
}
/**
 * 菜单点击事件
 * @param para
 */
function menuClickFun(para){
	var tabNum = parseInt((document.getElementById('header').clientWidth - 175 - 74 -20)/130);
	var liLength = $('.tabList').find('li').length;
	//判断打开的tab是否已经超过最大值
	if(liLength >= 15){
		$.messager.alert('警告', '最多只能打开15个页面，请关闭无用页面重新点击！');
	}else{
		//获取英文事件名称
		var eventName = para.dataset.eventname;
		//获取中文事件名称
		var chinseEventName = '';
		var eventUrl = '';
		if(para.nodeName == "A"){
			$('.menuList').css('display','none');
			chinseEventName = para.innerText;
			eventUrl = para.dataset.url;
		}else if(para.nodeName == "LI"){
			chinseEventName = para.dataset.chinese;
			eventUrl = para.dataset.url;
		}else{
			chinseEventName = para.parentNode.parentNode.innerText;
			eventUrl = '/jsp/production/'+eventName+'.jsp';
		}
		if(eventUrl.indexOf('http') != -1){
			eventUrl += '&dbUrl='+finereportUrl+'&dbUserName='+finereportUsername+'&farmId='+loginUser.farmId+'&farmName='+loginUser.farmName+'&userName='+loginUser.employName
			if(eventName == 'productionPaper_v'){
				eventUrl += '&week='+weekNum.week+'&year='+weekNum.year;
			}
			//如果是需要从新打开浏览器tab页的地址
			window.open(eventUrl); 
		}else{
			//判断是否已经存在事件tab flag=true不存在 false存在
			var flag = true;
			$.each($('.tabTetx'),function(index,data){
				if(data.innerText == chinseEventName){
					flag = false;
				}
			});
			//如果已经存在则显示tab内容且选中，否则添加事件tab并选中
			if(flag){
				if(liLength >= tabNum){
					$('#tabMore').css('display','block');
					turnLeftFun();
				}
				//动态生成html
				var addHtml = '<li class="listSelected" data-eventname="'+eventName+'">'+
									'<div class="tabTetx fl" onClick="tabClickFun(this)">'+chinseEventName+'</div>'+
									'<div class="close fl" onClick="tabCloseFun(this)"></div>'+
							  '</li>';
				if(eventName == 'EventInput'){
					$('#main_right').append('<div id="tabContent_'+eventName+'" style="height:100%"></div>');
					$('#tabContent_'+eventName).load(basicUrl +eventUrl,function(){
						changeDivHeight();
						$('.tabList').find('ul').append(addHtml);
						changeTabContent(eventName);
					});
				}else{
					var randomnumber=Math.floor(Math.random()*100000);
					$('#main_right').append('<div id="tabContent_'+eventName+'" style="height:100%"><iframe scrolling="no" frameborder="0"  src="'+basicUrl+eventUrl+'?randomnumber='+randomnumber+'&fontSize='+baseFontSize+'" style="width:100%;height:100%;"></iframe></div>');
					$('#tabContent_'+eventName+ ' iframe').on('load',function(){
						$('.tabList').find('ul').append(addHtml);
						changeTabContent(eventName);
					});
				}
			}else{
				if(liLength >= tabNum){
					var isHide = false;
					$.each($('.tabList').find('li'),function(index,data){
						if(data.dataset.eventname == eventName && data.style.display == 'none'){
							isHide = true;
						}
					});
					if(isHide){
						$('#tabMore').css('display','block');
						showHideTab(para);
					}
				}
				changeTabContent(eventName);
			}
		}
	}
}
function changeTabContent(eventName){
	$.each($('.tabList').find('li'),function(index,data){
		if(data.dataset.eventname == eventName){
			if(data.className == ''){
				data.className = 'listSelected';
				$('#tabContent_'+data.dataset.eventname).css('display','block');
			}
		}else{
			if(data.className == 'listSelected'){
				data.className = '';
				$('#tabContent_'+data.dataset.eventname).css('display','none');
			}
		}
	});
	if($('.hompageBorder')[0].className == 'hompageBorder fl listSelected'){
		$('.hompageBorder')[0].className = 'hompageBorder fl';
		$('#tabContent_homePage').css('display','none');
	}
}
/**
 * tab关闭方法
 * @param para
 */
function tabCloseFun(para){
	var tabNum = parseInt((document.getElementById('header').clientWidth - 175 - 74 -20)/130);
	var liLength = $('.tabList').find('li').length;
	//获取关闭标签事件名称
	var eventName = para.parentNode.dataset.eventname;
	var tabList = $('.tabList').find('li');
	var hideTabList = $('#hideTabList').find('li');
	$.each(tabList,function(index,data){
		if(data.dataset.eventname == eventName){
			if(data.className == 'listSelected'){
				//如果只有一个tab，则显示首页
				if($('.tabList').find('li').length == 1){
					$('#tabContent_homePage').css('display','block');
					$('.hompageBorder')[0].className = 'hompageBorder fl listSelected';
				}else{
					//如果删除的是当前选中的tab
					//当前选中的tab是最后一个
					for(var i = tabList.length - 1 ; i >= 0 ; i --){
						if(tabList[i].dataset.eventname != eventName && tabList[i].style.display != 'none'){
							tabList[i].className = 'listSelected';
							$('#tabContent_'+tabList[i].dataset.eventname).css('display','block');
							break;
						}
					}
				}
			}
			$(this).remove();
			$('#tabContent_'+ eventName).remove();
		}
	});
	if(liLength > tabNum){
		for(var i in tabList){
			if(tabList[i].style.display == 'none'){
				tabList[i].style.display = 'inline-block';
				$.each(hideTabList,function(index,hideTab){
					if(hideTab.dataset.eventname == tabList[i].dataset.eventname){
						$(hideTab).remove();
					}
				})
				break;
			}
		}
		hideTabNum --;
		$('#hideTabNum').html(hideTabNum);
	}
	if(liLength - 1 == tabNum){
		$('#tabMore').css('display','none');
		$('#hideTabList').css('display','none');
	}
}
/**
 * 自适应宽度高度
 */
function changeDivHeight(){
	/*document.getElementById('header').style.width = document.documentElement.clientWidth + 'px';
	document.getElementById('main').style.height = document.documentElement.clientHeight - 66 + 'px';
	document.getElementById('main_left').style.height = document.documentElement.clientHeight - 66 + 'px';
	document.getElementById('main_right').style.height = document.documentElement.clientHeight - 66 + 'px';
	document.getElementById('main_right').style.width = document.documentElement.clientWidth - 85 + 'px';
	*/
	var main_right_height = document.getElementById('main_right').clientHeight;
	var event_margin_top = parseInt(((main_right_height - 174)/3 - 111)/2);	
	$.each(document.getElementsByClassName('event'),function(index,data){
		data.style.margin =  event_margin_top + 'px 0';
	});
	$("body>div.window-mask").css({width:$(window)._outerWidth(),height:$(window)._outerHeight()});
	//显示隐藏tab
	var tabNum = parseInt((document.getElementById('header').clientWidth - 175 - 74 - 20)/130);
	var tabList = $('.tabList').find('li');
	var tabListNum = 0;
	$.each(tabList,function(index,tab){
		if($(tab).css('display') != 'none'){
			tabListNum ++;
		}
	});
	if(tabNum < tabListNum){
		if($('#tabMore').css('display') == 'none'){
			$('#tabMore').css('display','block');
		}
		var n = 0;
		$.each(tabList,function(index,data){
			if(n < (tabListNum - tabNum)){
				if(data.className != 'listSelected' && $(data).css('display') != "none"){
					$(data).css('display','none');
					n++;
					hideTabNum ++;
					$('#hideTabNum').html(hideTabNum);
					var hideTableHtml = '<li data-eventname="'+data.dataset.eventname+'" onClick="showHideTab(this)">'+data.innerText+'</li>';
					$('#hideTabList').find('ul').append(hideTableHtml);
				}
			}
		});
	}
	if(tabNum > tabListNum){
		var hideTabList = $('#hideTabList').find('li');
		if(hideTabList.length > 0){
			var n = 0;
			$.each(hideTabList,function(index,data){
				if(n < (tabNum - tabListNum)){
					$.each(tabList,function(i,tab){
						if(tab.dataset.eventname == data.dataset.eventname){
							$(tab).css('display','inline-block');
							return true;
						}
					});
					n++;
					hideTabNum --;
					$('#hideTabNum').html(hideTabNum);
					$(data).remove();
				}
			});
		}
		if(hideTabNum == 0){
			if($('#tabMore').css('display') == 'block'){
				$('#tabMore').css('display','none');
			}
		}
	}
}
/**
 * 加载导航菜单
 */
var quickMenusList = [];
var addedQuickMenus = [];
function loadNavMenu(){
	
	var result=jAjax.submit("/param/searchMenuByUserId.do");
	var menuList =result.menus;
	homePage =result.homePage;
	//所有可以选择的快捷菜单
	quickMenusList=result.quickMenus;
	//已添加快捷菜单
	addedQuickMenus=result.addedQuickMenus;
	loginUser.employName = result.employName;
	loginUser.farmName = result.farmName;
	loginUser.farmId = result.farmId;
	loginUser.companyCode = result.companyCode;
	loginUser.isInitPw = result.isInitPw;
	loginUser.password = result.password;
	//添加一级菜单
	var firstMenuHtml = '<ul>';
	$.each(menuList,function(index,data){
		if(index == 0){
			firstMenuHtml += '<li class="menuSelected" data-id="'+data.id+'" onClick="firstMenuClickFun(this)"><div class="firstMenu firstMenuSelected">'+data.moduleName+'</div></li>'
		}else{
			firstMenuHtml += '<li data-id="'+data.id+'" onClick="firstMenuClickFun(this)"><div class="firstMenu">'+data.moduleName+'</div></li>'
		}
	});
	firstMenuHtml += '</ul>';
	document.getElementById('menuList_left').innerHTML = firstMenuHtml;
	//添加二级、三级菜单
	$.each(menuList,function(index,data){
		var secondAndThirdMenuHtml = '';
		if(index == 0){
			secondAndThirdMenuHtml = '<div id="menuList_right_'+data.id+'">';
		}else{
			secondAndThirdMenuHtml = '<div id="menuList_right_'+data.id+'" style="display:none">';
		}
		if(data.children != null){
			$.each(data.children,function(childIndex,childData){
				if(childData.children != null){
					secondAndThirdMenuHtml += '<div class="secondAndThirdMenu"><div class="secondMenu hasChildren">'+childData.moduleName+'</div>';
					secondAndThirdMenuHtml += '<div class="thirdMenu">';
					$.each(childData.children,function(childChildIndex,childChildData){
						secondAndThirdMenuHtml += '<a href="#" style="display:inline-block;margin-right:10px;" data-eventName="'+childChildData.component+'" data-url="'+childChildData.url+'" onClick="menuClickFun(this)">'+childChildData.moduleName + '</a>';
					})
					secondAndThirdMenuHtml += '</div></div>';
				}else{
					secondAndThirdMenuHtml += '<div class="secondAndThirdMenu"><div class="secondMenu"><a href="#" data-eventName="'+childData.component+'" data-url="'+childData.url+'" onClick="menuClickFun(this)">'+childData.moduleName+'</a></div><div>';
				}
			})
		}
		$('#menuList_right').append(secondAndThirdMenuHtml);
	});/*加载导航菜单结束*/
	loadShortCut(quickMenusList,addedQuickMenus);
}
/**
 * 加载快捷菜单
 * @param quickMenusList
 * @param addedQuickMenus
 */
function loadShortCut(quickMenusList,addedQuickMenus){
	//加载已经添加的快捷菜单
	var addedQuickMenusHtml = "";
	var quickMenusListHtml = "";
	$.each(addedQuickMenus,function(i,addedQuickMenu){
		addedQuickMenusHtml += '<li onClick="menuClickFun(this)"'
			+'data-url="'+addedQuickMenu.moduleUrl+'"'
			+'data-chinese="'+addedQuickMenu.moduleName+'"'
			+'data-eventname="'+addedQuickMenu.component+'"'
			+'data-rowid="'+addedQuickMenu.rowId+'"'
			+'data-moduleid="'+addedQuickMenu.moduleId+'">'
			+'<span class="shortCut_span '+addedQuickMenu.iconCls+'_min"></span></li>';
	});
	$('#shortCutList').html(addedQuickMenusHtml);
	//加载可以添加的快捷菜单
	$.each(quickMenusList,function(i,quickMenu){
		var color = null;
		if(1 == i%5){
			color = 'bg_purple';
		}
		if(2 == i%5){
			color = 'bg_pink';
		}
		if(3 == i%5){
			color = 'bg_blue';
		}
		if(4 == i%5){
			color = 'bg_yellow';
		}
		if(0 == i%5){
			color = 'bg_green';
		}
		$.each(addedQuickMenus,function(j,addedQuickMenu){
			if(quickMenu.component == addedQuickMenu.component){
				color += ' bg_gary';
				return true;
			}
		});
	    quickMenusListHtml += '<div class="shortCutMenu">'
	 			+ '<div class="shortCutBg '+color+'" data-eventname="'+quickMenu.component+'"'
	 			+ 'data-moduleid="'+quickMenu.moduleId+'"'
	 			+ 'data-rowid="'+null+'"'
	 			+ 'data-url="'+quickMenu.moduleUrl+'" onClick="addShortCutMenu(this)">'
		 		+ '<span class="shortCutIcon '+quickMenu.iconCls+'"></span>'
		 		+ '</div>'
		 		+ '<span>'+quickMenu.moduleName+'</span>'
		 		+ '</div>';
	});
	$('#shortCutContent').html(quickMenusListHtml);
}
/**
 * 开发中功能点击方法
 */
function developing(){
	$.messager.alert('提示', '功能开发中……');
}
/**
 * 一级菜单点击方法
 * @param para
 */
function firstMenuClickFun(para){
	$.each($('#menuList_left').children('ul').children(),function(index,data){
		if(data.dataset.id == para.dataset.id){
			data.className = 'menuSelected';
			$(data).find('div').addClass('firstMenuSelected');
		}else{
			data.className = '';
			$(data).find('div').removeClass('firstMenuSelected');
		}
	});
	$.each($('#menuList_right').children(),function(index,data){
		if(data.id == 'menuList_right_'+ para.dataset.id){
			data.style.display = 'block';
		}else{
			data.style.display = 'none';
		}
	});
	
}
/**
 * 设置字体大小
 * @param fontSize
 */
function fontSizeSet(para,fontSize){
	if(para.style.color != "rgb(127, 191, 202)"){
		$.each($(para.parentNode).find('a'),function(index,data){
			if(data.style.color == "rgb(127, 191, 202)"){
				data.style.color = '#454545';
			}
		});
		para.style.color = '#7fbfca';
		$(document.body).append('<style>*{font-size:'+fontSize+' !important;}</style>');
		
		for (var i=0; i<frames.length; i++){
			$(frames[i].document.body).append('<style>*{font-size:'+fontSize+' !important;}</style>');
		 }
		baseFontSize=fontSize;
	}
	
}

/**
 * 退出登录
 */
function onBtnExit(){
	$.messager.confirm('提示', '确定要退出吗？', function(r){
		if (r){
			jAjax.submit('/login/logout.do', null, 
		    		function() {
						window.location.href="login.jsp";
					});
		}
	});
}
/**
 * tab左移方法
 */
var hideTabNum = 0;
function turnLeftFun(){
	var tabList = $('.tabList').find('li');
	for(var i in tabList){
		if(tabList[i].style.display != 'none'){
			tabList[i].style.display = 'none';
			hideTabNum ++ ;
			var hideTableHtml = '<li data-eventname="'+tabList[i].dataset.eventname+'" onClick="showHideTab(this)">'+tabList[i].innerText+'</li>';
			$('#hideTabList').find('ul').append(hideTableHtml);
			$('#hideTabNum').html(hideTabNum);
			break;
		}
	}
}
/**
 * tab右移方法
 */
function turnRightFun(){
	var tabList = $('.tabList').find('li');
	for(var i = tabList.length - 1; i >= 0 ; i --){
		if(tabList[i].style.display == 'none'){
			tabList[i].style.display = 'inline-block';
			break;
		}
	}
}
function showMoreTable(){
	$('#hideTabList').css('display','block');
}
function showHideTab(para){
	//获取关闭标签事件名称
	var eventName = para.dataset.eventname;
	var tabList = $('.tabList').find('li');
	var hideTabList = $('#hideTabList').find('li');
	$.each(tabList,function(index,data){
		if($('.hompageBorder')[0].className == 'hompageBorder fl listSelected'){
			$('.hompageBorder')[0].className = 'hompageBorder fl';
			$('#tabContent_homePage').css('display','none');
		}else{
			if(data.dataset.eventname == eventName){
				if(data.className == ''){
					data.className = 'listSelected';
					$('#tabContent_'+data.dataset.eventname).css('display','block');
					
				}
				$(data).css('display','inline-block');
				$.each(hideTabList,function(i,hideTab){
					if(hideTab.dataset.eventname == eventName){
						$(hideTab).remove();
					}
				});
			}else{
				if(data.className == 'listSelected'){
					data.className = '';
					$('#tabContent_'+data.dataset.eventname).css('display','none');
				}
			}
		}
	});
	for(var i = 0; i < tabList.length ; i ++){
		if(tabList[i].style.display != 'none' && tabList[i].dataset.eventname != eventName){
			tabList[i].style.display = 'none';
			var hideTableHtml = '<li data-eventname="'+tabList[i].dataset.eventname+'" onClick="showHideTab(this)">'+tabList[i].innerText+'</li>';
			$('#hideTabList').find('ul').append(hideTableHtml);
			$('#hideTabNum').html(hideTabNum);
			break;
		}
	}
	$('#hideTabList').css('display','none');
}
/**
 * 添加快捷菜单
 */
function openShortcutMenu(){
	openWindowMask({z_index:3});
	$('#shortCutWin').animate({right:'0'});
}

/**
 * 添加快捷键
 */
function addShortCutMenu(para){
	var shortCutList = $('#shortCutList').find('li');
	var liLength = shortCutList.length;var isExitFlag = false;
	$.each(shortCutList,function(index,data){
		if(data.dataset.eventname == para.dataset.eventname){
			isExitFlag = true;
			$(data).remove();
			$(para).removeClass('bg_gary');
			return false;
		}
	});
	if(!isExitFlag){
		if(liLength >= 5){
			$.messager.alert('提示', '只能添加5个快捷键，请删除无用快捷键再添加新的快捷键！');
		}else{
			var classNameString = $(para).find('span.shortCutIcon').attr('class');
			var tagClassName = classNameString.substring(13,classNameString.length);
			var html = '<li onClick="menuClickFun(this)" '
					+'data-url="'+para.dataset.url+'"'
					+'data-chinese="'+para.nextElementSibling.innerText+'"'
					+'data-eventname="'+para.dataset.eventname+'"'
					+'data-rowid="'+para.dataset.rowid+'"'
					+'data-moduleid="'+para.dataset.moduleid+'">'
					+'<span class="shortCut_span '+tagClassName+'_min"></span></li>';
			$('#shortCutList').append(html);
			$(para).addClass('bg_gary');
		}
	}
}
/**
 * 关闭快捷菜单
 */
function closeShortCutWin(){
	$('#shortCutWin').animate({right:'-780px'});
	$('.window-mask').remove();
	loadShortCut(quickMenusList,addedQuickMenus);
}
/**
 * 遮罩
 * @param pms
 */
function openWindowMask(pms){
	$('<div class="window-mask" style="z-index:'+pms.z_index+'"></div>').insertAfter($('body'));
}
/**
 * 保存快捷菜单
 */
function saveShortCutMenu(){
	var quickMenuList = [];
	var addedShortCutList = $('#shortCutList').find('li');
	if(addedShortCutList.length > 0){
		$.each(addedShortCutList,function(i,addedShortCut){
			quickMenuList.push({
				rowId:parseInt(addedShortCut.dataset.rowid),
				sortNbr:i+1,
				moduleId:parseInt(addedShortCut.dataset.moduleid)
			});
			if(addedShortCut.dataset.rowid == 'null'){
				addToolTip(addedShortCut,{
					content:addedShortCut.dataset.chinese
				});
			}
		});
	}
	var jsonQuickMenuList = JSON.stringify(quickMenuList);
	jAjax.submit("/backEnd/editQuickMenus.do",{quickMenuList:jsonQuickMenuList},function(data){
		$('#shortCutWin').animate({right:'-780px'});
		$('.window-mask').remove();
	});
}
/**
 * 控件添加提示文字
 * @param para
 * @param pms
 */
function addToolTip(para,pms){
	$(para).tooltip({
	    position: pms.position == null ? 'right' : pms.position,
	    content: '<span style="color:#fff">'+pms.content+'</span>',
	    onShow: function(){
	        $(this).tooltip('tip').css({
	            backgroundColor: '#666',
	            borderColor: '#666'
	        });
	    }
	});
}
/**
 * 打开修改密码界面
 */
function openPasswordWin(){
	openWindowMask({z_index:3});
	$('#changePassword').animate({right:'0'});
	$('#changePassword').find('.arrow_right').css('display','inline-block');
	$('#cancelPassword').css('display','inline-block');
	$('#passwordForm').form('reset');
}
/**
 * 关闭修改密码界面
 */
function closePasswordWin(){
	$('#changePassword').animate({right:'-390px'});
	$('.window-mask').remove();
}
/**
 * 保存密码
 */
function savePassword(){
	
	$('#passwordForm').form('submit',{
		url:basicUrl+'/login/editPassword.do"',
		onSubmit: function(){
			var isValid = $('#passwordForm').form('validate');
			return isValid;
		},
		success: function(response){
			response=eval('('+response+')');
			if(response.success){
				$('#changePassword').animate({right:'-390px'});
				$('.window-mask').remove();
				$.messager.alert('提示','密码保存成功！');
			}else{
				 $.messager.alert({
                     title: '错误',
                     msg: response.errorMsg
                 });
			}

		}
	});

}
