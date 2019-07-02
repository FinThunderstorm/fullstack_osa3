(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{14:function(e,n,t){e.exports=t(38)},37:function(e,n,t){},38:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(13),u=t.n(r),c=t(2),i=t(3),l=t.n(i),m="/api/persons",f=function(){return l.a.get(m).then(function(e){return e.data})},s=function(e){return l.a.post(m,e).then(function(e){return e.data})},d=function(e,n){return l.a.put("".concat(m,"/").concat(e),n).then(function(e){return e.data})},h=function(e){return l.a.delete("".concat(m,"/").concat(e)).then(function(e){return e.data})},b=(t(37),function(e){return null===e.message?null:o.a.createElement("div",{className:e.style},e.message)}),v=function(e){return o.a.createElement("form",null,o.a.createElement("div",null,"filter shown with ",o.a.createElement("input",{value:e.filterValue,onChange:e.filterOnChange})))},p=function(e){return o.a.createElement("form",{onSubmit:e.onSubmit},o.a.createElement("div",null,"name: ",o.a.createElement("input",{value:e.nameValue,onChange:e.nameOnChange})),o.a.createElement("div",null,"number: ",o.a.createElement("input",{value:e.numberValue,onChange:e.numberOnChange})),o.a.createElement("div",null,o.a.createElement("button",{type:"submit"},"add")))},E=function(e){return e.persons.filter(function(n){if(e.filter.length>0){var t=n.name.toLowerCase(),a=e.filter.toLowerCase();return t.includes(a)}return!0}).map(function(n,t){return o.a.createElement(g,{key:t,name:n.name,number:n.number,removePerson:e.removePerson,id:n.id})})},g=function(e){return o.a.createElement("div",null,e.name," ",e.number,o.a.createElement("button",{id:e.id,value:e.name,onClick:e.removePerson},"delete"))},O=function(){var e=Object(a.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(""),i=Object(c.a)(u,2),l=i[0],m=i[1],g=Object(a.useState)(""),O=Object(c.a)(g,2),w=O[0],j=O[1],C=Object(a.useState)(""),S=Object(c.a)(C,2),k=S[0],y=S[1],P=Object(a.useState)(null),T=Object(c.a)(P,2),V=T[0],D=T[1],I=Object(a.useState)(""),J=Object(c.a)(I,2),L=J[0],N=J[1];Object(a.useEffect)(function(){f().then(function(e){r(e)})},[]);return o.a.createElement("div",null,o.a.createElement("h2",null,"Phonebook"),o.a.createElement(b,{style:L,message:V}),o.a.createElement(v,{filterValue:k,filterOnChange:function(e){e.preventDefault(),y(e.target.value)}}),o.a.createElement("h2",null,"add a new"),o.a.createElement(p,{onSubmit:function(e){e.preventDefault();var n={name:l,number:w},a=t.find(function(e){return e.name===n.name});void 0!==a?window.confirm("".concat(n.name," is already added to phonebook, replace the old number with a new one?"))&&d(a.id,n).then(function(e){console.log(e),f().then(function(e){r(e)}),N("notification"),D("Person ".concat(n.name," updated")),setTimeout(function(){D(null),N("")},5e3),m(""),j("")}).catch(function(e){f().then(function(e){r(e)}),N("error"),D("Information of ".concat(n.name," has already been removed from server")),setTimeout(function(){D(null),N("")},5e3)}):s(n).then(function(e){r(t.concat(e)),m(""),j(""),N("notification"),D("Person ".concat(n.name," added to phonebook")),setTimeout(function(){D(null),N("")},5e3)}).catch(function(e){m(""),j(""),N("error"),D(e.response.data.error),setTimeout(function(){D(null),N("")},5e3)})},nameValue:l,nameOnChange:function(e){m(e.target.value)},numberValue:w,numberOnChange:function(e){j(e.target.value)}}),o.a.createElement("h2",null,"Numbers"),o.a.createElement(E,{persons:t,filter:k,removePerson:function(e){var n=e.target.value;window.confirm("Delete ".concat(n,"?"))&&h(e.target.id).then(function(e){f().then(function(e){r(e)}),N("notification"),D("Person ".concat(n," removed from phonebook")),setTimeout(function(){D(null),N("")},5e3)}).catch(function(e){f().then(function(e){r(e)}),N("error"),D("Information of ".concat(n," has already been removed from server")),setTimeout(function(){D(null),N("")},5e3)})}}))};u.a.render(o.a.createElement(O,null),document.getElementById("root"))}},[[14,1,2]]]);
//# sourceMappingURL=main.fb35bd24.chunk.js.map