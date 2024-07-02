"use strict";(self.webpackChunkweb_v1=self.webpackChunkweb_v1||[]).push([[566],{70096:(e,t,a)=>{a.r(t),a.d(t,{default:()=>o});var r=a(93393),s=a(47313),l=a(15851),d=a(46417);function i(e){let{type:t,height:a,width:i,scales:o,labels:n,id:c,datasets:x,tooltip:h,layout:m,legend:p,elements:b,option:y,...u}=e;return(0,s.useEffect)((()=>{let e=null,a=!1;return a||(e=new r.kL(document.getElementById(c).getContext("2d"),{type:t,data:{labels:n,datasets:x},options:{responsive:!0,maintainAspectRatio:!0,layout:m,hover:{mode:"index",intersect:!1},plugins:{legend:p,tooltip:{yAlign:"bottom",xAlign:"right",mode:"index",intersect:!1,backgroundColor:"#ffffff",boxShadow:"0 8px 5px #ADB5D915",position:"nearest",titleColor:"#ADB5D9",color:"#ADB5D9",titleFontSize:12,titleSpacing:10,bodyColor:"#525768",bodyFontSize:11,bodyFontStyle:"normal",bodyFontFamily:"'Kantumruy Pro', sans-serif",borderColor:"#F1F2F6",usePointStyle:!0,borderWidth:1,bodySpacing:10,padding:{x:10,y:8},z:999999,enabled:!1,external:l.customTooltips,...h}},elements:b,scales:o,...y}})),()=>{e.destroy(),a=!0}}),[t,x,n,c,m,p,b,o,h,y]),(0,d.jsx)("canvas",{width:i,height:a,id:c,...u})}r.kL.register(r.qi,r.jn,r.ZL,r.od,r.vn,r.N0,r.jI,r.ST,r.tt,r.CV,r.Xi,r.ho,r.uw,r.f$,r.WV,r.l7,r.FB,r.RM,r.WY,r.Gu,r.De,r.Dx,r.u,r.DK),i.defaultProps={height:479,type:"line",width:null,labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],datasets:[{data:[20,60,50,45,50,60,70,40,45,35,25,30],borderColor:"#001737",borderWidth:1,fill:!1},{data:[10,40,30,40,60,55,45,35,30,20,15,20],borderColor:"#1ce1ac",borderWidth:1,fill:!1}],layout:{},legend:{display:!1,labels:{display:!1,position:"center"}},id:"myChart",elements:{line:{tension:.6,borderCapStyle:"round",borderJoinStyle:"round",capBezierPoints:!0},point:{radius:0,z:5}},scales:{y:{beginAtZero:!0,grid:{color:"#485e9029",borderDash:[3,3],zeroLineColor:"#485e9029",zeroLineWidth:1,zeroLineBorderDash:[3,3],drawTicks:!1,drawBorder:!1},ticks:{beginAtZero:!0,font:{size:14,family:"'Kantumruy Pro', sans-serif"},color:"#747474",max:80,stepStartValue:5,stepSize:20,padding:10,callback:e=>"".concat(e,"k")}},x:{grid:{display:!1,zeroLineWidth:2,zeroLineColor:"transparent",color:"transparent",z:1,tickMarkLength:10,drawTicks:!0,drawBorder:!1},ticks:{beginAtZero:!0,font:{size:13,family:"'Kantumruy Pro', sans-serif"},color:"#747474"}}},tooltip:{callbacks:{label(e){const t=e.dataset.label,{formattedValue:a}=e;return"  ".concat(a," ").concat(t)},labelColor:e=>({backgroundColor:e.dataset.backgroundColor,borderColor:"transparent"})}},option:{}};const o=i},15851:(e,t,a)=>{a.r(t),a.d(t,{chartLinearGradient:()=>s,customTooltips:()=>l,textRefactor:()=>r});const r=(e,t)=>"".concat(e.split(" ").slice(0,t).join(" "),"..."),s=(e,t,a)=>{const r=e.getContext("2d").createLinearGradient(0,0,0,t);return r.addColorStop(0,"".concat(a.start)),r.addColorStop(1,"".concat(a.end)),r},l=function(e){let t=document.querySelector(".chartjs-tooltip");this._chart.canvas.closest(".hexadash-chart-container").contains(t)||(t=document.createElement("div"),t.className="chartjs-tooltip absolute bg-white dark:bg-[#323541] min-w-[140px] px-1.5 py-2 rounded-md dark:border-white10 dark:border-[#323541] border-1 shadow-custom dark:shadow-none dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] before:absolute before:border-x-5 before:border-t-5 before:border-transparent before:border-t-gray-200 before:rounded-full before:-bottom-1.5 ltr:before:left-1/2 rtl:before:right-1/2 before:-translate-x-2/45",t.innerHTML="<table></table>",document.querySelectorAll(".hexadash-chart-container").forEach((e=>{e.contains(document.querySelector(".chartjs-tooltip"))&&document.querySelector(".chartjs-tooltip").remove()})),this._chart.canvas.closest(".hexadash-chart-container").appendChild(t));const a=e.tooltip;if(0===a.opacity)return void(t.style.opacity=0);if(t.classList.remove("above","below","no-transform"),a.yAlign?t.classList.add(a.yAlign):t.classList.add("no-transform"),a.body){const e=a.title||[],r=a.body.map((function(e){return e.lines}));let s="<thead>";e.forEach((function(e){s+="<div class='mb-1 text-body dark:text-white87 text-xs font-medium capitalize'>".concat(e,"</div>")})),s+="</thead><tbody>",r.forEach((function(e,t){const r=a.labelColors[t];let l="background:".concat(r.backgroundColor);l+="; border-color:".concat(r.borderColor),l+="; border-width: 2px",l+="; border-radius: 30px";const d='<span class="inline-block w-[10px] h-[10px] ltr:mr-2 rtl:ml-2 dark:!border-transparent" style="'.concat(l,'"></span>');s+='<tr><td class="flex items-center mb-[3px] text-light-extra dark:text-white60 text-xs font-medium">'.concat(d).concat(e,"</td></tr>")})),s+="</tbody>";t.querySelector("table").innerHTML=s}const r=this._chart.canvas.offsetTop,s=this._chart.canvas.offsetLeft,l=document.querySelector(".chartjs-tooltip").clientHeight;t.style.opacity=1,t.style.left="".concat(s+a.caretX,"px"),t.style.top="".concat(r+a.caretY-(a.caretY>10?l>100?l+5:l+15:70),"px"),t.style.fontFamily=a.options.bodyFontFamily,t.style.fontSize="".concat(a.options.bodyFontSize,"px"),t.style.fontStyle=a.options.bodyFontStyle,t.style.padding="".concat(a.yPadding,"px ").concat(a.xPadding,"px")}},30566:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});a(47313);var r=a(68197),s=a(59624),l=a(72180),d=a(34794),i=a(36974),o=a(27554),n=a(75784),c=a(43387),x=a(27823),h=a(48866),m=a(2135),p=a(89227),b=a(29521),y=a(70096),u=a(46417);const f=(0,u.jsxs)("div",{className:"block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-4",children:[(0,u.jsxs)(m.OL,{className:"flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active",to:"#",children:[(0,u.jsx)(n.Z,{className:"w-3.5 h-3.5 ltr:mr-2 rtl:ml-2"}),(0,u.jsx)("span",{children:"Printer"})]}),(0,u.jsxs)(m.OL,{className:"flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active",to:"#",children:[(0,u.jsx)(c.Z,{className:"w-3.5 h-3.5 ltr:mr-2 rtl:ml-2"}),(0,u.jsx)("span",{children:"PDF"})]}),(0,u.jsxs)(m.OL,{className:"flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active",to:"#",children:[(0,u.jsx)(x.Z,{className:"w-3.5 h-3.5 ltr:mr-2 rtl:ml-2"}),(0,u.jsx)("span",{children:"Google Sheets"})]}),(0,u.jsxs)(m.OL,{className:"flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active",to:"#",children:[(0,u.jsx)(d.Z,{className:"w-3.5 h-3.5 ltr:mr-2 rtl:ml-2"}),(0,u.jsx)("span",{children:"Excel (XLSX)"})]}),(0,u.jsxs)(m.OL,{className:"flex items-center text-theme-gray dark:text-white60 hover:bg-primary-transparent hover:text-primary dark:hover:bg-white10 px-3 py-1.5 text-sm active",to:"#",children:[(0,u.jsx)(h.Z,{className:"w-3.5 h-3.5 ltr:mr-2 rtl:ml-2"}),(0,u.jsx)("span",{children:"CSV"})]})]});const g=function(){return(0,u.jsxs)(r.Z,{gutter:25,children:[(0,u.jsx)(s.Z,{xxl:8,lg:12,md:24,sm:12,xs:24,children:(0,u.jsxs)("div",{className:"flex flex-wrap ltr:items-end rtl:items-start bg-white dark:bg-white10 rounded-10 p-[25px] mb-[25px]",children:[(0,u.jsxs)("div",{className:"w-[50%] flex-[50%]",children:[(0,u.jsx)("h4",{className:"text-3xl lg:text-[26px] sm:text-2xl font-semibold text-dark dark:text-white87 mb-[5px]",children:"7,461"}),(0,u.jsx)("span",{className:"font-normal text-body dark:text-white60 text-15",children:"Orders"}),(0,u.jsx)("div",{className:"mt-3",children:(0,u.jsxs)("div",{className:"inline-flex items-center flex-wrap gap-[6px]",children:[(0,u.jsxs)("span",{className:"flex items-center text-sm font-medium text-success",children:[(0,u.jsx)(i.Z,{className:"w-5 h-5"})," 25%"]}),(0,u.jsx)("span",{className:" text-theme-gray dark:text-white60 text-[14px]",children:"Since last week"})]})})]}),(0,u.jsx)("div",{className:"w-[50%] flex-[50%]",children:(0,u.jsx)("div",{className:"hexadash-chart-container",children:(0,u.jsx)(y.default,{type:"bar",height:180,id:"bar1",labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],datasets:[{data:[20,60,50,45,50,60,70],backgroundColor:"#8e1dce30",hoverBackgroundColor:"#8e1dce",label:"Orders",barPercentage:1}],scales:{y:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}},x:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}}}})})})]})}),(0,u.jsx)(s.Z,{xxl:8,lg:12,md:24,sm:12,xs:24,children:(0,u.jsxs)("div",{className:"flex flex-wrap ltr:items-end rtl:items-start bg-white dark:bg-white10 rounded-10 p-[25px] mb-[25px]",children:[(0,u.jsxs)("div",{className:"w-[50%] flex-[50%]",children:[(0,u.jsx)("h4",{className:"text-3xl lg:text-[26px] sm:text-2xl font-semibold text-dark dark:text-white87 mb-[5px]",children:"$28,947"}),(0,u.jsx)("span",{className:"font-normal text-body dark:text-white60 text-15",children:"Revenue"}),(0,u.jsx)("div",{className:"mt-3",children:(0,u.jsxs)("div",{className:"inline-flex items-center flex-wrap gap-[6px]",children:[(0,u.jsxs)("span",{className:"flex items-center text-sm font-medium text-danger",children:[(0,u.jsx)(o.Z,{className:"w-5 h-5"})," 25%"]}),(0,u.jsx)("span",{className:" text-theme-gray dark:text-white60 text-[14px]",children:"Since last week"})]})})]}),(0,u.jsx)("div",{className:"w-[50%] flex-[50%]",children:(0,u.jsx)("div",{className:"hexadash-chart-container",children:(0,u.jsx)(y.default,{height:180,type:"bar",id:"bar2",labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],datasets:[{data:[20,60,50,45,50,60,70],backgroundColor:"#FF69A520",hoverBackgroundColor:"#FF69A5",label:"Revenue",barPercentage:1}],legends:{display:!1},scales:{y:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}},x:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}}}})})})]})}),(0,u.jsx)(s.Z,{xxl:8,lg:12,md:24,sm:12,xs:24,children:(0,u.jsxs)("div",{className:"flex flex-wrap ltr:items-end rtl:items-start bg-white dark:bg-white10 rounded-10 p-[25px] mb-[25px]",children:[(0,u.jsxs)("div",{className:"w-[50%] flex-[50%]",children:[(0,u.jsx)("h4",{className:"text-3xl lg:text-[26px] sm:text-2xl font-semibold text-dark dark:text-white87 mb-[5px]",children:"$3,241"}),(0,u.jsx)("span",{className:"font-normal text-body dark:text-white60 text-15",children:"Avg. order value"}),(0,u.jsx)("div",{className:"mt-3",children:(0,u.jsxs)("div",{className:"inline-flex items-center flex-wrap gap-[6px]",children:[(0,u.jsxs)("span",{className:"flex items-center text-sm font-medium text-success",children:[(0,u.jsx)(i.Z,{className:"w-5 h-5"})," 25%"]}),(0,u.jsx)("span",{className:" text-theme-gray dark:text-white60 text-[14px]",children:"Since last week"})]})})]}),(0,u.jsx)("div",{className:"w-[50%] flex-[50%]",children:(0,u.jsx)("div",{className:"hexadash-chart-container",children:(0,u.jsx)(y.default,{height:180,type:"bar",id:"bar3",labels:["Jan","Feb","Mar","Apr","May","Jun","Jul"],datasets:[{data:[20,60,50,45,50,60,70],backgroundColor:"#20C99720",hoverBackgroundColor:"#20C997",label:"Avg Orders",barPercentage:1}],legends:{display:!1},scales:{y:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}},x:{display:!1,stacked:!0,gridLines:{display:!1},ticks:{display:!1}}}})})})]})}),(0,u.jsx)(s.Z,{xs:24,children:(0,u.jsx)(p.GlobalUtilityStyle,{children:(0,u.jsx)(b.Cards,{className:"ant-card-body-px-0 [&>.ant-card-body]:pb-30px [&>.ant-card-body]:pt-[1px] ant-card-head-px-25 ant-card-head-title-base [&>.ant-card-head]:border-regular dark:[&>.ant-card-head]:border-white10 [&>.ant-card-head]:border-b-1 ",more:f,title:"My Products",size:"default",children:(0,u.jsx)(l.Z,{className:"table-responsive [&>div>div>div>div>div>table>thead>tr>th]:!bg-transparent [&>div>div>div>div>div>table>tbody>tr]last-child:mb-0 ",pagination:!1,dataSource:[{key:"1",name:"Samsung Galaxy S8 256GB",price:"$280",sold:126,revenue:"$38,536",className:"text-[14px] text-theme-gray dark:text-white60 font-medium"},{key:"2",name:"Half Sleeve Shirt",price:"$25",sold:80,revenue:"$38,536",className:"text-[14px] text-theme-gray dark:text-white60 font-medium"},{key:"3",name:"Marco Shoes",price:"$32",sold:58,revenue:"$38,536",className:"text-[14px] text-theme-gray dark:text-white60 font-medium"},{key:"4",name:'15" Mackbook Pro        ',price:"$950",sold:36,revenue:"$38,536",className:"text-[14px] text-theme-gray dark:text-white60 font-medium"},{key:"5",name:"Apple iPhone X",price:"$985",sold:24,revenue:"$38,536",className:"text-[14px] text-theme-gray dark:text-white60 font-medium"}],columns:[{title:"Products Name",dataIndex:"name",key:"name",className:"text-[14px] font-normal text-theme-gray dark:text-white60 dark:border-white10 before:hidden px-[25px] [th&]:text-dark [th&]:font-medium [th&]:text-[15px]"},{title:"Price",dataIndex:"price",key:"price",className:"text-[14px] font-normal text-theme-gray dark:text-white60 dark:border-white10 before:hidden px-[25px] [th&]:text-dark [th&]:font-medium [th&]:text-[15px]"},{title:"Sold",dataIndex:"sold",key:"sold",className:"text-[14px] font-normal text-theme-gray dark:text-white60 dark:border-white10 before:hidden px-[25px] [th&]:text-dark [th&]:font-medium [th&]:text-[15px]"},{title:"Revenue",dataIndex:"revenue",key:"revenue",className:"text-[14px] font-normal text-theme-gray dark:text-white60 dark:border-white10 before:hidden px-[25px] [th&]:text-dark [th&]:font-medium [th&]:text-[15px]"}]})})})})]})}}}]);