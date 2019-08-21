/*!
 * VuePager.js v1.0.1
 * (c) 2019 Chy
 * VIT / vithen project 
 */
function vuePager(id, conf={})
{
	this.vueID =  id;
	this._conf = {
		pn:1,//第一页
		offset:5,//显示页码数5个
		tp:100,//总页数
		pinf:true,//是否显示分页信息
		preText:"‹",//上页字
		posText:"›",//下页字
		firstText:"«",//首页字
		lastText:"»",//尾页字
		
	};

	for(var k in conf)
	{
		//真值 且 是配置参数，则使用
		if(this._conf[k])
		{
			this._conf[k]=conf[k];
		}
	}
};

//创建分页
vuePager.prototype.build=function(fun)
{
	//生成样式表
	this._css();
	//生成实体标签
	this._html();
	//执行vue初始化组件
	this._vue(fun);	
};

//生成样式表
vuePager.prototype._css=function()
{
	var css = `
		._pg_active{cursor: default!important;background-color:#DDD;}
		._pg_disable{cursor: default!important;color:rgb(155, 155, 155)!important;}

		._pg_floatleft{float:left;}
		._pg_floatright{float:right;}

		.vuePager{overflow:hidden; line-height:25px; font-size:14px; color:#333; }
		._pg_pnbox{overflow:hidden; list-style-type:none; margin:0; padding:0;}

		._pg_pnbox>li{float:left; display:block; margin:0 5px; padding:0 7px; cursor:pointer; }
		._pg_pnbox>._pg_pn:hover{background-color:#DDD;}
	`;


	var style = document.createElement('style');
	style.setAttribute("type", "text/css");
	style.innerHTML= css;
	document.body.appendChild(style);
};


//生成实体标签
vuePager.prototype._html=function()
{
	var html = `
		<div class="vuePager">

		<ul class="_pg_pnbox _pg_floatright">
			<li v-show="firstText" v-bind:class="{_pg_disable:isfirst}" data-pn="1" @click="pageChg">{{firstText}}</li>
			<li v-show="preText" v-bind:class="{_pg_disable:ispre}" :data-pn="pn-1" @click="pageChg">{{preText}}</li>

			<li class="_pg_pn" v-bind:class="{ _pg_active: p==pn }" v-for="p in pgArr" :data-pn="p" @click="pageChg">{{p}}</li>
			
			<li v-show="posText" v-bind:class="{_pg_disable:ispos}" :data-pn="pn+1" @click="pageChg">{{posText}}</li>

			<li v-show="lastText" v-bind:class="{_pg_disable:islast}" :data-pn="tp" @click="pageChg">{{lastText}}</li>
		</ul>
		<span v-show="pinf" class="_pg_floatleft"> 第{{pn}}页，共{{tp}}页</span>

	</div>
	`;

	document.querySelector(this.vueID).innerHTML=html;
	
};

//vue绑定数据
vuePager.prototype._vue=function(rfun)
{	
	return new Vue({
		el: this.vueID
		, data:{
			pn:this._conf.pn,
			offset:this._conf.offset,//显示页码数
			tp:this._conf.tp,
			pinf:this._conf.pinf,
			preText:this._conf.preText,
			posText:this._conf.posText,
			firstText:this._conf.firstText,
			lastText:this._conf.lastText,
		}
		,methods:{
			pageChg:function(evt)
			{
				evt=evt.target;
				if(evt.className.indexOf("_pg_disable")!=-1 || evt.className.indexOf("_pg_active")!=-1) return;
				

				//console.log(evt.className);
				//console.log(evt.innerHTML);
				var pn=evt.getAttribute("data-pn")-0;//注意是int
				//console.log(pn);
				if(pn<1 || pn>this.tp) return;

				this.pn = pn;
				rfun(this.pn, this.tp, this.offset);
			}
		}
		,computed:{
			isfirst:function(){return this.pn==1},
			ispre:function(){return this.pn==1},
			islast:function(){return this.pn==this.tp},
			ispos:function(){return this.pn==this.tp},
			pgArr:function(){

				//
				var pgArr = [this.pn];

				//除当前的剩余个数
				var tpSheng = this.offset-1;

				//前后段页码应显示数
				var preSize = Math.floor(tpSheng/2);
				//为保证页面数量：当最后的数据不够时，从前段补足
				if(this.tp-this.pn<preSize) preSize+=(preSize-(this.tp-this.pn));
				//console.log(preSize);
				
				var _pn,preNmb = 0;//中间页码值，
				//前段推移页码
				for(var i=1; i<=preSize; i++)
				{
					_pn=this.pn-i;
					//最小为1
					if(_pn<1) break;
					pgArr.push(_pn);
					++preNmb;
				}

				//后段推移页码
				//后段还有的值(注：应显示数 与 减去前段剩余数 取大值)
				var posNmb = tpSheng-preNmb;
				if(posNmb<preSize) posNmb=preSize;

				//后段推移页码
				for(var i=1; i<=posNmb; i++)
				{
					_pn=this.pn+i;
					//最小为1
					if(_pn>this.tp) break;
					pgArr.push(_pn);
				}

				var r =  pgArr.sort(function(a,b){return a-b;});
				//console.log(r);
				return r;		
			},
		}
	})

}
