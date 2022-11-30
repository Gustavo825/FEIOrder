import{c as w,a as T,h,b as C,g as V,I as A,av as x,r as b,A as q,B as S,C as a,D as e,an as y,ah as u,G as p,L as _,at as O,ap as $,s as k,K as v,aq as D,ar as H,as as L,F as g}from"./index.8d0d3872.js";import{Q as N}from"./QTable.885ef6e6.js";import{Q as P}from"./QPage.5a23c273.js";import{Q as I}from"./QLayout.66838c75.js";import{C as Q}from"./ClosePopup.dbcb7b2b.js";import{u as j}from"./notifyHook.09c869bb.js";import"./QList.2731edc5.js";import"./QSelect.e2af1588.js";import"./QChip.5b94b3ab.js";import"./QItem.6fd5120e.js";import"./selection.905cc330.js";import"./format.2a3572e1.js";import"./QScrollObserver.54b3ac61.js";import"./use-quasar.11bce999.js";var f=w({name:"QTd",props:{props:Object,autoWidth:Boolean,noHover:Boolean},setup(t,{slots:l}){const s=V(),c=T(()=>"q-td"+(t.autoWidth===!0?" q-table--col-auto-width":"")+(t.noHover===!0?" q-td--no-hover":"")+" ");return()=>{if(t.props===void 0)return h("td",{class:c.value},C(l.default));const i=s.vnode.key,r=(t.props.colsMap!==void 0?t.props.colsMap[i]:null)||t.props.col;if(r===void 0)return;const{row:d}=t.props;return h("td",{class:c.value+r.__tdClass(d),style:r.__tdStyle(d)},C(l.default))}}}),M=w({name:"QTr",props:{props:Object,noHover:Boolean},setup(t,{slots:l}){const s=T(()=>"q-tr"+(t.props===void 0||t.props.header===!0?"":" "+t.props.__trClass)+(t.noHover===!0?" q-tr--no-hover":""));return()=>h("tr",{class:s.value},C(l.default))}});const R=u("div",{class:"text-h5 q-mt-sm q-mb-xs"},"Confirma tu pedido",-1),U={class:"text-caption"},W={class:"text-caption"},F=u("label",{class:"form-label"},"Comentarios:",-1),G={__name:"confirmOrder",props:{card:Boolean},emits:["close"],setup(t,{emit:l}){const{showNotify:s}=j(),c=A(),i=x();i.calculateCost();const r=b(" "),d=()=>{console.log("cancelando"),l("close")},n=async()=>{await i.makeOrder(r.value),s("Tu orden se envio a la cocina","green"),c.push("/")};return(B,o)=>(q(),S(L,{modelValue:t.card,"onUpdate:modelValue":o[1]||(o[1]=m=>H(card)?card.value=m:null),persistent:""},{default:a(()=>[e(D,{style:{"min-width":"350px"}},{default:a(()=>[e(y,null,{default:a(()=>[R,u("div",U," Tiempo estimado: "+p(_(i).time)+" minutos ",1),u("div",W," Costo total: $ "+p(_(i).cost),1)]),_:1}),e(y,{class:"q-pt-none"},{default:a(()=>[F,e(O,{dense:"",modelValue:r.value,"onUpdate:modelValue":o[0]||(o[0]=m=>r.value=m),filled:"",type:"textarea",autofocus:""},null,8,["modelValue"])]),_:1}),e($,{align:"right",class:"text-primary"},{default:a(()=>[k(e(v,{onClick:d,label:"Cancel"},null,512),[[Q]]),k(e(v,{onClick:n,flat:"",label:"Confirmar pedido"},null,512),[[Q]])]),_:1})]),_:1})]),_:1},8,["modelValue"]))}};const K={class:"q-pa-md table-cart"},z={class:"confirm",align:"right"},ce={__name:"ShoppingPage",setup(t){const l=x();b("");const s=b(!1),c=n=>{l.remove(n),l.calculateCost()},i=[{name:"title",required:!0,label:"Titulo del platillo",align:"left",field:n=>n.title,format:n=>`${n}`,sortable:!0},{name:"Costo",align:"center",label:"Costo",field:"cost",sortable:!0},{name:"Tiempo de preparaci\xF3n",align:"center",label:"Tiempo de preparaci\xF3n",field:"timeToCook",sortable:!0},{name:"Accion",align:"center",label:"Accion",field:"Accion"}],r=async()=>{s.value=!s.value},d=()=>{s.value=!1};return(n,B)=>(q(),S(I,{class:"background padding"},{default:a(()=>[e(P,null,{default:a(()=>[u("div",K,[e(N,{class:"table",title:"Orden",rows:_(l).shoppingList,columns:i,"row-key":"name",separator:n.separator,"no-data-label":"Agrega platillos desde el menu"},{body:a(o=>[e(M,{props:o},{default:a(()=>[e(f,{key:"title",props:o},{default:a(()=>[g(p(o.row.title),1)]),_:2},1032,["props"]),e(f,{key:"Costo",props:o},{default:a(()=>[g(" $"+p(o.row.cost),1)]),_:2},1032,["props"]),e(f,{key:"Tiempo de preparaci\xF3n",props:o},{default:a(()=>[g(p(o.row.timeToCook),1)]),_:2},1032,["props"]),e(f,{key:"Accion",props:o},{default:a(()=>[e(v,{onClick:m=>c(o.row.idList),name:"delete",flat:"",label:"Quitar",icon:"delete"},null,8,["onClick"])]),_:2},1032,["props"])]),_:2},1032,["props"])]),_:1},8,["rows","separator"]),u("div",z,[e(v,{disabled:_(l).shoppingList.length==0,onClick:r,class:"form-submit",label:"Hacer pedido",type:"submit"},null,8,["disabled"])])]),e(G,{onClose:d,card:s.value},null,8,["card"])]),_:1})]),_:1}))}};export{ce as default};
