Vtp project for VuePager V1.x

使用VUE编写的简洁、高效的前端分页插件

维护说明：
v1.0 初始版本发布
v1.0.1 删除繁余代码，优化demo和说明文档

Demo示例：

new vuePager("#pageBox",{
	pn:1,//页码,[必],int,默认：第1页
	tp:100,//总页数,[必],int,默认：共100页
	offset:5,//显示页码个数,[选],int,默认5,注：此处最好是奇数
	pinf:true,//是否显示分页信息,[选],bool,默认true显示
	firstText:"首页",//首页显示文字,[选],string,默认：« ,注：假值为不显示，不设置则使用默认值
	preText:"上页",//上页显示文字,[选],string,默认：› ,注：假值为不显示，不设置为则用默认值
	posText:"下页",//下页显示文字,[选],string,默认：‹ ,注：假值为不显示，不设置为则用默认值
	lastText:"末页",//尾页显示文字,[选],string,默认：« ,注：假值为不显示，不设置为则用默认值
}).build(function(pn, tp, offset){
		console.log(pn, tp, offset);
});

