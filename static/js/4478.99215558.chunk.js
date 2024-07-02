"use strict";(self.webpackChunkweb_v1=self.webpackChunkweb_v1||[]).push([[4478],{74478:(e,a,s)=>{s.r(a),s.d(a,{default:()=>m});var t=s(47313),r=s(68197),c=s(59624),n=s(87458),l=s(58467),p=s(89227),x=s(3821),i=s(66756),d=s(29521),o=s(46417);const u=(0,t.lazy)((()=>Promise.all([s.e(1728),s.e(9337),s.e(9683)]).then(s.bind(s,49337)))),h=(0,t.lazy)((()=>s.e(7188).then(s.bind(s,87188))));const m=function(){const[e,a]=(0,t.useState)({carts:[],isLoader:!0}),[s,m]=(0,t.useState)(!0),{isLoader:b,carts:j}=e;let g=0,y=0;return b||null===j||j.map((e=>{const a=e.package.percentage_discount,s=e.customer_amount,t=e.service.price,r=a*e.service.price/100;return g+=parseInt(s,10)*parseInt(t,10),y+=parseInt(s,10)*parseInt(r,10),g})),(0,t.useEffect)((()=>{(0,i.getCart)(a),m(!1)}),[s]),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(x.PageHeader,{className:"flex justify-between items-center px-8 xl:px-[15px] pt-2 pb-6 sm:pb-[30px] bg-transparent sm:flex-col",title:"Shopping Cart",routes:[{path:"/",breadcrumbName:"Home"},{path:"",breadcrumbName:"Checkout"}]}),(0,o.jsx)("main",{className:"min-h-[715px] lg:min-h-[580px] bg-transparent px-8 xl:px-[15px] pb-[50px] ssm:pb-[30px]",children:(0,o.jsx)(r.Z,{gutter:15,children:(0,o.jsx)(c.Z,{md:24,children:(0,o.jsx)(d.Cards,{className:"[&>.ant-card-body]:p-[40px] xl:[&>.ant-card-body]:px-[15px]",headless:!0,children:(0,o.jsxs)(r.Z,{gutter:30,children:[(0,o.jsx)(c.Z,{xxl:17,xs:24,className:"3xl:mb-[50px] xs:px-0",children:(0,o.jsx)(p.WizardWrapper,{children:(0,o.jsx)(t.Suspense,{fallback:(0,o.jsx)(d.Cards,{headless:!0,children:(0,o.jsx)(n.Z,{paragraph:{rows:10},active:!0})}),children:(0,o.jsx)(l.Z5,{children:(0,o.jsx)(l.AW,{index:!0,element:(0,o.jsx)(u,{dataProp:e,setRefreshCartData:m})})})})})}),(0,o.jsx)(c.Z,{xxl:7,xs:24,children:(0,o.jsx)(t.Suspense,{fallback:(0,o.jsx)(d.Cards,{headless:!0,children:(0,o.jsx)(n.Z,{paragraph:{rows:10},active:!0})}),children:(0,o.jsx)(h,{subtotal:g,discount:y,checkout:!0})})})]})})})})})]})}},66756:(e,a,s)=>{s.r(a),s.d(a,{deleteCart:()=>p,getCart:()=>c,postCart:()=>n,putCart:()=>l});var t=s(55291),r=s(71773);const c=async e=>{try{const a=await r.DataService.get("/carts");200===a.status&&e((e=>({...e,carts:a.data,isLoader:!1})))}catch(a){e((e=>({...e,isLoader:!1})))}},n=async e=>{try{return 200===(await r.DataService.post("/carts",e)).status}catch(a){return console.log(a),!1}},l=async e=>{try{200===(await r.DataService.put("/carts/".concat(e.id),e)).status&&t.ZP.success("Package Update to cart successfully.")}catch(a){console.log(a)}},p=async e=>{try{await r.DataService.delete("/carts/".concat(e))}catch(a){console.log(a)}}}}]);