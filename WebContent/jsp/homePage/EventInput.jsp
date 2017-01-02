<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
	<div class="breedPig">
		<div class="manageMent breedPigManage">
			<div class="title">
				<span>种猪管理</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon boarReserveToProduct">
					<div class="coverBox" data-eventname='BoarReserveToProduct' onclick="menuClickFun(this)"></div>
				</div>
				<span style="display:inline-block">后备转生产公猪</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon prepubertalCheck">
					<div class="coverBox" data-eventname='PrepubertalCheck' onclick="menuClickFun(this)"></div>
				</div>
				<span>后备情期鉴定</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon breed">
					<div class="coverBox" data-eventname='Breed' onclick="menuClickFun(this)"></div>
				</div>
				<span>配种</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon pregnancyCheck">
					<div class="coverBox" data-eventname='PregnancyCheck' onclick="menuClickFun(this)"></div>
				</div>
				<span>妊娠检查</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon misscarry">
					<div class="coverBox" data-eventname='Misscarry' onclick="menuClickFun(this)"></div>
				</div>
				<span>流产</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon changeLaborHouse">
					<div class="coverBox" data-eventname='ChangeLaborHouse' onclick="menuClickFun(this)"></div>
				</div>
				<span>转产房</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon delivery">
					<div class="coverBox" data-eventname='Delivery' onclick="menuClickFun(this)"></div>
				</div>
				<span>分娩</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon wean">
					<div class="coverBox" data-eventname='Wean' onclick="menuClickFun(this)"></div>
				</div>
				<span>断奶</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon foster">
					<div class="coverBox" data-eventname='Foster' onclick="menuClickFun(this)"></div>
				</div>
				<span>寄养</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon backfat">
					<div class="coverBox" data-eventname='Backfat' onclick="menuClickFun(this)"></div>
				</div>
				<span>背膘测定</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon semen">
					<div class="coverBox" data-eventname='Semen' onclick="menuClickFun(this)"></div>
				</div>
				<span>采精</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon boarObsoleteAudit">
					<div class="coverBox" data-eventname='BoarObsoleteAudit' onclick="menuClickFun(this)"></div>
				</div>
				<span>种猪淘汰审批</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon breedPigObsolete">
					<div class="coverBox" data-eventname='BreedPigObsolete' onclick="menuClickFun(this)"></div>
				</div>
				<span>种猪淘汰申请</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon breedPigDie">
					<div class="coverBox" data-eventname='BreedPigDie' onclick="menuClickFun(this)"></div>
				</div>
				<span>种猪死亡</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon childPigDie">
					<div class="coverBox" data-eventname='ChildPigDie' onclick="menuClickFun(this)"></div>
				</div>
				<span>哺乳仔猪死亡</span>
			</div>
			<div class="event breedPigEevnt">
				<div class="eventCommon breedPigChangeHouse">
					<div class="coverBox" data-eventname='BreedPigChangeHouse' onclick="menuClickFun(this)"></div>
				</div>
				<span>种猪转舍</span>
			</div>
		</div>
	</div>
	<div class="porkAndCommon">
		<div class="manageMent porkManage">
			<div class="title">
				<span>肉猪管理</span>
			</div>
			<div class="event porkEvent">
				<div class="eventCommon toChildCare">
					<div class="coverBox" data-eventname='ToChildCare' onclick="menuClickFun(this)"></div>
				</div>
				<span>转保育</span>
			</div>
			<div class="event porkEvent">
				<div class="eventCommon toFatten">
					<div class="coverBox" data-eventname='ToFatten' onclick="menuClickFun(this)"></div>
				</div>
				<span>转育肥</span>
			</div>
			<div class="event porkEvent">
				<div class="eventCommon seedSelection">
					<div class="coverBox" data-eventname='SeedSelection' onclick="developing()"></div>
				</div>
				<span>选种</span>
			</div> 
			<div class="event porkEvent">
				<div class="eventCommon goodPigDie">
					<div class="coverBox" data-eventname='GoodPigDie' onclick="menuClickFun(this)"></div>
				</div>
				<span>商品猪死亡</span>
			</div>
		</div>
		<div class="manageMent commonManage fr">
			<div class="title">
				<span>公共管理</span>
			</div>
			<div class="event commonEvent">
				<div class="eventCommon pigMoveIn">
					<div class="coverBox" data-eventname='PigMoveIn' onclick="menuClickFun(this)"></div>
				</div>
				<span>猪只入场</span>
			</div>
			<div class="event commonEvent">
				<div class="eventCommon changeEarBrand">
					<div class="coverBox" data-eventname='ChangeEarBrand' onclick="menuClickFun(this)"></div>
				</div>
				<span>换耳号</span>
			</div>
			<div class="event commonEvent">
				<div class="eventCommon goodPigSell">
					<div class="coverBox" data-eventname='GoodPigSell' onclick="menuClickFun(this)"></div>
				</div>
				<span>商品猪销售</span>
			</div>
		</div>
	</div>
</body>
</html>