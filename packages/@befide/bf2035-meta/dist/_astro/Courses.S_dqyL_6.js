import{r as _,o as p,c as f,a,w as o,b as m,f as s,t as d}from"./main.CnChN3XN.js";import{s as h}from"./index.BfS1Wx-d.js";import{s as b}from"./index.Dyug92SV.js";import{_ as y}from"./_plugin-vue_export-helper.Dp6-QRIk.js";/* empty css                                   */const C={__name:"Courses",setup(l,{expose:i}){i();const n=_();p(async()=>{n.value=await fetch("/api/courses.json").then(c=>c.json())});const r={data:n,ref:_,onMounted:p};return Object.defineProperty(r,"__isScriptSetup",{enumerable:!1,value:!0}),r}},S={class:"card"};function g(l,i,n,r,c,x){const t=b,u=h;return m(),f("div",S,[a(u,{value:r.data,tableStyle:"min-width: 50rem"},{default:o(()=>[a(t,{header:"Short",field:"data.id"}),a(t,{header:"Short"},{body:o(e=>[s(d(e.id),1)]),_:1}),a(t,{header:"Short"},{body:o(e=>[s(d(e.data.data["label.long-form.de"]),1)]),_:1}),a(t,{field:"data.data.meta.befideOrganizationCategories",header:"Type"},{body:o(e=>[s(d(e.data.data["meta.befideOrganizationCategories"]),1)]),_:1}),a(t,{header:"people"},{body:o(e=>[s(d(e.data.data["peopleCount.uniqueProfessors"]),1)]),_:1})]),_:1},8,["value"])])}const T=y(C,[["render",g]]);export{T as default};
