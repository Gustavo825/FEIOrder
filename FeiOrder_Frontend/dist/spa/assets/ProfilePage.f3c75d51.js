import{Q as f}from"./QImg.1adcfd5b.js";import{_ as g,I as y,H as Q,p as x,A as o,B as n,C as t,D as r,aq as h,an as u,b3 as v,L as a,M as k,Q as d,ah as i,G as l,E as b,ao as B,ap as C,K as P,F as I}from"./index.8d0d3872.js";import{Q as E}from"./QPage.5a23c273.js";import{Q as S}from"./QLayout.66838c75.js";import{_ as U}from"./defaultBanner.9de387f5.js";import"./QScrollObserver.54b3ac61.js";const N=["src"],V={class:"text-subtitle"},A={class:"text-subtitle1 text-grey"},q={class:"subtitle1 text-grey"},w={__name:"ProfilePage",setup(z){const _=y(),e=Q(),m=async()=>{if(e.user==null)try{await e.getInfoUser()}catch(s){s.error&&alertError(s.error),s.errors&&alertError(s.errors[0].msg)}};x(()=>{m()});const p=()=>{_.push("/UpdateUser")};return(s,c)=>(o(),n(S,{class:"home"},{default:t(()=>[r(E,{padding:""},{default:t(()=>[r(h,{dark:"",bordered:"",class:"card"},{default:t(()=>[r(f,{src:U}),r(u,null,{default:t(()=>[r(v,{size:"120px","font-size":"52px",fab:"",color:"primary",class:"absolute",style:{top:"0",right:"12px",transform:"translate(-170%, -50%)"}},{default:t(()=>[a(e).user&&a(e).user.image?(o(),k("img",{key:0,src:a(e).user.image},null,8,N)):(o(),n(d,{key:1,name:"person"}))]),_:1})]),_:1}),a(e).user?(o(),n(u,{key:0,align:"center",class:"q-pt-none user-information"},{default:t(()=>[i("div",V,l(a(e).user.username),1),i("div",A,l(a(e).user.email),1),i("div",q,l(a(e).user.name),1)]),_:1})):b("",!0),r(B),r(C,{align:"right"},{default:t(()=>[r(d,{name:"edit"}),r(P,{onClick:c[0]||(c[0]=D=>p()),flat:"",color:"primary"},{default:t(()=>[I(" Editar ")]),_:1})]),_:1})]),_:1})]),_:1})]),_:1}))}};var R=g(w,[["__scopeId","data-v-7617d889"]]);export{R as default};
