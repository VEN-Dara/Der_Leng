"use strict";(self.webpackChunkweb_v1=self.webpackChunkweb_v1||[]).push([[7188],{87188:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var r=a(47313),s=a(12008),c=a(74294),n=a(40678),l=a(55989),i=a(2135),o=a(1084),d=a(47631),E=a(76852),p=a(11677),m=a(46417);const u=function(e){let{subtotal:t,checkout:a,discount:u}=e;const T=(0,o.I0)(),{rtl:_}=(0,o.v9)((e=>({rtl:e.ChangeLayoutMode.rtlData}))),[x]=s.Z.useForm(),[A,h]=(0,r.useState)({coupon:0,promo:0,current:0});(0,r.useEffect)((()=>{p.cartGetData&&T((0,p.cartGetData)())}),[T]);const{Option:C}=c.default;return(0,m.jsx)("div",{className:"bg-regularBG dark:bg-[#3b3f49] p-[25px] sm:p-[15px] rounded-10",children:(0,m.jsxs)("div",{children:[(0,m.jsx)(d.default,{className:"mb-6 text-xl font-semibold",as:"h4",children:"Order Summary"}),(0,m.jsx)("div",{className:"bg-white dark:bg-[#202531] p-[25px] shadow-[0_10px_30px_rgba(10,10,10,0.06)] rounded-10",children:(0,m.jsxs)("div",{className:"pb-[5px]",children:[(0,m.jsxs)("ul",{className:"mb-0",children:[(0,m.jsxs)("li",{className:"flex items-center justify-between mb-[18px]",children:[(0,m.jsx)("span",{className:"font-medium text-body dark:text-white60",children:"Subtotal :"}),(0,m.jsx)("span",{className:"font-medium text-dark dark:text-white87",children:"$".concat(t)})]}),(0,m.jsxs)("li",{className:"flex items-center justify-between mb-[18px]",children:[(0,m.jsx)("span",{className:"font-medium text-body dark:text-white60",children:"Discount :"}),(0,m.jsx)("span",{className:"font-medium text-dark dark:text-white87",children:"-$".concat(u)})]})]}),(0,m.jsxs)(d.default,{className:"inline-flex items-center justify-between w-full",as:"h4",children:[(0,m.jsx)("span",{className:"text-base font-semibold text-dark dark:text-white87",children:"Total : "}),(0,m.jsx)("span",{className:"text-lg font-semibold text-primary",children:"$".concat(t-u)})]}),!a&&(0,m.jsx)(E.Button,{className:"bg-primary w-full h-[50px] mt-[22px] text-[15px] font-medium rounded-lg border-primary",type:"secondary",size:"large",children:(0,m.jsxs)(i.rU,{to:"/checkout",className:"flex items-center justify-center text-white",children:["Proceed To Checkout",_?(0,m.jsx)(n.Z,{className:"w-4 h-4 ltr:mr-1.5 rtl:ml-1.5"}):(0,m.jsx)(l.Z,{className:"w-4 h-4 ltr:ml-1.5 rtl:mr-1.5"})]})}),3===A.current&&(0,m.jsx)(E.Button,{onClick:()=>{document.querySelectorAll("button span").forEach((e=>{"Done"===e.innerHTML&&e.click()}))},className:"btn-proceed",type:"secondary",size:"large",children:(0,m.jsx)(i.rU,{to:"#",children:"Place Order"})})]})})]})})}},11677:(e,t,a)=>{a.r(t),a.d(t,{cartDelete:()=>_,cartGetData:()=>u,cartUpdateQuantity:()=>T});var r=a(50615),s=a(1309);const{cartDataBegin:c,cartDataSuccess:n,cartDataErr:l,cartUpdateBegin:i,cartUpdateSuccess:o,cartUpdateErr:d,cartDeleteBegin:E,cartDeleteSuccess:p,cartDeleteErr:m}=r.default,u=()=>async e=>{try{e(c()),e(n(s))}catch(t){e(l(t))}},T=(e,t,a)=>async r=>{try{r(i());const s=a.map((a=>(a.id===e&&(a.quantity=t),a)));r(o(s))}catch(s){r(d(s))}},_=(e,t)=>async a=>{try{a(E());const r=t.filter((t=>t.id!==e));setTimeout((()=>{a(p(r))}),500)}catch(r){a(m(r))}}},50615:(e,t,a)=>{a.r(t),a.d(t,{default:()=>s});const r={CART_DATA_BEGIN:"CART_DATA_BEGIN",CART_DATA_SUCCESS:"CART_DATA_SUCCESS",CART_DATA_ERR:"CART_DATA_ERR",CART_UPDATE_BEGIN:"CART_UPDATE_BEGIN",CART_UPDATE_SUCCESS:"CART_UPDATE_SUCCESS",CART_UPDATE_ERR:"CART_UPDATE_ERR",CART_DELETE_BEGIN:"CART_DELETE_BEGIN",CART_DELETE_SUCCESS:"CART_DELETE_SUCCESS",CART_DELETE_ERR:"CART_DELETE_ERR",cartDataBegin:()=>({type:r.CART_DATA_BEGIN}),cartDataSuccess:e=>({type:r.CART_DATA_SUCCESS,data:e}),cartDataErr:e=>({type:r.CART_DATA_ERR,err:e}),cartUpdateBegin:()=>({type:r.CART_UPDATE_BEGIN}),cartUpdateSuccess:e=>({type:r.CART_UPDATE_SUCCESS,data:e}),cartUpdateErr:e=>({type:r.CART_UPDATE_ERR,err:e}),cartDeleteBegin:()=>({type:r.CART_DELETE_BEGIN}),cartDeleteSuccess:e=>({type:r.CART_DELETE_SUCCESS,data:e}),cartDeleteErr:e=>({type:r.CART_DELETE_ERR,err:e})},s=r},40678:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(61962),s=a(75192),c=a.n(s);const n=e=>{const{color:t,size:a,...s}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:t,...s},r.createElement("path",{d:"M11.29,12l3.54-3.54a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L9.17,11.29a1,1,0,0,0,0,1.42L13.41,17a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41Z"}))};n.propTypes={color:c().string,size:c().oneOfType([c().string,c().number])},n.defaultProps={color:"currentColor",size:"24"};const l=n},55989:(e,t,a)=>{a.d(t,{Z:()=>l});var r=a(61962),s=a(75192),c=a.n(s);const n=e=>{const{color:t,size:a,...s}=e;return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:a,height:a,viewBox:"0 0 24 24",fill:t,...s},r.createElement("path",{d:"M14.83,11.29,10.59,7.05a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L12.71,12,9.17,15.54a1,1,0,0,0,0,1.41,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29l4.24-4.24A1,1,0,0,0,14.83,11.29Z"}))};n.propTypes={color:c().string,size:c().oneOfType([c().string,c().number])},n.defaultProps={color:"currentColor",size:"24"};const l=n},1309:e=>{e.exports=JSON.parse('[{"id":"1","name":"Montes Scelerisque","size":"Large","color":"Brown","price":"248.66","quantity":"1","img":"static/img/products/1.png","total":"248.66"},{"id":"2","name":"Leo Sodales Varius","size":"Small","color":"Golden","price":"240","quantity":"1","img":"static/img/products/2.png","total":"240"}]')}}]);