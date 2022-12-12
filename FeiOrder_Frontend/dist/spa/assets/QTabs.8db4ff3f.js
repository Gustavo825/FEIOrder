import{i as xe,r as T,a as d,o as de,p as Me,b7 as fe,s as $e,b2 as Ee,h,W as se,V as Qe,aX as De,Q as z,a0 as We,g as be,aT as Fe,b8 as je,c as he,aF as Z,k as ce,a1 as ve,w as Q,x as Ve,aj as Ke,ak as Oe,b as ze}from"./index.8d0d3872.js";import{Q as He}from"./QScrollObserver.54b3ac61.js";import{r as Ne}from"./QSelect.e2af1588.js";let Ue=0;const Xe=["click","keydown"],Ge={icon:String,label:[Number,String],alert:[Boolean,String],alertIcon:String,name:{type:[Number,String],default:()=>`t_${Ue++}`},noCaps:Boolean,tabindex:[String,Number],disable:Boolean,contentClass:String,ripple:{type:[Boolean,Object],default:!0}};function Je(e,L,C,v){const l=xe(fe,()=>{console.error("QTab/QRouteTab component needs to be child of QTabs")}),{proxy:H}=be(),M=T(null),D=T(null),W=T(null),N=d(()=>e.disable===!0||e.ripple===!1?!1:Object.assign({keyCodes:[13,32],early:!0},e.ripple===!0?{}:e.ripple)),A=d(()=>l.currentModel.value===e.name),U=d(()=>"q-tab relative-position self-stretch flex flex-center text-center"+(A.value===!0?" q-tab--active"+(l.tabProps.value.activeClass?" "+l.tabProps.value.activeClass:"")+(l.tabProps.value.activeColor?` text-${l.tabProps.value.activeColor}`:"")+(l.tabProps.value.activeBgColor?` bg-${l.tabProps.value.activeBgColor}`:""):" q-tab--inactive")+(e.icon&&e.label&&l.tabProps.value.inlineLabel===!1?" q-tab--full":"")+(e.noCaps===!0||l.tabProps.value.noCaps===!0?" q-tab--no-caps":"")+(e.disable===!0?" disabled":" q-focusable q-hoverable cursor-pointer")+(v!==void 0?v.linkClass.value:"")),P=d(()=>"q-tab__content self-stretch flex-center relative-position q-anchor--skip non-selectable "+(l.tabProps.value.inlineLabel===!0?"row no-wrap q-tab__content--inline":"column")+(e.contentClass!==void 0?` ${e.contentClass}`:"")),g=d(()=>e.disable===!0||l.hasFocus.value===!0||A.value===!1&&l.hasActiveTab.value===!0?-1:e.tabindex||0);function y(r,c){if(c!==!0&&M.value!==null&&M.value.focus(),e.disable===!0){v!==void 0&&v.hasRouterLink.value===!0&&se(r);return}if(v===void 0){l.updateModel({name:e.name}),C("click",r);return}if(v.hasRouterLink.value===!0){const w=(m={})=>{let k;const j=m.to===void 0||Fe(m.to,e.to)===!0?l.avoidRouteWatcher=je():null;return v.navigateToRouterLink(r,{...m,returnRouterError:!0}).catch(b=>{k=b}).then(b=>{if(j===l.avoidRouteWatcher&&(l.avoidRouteWatcher=!1,k===void 0&&(b===void 0||b.message.startsWith("Avoided redundant navigation")===!0)&&l.updateModel({name:e.name})),m.returnRouterError===!0)return k!==void 0?Promise.reject(k):b})};C("click",r,w),r.defaultPrevented!==!0&&w();return}C("click",r)}function R(r){Qe(r,[13,32])?y(r,!0):De(r)!==!0&&r.keyCode>=35&&r.keyCode<=40&&r.altKey!==!0&&r.metaKey!==!0&&l.onKbdNavigate(r.keyCode,H.$el)===!0&&se(r),C("keydown",r)}function $(){const r=l.tabProps.value.narrowIndicator,c=[],w=h("div",{ref:W,class:["q-tab__indicator",l.tabProps.value.indicatorClass]});e.icon!==void 0&&c.push(h(z,{class:"q-tab__icon",name:e.icon})),e.label!==void 0&&c.push(h("div",{class:"q-tab__label"},e.label)),e.alert!==!1&&c.push(e.alertIcon!==void 0?h(z,{class:"q-tab__alert-icon",color:e.alert!==!0?e.alert:void 0,name:e.alertIcon}):h("div",{class:"q-tab__alert"+(e.alert!==!0?` text-${e.alert}`:"")})),r===!0&&c.push(w);const m=[h("div",{class:"q-focus-helper",tabindex:-1,ref:M}),h("div",{class:P.value},We(L.default,c))];return r===!1&&m.push(w),m}const B={name:d(()=>e.name),rootRef:D,tabIndicatorRef:W,routeData:v};de(()=>{l.unregisterTab(B)}),Me(()=>{l.registerTab(B)});function F(r,c){const w={ref:D,class:U.value,tabindex:g.value,role:"tab","aria-selected":A.value===!0?"true":"false","aria-disabled":e.disable===!0?"true":void 0,onClick:y,onKeydown:R,...c};return $e(h(r,w,$()),[[Ee,N.value]])}return{renderTab:F,$tabs:l}}var at=he({name:"QTab",props:Ge,emits:Xe,setup(e,{slots:L,emit:C}){const{renderTab:v}=Je(e,L,C);return()=>v("div")}});function Ye(e,L,C){const v=C===!0?["left","right"]:["top","bottom"];return`absolute-${L===!0?v[0]:v[1]}${e?` text-${e}`:""}`}const Ze=["left","center","right","justify"];var nt=he({name:"QTabs",props:{modelValue:[Number,String],align:{type:String,default:"center",validator:e=>Ze.includes(e)},breakpoint:{type:[String,Number],default:600},vertical:Boolean,shrink:Boolean,stretch:Boolean,activeClass:String,activeColor:String,activeBgColor:String,indicatorColor:String,leftIcon:String,rightIcon:String,outsideArrows:Boolean,mobileArrows:Boolean,switchIndicator:Boolean,narrowIndicator:Boolean,inlineLabel:Boolean,noCaps:Boolean,dense:Boolean,contentClass:String,"onUpdate:modelValue":[Function,Array]},setup(e,{slots:L,emit:C}){const{proxy:v}=be(),{$q:l}=v,{registerTick:H}=Z(),{registerTick:M}=Z(),{registerTick:D}=Z(),{registerTimeout:W,removeTimeout:N}=ce(),{registerTimeout:A,removeTimeout:U}=ce(),P=T(null),g=T(null),y=T(e.modelValue),R=T(!1),$=T(!0),B=T(!1),F=T(!1),r=d(()=>l.platform.is.desktop===!0||e.mobileArrows===!0),c=[],w=T(0),m=T(!1);let k,j,b,I=r.value===!0?ee:ve;const ge=d(()=>({activeClass:e.activeClass,activeColor:e.activeColor,activeBgColor:e.activeBgColor,indicatorClass:Ye(e.indicatorColor,e.switchIndicator,e.vertical),narrowIndicator:e.narrowIndicator,inlineLabel:e.inlineLabel,noCaps:e.noCaps})),me=d(()=>{const t=w.value,a=y.value;for(let n=0;n<t;n++)if(c[n].name.value===a)return!0;return!1}),Te=d(()=>`q-tabs__content--align-${R.value===!0?"left":F.value===!0?"justify":e.align}`),we=d(()=>`q-tabs row no-wrap items-center q-tabs--${R.value===!0?"":"not-"}scrollable q-tabs--${e.vertical===!0?"vertical":"horizontal"} q-tabs__arrows--${r.value===!0&&e.outsideArrows===!0?"outside":"inside"}`+(e.dense===!0?" q-tabs--dense":"")+(e.shrink===!0?" col-shrink":"")+(e.stretch===!0?" self-stretch":"")),Ce=d(()=>"q-tabs__content row no-wrap items-center self-stretch hide-scrollbar relative-position "+Te.value+(e.contentClass!==void 0?` ${e.contentClass}`:"")+(l.platform.is.mobile===!0?" scroll":"")),V=d(()=>e.vertical===!0?{container:"height",content:"offsetHeight",scroll:"scrollHeight"}:{container:"width",content:"offsetWidth",scroll:"scrollWidth"}),K=d(()=>e.vertical!==!0&&l.lang.rtl===!0),X=d(()=>Ne===!1&&K.value===!0);Q(K,I),Q(()=>e.modelValue,t=>{G({name:t,setCurrent:!0,skipEmit:!0})}),Q(()=>e.outsideArrows,()=>{E()}),Q(r,t=>{I=t===!0?ee:ve,E()});function G({name:t,setCurrent:a,skipEmit:n,fromRoute:u}){y.value!==t&&(n!==!0&&e["onUpdate:modelValue"]!==void 0&&C("update:modelValue",t),(a===!0||e["onUpdate:modelValue"]===void 0)&&(ye(y.value,t),y.value=t))}function E(){H(()=>{p({width:P.value.offsetWidth,height:P.value.offsetHeight})})}function p(t){if(V.value===void 0||g.value===null)return;const a=t[V.value.container],n=Math.min(g.value[V.value.scroll],Array.prototype.reduce.call(g.value.children,(s,i)=>s+(i[V.value.content]||0),0)),u=a>0&&n>a;R.value=u,u===!0&&M(I),F.value=a<parseInt(e.breakpoint,10)}function ye(t,a){const n=t!=null&&t!==""?c.find(s=>s.name.value===t):null,u=a!=null&&a!==""?c.find(s=>s.name.value===a):null;if(n&&u){const s=n.tabIndicatorRef.value,i=u.tabIndicatorRef.value;clearTimeout(k),s.style.transition="none",s.style.transform="none",i.style.transition="none",i.style.transform="none";const o=s.getBoundingClientRect(),f=i.getBoundingClientRect();i.style.transform=e.vertical===!0?`translate3d(0,${o.top-f.top}px,0) scale3d(1,${f.height?o.height/f.height:1},1)`:`translate3d(${o.left-f.left}px,0,0) scale3d(${f.width?o.width/f.width:1},1,1)`,D(()=>{k=setTimeout(()=>{i.style.transition="transform .25s cubic-bezier(.4, 0, .2, 1)",i.style.transform="none"},70)})}u&&R.value===!0&&x(u.rootRef.value)}function x(t){const{left:a,width:n,top:u,height:s}=g.value.getBoundingClientRect(),i=t.getBoundingClientRect();let o=e.vertical===!0?i.top-u:i.left-a;if(o<0){g.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.floor(o),I();return}o+=e.vertical===!0?i.height-s:i.width-n,o>0&&(g.value[e.vertical===!0?"scrollTop":"scrollLeft"]+=Math.ceil(o),I())}function ee(){const t=g.value;if(t!==null){const a=t.getBoundingClientRect(),n=e.vertical===!0?t.scrollTop:Math.abs(t.scrollLeft);K.value===!0?($.value=Math.ceil(n+a.width)<t.scrollWidth-1,B.value=n>0):($.value=n>0,B.value=e.vertical===!0?Math.ceil(n+a.height)<t.scrollHeight:Math.ceil(n+a.width)<t.scrollWidth)}}function te(t){q(),j=setInterval(()=>{Re(t)===!0&&q()},5)}function ae(){te(X.value===!0?Number.MAX_SAFE_INTEGER:0)}function ne(){te(X.value===!0?0:Number.MAX_SAFE_INTEGER)}function q(){clearInterval(j)}function qe(t,a){const n=Array.prototype.filter.call(g.value.children,f=>f===a||f.matches&&f.matches(".q-tab.q-focusable")===!0),u=n.length;if(u===0)return;if(t===36)return x(n[0]),n[0].focus(),!0;if(t===35)return x(n[u-1]),n[u-1].focus(),!0;const s=t===(e.vertical===!0?38:37),i=t===(e.vertical===!0?40:39),o=s===!0?-1:i===!0?1:void 0;if(o!==void 0){const f=K.value===!0?-1:1,_=n.indexOf(a)+o*f;return _>=0&&_<u&&(x(n[_]),n[_].focus({preventScroll:!0})),!0}}const _e=d(()=>X.value===!0?{get:t=>Math.abs(t.scrollLeft),set:(t,a)=>{t.scrollLeft=-a}}:e.vertical===!0?{get:t=>t.scrollTop,set:(t,a)=>{t.scrollTop=a}}:{get:t=>t.scrollLeft,set:(t,a)=>{t.scrollLeft=a}});function Re(t){const a=g.value,{get:n,set:u}=_e.value;let s=!1,i=n(a);const o=t<i?-1:1;return i+=o*5,i<0?(s=!0,i=0):(o===-1&&i<=t||o===1&&i>=t)&&(s=!0,i=t),u(a,i),I(),s}function oe(t,a){for(const n in t)if(t[n]!==a[n])return!1;return!0}function ke(){let t=null,a={matchedLen:0,queryDiff:9999,hrefLen:0};const n=c.filter(o=>o.routeData!==void 0&&o.routeData.hasRouterLink.value===!0),{hash:u,query:s}=v.$route,i=Object.keys(s).length;for(const o of n){const f=o.routeData.exact.value===!0;if(o.routeData[f===!0?"linkIsExactActive":"linkIsActive"].value!==!0)continue;const{hash:_,query:J,matched:Ae,href:Be}=o.routeData.resolvedLink.value,Y=Object.keys(J).length;if(f===!0){if(_!==u||Y!==i||oe(s,J)===!1)continue;t=o.name.value;break}if(_!==""&&_!==u||Y!==0&&oe(J,s)===!1)continue;const S={matchedLen:Ae.length,queryDiff:i-Y,hrefLen:Be.length-_.length};if(S.matchedLen>a.matchedLen){t=o.name.value,a=S;continue}else if(S.matchedLen!==a.matchedLen)continue;if(S.queryDiff<a.queryDiff)t=o.name.value,a=S;else if(S.queryDiff!==a.queryDiff)continue;S.hrefLen>a.hrefLen&&(t=o.name.value,a=S)}t===null&&c.some(o=>o.routeData===void 0&&o.name.value===y.value)===!0||G({name:t,setCurrent:!0})}function Se(t){if(N(),m.value!==!0&&P.value!==null&&t.target&&typeof t.target.closest=="function"){const a=t.target.closest(".q-tab");a&&P.value.contains(a)===!0&&(m.value=!0,R.value===!0&&x(a))}}function Le(){W(()=>{m.value=!1},30)}function O(){re.avoidRouteWatcher===!1?A(ke):U()}function le(){if(b===void 0){const t=Q(()=>v.$route.fullPath,O);b=()=>{t(),b=void 0}}}function Pe(t){c.push(t),w.value++,E(),t.routeData===void 0||v.$route===void 0?A(()=>{if(R.value===!0){const a=y.value,n=a!=null&&a!==""?c.find(u=>u.name.value===a):null;n&&x(n.rootRef.value)}}):(le(),t.routeData.hasRouterLink.value===!0&&O())}function Ie(t){c.splice(c.indexOf(t),1),w.value--,E(),b!==void 0&&t.routeData!==void 0&&(c.every(a=>a.routeData===void 0)===!0&&b(),O())}const re={currentModel:y,tabProps:ge,hasFocus:m,hasActiveTab:me,registerTab:Pe,unregisterTab:Ie,verifyRouteModel:O,updateModel:G,onKbdNavigate:qe,avoidRouteWatcher:!1};Ve(fe,re);function ie(){clearTimeout(k),q(),b!==void 0&&b()}let ue;return de(ie),Ke(()=>{ue=b!==void 0,ie()}),Oe(()=>{ue===!0&&le(),E()}),()=>{const t=[h(He,{onResize:p}),h("div",{ref:g,class:Ce.value,onScroll:I},ze(L.default))];return r.value===!0&&t.push(h(z,{class:"q-tabs__arrow q-tabs__arrow--left absolute q-tab__icon"+($.value===!0?"":" q-tabs__arrow--faded"),name:e.leftIcon||l.iconSet.tabs[e.vertical===!0?"up":"left"],onMousedownPassive:ae,onTouchstartPassive:ae,onMouseupPassive:q,onMouseleavePassive:q,onTouchendPassive:q}),h(z,{class:"q-tabs__arrow q-tabs__arrow--right absolute q-tab__icon"+(B.value===!0?"":" q-tabs__arrow--faded"),name:e.rightIcon||l.iconSet.tabs[e.vertical===!0?"down":"right"],onMousedownPassive:ne,onTouchstartPassive:ne,onMouseupPassive:q,onMouseleavePassive:q,onTouchendPassive:q})),h("div",{ref:P,class:we.value,role:"tablist",onFocusin:Se,onFocusout:Le},t)}}});export{at as Q,nt as a};