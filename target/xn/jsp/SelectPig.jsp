<div id="selectPigWin" class="rightSlipWin_780" style="z-index: 9002;">
<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
	<div class="rightSlipTitle">
		<span class="arrow_right" onClick="rightSlipFun('selectPigWin',780,true)"></span><span>选择猪只</span>
	</div>
	<div class="rightSlipContent heightFiexd">
		 <form id="selectPigSearchForm" method="post">
			<div class="collapseField">
				<div class="fieldTitle"><span class="arrowUp" onclick="upOrDown(this)"></span>查询条件</div>
				<div class="fieldContent">
					<div class="widgetGroup">
						<div class="wd-com wd-3"><label class="label">耳牌号:</label></div>
						<div class="wd-com wd-5">
							<input id="earBrand" name="earBrand" class="easyui-textbox" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">猪舍:</label></div>
						<div class="wd-com wd-5">
							<input id="houseId" name="houseId" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">批次:</label></div>
						<div class="wd-com wd-5">
							<input id="swineryId" name="swineryId" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">猪只状态:</label></div>
						<div class="wd-com wd-5">
							<input id="pigClassId" name="pigClassId" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">品种:</label></div>
						<div class="wd-com wd-5">
							<input id="breedId" name="breedId" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">最小日龄:</label></div>
						<div class="wd-com wd-5">
							<input  id="minDateage" name="minDateage" class="easyui-numberspinner" data-options="value:0" style="width:100%;height:35px">
						</div>
						<div class="wd-com wd-3"><label class="label">最大日龄:</label></div>
						<div class="wd-com wd-5">
							<input  id="maxDateage" name="maxDateage" class="easyui-numberspinner" data-options="value:9999" style="width:100%;height:35px">
						</div>
					</div>
				</div>
			</div>
	 	</form>
		<div id="selectPigListTable"></div>
	 </div>
	<div class="rightSlipFooter">
		<button type="button" onclick="selectPigSearch()" class="rightSlipBtn green">搜索</button>
		<button type="button" onclick="selectPigSure()" class="rightSlipBtn green">确定</button>
		<button type="button" onclick="selectPigReset()" class="rightSlipBtn blue">重置</button>
	</div>
</div>