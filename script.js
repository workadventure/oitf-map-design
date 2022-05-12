/*! For license information please see script.js.LICENSE.txt */
(()=>{"use strict";var e={910:(e,t,o)=>{o.r(t),o.d(t,{Properties:()=>n,VariableDescriptor:()=>r,bootstrapExtra:()=>X,findLayerBoundaries:()=>u,findLayersBoundaries:()=>p,getLayersMap:()=>l,getVariables:()=>i,initDoors:()=>z,initPropertiesTemplates:()=>M,initVariableActionLayer:()=>F});class n{constructor(e){this.properties=null!=e?e:[]}get(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.value));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}getString(e){return this.getByType(e,"string")}getNumber(e){return this.getByType(e,"number")}getBoolean(e){return this.getByType(e,"boolean")}getByType(e,t){const o=this.get(e);if(void 0!==o){if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}}mustGetString(e){return this.mustGetByType(e,"string")}mustGetNumber(e){return this.mustGetByType(e,"number")}mustGetBoolean(e){return this.mustGetByType(e,"boolean")}mustGetByType(e,t){const o=this.get(e);if(void 0===o)throw new Error('Property "'+e+'" is missing');if(typeof o!==t)throw new Error('Expected property "'+e+'" to have type "'+t+'"');return o}getType(e){const t=this.properties.filter((t=>t.name===e)).map((e=>e.type));if(t.length>1)throw new Error('Expected only one property to be named "'+e+'"');if(0!==t.length)return t[0]}}class r{constructor(e){this.name=e.name,this.x=e.x,this.y=e.y,this.properties=new n(e.properties)}get isReadable(){const e=this.properties.getString("readableBy");return!e||WA.player.tags.includes(e)}get isWritable(){const e=this.properties.getString("writableBy");return!e||WA.player.tags.includes(e)}}async function i(e,t){const o=await WA.room.getTiledMap(),n=new Map;return a(o.layers,n,e,t),n}function a(e,t,o,n){for(const i of e)if("objectgroup"===i.type){for(const e of i.objects)if("variable"===e.type){if(o&&i.name!==o)continue;if(n&&!n.includes(e.name))continue;t.set(e.name,new r(e))}}else"group"===i.type&&a(i.layers,t,o,n)}let s;async function l(){return void 0===s&&(s=async function(){return function(e){const t=new Map;return c(e.layers,"",t),t}(await WA.room.getTiledMap())}()),s}function c(e,t,o){for(const n of e)"group"===n.type?c(n.layers,t+n.name+"/",o):(n.name=t+n.name,o.set(n.name,n))}function u(e){let t=1/0,o=1/0,n=0,r=0;const i=e.data;if("string"==typeof i)throw new Error("Unsupported tile layer data stored as string instead of CSV");for(let a=0;a<e.height;a++)for(let s=0;s<e.width;s++)0!==i[s+a*e.width]&&(t=Math.min(t,s),r=Math.max(r,s),o=Math.min(o,a),n=Math.max(n,a));return{top:o,left:t,right:r+1,bottom:n+1}}function p(e){let t=1/0,o=1/0,n=0,r=0;for(const i of e){const e=u(i);e.left<t&&(t=e.left),e.top<o&&(o=e.top),e.right>r&&(r=e.right),e.bottom>n&&(n=e.bottom)}return{top:o,left:t,right:r,bottom:n}}var h=Object.prototype.toString,g=Array.isArray||function(e){return"[object Array]"===h.call(e)};function f(e){return"function"==typeof e}function d(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g,"\\$&")}function y(e,t){return null!=e&&"object"==typeof e&&t in e}var m=RegExp.prototype.test,b=/\S/;var v={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#x2F;","`":"&#x60;","=":"&#x3D;"},w=/\s*/,W=/\s+/,A=/\s*=/,S=/\s*\}/,C=/#|\^|\/|>|\{|&|=|!/;function x(e){this.string=e,this.tail=e,this.pos=0}function E(e,t){this.view=e,this.cache={".":this.view},this.parent=t}function B(){this.templateCache={_cache:{},set:function(e,t){this._cache[e]=t},get:function(e){return this._cache[e]},clear:function(){this._cache={}}}}x.prototype.eos=function(){return""===this.tail},x.prototype.scan=function(e){var t=this.tail.match(e);if(!t||0!==t.index)return"";var o=t[0];return this.tail=this.tail.substring(o.length),this.pos+=o.length,o},x.prototype.scanUntil=function(e){var t,o=this.tail.search(e);switch(o){case-1:t=this.tail,this.tail="";break;case 0:t="";break;default:t=this.tail.substring(0,o),this.tail=this.tail.substring(o)}return this.pos+=t.length,t},E.prototype.push=function(e){return new E(e,this)},E.prototype.lookup=function(e){var t,o,n,r=this.cache;if(r.hasOwnProperty(e))t=r[e];else{for(var i,a,s,l=this,c=!1;l;){if(e.indexOf(".")>0)for(i=l.view,a=e.split("."),s=0;null!=i&&s<a.length;)s===a.length-1&&(c=y(i,a[s])||(o=i,n=a[s],null!=o&&"object"!=typeof o&&o.hasOwnProperty&&o.hasOwnProperty(n))),i=i[a[s++]];else i=l.view[e],c=y(l.view,e);if(c){t=i;break}l=l.parent}r[e]=t}return f(t)&&(t=t.call(this.view)),t},B.prototype.clearCache=function(){void 0!==this.templateCache&&this.templateCache.clear()},B.prototype.parse=function(e,t){var o=this.templateCache,n=e+":"+(t||T.tags).join(":"),r=void 0!==o,i=r?o.get(n):void 0;return null==i&&(i=function(e,t){if(!e)return[];var o,n,r,i,a=!1,s=[],l=[],c=[],u=!1,p=!1,h="",f=0;function y(){if(u&&!p)for(;c.length;)delete l[c.pop()];else c=[];u=!1,p=!1}function v(e){if("string"==typeof e&&(e=e.split(W,2)),!g(e)||2!==e.length)throw new Error("Invalid tags: "+e);o=new RegExp(d(e[0])+"\\s*"),n=new RegExp("\\s*"+d(e[1])),r=new RegExp("\\s*"+d("}"+e[1]))}v(t||T.tags);for(var E,B,P,V,L,M,k=new x(e);!k.eos();){if(E=k.pos,P=k.scanUntil(o))for(var U=0,$=P.length;U<$;++U)i=V=P.charAt(U),function(e,t){return m.call(e,t)}(b,i)?(p=!0,a=!0,h+=" "):(c.push(l.length),h+=V),l.push(["text",V,E,E+1]),E+=1,"\n"===V&&(y(),h="",f=0,a=!1);if(!k.scan(o))break;if(u=!0,B=k.scan(C)||"name",k.scan(w),"="===B?(P=k.scanUntil(A),k.scan(A),k.scanUntil(n)):"{"===B?(P=k.scanUntil(r),k.scan(S),k.scanUntil(n),B="&"):P=k.scanUntil(n),!k.scan(n))throw new Error("Unclosed tag at "+k.pos);if(L=">"==B?[B,P,E,k.pos,h,f,a]:[B,P,E,k.pos],f++,l.push(L),"#"===B||"^"===B)s.push(L);else if("/"===B){if(!(M=s.pop()))throw new Error('Unopened section "'+P+'" at '+E);if(M[1]!==P)throw new Error('Unclosed section "'+M[1]+'" at '+E)}else"name"===B||"{"===B||"&"===B?p=!0:"="===B&&v(P)}if(y(),M=s.pop())throw new Error('Unclosed section "'+M[1]+'" at '+k.pos);return function(e){for(var t,o=[],n=o,r=[],i=0,a=e.length;i<a;++i)switch((t=e[i])[0]){case"#":case"^":n.push(t),r.push(t),n=t[4]=[];break;case"/":r.pop()[5]=t[2],n=r.length>0?r[r.length-1][4]:o;break;default:n.push(t)}return o}(function(e){for(var t,o,n=[],r=0,i=e.length;r<i;++r)(t=e[r])&&("text"===t[0]&&o&&"text"===o[0]?(o[1]+=t[1],o[3]=t[3]):(n.push(t),o=t));return n}(l))}(e,t),r&&o.set(n,i)),i},B.prototype.render=function(e,t,o,n){var r=this.getConfigTags(n),i=this.parse(e,r),a=t instanceof E?t:new E(t,void 0);return this.renderTokens(i,a,o,e,n)},B.prototype.renderTokens=function(e,t,o,n,r){for(var i,a,s,l="",c=0,u=e.length;c<u;++c)s=void 0,"#"===(a=(i=e[c])[0])?s=this.renderSection(i,t,o,n,r):"^"===a?s=this.renderInverted(i,t,o,n,r):">"===a?s=this.renderPartial(i,t,o,r):"&"===a?s=this.unescapedValue(i,t):"name"===a?s=this.escapedValue(i,t,r):"text"===a&&(s=this.rawValue(i)),void 0!==s&&(l+=s);return l},B.prototype.renderSection=function(e,t,o,n,r){var i=this,a="",s=t.lookup(e[1]);if(s){if(g(s))for(var l=0,c=s.length;l<c;++l)a+=this.renderTokens(e[4],t.push(s[l]),o,n,r);else if("object"==typeof s||"string"==typeof s||"number"==typeof s)a+=this.renderTokens(e[4],t.push(s),o,n,r);else if(f(s)){if("string"!=typeof n)throw new Error("Cannot use higher-order sections without the original template");null!=(s=s.call(t.view,n.slice(e[3],e[5]),(function(e){return i.render(e,t,o,r)})))&&(a+=s)}else a+=this.renderTokens(e[4],t,o,n,r);return a}},B.prototype.renderInverted=function(e,t,o,n,r){var i=t.lookup(e[1]);if(!i||g(i)&&0===i.length)return this.renderTokens(e[4],t,o,n,r)},B.prototype.indentPartial=function(e,t,o){for(var n=t.replace(/[^ \t]/g,""),r=e.split("\n"),i=0;i<r.length;i++)r[i].length&&(i>0||!o)&&(r[i]=n+r[i]);return r.join("\n")},B.prototype.renderPartial=function(e,t,o,n){if(o){var r=this.getConfigTags(n),i=f(o)?o(e[1]):o[e[1]];if(null!=i){var a=e[6],s=e[5],l=e[4],c=i;0==s&&l&&(c=this.indentPartial(i,l,a));var u=this.parse(c,r);return this.renderTokens(u,t,o,c,n)}}},B.prototype.unescapedValue=function(e,t){var o=t.lookup(e[1]);if(null!=o)return o},B.prototype.escapedValue=function(e,t,o){var n=this.getConfigEscape(o)||T.escape,r=t.lookup(e[1]);if(null!=r)return"number"==typeof r&&n===T.escape?String(r):n(r)},B.prototype.rawValue=function(e){return e[1]},B.prototype.getConfigTags=function(e){return g(e)?e:e&&"object"==typeof e?e.tags:void 0},B.prototype.getConfigEscape=function(e){return e&&"object"==typeof e&&!g(e)?e.escape:void 0};var T={name:"mustache.js",version:"4.2.0",tags:["{{","}}"],clearCache:void 0,escape:void 0,parse:void 0,render:void 0,Scanner:void 0,Context:void 0,Writer:void 0,set templateCache(e){P.templateCache=e},get templateCache(){return P.templateCache}},P=new B;T.clearCache=function(){return P.clearCache()},T.parse=function(e,t){return P.parse(e,t)},T.render=function(e,t,o,n){if("string"!=typeof e)throw new TypeError('Invalid template! Template should be a "string" but "'+(g(r=e)?"array":typeof r)+'" was given as the first argument for mustache#render(template, view, partials)');var r;return P.render(e,t,o,n)},T.escape=function(e){return String(e).replace(/[&<>"'`=\/]/g,(function(e){return v[e]}))},T.Scanner=x,T.Context=E,T.Writer=B;const V=T;class L{constructor(e,t){this.template=e,this.state=t,this.ast=V.parse(e)}getValue(){return void 0===this.value&&(this.value=V.render(this.template,this.state)),this.value}onChange(e){const t=[];for(const o of this.getUsedVariables().values())t.push(this.state.onVariableChange(o).subscribe((()=>{const t=V.render(this.template,this.state);t!==this.value&&(this.value=t,e(this.value))})));return{unsubscribe:()=>{for(const e of t)e.unsubscribe()}}}isPureString(){return 0===this.ast.length||1===this.ast.length&&"text"===this.ast[0][0]}getUsedVariables(){const e=new Set;return this.recursiveGetUsedVariables(this.ast,e),e}recursiveGetUsedVariables(e,t){for(const o of e){const e=o[0],n=o[1],r=o[4];["name","&","#","^"].includes(e)&&t.add(n),void 0!==r&&"string"!=typeof r&&this.recursiveGetUsedVariables(r,t)}}}async function M(){var e;const t=await l();for(const[o,n]of t.entries()){const t=null!==(e=n.properties)&&void 0!==e?e:[];for(const e of t){if("int"===e.type||"bool"===e.type||"object"===e.type||"string"!=typeof e.value)continue;const t=new L(e.value,WA.state);if(t.isPureString())continue;const n=t.getValue();k(o,e.name,n),t.onChange((t=>{k(o,e.name,t)}))}}}function k(e,t,o){WA.room.setProperty(e,t,o),"visible"===t&&(o?WA.room.showLayer(e):WA.room.hideLayer(e))}const U="https://unpkg.com/@workadventure/scripting-api-extra@1.2.2/dist";let $,j,G=0,O=0;function R(e){if(WA.state[e.name]){let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.showLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.hideLayer(e)}else{let t=e.properties.mustGetString("openLayer");for(const e of t.split("\n"))WA.room.hideLayer(e);t=e.properties.mustGetString("closeLayer");for(const e of t.split("\n"))WA.room.showLayer(e)}}function I(e){return e.map((e=>$.get(e))).filter((e=>"tilelayer"===(null==e?void 0:e.type)))}function D(e){const t=p(I(e)),o=32*((t.right-t.left)/2+t.left),n=32*((t.bottom-t.top)/2+t.top);return Math.sqrt(Math.pow(G-o,2)+Math.pow(O-n,2))}function _(e){WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]?function(e){const t=e.properties.getString("openSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=D(e.properties.mustGetString("openLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e):function(e){const t=e.properties.getString("closeSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=D(e.properties.mustGetString("closeLayer").split("\n"));if(t>o)return;n=1-t/o}t&&WA.sound.loadSound(t).play({volume:n})}(e),R(e)})),R(e)}function N(e,t,o,n){const r=e.name;let i,a,s=!1;const l=o.getString("tag");let c=!0;l&&!WA.player.tags.includes(l)&&(c=!1);const u=!!l;function h(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("closeTriggerMessage"))&&void 0!==e?e:"Press SPACE to close the door",callback:()=>{WA.state[t.name]=!1,g()}})}function g(){var e;i&&i.remove(),i=WA.ui.displayActionMessage({message:null!==(e=o.getString("openTriggerMessage"))&&void 0!==e?e:"Press SPACE to open the door",callback:()=>{WA.state[t.name]=!0,h()}})}function f(){a&&(WA.room.website.delete(a.name),a=void 0)}WA.room.onEnterLayer(r).subscribe((()=>{s=!0,o.getBoolean("autoOpen")&&c?WA.state[t.name]=!0:WA.state[t.name]||(!u||c)&&u||!o.getString("code")&&!o.getString("codeVariable")?c&&(WA.state[t.name]?h():g()):function(e){const o=p(I(t.properties.mustGetString("closeLayer").split("\n")));a=WA.room.website.create({name:"doorKeypad"+e,url:n+"/keypad.html#"+encodeURIComponent(e),position:{x:32*o.right,y:32*o.top,width:96,height:128},allowApi:!0})}(r)})),WA.room.onLeaveLayer(r).subscribe((()=>{s=!1,o.getBoolean("autoClose")&&(WA.state[t.name]=!1),i&&i.remove(),f()})),WA.state.onVariableChange(t.name).subscribe((()=>{s&&(o.getBoolean("autoClose")||!0!==WA.state[t.name]||h(),a&&!0===WA.state[t.name]&&f(),o.getBoolean("autoOpen")||!1!==WA.state[t.name]||g())}))}function Z(e){void 0===WA.state[e.name]&&(WA.state[e.name]=0),WA.state.onVariableChange(e.name).subscribe((()=>{WA.state[e.name]&&function(e){const t=e.properties.mustGetString("bellSound"),o=e.properties.getNumber("soundRadius");let n=1;if(o){const t=Math.sqrt(Math.pow(e.x-G,2)+Math.pow(e.y-O,2));if(t>o)return;n=1-t/o}WA.sound.loadSound(t).play({volume:n})}(e)}))}function q(e,t,o){let n;const r=t.getString("bellPopup");WA.room.onEnterLayer(o).subscribe((()=>{var o;r?n=WA.ui.openPopup(r,"",[{label:null!==(o=t.getString("bellButtonText"))&&void 0!==o?o:"Ring",callback:()=>{WA.state[e]=WA.state[e]+1}}]):WA.state[e]=WA.state[e]+1})),WA.room.onLeaveLayer(o).subscribe((()=>{n&&(n.close(),n=void 0)}))}async function z(e){e=null!=e?e:U;const t=await i();$=await l();for(const e of t.values())e.properties.get("door")&&_(e),e.properties.get("bell")&&Z(e);for(const o of $.values()){const r=new n(o.properties),i=r.getString("doorVariable");if(i&&"tilelayer"===o.type){const n=t.get(i);if(void 0===n)throw new Error('Cannot find variable "'+i+'" referred in the "doorVariable" property of layer "'+o.name+'"');N(o,n,r,e)}const a=r.getString("bellVariable");a&&q(a,r,o.name)}WA.player.onPlayerMove((e=>{G=e.x,O=e.y}))}function F(e,t){const o=e.getString("bindVariable");o&&function(e,t,o,n,r,i){i&&!WA.player.tags.includes(i)||(void 0!==o&&WA.room.onEnterLayer(t).subscribe((()=>{r||(WA.state[e]=o)})),void 0!==n&&WA.room.onLeaveLayer(t).subscribe((()=>{WA.state[e]=n})))}(o,t,e.get("enterValue"),e.get("leaveValue"),e.getString("triggerMessage"),e.getString("tag"))}function K(e,t){let o;const n=t.getString("zone");if(!n)throw new Error('Missing "zone" property');const r=t.getString("openConfigAdminTag");let i=!0;function a(){WA.nav.closeCoWebSite()}r&&!WA.player.tags.includes(r)&&(i=!1),WA.room.onEnterZone(n,(()=>{const n=t.getString("openConfigTrigger");var r;i&&(n&&"onaction"===n?(o&&o.remove(),o=WA.ui.displayActionMessage({message:null!==(r=t.getString("openConfigTriggerMessage"))&&void 0!==r?r:"Press SPACE or touch here to configure",callback:()=>H(e)})):H(e))})),WA.room.onLeaveZone(n,(()=>{o?(o.remove(),a()):a()}))}function H(e){const t=e?"#"+e:"";WA.nav.openCoWebSite(U+"/configuration.html"+t,!0)}const J=[{lowerBound:0,uppperBound:.5,config:{width:250,height:390,scale:1}},{lowerBound:.5,uppperBound:.8,config:{width:224,height:350,scale:.9}},{lowerBound:.8,uppperBound:1.25,config:{width:132,height:211,scale:.53}},{lowerBound:1.25,uppperBound:2.28,config:{width:64,height:99,scale:.25}},{lowerBound:1.25,config:{width:39,height:63,scale:.16}}],Q=[{lowerBound:0,uppperBound:1,config:{width:427,height:270,scale:1}},{lowerBound:1,uppperBound:1.9,config:{width:300,height:188,scale:.7}},{lowerBound:1.9,uppperBound:3.5,config:{width:150,height:94,scale:.35}},{lowerBound:3.5,uppperBound:5,config:{width:93,height:58,scale:.21}},{lowerBound:4,config:{width:75,height:46,scale:.17}}];function X(){return WA.onInit().then((()=>{z().catch((e=>console.error(e))),async function(){const e=await l();for(const t of e.values())F(new n(t.properties),t.name)}().catch((e=>console.error(e))),async function(e){const t=await WA.room.getTiledMap();e=null!=e?e:U,j=await l();const o=t.layers.find((e=>"configuration"===e.name));if(o){const t=new n(o.properties).getString("tag");t&&!WA.player.tags.includes(t)||WA.ui.registerMenuCommand("Configure the room",(()=>{WA.nav.openCoWebSite(e+"/configuration.html",!0)}));for(const e of j.values()){const t=new n(e.properties),o=t.getString("openConfig");o&&"tilelayer"===e.type&&K(o,t)}}}().catch((e=>console.error(e))),M().catch((e=>console.error(e))),async function(){var e,t;const o=WA.player.state.tutorialDone,n=/Mobi|Android/i.test(navigator.userAgent),r=await WA.room.getTiledMap(),i=null!==(t=(await(null===(e=r.properties)||void 0===e?void 0:e.find((e=>"tutorial"===e.name)))).value)&&void 0!==t&&t;if(!o&&i){!function(e){let t={allow:"",name:"tutorial",url:U+"/tutorial.html",position:{height:224,width:407,x:16,y:-112},visible:!0,allowApi:!0,origin:"player",scale:.9};e&&(t={...t,position:{x:32,y:-225,height:390,width:250},scale:1}),WA.room.website.create(t)}(n);let e,t=await WA.player.getPosition();const o=await WA.room.website.get("tutorial"),r=()=>{const n=t.x+o.x+o.width>e.x+e.width,r=t.x+o.x<e.x,i=t.y+o.y+o.height>e.y+e.height,a=t.y+o.y<e.y;n?o.x=-o.width-24:r&&(o.x=24),i?o.y=-o.height:a&&(o.y=16)},i=e=>{o.width=e.width,o.height=e.height,o.scale=e.scale},a=e=>{const t=(n?J:Q).filter((t=>{if(t.lowerBound&&t.uppperBound)return t.lowerBound<e&&e<=t.uppperBound;if(t.lowerBound&&!t.uppperBound)return t.lowerBound<e;if(!t.lowerBound&&t.uppperBound)return e<=t.uppperBound;throw new Error(`Zoom level of: ${e} could not fit in any of the desktopConfig's ranges.`)}));i(t[0].config)},s=()=>{if(void 0===e)return;const t=e.zoom;a(t),r()};WA.player.onPlayerMove((e=>{t=e,s()})),WA.camera.onCameraUpdate().subscribe((t=>{e=t,s()})),WA.player.state.tutorialDone=!0}}().catch((e=>console.error(e)))})).catch((e=>console.error(e)))}}},t={};function o(n){var r=t[n];if(void 0!==r)return r.exports;var i=t[n]={exports:{}};return e[n](i,i.exports,o),i.exports}o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{(0,o(910).bootstrapExtra)().catch((e=>console.error(e)));const e="doorClosed",t="doorOpened",n=()=>{WA.room.showLayer(e),WA.room.hideLayer(t)},r=()=>WA.player.tags.includes("premium")||WA.player.tags.includes("Premium")||WA.player.tags.includes("PREMIUM")||WA.player.tags.includes("editor");function i(){console.log("isPremium()",r()),r()?(WA.room.hideLayer(e),WA.room.showLayer(t)):n()}function a(e,t){WA.room.onEnterLayer(e).subscribe((()=>{WA.nav.openCoWebSite(t,!0,"fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture")})),WA.room.onLeaveLayer(e).subscribe((()=>WA.nav.closeCoWebSite()))}WA.onInit().then((()=>{n(),WA.room.onEnterLayer("doorZone").subscribe(i),console.info("Init WA OITF");let e="";WA.state.hasVariable("domain")&&(e=WA.state.loadVariable("domain")),WA.player.tags.forEach((t=>{console.log(t),null!=t.match(/http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2,10}))(?:$|\/)/i)&&(e=t)})),""!==e&&"/"===e.substring(e.length-1,e.length-1)&&(e=e.substring(0,e.length-1)),console.log("userDomain",e);const t=WA.state.loadVariable("urlVideo");null!=t&&a("Video",`${e}${t}/${WA.player.id}`);const o=WA.state.loadVariable("urlDocument");null!=o&&a("Document",`${e}${o}/${WA.player.id}`);const r=WA.state.loadVariable("chapitreChoice");if(null!=r){const t=`${e}${r}/${WA.player.id}`;a("urlPanneau",t),a("openWebsitEexitCercleToChapitrePublic",t),a("openWebsitEexitCercleToChapitrePrivate",t),a("openWebsitEexitSessionToChapitrePrivate",t)}const s=WA.state.loadVariable("projectChoice");if(null!=s){const t=`${e}${s}/${WA.player.id}`;a("openWebsitEexitChapitreToCerclePublic",t),a("openWebsitEexitChapitreToCerclePrivate",t),a("openWebsitEexitSessionToCerclePrivate",t)}const l=WA.state.loadVariable("eventChoice");if(null!=l){const t=`${e}${l}/${WA.player.id}`;a("openWebsiteExitToEvent",t),a("openWebsitEexitCercleToSessionPrivate",t),a("openWebsitEexitCercleToSessionPublic",t)}})),window.addEventListener("message",(function(e){const t=e.data;"access_wa_map"===t.event&&(console.log(t.url),window.location=t.url)}),!1)})()})();
//# sourceMappingURL=script.js.map