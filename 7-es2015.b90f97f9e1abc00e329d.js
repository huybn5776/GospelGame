(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{JGKb:function(t,e,c){"use strict";c.r(e);var n=c("ofXK"),o=c("FpXt"),i=c("tyNb"),s=c("DRYZ"),a=c("v8Ou"),r=c("FdYD"),l=c("fXoL"),b=c("kt0X"),m=c("+0xr"),u=c("6LIv"),f=c("L8iz"),d=Object(f.a)((function(t,e){return Array.prototype.slice.call(e,0).sort((function(e,c){var n=t(e),o=t(c);return n<o?-1:n>o?1:0}))})),p=c("Q28r");function h(t,e){if(1&t&&(l.Tb(0,"span",2),l.Ob(1,"img",3),l.Sb()),2&t){const t=e.$implicit;l.Cb(1),l.lc("src",t.src,l.sc)("alt",t.name)}}let C=(()=>{class t{constructor(){this.itemIndex=p.b.reduce((t,e)=>(t[e.id]=e,t),{})}ngOnChanges(t){this.items=[],Object.entries(this.itemCount||[]).forEach(([t,e])=>{const c=this.itemIndex[t];let n=e;for(;n--;)this.items.push(c)}),this.items=d(t=>t.seq,this.items)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Hb({type:t,selectors:[["app-items-view"]],inputs:{itemCount:"itemCount"},features:[l.Ab],decls:2,vars:1,consts:[[1,"items-container"],["class","small-item",4,"ngFor","ngForOf"],[1,"small-item"],[3,"src","alt"]],template:function(t,e){1&t&&(l.Tb(0,"div",0),l.xc(1,h,2,2,"span",1),l.Sb()),2&t&&(l.Cb(1),l.lc("ngForOf",e.items))},directives:[n.j],styles:['.items-container[_ngcontent-%COMP%]   .small-item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:28px;height:28px;-o-object-fit:contain;object-fit:contain}.items-container[_ngcontent-%COMP%]   .small-item[_ngcontent-%COMP%]:not(:last-child):after{content:"";width:1px;height:16px;margin:6px 2px 0;vertical-align:top;background-color:#d3d3d3;display:inline-block}']}),t})(),g=(()=>{class t{constructor(){}ngOnChanges(t){this.value=Object.entries(this.coinCount).map(([t,e])=>parseInt(t.split("-")[1],10)*e).reduce((t,e)=>t+e,0)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=l.Hb({type:t,selectors:[["app-coins-view"]],inputs:{coinCount:"coinCount"},features:[l.Ab],decls:2,vars:1,template:function(t,e){1&t&&(l.Tb(0,"p"),l.yc(1),l.Sb()),2&t&&(l.Cb(1),l.zc(e.value))},styles:[""]}),t})();var S=c("bTqV"),y=c("NFeN"),w=c("bv9b");function x(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u5c40\u6578"),l.Sb())}function O(t,e){if(1&t&&(l.Tb(0,"td",19),l.yc(1),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.zc(c.asScore(t).inning)}}function v(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u6642\u9593"),l.Sb())}function T(t,e){if(1&t&&(l.Tb(0,"td",19),l.yc(1),l.gc(2,"date"),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.zc(l.ic(2,1,c.asScore(t).time,"M/d hh:mm:ss"))}}function D(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u8cfd\u5c40"),l.Sb())}function R(t,e){if(1&t&&(l.Tb(0,"td",19),l.yc(1),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.Ac("",c.asScore(t).playerCount,"\u4eba\u8cfd")}}function M(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u8d0f\u5bb6"),l.Sb())}function A(t,e){if(1&t&&(l.Rb(0),l.yc(1),l.Qb()),2&t){const t=e.ngLet;l.Cb(1),l.Ac(" ","a"===t?"A\u968a":"b"===t?"B\u968a":"---"," ")}}function $(t,e){if(1&t&&(l.Tb(0,"td",19),l.xc(1,A,2,1,"ng-container",20),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.lc("ngLet",c.asScore(t).winner)}}function k(t,e){1&t&&(l.Tb(0,"th",21),l.yc(1,"A\u968a\u9053\u5177"),l.Sb())}function P(t,e){if(1&t&&(l.Tb(0,"td",19),l.Ob(1,"app-items-view",22),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.lc("itemCount",c.asScore(t).itemsA)}}function _(t,e){1&t&&(l.Tb(0,"th",21),l.yc(1,"B\u968a\u9053\u5177"),l.Sb())}function L(t,e){if(1&t&&(l.Tb(0,"td",19),l.Ob(1,"app-items-view",22),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.lc("itemCount",c.asScore(t).itemsB)}}function Q(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u65b0\u670b\u53cb\u52a0\u6210"),l.Sb())}function j(t,e){if(1&t&&(l.Tb(0,"td",19),l.Ob(1,"app-coins-view",23),l.yc(2," / "),l.Ob(3,"app-coins-view",23),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.lc("coinCount",c.asScore(t).coinsA),l.Cb(2),l.lc("coinCount",c.asScore(t).coinsB)}}function H(t,e){1&t&&(l.Tb(0,"th",18),l.yc(1,"\u5206\u6578"),l.Sb())}function B(t,e){if(1&t&&(l.Tb(0,"td",19),l.yc(1),l.Sb()),2&t){const t=e.$implicit,c=l.fc();l.Cb(1),l.Bc("",c.asScore(t).scoreA," / ",c.asScore(t).scoreB,"")}}function F(t,e){1&t&&l.Ob(0,"th",18)}function I(t,e){if(1&t){const t=l.Ub();l.Tb(0,"td",24),l.Tb(1,"button",25),l.bc("click",(function(){l.rc(t);const c=e.$implicit,n=l.fc();return n.delete(n.asScore(c).id)})),l.Tb(2,"mat-icon"),l.yc(3,"delete"),l.Sb(),l.Sb(),l.Sb()}}function z(t,e){1&t&&l.Ob(0,"tr",26)}function N(t,e){1&t&&l.Ob(0,"tr",27)}function K(t,e){1&t&&l.Ob(0,"mat-progress-bar",28)}const X=[{path:"",component:(()=>{class t{constructor(t,e){this.localStorageService=t,this.store=e,this.displayedColumns=["inning","time","playerCount","winner","itemsA","itemsB","coins","scores","actions"],this.gameScores$=this.store.select(r.a.selectAllGameScores),this.gameScoresLoading$=this.store.select(r.a.selectScoreLoading)}ngOnInit(){this.store.dispatch(a.a.loadAll())}asScore(t){return t}delete(t){this.store.dispatch(a.a.removeOne({id:t}))}}return t.\u0275fac=function(e){return new(e||t)(l.Nb(s.a),l.Nb(b.h))},t.\u0275cmp=l.Hb({type:t,selectors:[["app-final-result"]],decls:35,vars:9,consts:[[1,"scores-table-container"],["mat-table","",3,"dataSource"],["matColumnDef","inning"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","time"],["matColumnDef","playerCount"],["matColumnDef","winner"],["matColumnDef","itemsA"],["mat-header-cell","","class","items-column",4,"matHeaderCellDef"],["matColumnDef","itemsB"],["matColumnDef","coins"],["matColumnDef","scores"],["matColumnDef","actions"],["mat-cell","","class","score-actions",4,"matCellDef"],["mat-header-row","",4,"matHeaderRowDef","matHeaderRowDefSticky"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mode","buffer",4,"ngIf"],["mat-header-cell",""],["mat-cell",""],[4,"ngLet"],["mat-header-cell","",1,"items-column"],[3,"itemCount"],[3,"coinCount"],["mat-cell","",1,"score-actions"],["mat-icon-button","",3,"click"],["mat-header-row",""],["mat-row",""],["mode","buffer"]],template:function(t,e){1&t&&(l.Tb(0,"div",0),l.Tb(1,"table",1),l.gc(2,"async"),l.Rb(3,2),l.xc(4,x,2,0,"th",3),l.xc(5,O,2,1,"td",4),l.Qb(),l.Rb(6,5),l.xc(7,v,2,0,"th",3),l.xc(8,T,3,4,"td",4),l.Qb(),l.Rb(9,6),l.xc(10,D,2,0,"th",3),l.xc(11,R,2,1,"td",4),l.Qb(),l.Rb(12,7),l.xc(13,M,2,0,"th",3),l.xc(14,$,2,1,"td",4),l.Qb(),l.Rb(15,8),l.xc(16,k,2,0,"th",9),l.xc(17,P,2,1,"td",4),l.Qb(),l.Rb(18,10),l.xc(19,_,2,0,"th",9),l.xc(20,L,2,1,"td",4),l.Qb(),l.Rb(21,11),l.xc(22,Q,2,0,"th",3),l.xc(23,j,4,2,"td",4),l.Qb(),l.Rb(24,12),l.xc(25,H,2,0,"th",3),l.xc(26,B,2,2,"td",4),l.Qb(),l.Rb(27,13),l.xc(28,F,1,0,"th",3),l.xc(29,I,4,0,"td",14),l.Qb(),l.xc(30,z,1,0,"tr",15),l.xc(31,N,1,0,"tr",16),l.Sb(),l.Sb(),l.Tb(32,"footer"),l.xc(33,K,1,0,"mat-progress-bar",17),l.gc(34,"async"),l.Sb()),2&t&&(l.Cb(1),l.lc("dataSource",l.hc(2,5,e.gameScores$)),l.Cb(29),l.lc("matHeaderRowDef",e.displayedColumns)("matHeaderRowDefSticky",!0),l.Cb(1),l.lc("matRowDefColumns",e.displayedColumns),l.Cb(2),l.lc("ngIf",l.hc(34,7,e.gameScoresLoading$)))},directives:[m.j,m.c,m.e,m.b,m.g,m.i,n.k,m.d,m.a,u.a,C,g,S.a,y.a,m.f,m.h,w.a],pipes:[n.b,n.e],styles:["[_nghost-%COMP%]{position:relative;display:block}.scores-table-container[_ngcontent-%COMP%]{max-height:calc(100vh - 116px);overflow:auto}.scores-table-container[_ngcontent-%COMP%]   table[_ngcontent-%COMP%]{width:100%}.items-column[_ngcontent-%COMP%]{width:144px}.score-actions[_ngcontent-%COMP%]{width:1%;white-space:nowrap;color:grey}app-coins-view[_ngcontent-%COMP%]{display:inline-block}footer[_ngcontent-%COMP%]{width:100%;bottom:0;z-index:100;position:absolute;background-color:#fff}"]}),t})()}];let J=(()=>{class t{}return t.\u0275mod=l.Lb({type:t}),t.\u0275inj=l.Kb({factory:function(e){return new(e||t)},imports:[[i.c.forChild(X)],i.c]}),t})();c.d(e,"FinalResultModule",(function(){return q}));let q=(()=>{class t{}return t.\u0275mod=l.Lb({type:t}),t.\u0275inj=l.Kb({factory:function(e){return new(e||t)},imports:[[n.c,o.a,J]]}),t})()}}]);