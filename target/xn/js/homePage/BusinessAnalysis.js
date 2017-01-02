var basicSowNum = 0;
var shouldDelivery = 0;
var shouldBreed = 0;
$(document).ready(function(){
	var navList = $('#verticalNav').find('li');
	var navTop = [];
	$.each(navList,function(i,nav){
		navTop.push($("#"+nav.dataset.href).offset().top-$("#SCCS").offset().top-$("#SCCS").height() - 20);
	})
	$.each(navList,function(i,nav){
		nav.onclick = function(){
			if(nav.className != 'selected'){
				$("#tabContent_homePage").animate({
					scrollTop : navTop[i]
				},500);
				setTimeout(function(){
					$(".verticalNav .selected").find('span').removeClass('solid-arrow');
					$(".verticalNav .selected").find('span').addClass('point');
					$(".verticalNav .selected").removeClass("selected");
					$(nav).addClass("selected");
					$(nav).find('span').removeClass('point')
					$(nav).find('span').addClass('solid-arrow')
				},500);
				
			}
		}
	});
	$("#tabContent_homePage").scroll(function() {
		var scrTop = $("#tabContent_homePage").scrollTop();
		var selected = '';
		$.each(navList,function(i,nav){
			var liTop = navTop[i];
			if(liTop <= scrTop){
				selected = $(this);
			}
		});
		$(".verticalNav .selected").find('span').removeClass('solid-arrow');
		$(".verticalNav .selected").find('span').addClass('point');
		$(".verticalNav .selected").removeClass("selected");
		$(selected).addClass("selected");
		$(selected).find('span').removeClass('point')
		$(selected).find('span').addClass('solid-arrow')
	});
	 //生产参数初始化
	 productionParamAddData();
	 //存栏规模初始化
	 handScaleInit('week');
	 //生产分析初始化
	 productionAnalyzeInit('week');
	 //栏舍周转初始化
	 deathAnalyzeInit('week');
	 //胎次分布初始化
	 parityDescInit(basicSowNum);
	 //母猪群蓝图数据绑定
	 sowSwineryBlueMapAddData();
	 //生产提醒数据绑定
	 productionWarnAddData();
	 //综合指标
	 syntheticalIndicator("year");
	 //栏舍周转
	 changePigpenAndHouseByPigType();
});
function syntheticalIndicator(para){
    var any=jAjax.submit("/portal/searchSyntheticalIndicatorByDate.do");
    console.log(any);
}
function changePigpenAndHouseByPigType(){
    var any=jAjax.submit("/portal/searchChangePigpenAndHouseByPigType.do");
    console.log(any);
}
function closeOrOpen(para){
	if(para.className == 'closeOrOpen hidePanel'){
		$(para).html('展开');
		$(para).removeClass('hidePanel');
		$(para).addClass('showPanel');
		$('.canHide').css('display','none');
		$('.contain').css('padding-top','182px');
	}else{
		$(para).html('收缩');
		$(para).removeClass('showPanel');
		$(para).addClass('hidePanel');
		$('.canHide').css('display','block');
		$('.contain').css('padding-top','282px');
	}
}
function productionParamAddTips(id,max,min){
	addToolTip($('#'+id),{
		content:"最大值："+max + "<br> 最小值：" + min
	})
}
function handScaleInit(dateType){
	var myChart = echarts.init(document.getElementById('handScale'));
	$.get(basicUrl+"/portal/searchAmountSize.do?dateType="+dateType).done(function (data) {
		var handScaleData = eval('('+data+')').rows;
		var xAxisData = [],totalData=[],boarData = [],sowData = [],porkData = [];
		$.each(handScaleData,function(i,data){
			xAxisData.push(data.DATE);
			totalData.push(data.ALL_PIG);
			sowData.push(data.MZ_PIG);
			boarData.push(data.GZ_PIG);
			porkData.push(data.RZ_PIG);
		});
		 myChart.setOption({
			 tooltip: {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['猪只总数','母猪','肉猪','公猪']
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
			        name:'头数'
			    },
			    series: [
			        {
			            name:'猪只总数',
			            type:'line',
			            data:totalData
			        },
			        {
			            name:'母猪',
			            type:'line',
			            data:sowData
			        },
			        {
			            name:'公猪',
			            type:'line',
			            data:boarData
			        },
			        {
			            name:'肉猪',
			            type:'line',
			            data:porkData
			        }
			    ]
		 });
	});
}
function productionAnalyzeInit(dateType){
	var myChart = echarts.init(document.getElementById('productionAnalyze'));
	$.get(basicUrl+"/portal/searchProductionByDate.do?dateType="+dateType).done(function (data) {
		var result = eval('('+data+')').rows;
		var xAxisData = [],DN_PIG = [],FM_PIG = [],DN_SOW_PIG = [],ZRDP_PIG = [],MRHB_PIG = [],PZ_PIG = [],ZBY_PIG = [],ZYF_PIG = [],
		MZ_SALE_PIG = [],FZ_SALE_PIG = [],CC_SALE_PIG = [],ZZ_SALE_PIG = [],ZZ_OUT_PIG = [],FARM_KILL_PIG = [];
		var weekNumHTML = "",DN_PIG_HTML = "",FM_PIG_HTML = "",DN_SOW_PIG_HTML = "" ,ZRDP_PIG_HTML = "",MRHB_PIG_HTML = "",PZ_PIG_HTML = "",ZBY_PIG_HTML = "",ZYF_PIG_HTML = "",
		MZ_SALE_PIG_HTML = "",FZ_SALE_PIG_HTML = "" ,CC_SALE_PIG_HTML = "",ZZ_SALE_PIG_HTML = "",ZZ_OUT_PIG_HTML = "",FARM_KILL_PIG_HTML = "";
		$.each(result,function(i,data){
			var NUM_INDEX = data.NUM_INDEX;
			if(dateType == 'week'){
				NUM_INDEX += '周';
			}else{
				NUM_INDEX += '月';
			}
			xAxisData.push(NUM_INDEX);
			weekNumHTML += '<th>'+data.NUM_INDEX+'</th>;'
			DN_PIG.push(data.DN_PIG);
			DN_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("wean","weanDateStart","weanDateEnd","'+data.START_DATE+'","'+data.END_DATE+'")>'+data.DN_PIG+'</a></td>';
//			FMZZ_PIG.push(data.FMZZ_PIG);
//			FMZZ_PIG_HTML += '<td>'+data.FMZZ_PIG+'</td>';
			FM_PIG.push(data.FM_PIG);
			FM_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("delivery","deliveryDateStart","deliveryDateEnd","'+data.START_DATE+'","'+data.END_DATE+'")>'+data.FM_PIG+'</a></td>';
			DN_SOW_PIG.push(data.DN_SOW_PIG);
			DN_SOW_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("wean","weanDateStart","weanDateEnd","'+data.START_DATE+'","'+data.END_DATE+'")>'+data.DN_SOW_PIG+'</a></td>';
			ZRDP_PIG.push(data.ZRDP_PIG);
			ZRDP_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("reserveProduct","productDateStart","productDateEnd","'+data.START_DATE+'","'+data.END_DATE+'","2")>'+data.ZRDP_PIG+'</a></td>';
			MRHB_PIG.push(data.MRHB_PIG);
			MRHB_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("moveIn","moveInDateStart","moveInDateEnd","'+data.START_DATE+'","'+data.END_DATE+'")>'+data.MRHB_PIG+'</a></td>';
//			MZ_PIG.push(data.MZ_PIG);
//			MZ_PIG_HTML += '<td>'+data.MZ_PIG+'</td>';
			PZ_PIG.push(data.PZ_PIG);
			PZ_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("breed","breedDateStart","breedDateEnd","'+data.START_DATE+'","'+data.END_DATE+'")>'+data.PZ_PIG+'</a></td>';
			ZBY_PIG.push(data.ZBY_PIG);
			ZBY_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("child","childDateStart","childDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,"3,4")>'+data.ZBY_PIG+'</a></td>';
			ZYF_PIG.push(data.ZYF_PIG);
			ZYF_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("child","childDateStart","childDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,"5,6")>'+data.ZYF_PIG+'</a></td>';
			MZ_SALE_PIG.push(data.MZ_SALE_PIG);
			MZ_SALE_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,"4")>'+data.MZ_SALE_PIG+'</a></td>';
			FZ_SALE_PIG.push(data.FZ_SALE_PIG);
			FZ_SALE_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,"3")>'+data.FZ_SALE_PIG+'</a></td>';
			CC_SALE_PIG.push(data.CC_SALE_PIG);
			CC_SALE_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,"5")>'+data.CC_SALE_PIG+'</a></td>';
			ZZ_SALE_PIG.push(data.ZZ_SALE_PIG);
			ZZ_SALE_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,null,"2")>'+data.ZZ_SALE_PIG+'</a></td>';
			ZZ_OUT_PIG.push(data.ZZ_OUT_PIG);
			ZZ_OUT_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,null,"3")>'+data.ZZ_OUT_PIG+'</a></td>';
			FARM_KILL_PIG.push(data.FARM_KILL_PIG);
			FARM_KILL_PIG_HTML += '<td><a href="#" class="fineReport-a" onClick=openReport("sale","saleDateStart","saleDateEnd","'+data.START_DATE+'","'+data.END_DATE+'",null,null,null,"4")>'+data.FARM_KILL_PIG+'</a></td>';
		});
		$('#weekNum').nextAll().remove();
		$('#weekNum').after(weekNumHTML);
		
		$('#MRHB_PIG').nextAll().remove();
		$('#MRHB_PIG').after(MRHB_PIG_HTML);
		
		$('#ZRDP_PIG').nextAll().remove();
		$('#ZRDP_PIG').after(ZRDP_PIG_HTML);
		
//		$('#FMZZ_PIG').nextAll().remove();
//		$('#FMZZ_PIG').after(FMZZ_PIG_HTML);
		
		$('#FM_PIG').nextAll().remove();
		$('#FM_PIG').after(FM_PIG_HTML);
		
		$('#DN_SOW_PIG').nextAll().remove();
		$('#DN_SOW_PIG').after(DN_SOW_PIG_HTML);
		
		$('#DN_PIG').nextAll().remove();
		$('#DN_PIG').after(DN_PIG_HTML);
		
//		$('#MZ_PIG').nextAll().remove();
//		$('#MZ_PIG').after(MZ_PIG_HTML);
		
		$('#PZ_PIG').nextAll().remove();
		$('#PZ_PIG').after(PZ_PIG_HTML);
		
		$('#ZBY_PIG').nextAll().remove();
		$('#ZBY_PIG').after(ZBY_PIG_HTML);
		
		$('#ZYF_PIG').nextAll().remove();
		$('#ZYF_PIG').after(ZYF_PIG_HTML);
		
		$('#MZ_SALE_PIG').nextAll().remove();
		$('#MZ_SALE_PIG').after(MZ_SALE_PIG_HTML);
		
		$('#FZ_SALE_PIG').nextAll().remove();
		$('#FZ_SALE_PIG').after(FZ_SALE_PIG_HTML);
		
		$('#CC_SALE_PIG').nextAll().remove();
		$('#CC_SALE_PIG').after(CC_SALE_PIG_HTML);
		
		$('#ZZ_SALE_PIG').nextAll().remove();
		$('#ZZ_SALE_PIG').after(ZZ_SALE_PIG_HTML);
		
		$('#ZZ_OUT_PIG').nextAll().remove();
		$('#ZZ_OUT_PIG').after(ZZ_OUT_PIG_HTML);
		
		$('#FARM_KILL_PIG').nextAll().remove();
		$('#FARM_KILL_PIG').after(FARM_KILL_PIG_HTML);
		myChart.setOption({
			tooltip: {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['买入后备','转入待配','配种','分娩','断奶母猪','断奶仔猪','转保育','转育肥','苗猪销售','肥猪销售','残次猪销售','种猪销售','种猪淘汰','种猪自宰'],
		        orient:'vertical',
		        right:0,
		        top:50
		    },
		    grid:{
		    	right:'25%',
		    },
		    xAxis:  {
		        type: 'category',
		        boundaryGap: false,
		        data: xAxisData
		    },
		    yAxis: {
		        type: 'value',
		        name:'头数'
		    },
		    series: [
				{
				    name:'买入后备',
				    type:'line',
				    data:MRHB_PIG
				},
				{
				    name:'转入待配',
				    type:'line',
				    data:ZRDP_PIG
				},
//		        {
//		            name:'分娩仔猪',
//		            type:'line',
//		            data:FMZZ_PIG
//		        },
				{
		            name:'配种',
		            type:'line',
		            data:PZ_PIG
		        },
		        {
		            name:'分娩',
		            type:'line',
		            data:FM_PIG
		        },
		        {
		            name:'断奶母猪',
		            type:'line',
		            data:DN_SOW_PIG		        
		        },
		        {
		            name:'断奶仔猪',
		            type:'line',
		            data:DN_PIG		        
		        },
		        
		        {
		            name:'转保育',
		            type:'line',
		            data:ZBY_PIG
		        },
		        {
		            name:'转育肥',
		            type:'line',
		            data:ZYF_PIG
		        },
//		        {
//		            name:'苗猪',
//		            type:'line',
//		            data:MZ_PIG
//		        },
		        {
		            name:'苗猪销售',
		            type:'line',
		            data:MZ_SALE_PIG
		        },
		        {
		            name:'肥猪销售',
		            type:'line',
		            data:FZ_SALE_PIG
		        },
		        {
		            name:'残次猪销售',
		            type:'line',
		            data:CC_SALE_PIG
		        },
		        {
		            name:'种猪销售',
		            type:'line',
		            data:ZZ_SALE_PIG
		        },
		        {
		            name:'种猪淘汰',
		            type:'line',
		            data:ZZ_OUT_PIG
		        },
		        {
		            name:'种猪自宰',
		            type:'line',
		            data:FARM_KILL_PIG
		        }
		    ]
		});
	})
}
function deathAnalyzeInit(dateType){
	var myChart = echarts.init(document.getElementById('deathAnalyze'));
	$.get(basicUrl+"/portal/searchDieByDate.do?dateType="+dateType).done(function (data) {
		var deathData = eval('('+data+')').rows;
		var xAxis = [],BY_PIG = [],CFZZ_PIG = [],YF_PIG = [],ZZ_PIG = [];
		$.each(deathData,function(i,data){
			xAxis.push(data.END_DATE);
			BY_PIG.push(data.BY_PIG);
			CFZZ_PIG.push(data.CFZZ_PIG);
			YF_PIG.push(data.YF_PIG);
			ZZ_PIG.push(data.ZZ_PIG);
		});
		myChart.setOption({
			tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['保育猪','产房仔猪','育肥猪','种猪']
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            data : xAxis
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
	            	name:'头数'
		        }
		    ],
		    series : [
		        {
		            name:'保育猪',
		            type:'bar',
		            data:BY_PIG
		        },
		        {
		            name:'产房仔猪',
		            type:'bar',
		            data:CFZZ_PIG
		        },
		        {
		            name:'育肥猪',
		            type:'bar',
		            data:YF_PIG
		        },
		        {
		            name:'种猪',
		            type:'bar',
		            data:ZZ_PIG
		        }
		    ]
		});
	})
}

function parityDescInit(basicSowNum){
	var myChart = echarts.init(document.getElementById('parityDesc'));
	$.get(basicUrl+"/portal/searchParityByDate.do?pigNum="+basicSowNum).done(function (data) {
		var result = eval('('+data+')').rows;
		var xAxisData = [],NOW_NUM = [],OLD_NUM = [],T_NUM = [],NOW_PERCENT = [],T_PERCENT = [];
		$.each(result,function(i,data){
			xAxisData.push(data.PARITY);
			NOW_NUM.push(data.NOW_NUM);
			OLD_NUM.push(data.OLD_NUM);
			T_NUM.push(data.T_NUM);
			NOW_PERCENT.push(data.NOW_PERCENT);
			T_PERCENT.push(data.T_PERCENT);
		});
		 myChart.setOption({
			 tooltip: {
		            trigger: 'axis',
		            formatter: function (param) {
	                    var param = param[0];
	                    return [
	                        '胎次: ' + param.name + '<hr size=1 style="margin: 3px 0">',
	                        '当前母猪百分百: ' + NOW_PERCENT[param.dataIndex].toFixed(2) + '%<br/>',
	                        '标准百分比: ' + T_PERCENT[param.dataIndex].toFixed(2) + '%<br/>'
	                    ].join('');
	                }
		        },
			    legend: {
			        data:['合理胎次','当前胎次','去年同期']
			    },
			    xAxis:  {
			        type: 'category',
			        boundaryGap: false,
			        data: xAxisData
			    },
			    yAxis: {
			        type: 'value',
			        name:'头数'
			    },
			    series: [
			        {
			            name:'合理胎次',
			            type:'line',
			            data:T_NUM
			        },
			        {
			            name:'当前胎次',
			            type:'line',
			            data:NOW_NUM
			        },
			        {
			            name:'去年同期',
			            type:'line',
			            data:OLD_NUM
			        }
			    ]
		 });
	});
}
function sowSwineryBlueMapAddData(){
	jAjax.submit("/portal/searchSwineryClassNumByDate.do",null,function(response){
		var weekArry = [];
		$('.exception').empty();
		$('#swineryName').empty();
		$('#swineryName').append('<span class="y-week-s">周</span>');
		$('.delivery-rate').empty();
		$('#week-line').empty();
		$('#sowSwinery').empty();
		var YCRate = response.YCRate == undefined ? '0.00%' : response.YCRate,
			FQRate = response.FQRate == undefined ? '0.00%' : response.FQRate,
			KHRate = response.KHRate == undefined ? '0.00%' : response.KHRate,
			LCRate = response.LCRate == undefined ? '0.00%' : response.LCRate;
		$('.exception').append('<span>异常率：'+YCRate+'</span><span>返情占比：'+FQRate+'</span><span>空怀占比：'+KHRate+'</span><span>流产占比：'+LCRate+'</span>');
		var result = response.swineryList;
		$.each(result,function(i,data){
			var swineryNameHtml = '<span class="y-week">'+data.swineyName+'</span>';
			if(data.breedNum > shouldBreed){
				swineryNameHtml = '<span class="y-week y-week-abnormal">'+data.swineyName+'</span>';
			}
			$('#swineryName').append(swineryNameHtml);
			$('.delivery-rate').append('<span class="y-week" data-siwineryid="'+data.swineryId+'">'+data.deliveryRate+'</span>');
			if(i == 0){
				var weekLineHtml = '<ul class="week-line">';
				$.each(data.weekList,function(j,weekDate){
					//<div class="col-line" style="height:'+60*result.length+'px"></div>
					weekLineHtml += '<li><span>'+weekDate.week+'</span></li>';
					weekArry.push(weekDate.week);
				});
				weekLineHtml += '</ul>';
				$('#week-line').append(weekLineHtml);
			}
			var top = Math.ceil(40*(1-shouldDelivery/shouldBreed))+10;
			
			var headHtml = '<div class="row-batch">';
			var shouldDeliveryHtml = '<div class="should-delivery-line" style="top:'+top+'px"><span>'+shouldDelivery+'</span></div>';
			if(data.breedNum > shouldBreed){
				shouldDeliveryHtml = '<div class="should-delivery-line abnormal" style="top:'+top+'px"><span>'+shouldDelivery+'</span></div>';
			}
			var bacthHtml = '';
			$.each(data.weekList,function(j,weekDate){
				var greyVioletHight = 40*(weekDate.breedNum/shouldBreed),
				blueHeight = 40*(weekDate.pregnancyNum/shouldBreed),
				yellowHeight = 40*(weekDate.deliveryNum/shouldBreed),
				greenwHeight = 40*(weekDate.weanNum/shouldBreed);
				if(data.breedNum > shouldBreed){
					var overBreedNum = data.breedNum - shouldBreed;
					if(weekDate.breedNum > 0){
						if(weekDate.breedNum >= overBreedNum){
							greyVioletHight = 40*((weekDate.breedNum - overBreedNum)/shouldBreed);
							overBreedNum = 0;
						}else{
							greyVioletHight = 0;
							overBreedNum = overBreedNum - weekDate.breedNum;
						}
					}
					if(weekDate.pregnancyNum > 0){
						if(weekDate.pregnancyNum >= overBreedNum){
							blueHeight = 40*((weekDate.pregnancyNum - overBreedNum)/shouldBreed);
							overBreedNum = 0;
						}else{
							blueHeight = 0;
							overBreedNum = overBreedNum - weekDate.pregnancyNum;
						}
					}
					if(weekDate.deliveryNum > 0){
						if(weekDate.deliveryNum >= overBreedNum){
							yellowHeight = 40*((weekDate.deliveryNum - overBreedNum)/shouldBreed);
							overBreedNum = 0;
						}else{
							yellowHeight = 0;
							overBreedNum = overBreedNum - weekDate.deliveryNum;
						}
					}
					if(weekDate.weanNum > 0){
						if(weekDate.weanNum >= overBreedNum){
							greenwHeight = 40*((weekDate.weanNum - overBreedNum)/shouldBreed);
							overBreedNum = 0;
						}else{
							greyVioletHight = 0;
							greenwHeight = overBreedNum - weekDate.weanNum;
						}
					}
					
				}
				var garyHeight = 40-greyVioletHight-blueHeight-yellowHeight-greenwHeight;
				bacthHtml += '<div class="col-batch">'
					+ '<div class="small-rec rectangle_gary" style="height:'+garyHeight+'px;"></div>'
					+ '<div class="small-rec rectangle_greyViolet" style="height:'+greyVioletHight+'px;"></div>'
					+ '<div class="small-rec rectangle_blue" style="height:'+blueHeight+'px;"></div>'
					+ '<div class="small-rec rectangle_yellow" style="height:'+yellowHeight+'px;"></div>'
					+ '<div class="small-rec rectangle_green" style="height:'+greenwHeight+'px;"></div>'
					+ '</div>';
			});
			var swineryBacthHtml = headHtml + shouldDeliveryHtml + bacthHtml + '</div>';
			$('#sowSwinery').append(swineryBacthHtml);
		});
		//显示周次
		$.each($('.week-line').find('li'),function(n,li){
			$(li).find('span').html(weekNum[n]);
		});
		$.each($('.row-batch'),function(i,row){
			var col_batch = $(row).find('.col-batch');
			$.each(col_batch,function(j,col){
				var content = '<span style="font-size:14px;">第'+weekArry[j]+'周</span><br><br>'
							+ '<span style="font-size:14px;">' +result[i].swineyName + '</span><br>'
							+ '配种：'+result[i].weekList[j].breedNum + '头<br>'
							+ '怀孕：'+result[i].weekList[j].pregnancyNum + '头<br>'
							+ '分娩：'+result[i].weekList[j].deliveryNum + '头<br>'
							+ '断奶：'+result[i].weekList[j].weanNum + '头'
				addToolTip(col,{
					content:content
				});
			})
		})
	    //sowSwineryBlueMapAddTip(result);
	},null,null,true);
}

//function sowSwineryBlueMapAddTip(result){
//	var weekList = $('.week-line').find('li').find('span');
//	$.each(weekList,function(i,week){
//		var content = '<span style="font-size:14px;">第'+week.innerHTML+'周</span><br><br>';
//		$.each(result,function(r,data){
//			content += '<span style="font-size:14px;">' +data.swineyName + '</span><br>'
//					+ '&nbsp;&nbsp;&nbsp;&nbsp;配种：'+data.weekList[i].breedNum + '头<br>'
//					+ '&nbsp;&nbsp;&nbsp;&nbsp;怀孕：'+data.weekList[i].pregnancyNum + '头<br>'
//					+ '&nbsp;&nbsp;&nbsp;&nbsp;分娩：'+data.weekList[i].deliveryNum + '头<br>'
//					+ '&nbsp;&nbsp;&nbsp;&nbsp;断奶：'+data.weekList[i].weanNum + '头<br><br>';
//		});
//		addToolTip(week,{
//			content:content
//		});
//	})
//}
function paramChange(pms){
	 var range = pms.max - pms.min;
     $('#'+pms.id+'Value').html(Math.ceil(pms.value));
	 $('#'+pms.id).find('.rectangle_gary').css('height',100-(pms.value-pms.min)/range*100);
     $('#'+pms.id).find('.'+pms.color).css('height',(pms.value-pms.min)/range*100);
}
function handScaleChange(para){
	handScaleInit($(para).val());
}
function deathAnalyzeChange(para){
	deathAnalyzeInit($(para).val())
}
function productionAnalyze(para){
	productionAnalyzeInit($(para).val());
	if($(para).val() == 'week'){
		$('.table-th-bias').find('b').html('周次');
	}else{
		$('.table-th-bias').find('b').html('月份');
	}
}
function productionWarnAddData(){
	//配种异常
	$('#breedWarn').empty();
	jAjax.submit("/portal/productionAbnormalByBreed.do",null,function(response){
		$.each(response,function(i,data){
			var html = '<tr>'
				+ '<td class="wd-3">'+data.SORT_NBR+'</td>'
				+ '<td class="wd-16"><a class="fineReport-a" href="#" onClick=openWarnReport("BREED",'+data.SORT_NBR+')>'+data.MESSAGE+'</a></td>'
				+ '<td class="wd-5 font-red">'+data.PIG_QTY+'</td>'
				+ '</tr>';
			$('#breedWarn').append(html);
		})
	},null,null,true);
	//上产床异常
	$('#laborWarn').empty();
	jAjax.submit("/portal/productionAbnormalByLaborHouse.do",null,function(response){
		$.each(response,function(i,data){
			var html = '<tr>'
				+ '<td class="wd-20"><a class="fineReport-a" href="#" onClick=openWarnReport("CHANGE_LABOR_HOUSE",'+data.SORT_NBR+')>'+data.MESSAGE+'</a></td>'
				+ '<td class="wd-4 font-red">'+data.PIG_QTY+'</td>'
				+ '</tr>';
			$('#laborWarn').append(html);
		})
	},null,null,true);
	//待分娩异常
	$('#deliveryWarn').empty();
	jAjax.submit("/portal/productionAbnormalByDelivery.do",null,function(response){
		$.each(response,function(i,data){
			var html = '<tr>'
				+ '<td class="wd-20"><a class="fineReport-a" href="#" onClick=openWarnReport("DELIVERY",'+data.SORT_NBR+')>'+data.MESSAGE+'</a></td>'
				+ '<td class="wd-4 font-red">'+data.PIG_QTY+'</td>'
				+ '</tr>';
			$('#deliveryWarn').append(html);
		})
	},null,null,true);
	//待断奶异常
	$('#weanWarn').empty();
	jAjax.submit("/portal/productionAbnormalByWean.do",null,function(response){
		$.each(response,function(i,data){
			var html = '<tr>'
				+ '<td class="wd-20"><a class="fineReport-a" href="#" onClick=openWarnReport("WEAN",'+data.SORT_NBR+')>'+data.MESSAGE+'</a></td>'
				+ '<td class="wd-4 font-red">'+data.PIG_QTY+'</td>'
				+ '</tr>';
			$('#weanWarn').append(html);
		})
	},null,null,true);
	//待出栏异常
	$('#sellWarn').empty();
	jAjax.submit("/portal/productionAbnormalBySell.do",null,function(response){
		$.each(response,function(i,data){
			var html = '<tr>'
				+ '<td class="wd-20"><a class="fineReport-a" href="#" onClick=openWarnReport("PORK",'+data.SORT_NBR+')>'+data.MESSAGE+'</a></td>'
				+ '<td class="wd-4 font-red">'+data.PIG_QTY+'</td>'
				+ '</tr>';
			$('#sellWarn').append(html);
		})
	},null,null,true);
}
function productionParamAddData(){
	var indicatorMap = jAjax.submit('/portal/searchIndicator.do');
	 basicSowNum = indicatorMap.Z001.standardValue;
	 var baseSow = indicatorMap.Z001,yearParity = indicatorMap.Z004,
	 	 deliveryRate = indicatorMap.Z022,liveNum = indicatorMap.Z056,
	 	 pigletsLiveRate = indicatorMap.Z038,childCareLiveRate = indicatorMap.Z041,
	 	 fattenLiveRate = indicatorMap.Z045,productionRhythm = indicatorMap.Z002,
	 	 updateRate = indicatorMap.Z013,preSowSucRate = indicatorMap.Z054,
	 	 outPigpen = indicatorMap.Z055;
	 var baseSow_SV = baseSow.standardValue,yearParity_SV = yearParity.standardValue,
	 	 deliveryRate_SV = deliveryRate.standardValue,liveNum_SV = liveNum.standardValue,
	 	 pigletsLiveRate_SV = pigletsLiveRate.standardValue,childCareLiveRate_SV = childCareLiveRate.standardValue,
	 	 fattenLiveRate_SV = fattenLiveRate.standardValue,productionRhythm_SV = productionRhythm.standardValue,
	 	 updateRate_SV = updateRate.standardValue,preSowSucRate_SV = preSowSucRate.standardValue,
	 	 outPigpen_SV = outPigpen.standardValue;
	 //生产参数
	 $('#baseSow').html(baseSow_SV);
	 $('#yearParity').html(yearParity_SV);
	 $('#deliveryRate').html(deliveryRate_SV);
	 $('#liveNum').html(liveNum_SV);
	 $('#pigletsLiveRate').html(pigletsLiveRate_SV);
	 $('#childCareLiveRate').html(childCareLiveRate_SV);
	 $('#fattenLiveRate').html(fattenLiveRate_SV);
	 $('#productionRhythm').html(productionRhythm_SV);
	 $('#updateRate').html(updateRate_SV);
	 $('#preSowSucRate').html(preSowSucRate_SV);
	 $('#outPigpen').html(outPigpen_SV);
	 //年分娩窝数
	 var yearDeliverySizeValue = baseSow_SV * yearParity_SV ;
	 //年配种母猪头次
	 var yearBreedNumValue = yearDeliverySizeValue / deliveryRate_SV * 100;
	//配种头数
	 var breedNumValue = yearBreedNumValue / 365 * productionRhythm_SV;
	 shouldBreed = Math.ceil(breedNumValue);
	 shouldDelivery = Math.ceil(breedNumValue * deliveryRate_SV / 100);
	 //产仔窝数 
	 var litterSizeValue = breedNumValue * deliveryRate_SV / 100;
	 //产仔头数
	 var childPigValue = litterSizeValue * liveNum_SV;
	 //断奶数&转保育
	 var wean_childCareValue = childPigValue * pigletsLiveRate_SV / 100;
	 //转育肥
	 var fattenValue = wean_childCareValue * childCareLiveRate_SV / 100;
	 //销售
	 var sellValue = fattenValue * fattenLiveRate_SV / 100;
	 //年更母猪
	 var yearUpdateSowValue = baseSow_SV * fattenLiveRate_SV / preSowSucRate_SV;
	 
	 var yearDeliverySizeValue_Max = Math.ceil(baseSow.maxValue * yearParity.maxValue);
	 var yearDeliverySizeValue_Min = Math.ceil(baseSow.minValue * yearParity.minValue);
	 paramChange({
		  id:'yearDeliverySize',
		  value:Math.ceil(yearDeliverySizeValue),
		  max:yearDeliverySizeValue_Max,
		  min:yearDeliverySizeValue_Min,
		  color:'rectangle_green'
	  });
	 productionParamAddTips('yearDeliverySize',yearDeliverySizeValue_Max,yearDeliverySizeValue_Min);
	 
	 var deliveryRate_max = deliveryRate.maxValue != undefined ? deliveryRate.maxValue/100 : 1;
	 var deliveryRate_min = deliveryRate.minValue != undefined ? deliveryRate.minValue/100 : 0.01;
	 var yearBreedNumValue_Max = Math.ceil(yearDeliverySizeValue_Max / deliveryRate_min);
	 var yearBreedNumValue_Min = Math.ceil(yearDeliverySizeValue_Min / deliveryRate_max);
	 
	 paramChange({
		  id:'yearBreedNum',
		  value:Math.ceil(yearBreedNumValue),
		  max:yearBreedNumValue_Max,
		  min:yearBreedNumValue_Min,
		  color:'rectangle_blue'
	  });
	 productionParamAddTips('yearBreedNum',yearBreedNumValue_Max,yearBreedNumValue_Min);
	 
    var breedNumValue_Max = Math.ceil(yearBreedNumValue_Max * productionRhythm.maxValue / 365);
	 var breedNumValue_Min = Math.ceil(yearBreedNumValue_Min * productionRhythm.minValue / 365);
	 paramChange({
		  id:'breedNum',
		  value:Math.ceil(breedNumValue),
		  max:breedNumValue_Max,
		  min:breedNumValue_Min,
		  color:'rectangle_red'
	  });
	 productionParamAddTips('breedNum',breedNumValue_Max,breedNumValue_Min);
	 
	 var litterSizeValue_Max = Math.ceil(baseSow.maxValue * yearParity.maxValue * productionRhythm.maxValue / 365);
	 var litterSizeValue_Min = Math.ceil(baseSow.minValue * yearParity.minValue * productionRhythm.minValue / 365);
	 paramChange({
		  id:'litterSize',
		  value:Math.ceil(litterSizeValue),
		  max:litterSizeValue_Max,
		  min:litterSizeValue_Min,
		  color:'rectangle_greyYellow'
	  });
	 productionParamAddTips('litterSize',litterSizeValue_Max,litterSizeValue_Min);
	 
	 var childPigValue_Max = Math.ceil(litterSizeValue_Max * liveNum.maxValue);
	 var childPigValue_Min = Math.ceil(litterSizeValue_Min * liveNum.minValue);
	 paramChange({
		  id:'childPig',
		  value:Math.ceil(childPigValue),
		  max:childPigValue_Max,
		  min:childPigValue_Min,
		  color:'rectangle_skyBule'
	  });
	 productionParamAddTips('childPig',childPigValue_Max,childPigValue_Min);
	 
	 var pigletsLiveRate_max = pigletsLiveRate.maxValue != undefined ? pigletsLiveRate.maxValue/100 : 1;
	 var pigletsLiveRate_min = pigletsLiveRate.minValue != undefined ? pigletsLiveRate.minValue/100 : 0.01;
	 var wean_childCareValue_Max = Math.ceil(childPigValue_Max * pigletsLiveRate_max);
	 var wean_childCareValue_Min = Math.ceil(childPigValue_Min * pigletsLiveRate_min);
	 paramChange({
		  id:'wean-childCare',
		  value:Math.ceil(wean_childCareValue),
		  max:wean_childCareValue_Max,
		  min:wean_childCareValue_Min,
		  color:'rectangle_roseRed'
	  });
	 productionParamAddTips('wean-childCare',wean_childCareValue_Max,wean_childCareValue_Min);
	 
	 var childCareLiveRate_max = childCareLiveRate.maxValue != undefined ? childCareLiveRate.maxValue/100 : 1;
	 var childCareLiveRate_min = childCareLiveRate.minValue != undefined ? childCareLiveRate.minValue/100 : 0.01;
	 var fattenValue_Max = Math.ceil(wean_childCareValue_Max * childCareLiveRate_max);
	 var fattenValue_Min = Math.ceil(wean_childCareValue_Min * childCareLiveRate_min);
	 paramChange({
		  id:'fatten',
		  value:Math.ceil(fattenValue),
		  max:fattenValue_Max,
		  min:fattenValue_Min,
		  color:'rectangle_greyViolet'
	  });
	 productionParamAddTips('fatten',fattenValue_Max,fattenValue_Min);
	 
	 var fattenLiveRate_max = fattenLiveRate.maxValue != undefined ? fattenLiveRate.maxValue/100 : 1;
	 var fattenLiveRate_min = fattenLiveRate.minValue != undefined ? fattenLiveRate.minValue/100 : 0.01;
	 var sellValue_Max = Math.ceil(fattenValue_Max * fattenLiveRate_max);
	 var sellValue_Min = Math.ceil(fattenValue_Min * fattenLiveRate_min);
	 paramChange({
		  id:'sell',
		  value:Math.ceil(sellValue),
		  max:sellValue_Max,
		  min:sellValue_Min,
		  color:'rectangle_yellow'
	  });
	 productionParamAddTips('sell',sellValue_Max,sellValue_Min);
	 
	 var updateRate_max = updateRate.maxValue != undefined ? updateRate.maxValue/100 : 1;
	 var updateRate_min = updateRate.minValue != undefined ? updateRate.minValue/100 : 0.01;
	 var preSowSucRate_max = preSowSucRate.maxValue != undefined ? preSowSucRate.maxValue/100 : 1;
	 var preSowSucRate_min = preSowSucRate.minValue != undefined ? preSowSucRate.minValue/100 : 0.01;
	 var yearUpdateSowValue_Max = Math.ceil(baseSow.maxValue * updateRate_max/preSowSucRate_min );
	 var yearUpdateSowValue_Min = Math.ceil(baseSow.minValue  * updateRate_min / preSowSucRate_max);
	 paramChange({
		  id:'yearUpdateSow',
		  value:Math.ceil(yearUpdateSowValue),
		  max:yearUpdateSowValue_Max,
		  min:yearUpdateSowValue_Min,
		  color:'rectangle_darkBlue'
	  });
	 productionParamAddTips('yearUpdateSow',yearUpdateSowValue_Max,yearUpdateSowValue_Min);
	 $('#slider_baseSow').slider({
	      mode: 'v',
	      reversed: false,
	      value:baseSow_SV,
	      max:baseSow.maxValue,
	      min:baseSow.minValue,
	      onChange:function(value){
	    	  $('#baseSow').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue')/100 ;
	    	  var FML = $('#slider_deliveryRate').slider('getValue') / 100;
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  var GXL = $('#slider_updateRate').slider('getValue')/100;
	    	  var HBYCL = $('#slider_preSowSucRate').slider('getValue')/100;
	    	  //年分娩窝数
	    	  var NFMWS = Math.ceil(value * NCTC);
	    	  paramChange({
	    		  id:'yearDeliverySize',
	    		  value:NFMWS,
	    		  max:yearDeliverySizeValue_Max,
	    		  min:yearDeliverySizeValue_Min,
	    		  color:'rectangle_green'
	    	  });
   	      //年配种母猪头次
   	      var NFZMZTC = Math.ceil(value * NCTC / FML);
   	      paramChange({
	    		  id:'yearBreedNum',
	    		  value:NFZMZTC,
	    		  max:yearBreedNumValue_Max,
	    		  min:yearBreedNumValue_Min,
	    		  color:'rectangle_blue'
	    	  });
   	      //配种头数
   	      var PZTS = Math.ceil(value * NCTC * SCJL/FML/365);
   	      paramChange({
	    		  id:'breedNum',
	    		  value:PZTS,
	    		  max:breedNumValue_Max,
	    		  min:breedNumValue_Min,
	    		  color:'rectangle_red'
	    	  });
   	      //产仔窝数
   	      var CZWS = Math.ceil(value * NCTC * SCJL/365);
   	      paramChange({
	    		  id:'litterSize',
	    		  value:CZWS,
	    		  max:litterSizeValue_Max,
	    		  min:litterSizeValue_Min,
	    		  color:'rectangle_greyYellow'
	    	  });
   	      //产仔头数
   	      var CZTS = Math.ceil(value * NCTC * SCJL * MTCHZS/365);
   	      paramChange({
	    		  id:'childPig',
	    		  value:CZTS,
	    		  max:childPigValue_Max,
	    		  min:childPigValue_Min,
	    		  color:'rectangle_skyBule'
	    	  });
   	      //断奶&转保育
   	      var DNZBY = Math.ceil(value * NCTC * SCJL * MTCHZS * BRQCHL/365);
   	      paramChange({
	    		  id:'wean-childCare',
	    		  value:DNZBY,
	    		  max:wean_childCareValue_Max,
	    		  min:wean_childCareValue_Min,
	    		  color:'rectangle_roseRed'
	    	  });
   	      //转育肥
   	      var ZYF = Math.ceil(value * NCTC * SCJL * MTCHZS * BRQCHL * BYQCHL/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(value * NCTC * SCJL * MTCHZS * BRQCHL * BYQCHL * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
   	      //年更母猪
   	      var NGMZ = Math.ceil(value * GXL / HBYCL);
   	      paramChange({
	    		  id:'yearUpdateSow',
	    		  value:NGMZ,
	    		  max:yearUpdateSowValue_Max,
	    		  min:yearUpdateSowValue_Min,
	    		  color:'rectangle_darkBlue'
	    	  });
   	      setTimeout(function(){
   	    	  parityDescInit(value);
   	      },1000)
	      }
	 });
	  $('#slider_yearParity').slider({
	      mode: 'v',
	      reversed: false,
	      value:yearParity_SV * 100,
	      max:yearParity.maxValue * 100,
	      min:yearParity.minValue * 100,
	      onChange:function(value){
	    	  $('#yearParity').html(value/100);
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var FML = $('#slider_deliveryRate').slider('getValue')/100;
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  //年分娩窝数
	    	  var NFMWS = Math.ceil((value/100) * JCMZ) ;
	    	  paramChange({
	    		  id:'yearDeliverySize',
	    		  value:NFMWS,
	    		  max:yearDeliverySizeValue_Max,
	    		  min:yearDeliverySizeValue_Min,
	    		  color:'rectangle_green'
	    	  });
   	      //年配种母猪头次
   	      var NFZMZTC = Math.ceil((value/100) * JCMZ / FML);
   	      paramChange({
	    		  id:'yearBreedNum',
	    		  value:NFZMZTC,
	    		  max:yearBreedNumValue_Max,
	    		  min:yearBreedNumValue_Min,
	    		  color:'rectangle_blue'
	    	  });
   	      //配种头数
   	      var PZTS = Math.ceil(JCMZ * (value/100) * SCJL/FML/365);
   	      paramChange({
	    		  id:'breedNum',
	    		  value:PZTS,
	    		  max:breedNumValue_Max,
	    		  min:breedNumValue_Min,
	    		  color:'rectangle_red'
	    	  });
   	      //产仔窝数
   	      var CZWS = Math.ceil(JCMZ * (value/100) * SCJL/365);
   	      paramChange({
	    		  id:'litterSize',
	    		  value:CZWS,
	    		  max:litterSizeValue_Max,
	    		  min:litterSizeValue_Min,
	    		  color:'rectangle_greyYellow'
	    	  });
   	      //产仔头数
   	      var CZTS = Math.ceil(JCMZ * (value/100) * SCJL * MTCHZS/365);
   	      paramChange({
	    		  id:'childPig',
	    		  value:CZTS,
	    		  max:childPigValue_Max,
	    		  min:childPigValue_Min,
	    		  color:'rectangle_skyBule'
	    	  });
   	      //断奶&转保育
   	      var DNZBY = Math.ceil(JCMZ * (value/100) * SCJL * MTCHZS * BRQCHL/365);
   	      paramChange({
	    		  id:'wean-childCare',
	    		  value:DNZBY,
	    		  max:wean_childCareValue_Max,
	    		  min:wean_childCareValue_Min,
	    		  color:'rectangle_roseRed'
	    	  });
   	      //转育肥
   	      var ZYF = Math.ceil(JCMZ * (value/100) * SCJL * MTCHZS * BRQCHL * BYQCHL/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(JCMZ * (value/100) * SCJL * MTCHZS * BRQCHL * BYQCHL * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_deliveryRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:deliveryRate_SV,
	      max:deliveryRate_max * 100,
	      min:deliveryRate_min * 100,
	      onChange:function(value){
	    	  $('#deliveryRate').html(value);
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  //年配种母猪头次
   	      var NFZMZTC =  Math.ceil(NCTC * JCMZ/ (value/100));
   	      paramChange({
	    		  id:'yearBreedNum',
	    		  value:NFZMZTC,
	    		  max:yearBreedNumValue_Max,
	    		  min:yearBreedNumValue_Min,
	    		  color:'rectangle_blue'
	    	  });
   	      //配种头数
   	      var PZTS = Math.ceil(JCMZ * NCTC * SCJL/(value/100)/365);
   	      paramChange({
	    		  id:'breedNum',
	    		  value:PZTS,
	    		  max:breedNumValue_Max,
	    		  min:breedNumValue_Min,
	    		  color:'rectangle_red'
	    	  });
	      }
	 })
	  $('#slider_liveNum').slider({
	      mode: 'v',
	      reversed: false,
	      value:liveNum_SV,
	      max:liveNum.maxValue,
	      min:liveNum.minValue,
	      onChange:function(value){
	    	  $('#liveNum').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  //产仔头数
   	      var CZTS = Math.ceil(JCMZ * NCTC * SCJL * value/365);
   	      paramChange({
	    		  id:'childPig',
	    		  value:CZTS,
	    		  max:childPigValue_Max,
	    		  min:childPigValue_Min,
	    		  color:'rectangle_skyBule'
	    	  });
   	      //断奶&转保育
   	      var DNZBY = Math.ceil(JCMZ * NCTC * SCJL * value * BRQCHL/365);
   	      paramChange({
	    		  id:'wean-childCare',
	    		  value:DNZBY,
	    		  max:wean_childCareValue_Max,
	    		  min:wean_childCareValue_Min,
	    		  color:'rectangle_roseRed'
	    	  });
   	      //转育肥
   	      var ZYF = Math.ceil(JCMZ * NCTC * SCJL * value * BRQCHL * BYQCHL/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(JCMZ * NCTC * SCJL * value * BRQCHL * BYQCHL * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_pigletsLiveRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:pigletsLiveRate_SV,
	      max:pigletsLiveRate_max * 100,
	      min:pigletsLiveRate_min * 100,
	      onChange:function(value){
	    	  $('#pigletsLiveRate').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  //断奶&转保育
   	      var DNZBY = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * (value/100)/365);
   	      paramChange({
	    		  id:'wean-childCare',
	    		  value:DNZBY,
	    		  max:wean_childCareValue_Max,
	    		  min:wean_childCareValue_Min,
	    		  color:'rectangle_roseRed'
	    	  });
   	      //转育肥
   	      var ZYF = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * (value/100) * BYQCHL/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * (value/100) * BYQCHL * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_childCareLiveRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:childCareLiveRate_SV,
	      max:childCareLiveRate_max * 100,
	      min:childCareLiveRate_min * 100,
	      onChange:function(value){
	    	  $('#childCareLiveRate').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  //转育肥
   	      var ZYF = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * BRQCHL * (value/100)/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * BRQCHL * (value/100) * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_fattenLiveRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:fattenLiveRate_SV,
	      max:fattenLiveRate_max * 100,
	      min:fattenLiveRate_min * 100,
	      onChange:function(value){
	    	  $('#fattenLiveRate').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var SCJL = $('#slider_productionRhythm').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  //销售
   	      var XS = Math.ceil(JCMZ * NCTC * SCJL * MTCHZS * BRQCHL * BYQCHL * (value/100)/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_productionRhythm').slider({
	      mode: 'v',
	      reversed: false,
	      value:productionRhythm_SV,
	      max:productionRhythm.maxValue,
	      min:productionRhythm.minValue,
	      onChange:function(value){
	    	  $('#productionRhythm').html(value);
	    	  var NCTC = $('#slider_yearParity').slider('getValue') /100;
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var FML = $('#slider_deliveryRate').slider('getValue')/100;
	    	  var MTCHZS = $('#slider_liveNum').slider('getValue');
	    	  var BRQCHL = $('#slider_pigletsLiveRate').slider('getValue')/100;
	    	  var BYQCHL = $('#slider_childCareLiveRate').slider('getValue')/100;
	    	  var YFCHL = $('#slider_fattenLiveRate').slider('getValue')/100;
	    	  //配种头数
   	      var PZTS = Math.ceil(JCMZ * NCTC * value/FML/365);
   	      paramChange({
	    		  id:'breedNum',
	    		  value:PZTS,
	    		  max:breedNumValue_Max,
	    		  min:breedNumValue_Min,
	    		  color:'rectangle_red'
	    	  });
   	      //产仔窝数
   	      var CZWS = Math.ceil(JCMZ * NCTC * value/365);
   	      paramChange({
	    		  id:'litterSize',
	    		  value:CZWS,
	    		  max:litterSizeValue_Max,
	    		  min:litterSizeValue_Min,
	    		  color:'rectangle_greyYellow'
	    	  });
   	      //产仔头数
   	      var CZTS = Math.ceil(JCMZ * NCTC * value * MTCHZS/365);
   	      paramChange({
	    		  id:'childPig',
	    		  value:CZTS,
	    		  max:childPigValue_Max,
	    		  min:childPigValue_Min,
	    		  color:'rectangle_skyBule'
	    	  });
   	      //断奶&转保育
   	      var DNZBY = Math.ceil(JCMZ * NCTC * value * MTCHZS * BRQCHL/365);
   	      paramChange({
	    		  id:'wean-childCare',
	    		  value:DNZBY,
	    		  max:wean_childCareValue_Max,
	    		  min:wean_childCareValue_Min,
	    		  color:'rectangle_roseRed'
	    	  });
   	      //转育肥
   	      var ZYF = Math.ceil(JCMZ * NCTC * value * MTCHZS * BRQCHL * BYQCHL/365);
   	      paramChange({
	    		  id:'fatten',
	    		  value:ZYF,
	    		  max:fattenValue_Max,
	    		  min:fattenValue_Min,
	    		  color:'rectangle_greyViolet'
	    	  });
   	      //销售
   	      var XS = Math.ceil(JCMZ * NCTC * value * MTCHZS * BRQCHL * BYQCHL * YFCHL/365);
   	      paramChange({
	    		  id:'sell',
	    		  value:XS,
	    		  max:sellValue_Max,
	    		  min:sellValue_Min,
	    		  color:'rectangle_yellow'
	    	  });
	      }
	 })
	  $('#slider_updateRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:updateRate_SV,
	      max:updateRate_max * 100,
	      min:updateRate_min * 100,
	      onChange:function(value){
	    	  $('#updateRate').html(value);
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var HBYCL = $('#slider_preSowSucRate').slider('getValue')/100;
	    	  //年更母猪
   	      var NGMZ = Math.ceil(JCMZ * (value/100) / HBYCL);
   	      paramChange({
	    		  id:'yearUpdateSow',
	    		  value:NGMZ,
	    		  max:yearUpdateSowValue_Max,
	    		  min:yearUpdateSowValue_Min,
	    		  color:'rectangle_darkBlue'
	    	  });
	      }
	 })
	  $('#slider_preSowSucRate').slider({
	      mode: 'v',
	      reversed: false,
	      value:preSowSucRate_SV,
	      max:preSowSucRate_max * 100,
	      min:preSowSucRate_min * 100,
	      onChange:function(value){
	    	  $('#preSowSucRate').html(value);
	    	  var JCMZ = $('#slider_baseSow').slider('getValue');
	    	  var GXL = $('#slider_updateRate').slider('getValue')/100;
	    	  //年更母猪
   	      var NGMZ = Math.ceil(JCMZ * GXL / (value/100));
   	      paramChange({
	    		  id:'yearUpdateSow',
	    		  value:NGMZ,
	    		  max:yearUpdateSowValue_Max,
	    		  min:yearUpdateSowValue_Min,
	    		  color:'rectangle_darkBlue'
	    	  });
	      }
	 })
	  $('#slider_outPigpen').slider({
	      mode: 'v',
	      reversed: false,
	      value:outPigpen_SV,
	      max:outPigpen.maxValue,
	      min:outPigpen.minValue,
	      onChange:function(value){
	    	  $('#outPigpen').html(value);
	      }
	 })
}
function openWarnReport(type,sortNum){
	var finereportUrl = $('#finereport_url').val(),
	finereportUsername = $('#finereport_username').val(),
	farmId = $('#farmId').val(),
	farmName = $('#farmName').val(),
	employName = $('#employName').val();
	var reportUrl = 'http://xinnongfeed.com:4380/WebReport/ReportServer?reportlet=XNPLUS%2Fabnormal.cpt&dbUrl='
		+finereportUrl+'&dbUserName='+finereportUsername+'&farmId='+farmId+'&farmName='+farmName+'&userName='
		+employName+'&remindType='+type+'&sortNbr='+sortNum;
	window.open(reportUrl); 
}
function openReport(reportName,searchDateStart,searchDateEnd,startDate,endDate,pigType,changeType,saleDescribe,saleType){
	var finereportUrl = $('#finereport_url').val(),
	finereportUsername = $('#finereport_username').val(),
	farmId = $('#farmId').val(),
	farmName = $('#farmName').val(),
	employName = $('#employName').val();
	var reportUrl = 'http://xinnongfeed.com:4380/WebReport/ReportServer?reportlet=XNPLUS%2F'+reportName+'.cpt&dbUrl='
		+finereportUrl+'&dbUserName='+finereportUsername+'&farmId='+farmId+'&farmName='+farmName+'&userName='
		+employName+'&'+searchDateStart+'='+startDate+'&'+searchDateEnd+'='+endDate;
	if(pigType != null){
		reportUrl += '&pigType='+pigType;
	}
	if(changeType != null){
		reportUrl += '&changeType='+changeType;
	}
	if(saleDescribe != null){
		reportUrl += '&saleDescribe='+saleDescribe;
	}
	if(saleType != null){
		reportUrl += '&saleType='+saleType;
	}
	window.open(reportUrl);
}