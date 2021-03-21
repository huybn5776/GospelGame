function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _defineProperties(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function _createClass(t,e,n){return e&&_defineProperties(t.prototype,e),n&&_defineProperties(t,n),t}(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{FdYD:function(t,e,r){"use strict";var c={};r.r(c),r.d(c,"selectGameScoreState",(function(){return l})),r.d(c,"selectAllGameScores",(function(){return u})),r.d(c,"selectTotalGameScores",(function(){return p})),r.d(c,"selectScoreSum",(function(){return b})),r.d(c,"selectScoreLoading",(function(){return d})),r.d(c,"selectNextInning",(function(){return f}));var o=r("kt0X"),a=Object(o.o)("layout");Object(o.q)(a,(function(t){return t.currentPage}));var i=r("pC+4"),l=Object(o.o)("gameScore"),s=i.a.getSelectors(l),u=s.selectAll,p=s.selectTotal,b=Object(o.q)(u,(function(t){return t.reduce((function(t,e){return t.scoreA+=e.scoreA,t.scoreB+=e.scoreB,t}),{scoreA:0,scoreB:0})})),d=Object(o.q)(l,(function(t){return t.loading})),f=Object(o.q)(u,p,(function(t,e){return(n(t[e-1]).inning||0)+1}));r.d(e,"a",(function(){return c}))},SahM:function(t,e,n){"use strict";n.r(e);var r,c,o,a=n("ofXK"),i=n("tyNb"),l=n("fXoL"),s=n("NFeN"),u=n("wZkO"),p=n("FdYD"),b=n("v8Ou"),d=n("kt0X"),f=((r=function(){function t(e){_classCallCheck(this,t),this.store=e,this.totalScore$=this.store.select(p.a.selectScoreSum)}return _createClass(t,[{key:"ngOnInit",value:function(){this.store.dispatch(b.a.loadAll())}}]),t}()).\u0275fac=function(t){return new(t||r)(l.Nb(d.h))},r.\u0275cmp=l.Hb({type:r,selectors:[["app-total-score-panel"]],decls:7,vars:6,consts:[[1,"total-score"]],template:function(t,e){1&t&&(l.Tb(0,"div",0),l.Tb(1,"span"),l.yc(2),l.gc(3,"async"),l.Sb(),l.Tb(4,"span"),l.yc(5),l.gc(6,"async"),l.Sb(),l.Sb()),2&t&&(l.Cb(2),l.Ac("A\u968a\u7e3d\u5206: ",l.hc(3,2,e.totalScore$).scoreA,""),l.Cb(3),l.Ac("B\u968a\u7e3d\u5206: ",l.hc(6,4,e.totalScore$).scoreB,""))},pipes:[a.b],styles:[".total-score[_ngcontent-%COMP%]{display:flex;justify-content:flex-end}.total-score[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin:6px 18px 0 8px;font-size:14px;color:grey}"]}),r),h=[{path:"",component:(c=function t(){_classCallCheck(this,t)},c.\u0275fac=function(t){return new(t||c)},c.\u0275cmp=l.Hb({type:c,selectors:[["app-home"]],decls:19,vars:3,consts:[[1,"title"],["svgIcon","super-mario-mark"],[1,"nav-bar"],["mat-tab-nav-bar",""],["mat-tab-link","","routerLink","input-score","routerLinkActive","",3,"active"],["rla1","routerLinkActive"],["mat-tab-link","","routerLink","final-result","routerLinkActive","",3,"active"],["rla2","routerLinkActive"],["mat-tab-link","","routerLink","scoring-rules","routerLinkActive","",3,"active"],["rla3","routerLinkActive"],[1,"page-content"]],template:function(t,e){if(1&t&&(l.Tb(0,"header"),l.Tb(1,"div",0),l.Ob(2,"mat-icon",1),l.Tb(3,"h1"),l.yc(4,"Mario Party"),l.Sb(),l.Sb(),l.Tb(5,"div",2),l.Tb(6,"nav",3),l.Tb(7,"a",4,5),l.yc(9,"\u8a08\u7b97\u5206\u6578"),l.Sb(),l.Tb(10,"a",6,7),l.yc(12,"\u6210\u679c\u5c55\u793a"),l.Sb(),l.Tb(13,"a",8,9),l.yc(15,"\u7b97\u5206\u898f\u5247"),l.Sb(),l.Sb(),l.Sb(),l.Ob(16,"app-total-score-panel"),l.Sb(),l.Tb(17,"div",10),l.Ob(18,"router-outlet"),l.Sb()),2&t){var n=l.qc(8),r=l.qc(11),c=l.qc(14);l.Cb(7),l.lc("active",n.isActive),l.Cb(3),l.lc("active",r.isActive),l.Cb(3),l.lc("active",c.isActive)}},directives:[s.a,u.b,i.b,u.a,i.a,f,i.d],styles:["header[_ngcontent-%COMP%]{width:100%;height:84px}header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{width:190px;left:12px;padding:8px;border-radius:0 0 16px 16px;box-shadow:.5px 2px 4px rgba(0,0,0,.3);display:flex;background-color:#e70012;position:absolute;z-index:1}header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{width:60px;height:60px;border:4px solid #fff;border-radius:100%}header[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{width:110px;margin:auto auto auto 6px;font-size:28px;letter-spacing:2px;text-align:center;color:#fff;text-shadow:-1.5px -1.5px 0 #696969,1.5px -1.5px 0 #696969,-1.5px 1.5px 0 #696969,1.5px 1.5px 0 #696969}header[_ngcontent-%COMP%]   .nav-bar[_ngcontent-%COMP%]{background-color:#fff}header[_ngcontent-%COMP%]   .nav-bar[_ngcontent-%COMP%]     .mat-tab-nav-bar.mat-primary .mat-ink-bar{background-color:#ff1493;transition:.3s}header[_ngcontent-%COMP%]   .nav-bar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]{padding-left:218px}header[_ngcontent-%COMP%]   .nav-bar[_ngcontent-%COMP%]   nav[_ngcontent-%COMP%]   [mat-tab-link][_ngcontent-%COMP%]{font-size:16px;min-width:100px}.page-content[_ngcontent-%COMP%]{padding:16px}"]}),c),children:[{path:"input-score",loadChildren:function(){return Promise.all([n.e(1),n.e(8)]).then(n.bind(null,"d9+q")).then((function(t){return t.InputScoreModule}))}},{path:"final-result",loadChildren:function(){return Promise.all([n.e(1),n.e(7)]).then(n.bind(null,"JGKb")).then((function(t){return t.FinalResultModule}))}},{path:"scoring-rules",loadChildren:function(){return n.e(9).then(n.bind(null,"YWEv")).then((function(t){return t.ScoringRulesModule}))}},{path:"**",redirectTo:"input-score",pathMatch:"full"}]}],g=((o=function t(){_classCallCheck(this,t)}).\u0275mod=l.Lb({type:o}),o.\u0275inj=l.Kb({factory:function(t){return new(t||o)},imports:[[i.c.forChild(h)],i.c]}),o),C=n("FpXt");n.d(e,"HomeModule",(function(){return x}));var v,x=((v=function t(){_classCallCheck(this,t)}).\u0275mod=l.Lb({type:v}),v.\u0275inj=l.Kb({factory:function(t){return new(t||v)},imports:[[a.c,g,C.a]]}),v)}}]);