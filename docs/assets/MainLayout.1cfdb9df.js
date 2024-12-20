import{Q as w,a as h,b as v}from"./QHeader.6e4bdffb.js";import{Q as b,a as $}from"./QLayout.af2dc609.js";import{u as g}from"./QuestionToolIcon.99c5e006.js";import{a as c,w as z,_ as d,l as i,m as Q,k as t,u as q,r as j,n as m,p as u,q as l,t as p,v as k,x as y}from"./index.2e79474d.js";import{Q as L}from"./MatchItem.0132a2af.js";import{u as S}from"./answerStore.ff715b92.js";import{u as T}from"./vue-i18n.582f3401.js";import{_ as V}from"./lg_saxion_wit.4b1b1f5e.js";import"./QResizeObserver.5be44855.js";import"./scroll.412b97cc.js";import"./wandb_logo.127f2d59.js";import"./QCard.35515e2b.js";import"./use-key-composition.62855e23.js";import"./QChip.df67fbc3.js";import"./format.95c26eff.js";const C=c({name:"LocaleSwitcher",setup(e,{emit:o}){const{t:r,locale:a}=T(),s=S();return z(a,()=>{console.log("locale",a.value),s.loadTools(a.value)}),{locale:a,t:r,localeOptions:[{value:"en-US",label:"\u{1F1EC}\u{1F1E7} English"},{value:"nl",label:"\u{1F1F3}\u{1F1F1} Nederlands"}]}}});function x(e,o,r,a,s,f){return i(),Q("div",null,[t(L,{modelValue:e.locale,"onUpdate:modelValue":o[0]||(o[0]=n=>e.locale=n),"label-color":"white",options:e.localeOptions,label:e.$t("language_picker"),dense:"",borderless:"","emit-value":"","map-options":"","options-dense":"",style:{"min-width":"120px"}},null,8,["modelValue","options","label"])])}var N=d(C,[["render",x]]);const B=c({name:"MainLayout",components:{LocaleSwitcher:N},setup(){const e=q(),o=g(),r=[{icon:"home",label:"Hoofdscherm",route_name:"index",separator:!0},{icon:"quiz",label:"AI-Platformwijzer",route_name:"aiplatformwijzer",separator:!1},{icon:"quiz",label:"Data wijzer",route_name:"datawijzer",separator:!1},{icon:"quiz",label:"Standaarden wijzer",route_name:"standaardenwijzer",separator:!1}],a=s=>{e.push({name:s})};return{drawer:j(!1),menuList:r,goToRoute:a,q:o}}}),A={style:{position:"absolute",right:"0"}};function H(e,o,r,a,s,f){const n=m("locale-switcher"),_=m("router-view");return i(),u(b,{view:"lHh Lpr lFf"},{default:l(()=>[t(v,{elevated:""},{default:l(()=>[t(w,null,{default:l(()=>[p("img",{class:"q-ma-sm",src:V,style:{height:"6vh"},onClick:o[0]||(o[0]=I=>e.goToRoute("index"))}),e.q.screen.lt.sm?y("",!0):(i(),u(h,{key:0,class:"absolute-center text-h5"},{default:l(()=>[k(" AI-Platformwijzer ")]),_:1})),p("div",A,[t(n,{class:"q-ma-md"})])]),_:1})]),_:1}),t($,null,{default:l(()=>[t(_)]),_:1})]),_:1})}var ee=d(B,[["render",H]]);export{ee as default};