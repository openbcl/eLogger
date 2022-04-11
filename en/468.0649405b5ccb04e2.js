"use strict";(self.webpackChunkelogger=self.webpackChunkelogger||[]).push([[468],{1468:(gt,F,s)=>{s.r(F),s.d(F,{TemplatesModule:()=>dt});var c=s(9808),I=s(3618),i=s(5620),U=s(9300),C=s(4004),w=s(5698),u=s(3900),le=s(1157);const Z=(0,i.PH)("[Template] Load Template",(0,i.Ky)()),H=(0,i.PH)("[Template] Load Template Success",(0,i.Ky)()),Q=(0,i.PH)("[Template] Load Template Failure",(0,i.Ky)()),B=(0,i.PH)("[Template] Create Template",(0,i.Ky)()),J=(0,i.PH)("[Template] Create Template Failure",(0,i.Ky)()),M=(0,i.PH)("[Template] Update Template",(0,i.Ky)()),q=(0,i.PH)("[Template] Update Template Failure",(0,i.Ky)()),z=(0,i.PH)("[Template] Delete Template",(0,i.Ky)()),X=(0,i.PH)("[Template] Delete Template Failure",(0,i.Ky)());var N=s(2656),m=s(4187),f=s(6541),ae=s(8803);const k="template",K={template:null,processing:!1,error:null},ie=(0,i.Lq)(K,(0,i.on)(Z,_=>Object.assign(Object.assign({},_),{processing:!0})),(0,i.on)(H,(_,o)=>Object.assign(Object.assign({},_),{template:o.template,processing:!1})),(0,i.on)(Q,(_,o)=>Object.assign(Object.assign({},_),{error:o.error,processing:!1})),(0,i.on)(B,(_,o)=>Object.assign(Object.assign({},_),{processing:!0})),(0,i.on)(f.OK,(_,o)=>Object.assign(Object.assign({},_),{template:o.template,processing:!1})),(0,i.on)(J,(_,o)=>Object.assign(Object.assign({},_),{error:o.error,processing:!1})),(0,i.on)(M,(_,o)=>Object.assign(Object.assign({},_),{processing:!0})),(0,i.on)(f.sT,(_,o)=>Object.assign(Object.assign({},_),{template:o.template,processing:!1})),(0,i.on)(q,(_,o)=>Object.assign(Object.assign({},_),{error:o.error,processing:!1})),(0,i.on)(z,(_,o)=>Object.assign(Object.assign({},_),{processing:!0})),(0,i.on)(f.w$,(_,o)=>Object.assign({},K)),(0,i.on)(X,(_,o)=>Object.assign(Object.assign({},_),{error:o.error,processing:!1})),(0,i.on)(ae.hP,(_,o)=>Object.assign(Object.assign({},_),{template:null}))),j=(0,i.ZF)(k),P=(0,i.P1)(j,_=>_.template),Ee=(0,i.P1)(j,_=>_.processing),pe=(0,i.P1)(N.v3,j,(_,o)=>_.templates.flatMap(t=>t.eventTemplates).filter((t,n,l)=>{var a,E;return!(n!==l.findIndex(p=>(0,m.Ni)(p,t))||(null===(E=null===(a=o.template)||void 0===a?void 0:a.eventTemplates)||void 0===E?void 0:E.length)&&o.template.eventTemplates.find(p=>(0,m.Ni)(p,t)))}));var W=s(2779),v=s(427),e=s(5e3),G=s(9177),ee=s(8061),L=s(9783),h=s(1424),O=s(845),A=s(5787),S=s(2653),T=s(3075),te=s(8505),R=s(895),y=s(1456),x=s(5315);function se(_,o){1&_&&(e.TgZ(0,"div",11)(1,"span",12),e.SDv(2,13),e.qZA()())}function Te(_,o){1&_&&(e.TgZ(0,"div",11)(1,"span",12),e.SDv(2,14),e.qZA()())}function re(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"form",15),e.NdJ("ngSubmit",function(){e.CHM(t);const l=e.oxw().ngrxLet;return e.oxw().submit(l)}),e._UZ(1,"button",16),e.qZA()}if(2&_){const t=e.oxw(2);e.Q6J("formGroup",t.form),e.xp6(1),e.Q6J("disabled",t.form.invalid)}}function me(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"p-dialog",1),e.NdJ("visibleChange",function(){return e.CHM(t),e.oxw().close()}),e.TgZ(1,"form",2)(2,"span",3),e._UZ(3,"input",4),e.TgZ(4,"label",5),e.SDv(5,6),e.qZA(),e.YNc(6,se,3,0,"div",7),e.qZA(),e.TgZ(7,"span",3),e._UZ(8,"input",8),e.TgZ(9,"label",5),e.SDv(10,9),e.qZA(),e.YNc(11,Te,3,0,"div",7),e.qZA()(),e.YNc(12,re,2,2,"ng-template",10),e.qZA()}if(2&_){const t=e.oxw();e.Q6J("resizable",!1)("maximizable",!0)("visible",t.visible)("modal",!0)("closeOnEscape",!0),e.xp6(1),e.Q6J("formGroup",t.form),e.xp6(2),e.ekj("ng-invalid",(null==t.form.errors?null:t.form.errors[t.abstractLogIsUniqueError])||!t.form.get("title").valid)("ng-valid",!(null!=t.form.errors&&t.form.errors[t.abstractLogIsUniqueError])&&t.form.get("title").valid),e.xp6(3),e.Q6J("ngIf",null==t.form.errors?null:t.form.errors[t.abstractLogIsUniqueError]),e.xp6(2),e.ekj("ng-invalid",(null==t.form.errors?null:t.form.errors[t.abstractLogIsUniqueError])||!t.form.get("desc").valid)("ng-valid",!(null!=t.form.errors&&t.form.errors[t.abstractLogIsUniqueError])&&t.form.get("desc").valid),e.xp6(3),e.Q6J("ngIf",null==t.form.errors?null:t.form.errors[t.abstractLogIsUniqueError])}}let ce=(()=>{class _ extends y.M{constructor(t,n){super(),this.store=t,this.fb=n,this.abstractLogIsUniqueError=R.zO,this.form=this.fb.group({title:[null,T.kI.required],desc:null},{asyncValidators:R.mX.abstractLogIsUnique(this.store.pipe((0,i.Ys)(N.zU)),this.store.pipe((0,i.Ys)(P)))}),this.template$=this.store.pipe((0,i.Ys)(P),(0,U.h)(l=>!!l),(0,te.b)(l=>{this.form.patchValue({title:l.title,desc:l.desc})}))}close(){super.close(),this.template$.pipe((0,w.q)(1)).subscribe()}submit(t){this.store.dispatch(M({template:Object.assign(Object.assign({},t),this.form.value)})),this.close()}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh),e.Y36(T.qu))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-update-template-dialog"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,t,n,l,a,E;return o=$localize`:Dialog headline@@UpdateTemplateDialogComponent\:header:Update Template`,t=$localize`:Title input label@@UpdateTemplateDialogComponent\:titleLabel:Title`,n=$localize`:Description input label@@UpdateTemplateDialogComponent\:descriptionLabel:Description`,l=$localize`:Title error hint@@UpdateTemplateDialogComponent\:titleError:A template with this name already exists. Please choose another name.`,a=$localize`:Description error hint@@UpdateTemplateDialogComponent\:descriptionError:A template with this description already exists. Please choose another description.`,E=$localize`:Update button@@UpdateTemplateDialogComponent\:updateButton:Update`,[["header",o,"styleClass","w-full sm:w-30rem",3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange",4,"ngrxLet"],["header",o,"styleClass","w-full sm:w-30rem",3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange"],[3,"formGroup"],[1,"p-float-label","mt-5","field"],["formControlName","title","pInputText","","type","text",1,"inputfield","w-full"],["for","float-input"],t,["class","w-full mt-1 px-2",4,"ngIf"],["formControlName","desc","pInputText","","type","text",1,"inputfield","w-full"],n,["pTemplate","footer"],[1,"w-full","mt-1","px-2"],[1,"p-error","text-xs"],l,a,[3,"formGroup","ngSubmit"],["pButton","","pRipple","","type","submit","icon","pi pi-check","label",E,1,"p-button-success","p-button-text",3,"disabled"]]},template:function(t,n){1&t&&e.YNc(0,me,13,16,"p-dialog",0),2&t&&e.Q6J("ngrxLet",n.template$)},directives:[G.eJ,x.V,T._Y,T.JL,T.sg,T.Fj,T.JJ,T.u,h.o,c.O5,L.jx,O.Hq,A.H],styles:[""]}),_})();function de(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"button",4),e.NdJ("click",function(){e.CHM(t);const l=e.oxw().ngrxLet;return e.oxw().delete(l)}),e.qZA()}}function ge(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"p-dialog",1),e.NdJ("visibleChange",function(){return e.CHM(t),e.oxw().close()}),e.ynx(1),e.SDv(2,2),e.BQk(),e.YNc(3,de,1,0,"ng-template",3),e.qZA()}if(2&_){const t=e.oxw();e.Q6J("resizable",!1)("maximizable",!0)("visible",t.visible)("modal",!0)("closeOnEscape",!0)}}let Ce=(()=>{class _ extends y.M{constructor(t){super(),this.store=t,this.template$=this.store.pipe((0,i.Ys)(P))}delete(t){this.store.dispatch(z({template:t})),this.close()}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-delete-template-dialog"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,t,n;return o=$localize`:Dialog headline@@DeleteTemplateDialogComponent\:header:Delete Template`,t=$localize`:Dialog question@@DeleteTemplateDialogComponent\:question: Are you sure you want to delete this template? `,n=$localize`:Delete button@@DeleteTemplateDialogComponent\:deleteButton:Delete`,[["header",o,3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange",4,"ngrxLet"],["header",o,3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange"],t,["pTemplate","footer"],["pButton","","pRipple","","icon","pi pi-trash","label",n,1,"p-button-danger","p-button-text",3,"click"]]},template:function(t,n){1&t&&e.YNc(0,ge,4,5,"p-dialog",0),2&t&&e.Q6J("ngrxLet",n.template$)},directives:[G.eJ,x.V,L.jx,O.Hq,A.H],styles:[""]}),_})();var V=s(8854),b=s(1941),ue=s(422),Le=s(4036),Oe=s(7102),_e=s(1410);function Ae(_,o){if(1&_&&(e.TgZ(0,"div"),e.ALo(1,"colorClass"),e._UZ(2,"i"),e.TgZ(3,"span",25),e._uU(4),e.qZA(),e.TgZ(5,"span",26),e._uU(6),e.ALo(7,"eventLabel"),e.qZA()()),2&_){const t=e.oxw().$implicit;e.Gre("flex flex-wrap align-items-center pl-2 pt-2 pb-2  ",e.lcZ(1,9,t.color),""),e.xp6(2),e.MT6("pl-2 ",t.icon.value," ",t.icon.styleClass,""),e.xp6(2),e.Oqu(t.name),e.xp6(2),e.hij("(",e.lcZ(7,11,t.eventType),")")}}function Se(_,o){if(1&_&&e.YNc(0,Ae,8,13,"div",24),2&_){const t=e.oxw(4);e.Q6J("ngIf",t.form.value.selectedTemplate)}}function Me(_,o){if(1&_&&(e.TgZ(0,"div"),e.ALo(1,"colorClass"),e._UZ(2,"i"),e.TgZ(3,"span",25),e._uU(4),e.qZA(),e.TgZ(5,"span",26),e._uU(6),e.ALo(7,"eventLabel"),e.qZA()()),2&_){const t=o.$implicit;e.Gre("flex flex-wrap align-items-center pl-3 pr-4 py-2 ",e.lcZ(1,9,t.color),""),e.xp6(2),e.MT6("pl-2 ",t.icon.value," ",t.icon.styleClass,""),e.xp6(2),e.Oqu(t.name),e.xp6(2),e.hij("(",e.lcZ(7,11,t.eventType),")")}}function fe(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div")(1,"p-fieldset",17)(2,"div",18)(3,"p-dropdown",19),e.NdJ("onChange",function(l){return e.CHM(t),e.oxw(3).dropdownChanged(l)})("onClear",function(){return e.CHM(t),e.oxw(3).reset()}),e.YNc(4,Se,1,1,"ng-template",20),e.YNc(5,Me,8,13,"ng-template",21),e.qZA(),e.TgZ(6,"span",22),e.SDv(7,23),e.qZA()()(),e._UZ(8,"br"),e.qZA()}if(2&_){const t=e.oxw().ngrxLet;e.xp6(3),e.Q6J("options",t)("showClear",!0)}}function Pe(_,o){if(1&_&&(e.TgZ(0,"div",28),e._UZ(1,"i"),e.TgZ(2,"span",29),e._uU(3),e.qZA()()),2&_){const t=o.ngIf;e.xp6(1),e.MT6("text-3xl mt-2 col ",t.value," ",t.styleClass,""),e.xp6(2),e.Oqu(t.label)}}function Re(_,o){1&_&&(e.YNc(0,Pe,4,5,"div",27),e.ALo(1,"eventLabelWithIcon")),2&_&&e.Q6J("ngIf",e.lcZ(1,1,o.$implicit))}function De(_,o){1&_&&(e.TgZ(0,"div",30)(1,"span",31),e.SDv(2,32),e.qZA()())}function Ne(_,o){if(1&_&&e._UZ(0,"i"),2&_){const t=o.$implicit;e.MT6("",t.value," ",t.styleClass,"")}}function ve(_,o){if(1&_&&(e.TgZ(0,"p-fieldset",33)(1,"p-selectButton",34),e.YNc(2,Ne,1,4,"ng-template"),e.qZA()()),2&_){const t=e.oxw(3);e.xp6(1),e.Q6J("options",t.eventIcons)}}const Ge=function(_,o,t,n){return{"border-primary":_,"border-black-alpha-50":o,"border-black-alpha-10":t,"pointer-events-none":n}};function he(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div",35),e.NdJ("click",function(){const a=e.CHM(t).$implicit,E=e.oxw(3);return void 0!==E.form.value.color&&E.form.patchValue({color:a})}),e.ALo(1,"colorClass"),e.qZA()}if(2&_){const t=o.$implicit,n=e.oxw(3);e.Gre("border-2 border-round m-1 p-3 cursor-pointer ",e.lcZ(1,4,t),""),e.Q6J("ngClass",e.l5B(6,Ge,t===n.form.getRawValue().color,t!==n.form.getRawValue().color&&""===t,t!==n.form.getRawValue().color&&""!==t,void 0===n.form.value.color))}}function xe(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div")(1,"form",4),e.YNc(2,fe,9,2,"div",5),e.TgZ(3,"p-fieldset",6)(4,"p-selectButton",7),e.NdJ("click",function(){return e.CHM(t),e.oxw(2).setName()}),e.YNc(5,Re,2,3,"ng-template"),e.qZA()(),e.TgZ(6,"span",8),e._UZ(7,"input",9),e.TgZ(8,"label",10),e.SDv(9,11),e.qZA(),e.YNc(10,De,3,0,"div",12),e.qZA(),e.YNc(11,ve,3,1,"p-fieldset",13),e._UZ(12,"br"),e.TgZ(13,"p-fieldset",14)(14,"div",15),e.YNc(15,he,2,11,"div",16),e.qZA()()()()}if(2&_){const t=o.ngrxLet,n=e.oxw(2);e.xp6(1),e.Q6J("formGroup",n.form),e.xp6(1),e.Q6J("ngIf",t.length),e.xp6(2),e.Q6J("options",n.eventTypes),e.xp6(3),e.ekj("ng-dirty",!n.form.value.selectedTemplate)("ng-invalid",(null==n.form.errors?null:n.form.errors[n.eventTypeIsUniqueError])||!n.form.get("name").valid)("ng-valid",!(null!=n.form.errors&&n.form.errors[n.eventTypeIsUniqueError])&&n.form.get("name").valid),e.xp6(3),e.Q6J("ngIf",null==n.form.errors?null:n.form.errors[n.eventTypeIsUniqueError]),e.xp6(1),e.Q6J("ngIf",0===n.form.getRawValue().eventType),e.xp6(4),e.Q6J("ngForOf",n.colors)}}function be(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"form",36),e.NdJ("ngSubmit",function(){e.CHM(t);const l=e.oxw().ngrxLet;return e.oxw().submit(l)}),e._UZ(1,"button",37),e.qZA()}if(2&_){const t=e.oxw(2);e.Q6J("formGroup",t.form),e.xp6(1),e.Q6J("disabled",t.form.invalid)}}function Ie(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"p-dialog",1),e.NdJ("visibleChange",function(){return e.CHM(t),e.oxw().close()}),e.YNc(1,xe,16,12,"div",2),e.YNc(2,be,2,2,"ng-template",3),e.qZA()}if(2&_){const t=e.oxw();e.Q6J("resizable",!1)("maximizable",!0)("visible",t.visible)("modal",!0)("closeOnEscape",!0),e.xp6(1),e.Q6J("ngrxLet",t.eventTemplates$)}}let Ue=(()=>{class _ extends y.M{constructor(t,n,l,a){super(),this.store=t,this.fb=n,this.eventLabel=l,this.eventLabelWithIcon=a,this.eventTypeIsUniqueError=R.JV,this.eventIcons=m.jW,this.eventTypes=m.uS,this.colors=[null,"yellow","orange","pink","purple","indigo","blue","cyan","teal","green"],this.eventTemplates$=this.store.pipe((0,i.Ys)(pe)),this.template$=this.store.pipe((0,i.Ys)(P)),this.form=this.fb.group({selectedTemplate:void 0,name:[null,T.kI.required],eventType:[V.t.DEFAULT,T.kI.required],icon:m.jW[0],color:null},{asyncValidators:R.mX.eventTypeIsUnique(this.template$)})}close(){super.close(),this.reset()}dropdownChanged(t){if(t.value){const n=Object.assign(Object.assign({},t.value),{icon:m.jW.find(l=>l.value===t.value.icon.value)});delete n.selectedTemplate,this.form.patchValue(n),Object.keys(n).forEach(l=>this.form.controls[l].disable())}}setName(){void 0!==this.form.value.eventType&&this.form.patchValue(this.form.value.eventType===V.t.DEFAULT?{name:""}:{name:this.eventLabel.transform(this.form.value.eventType)})}reset(){this.form.reset({selectedTemplate:void 0,name:null,eventType:V.t.DEFAULT,icon:m.jW[0],color:null}),this.form.enable()}submit(t){const n=this.form.getRawValue();delete n.selectedTemplate;const{value:l,styleClass:a}=0!==n.eventType?this.eventLabelWithIcon.transform(n.eventType):n.icon;n.icon={value:l,styleClass:a},this.store.dispatch(M({template:Object.assign(Object.assign({},t),{eventTemplates:[...t.eventTemplates,n]})})),this.close()}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh),e.Y36(T.qu),e.Y36(b.bt),e.Y36(b.Zs))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-create-eventtemplate-dialog"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,t,n,l,a,E,p,D,ne,oe;return o=$localize`:Dialog headline@@CreateEventTemplateDialogComponent\:header:Add Event Template`,t=$localize`:Event type headline@@CreateEventTemplateDialogComponent\:eventType:Event Type`,n=$localize`:Event name headline@@CreateEventTemplateDialogComponent\:eventName:Event Name`,l=$localize`:Event icon headline@@CreateEventTemplateDialogComponent\:eventIcon:Event Icon`,a=$localize`:Event color headline@@CreateEventTemplateDialogComponent\:eventColor:Event Color`,E=$localize`:Known templates headline@@CreateEventTemplateDialogComponent\:knownTemplates:Known Event Templates`,p=$localize`:Dropdown placeholder chooseItems@@CreateEventTemplateDialogComponent\:dropdownPlaceholder:Choose a known template ...`,D=$localize`:Dialog description@@CreateEventTemplateDialogComponent\:description: You can either choose an event template from the known templates or create a completely new event template. `,ne=$localize`:Event name duplicate error@@CreateEventTemplateDialogComponent\:error:An event template with this name already exists. Please choose another name.`,oe=$localize`:Add button@@CreateEventTemplateDialogComponent\:addButton:Add`,[["styleClass","w-full sm:w-8","header",o,3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange",4,"ngrxLet"],["styleClass","w-full sm:w-8","header",o,3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange"],[4,"ngrxLet"],["pTemplate","footer"],[3,"formGroup"],[4,"ngIf"],["legend",t],["formControlName","eventType",1,"el-icon-selector","flex","align-items-center","justify-content-center",3,"options","click"],[1,"p-float-label","mt-5","field"],["formControlName","name","pInputText","","type","text",1,"inputfield","w-full"],["for","float-input"],n,["class","w-full text-center justify-content-center mt-1 px-2",4,"ngIf"],["legend",l,4,"ngIf"],["legend",a],[1,"flex","flex-wrap","justify-content-center"],["pRipple","",3,"class","ngClass","click",4,"ngFor","ngForOf"],["legend",E],[1,"grid"],["styleClass","w-full white-space-normal","panelStyleClass","white-space-normal","formControlName","selectedTemplate","placeholder",p,1,"col-12","el-dropdown-items-p-0",3,"options","showClear","onChange","onClear"],["pTemplate","selectedItem"],["pTemplate","item"],[1,"col-12","flex","text-center","justify-content-center","font-light"],D,[3,"class",4,"ngIf"],[1,"pl-2","text-overflow-anywhere"],[1,"pl-2","text-overflow-anywhere","font-light","text-500"],["class","grid w-7rem",4,"ngIf"],[1,"grid","w-7rem"],[1,"col-12"],[1,"w-full","text-center","justify-content-center","mt-1","px-2"],[1,"p-error","text-xs"],ne,["legend",l],["formControlName","icon","optionLabel","icon",1,"el-icon-selector","flex","align-items-center","justify-content-center",3,"options"],["pRipple","",3,"ngClass","click"],[3,"formGroup","ngSubmit"],["pButton","","pRipple","","type","submit","icon","pi pi-check","label",oe,1,"p-button-success","p-button-text",3,"disabled"]]},template:function(t,n){1&t&&e.YNc(0,Ie,3,6,"p-dialog",0),2&t&&e.Q6J("ngrxLet",n.template$)},directives:[G.eJ,x.V,T._Y,T.JL,T.sg,c.O5,ue.p,Le.Lt,T.JJ,T.u,L.jx,Oe.UN,T.Fj,h.o,c.sg,A.H,c.mk,O.Hq],pipes:[_e.z,b.bt,b.Zs],styles:["[_nghost-%COMP%]     .el-icon-selector .p-selectbutton{text-align:center}[_nghost-%COMP%]     .el-icon-selector .p-selectbutton .p-button{display:inline-block;padding:.5rem;border-radius:4px!important;border-width:2px;border-style:solid;border-color:transparent;margin:.25em}[_nghost-%COMP%]     .el-icon-selector .p-selectbutton .p-button span{word-wrap:break-word;overflow-wrap:anywhere;word-wrap:anywhere}[_nghost-%COMP%]     .el-icon-selector .p-selectbutton .p-highlight{border-color:var(--primary-color)}[_nghost-%COMP%]     p-dialog .p-dropdown .p-element.p-dropdown-label{padding-top:0rem;padding-left:0rem;padding-bottom:0rem}"]}),_})();function ye(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"button",6),e.NdJ("click",function(){e.CHM(t);const l=e.oxw().ngrxLet;return e.oxw().delete(l)}),e.qZA()}}function $e(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"p-dialog",1),e.NdJ("visibleChange",function(){return e.CHM(t),e.oxw().close()}),e.ynx(1),e.SDv(2,2),e.BQk(),e.TgZ(3,"p",3),e.SDv(4,4),e.qZA(),e.YNc(5,ye,1,0,"ng-template",5),e.qZA()}if(2&_){const t=e.oxw();e.Q6J("resizable",!1)("maximizable",!0)("visible",t.eventTemplate)("modal",!0)("closeOnEscape",!0)}}let we=(()=>{class _{constructor(t){this.store=t,this.eventTemplateChange=new e.vpe,this.template$=this.store.pipe((0,i.Ys)(P))}close(){this.eventTemplate=void 0,this.eventTemplateChange.emit(this.eventTemplate)}delete(t){this.store.dispatch(M({template:Object.assign(Object.assign({},t),{eventTemplates:t.eventTemplates.filter(n=>!(0,m.Ni)(n,this.eventTemplate))})})),this.close()}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-delete-eventtemplate-dialog"]],inputs:{eventTemplate:"eventTemplate"},outputs:{eventTemplateChange:"eventTemplateChange"},decls:1,vars:1,consts:function(){let o,t,n,l;return o=$localize`:Dialog headline@@DeleteEventTemplateDialogComponent\:header:Delete Template`,t=$localize`:Dialog question@@DeleteEventTemplateDialogComponent\:question: Are you sure you want to delete this event template? `,n=$localize`:Warning about deletion@@DeleteEventTemplateDialogComponent\:warning: If you decide to do so this event template will no longer be available for future logging. Existing log entries remain unaffected. `,l=$localize`:Delete button@@DeleteEventTemplateDialogComponent\:deleteButton:Delete`,[["header",o,"styleClass","w-full sm:w-30rem",3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange",4,"ngrxLet"],["header",o,"styleClass","w-full sm:w-30rem",3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange"],t,[1,"mb-0","font-light"],n,["pTemplate","footer"],["pButton","","pRipple","","icon","pi pi-trash","label",l,1,"p-button-danger","p-button-text",3,"click"]]},template:function(t,n){1&t&&e.YNc(0,$e,6,5,"p-dialog",0),2&t&&e.Q6J("ngrxLet",n.template$)},directives:[G.eJ,x.V,L.jx,O.Hq,A.H],styles:[""]}),_})();const Ze=function(_,o){return{"p-button-danger":_,"p-button-secondary":o}};function Qe(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div",24)(1,"button",25),e.NdJ("click",function(){return e.CHM(t),e.oxw(4).displayUpdateTemplateDialog=!0}),e.qZA(),e.TgZ(2,"button",26),e.NdJ("click",function(){const a=e.CHM(t).ngrxLet;return e.oxw(4).deleteTemplate(a)}),e.qZA()()}if(2&_){const t=o.ngrxLet;e.xp6(2),e.Q6J("ngClass",e.WLB(1,Ze,!t,t))}}function Be(_,o){if(1&_&&(e.TgZ(0,"div",15)(1,"div",16)(2,"div",17)(3,"span",18),e.SDv(4,19),e.qZA(),e._UZ(5,"input",20),e.qZA(),e.TgZ(6,"div",21)(7,"span",18),e.SDv(8,22),e.qZA(),e._UZ(9,"input",20),e.qZA()(),e.YNc(10,Qe,3,4,"div",23),e.qZA()),2&_){const t=e.oxw().ngrxLet,n=e.oxw(2);e.xp6(5),e.Q6J("disabled",!0)("value",t.title),e.xp6(4),e.Q6J("disabled",!0)("value",t.desc||"no description set"),e.xp6(1),e.Q6J("ngrxLet",n.templateNotDeletable$)}}function Je(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div",27)(1,"div",28),e._UZ(2,"i",29),e.TgZ(3,"input",30),e.NdJ("input",function(l){return e.CHM(t),e.oxw(),e.MAs(7).filterGlobal(l.target.value,"contains")}),e.qZA()(),e.TgZ(4,"button",31),e.NdJ("click",function(){return e.CHM(t),e.oxw(3).displayCreateEventTemplateDialog=!0}),e.qZA()()}}function qe(_,o){1&_&&e._UZ(0,"th",35)}function ze(_,o){if(1&_&&(e.TgZ(0,"th",36),e._uU(1),e.qZA()),2&_){const t=o.$implicit;e.xp6(1),e.hij(" ",t.header," ")}}function Xe(_,o){if(1&_&&(e.TgZ(0,"tr"),e.YNc(1,qe,1,0,"th",32),e.YNc(2,ze,2,1,"th",33),e._UZ(3,"th",34),e.qZA()),2&_){e.oxw();const t=e.MAs(7),n=e.oxw(2);e.xp6(1),e.Q6J("ngIf",(null==t.value?null:t.value.length)>1),e.xp6(1),e.Q6J("ngForOf",n.cols)}}function je(_,o){if(1&_&&(e.TgZ(0,"td",43),e._UZ(1,"span",44),e.qZA()),2&_){const t=e.oxw().rowIndex;e.xp6(1),e.Q6J("pReorderableRowHandle",t)}}function Ve(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"td",45)(1,"div")(2,"button",46),e.NdJ("click",function(){e.CHM(t);const l=e.oxw().rowIndex,a=e.oxw().ngrxLet;return e.oxw(2).move(l,a,-1)}),e.qZA(),e.TgZ(3,"button",47),e.NdJ("click",function(){e.CHM(t);const l=e.oxw().rowIndex,a=e.oxw().ngrxLet;return e.oxw(2).move(l,a,1)}),e.qZA()(),e.TgZ(4,"button",42),e.NdJ("click",function(){e.CHM(t);const l=e.oxw().$implicit;return e.oxw(3).deletableEventTemplate=l}),e.qZA()()}if(2&_){const t=e.oxw().rowIndex;e.oxw();const n=e.MAs(7);e.xp6(2),e.Q6J("disabled",0===t),e.xp6(1),e.Q6J("disabled",t===n.value.length-1)}}const Ye=function(_){return{"hide-on-smallscreen":_}};function Fe(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"tr",37),e.ALo(1,"colorClass"),e.YNc(2,je,2,1,"td",38),e.YNc(3,Ve,5,2,"td",39),e.TgZ(4,"td"),e._uU(5),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.ALo(8,"eventLabel"),e.qZA(),e.TgZ(9,"td",40),e._UZ(10,"i"),e.qZA(),e.TgZ(11,"td",41)(12,"button",42),e.NdJ("click",function(){const a=e.CHM(t).$implicit;return e.oxw(3).deletableEventTemplate=a}),e.qZA()()()}if(2&_){const t=o.$implicit,n=o.rowIndex;e.oxw();const l=e.MAs(7);e.Tol(e.lcZ(1,12,t.color)),e.Q6J("pReorderableRow",n),e.xp6(2),e.Q6J("ngIf",(null==l.value?null:l.value.length)>1),e.xp6(1),e.Q6J("ngIf",(null==l.value?null:l.value.length)>1),e.xp6(2),e.Oqu(t.name),e.xp6(2),e.Oqu(e.lcZ(8,14,t.eventType)),e.xp6(3),e.MT6("",t.icon.value," ",t.icon.styleClass,""),e.xp6(1),e.Q6J("ngClass",e.VKq(16,Ye,(null==l.value?null:l.value.length)>1))}}function He(_,o){if(1&_&&(e.TgZ(0,"tr")(1,"td",48),e.SDv(2,49),e.qZA()()),2&_){const t=e.oxw(3);e.xp6(1),e.uIk("colspan",t.cols.length+2)}}function ke(_,o){if(1&_){const t=e.EpF();e.ynx(0),e.TgZ(1,"p-panel",5),e.YNc(2,Be,11,5,"ng-template",6),e.TgZ(3,"span",7),e.SDv(4,8),e.qZA()(),e.TgZ(5,"p-panel",9)(6,"p-table",10,11),e.NdJ("onRowReorder",function(){const a=e.CHM(t).ngrxLet,E=e.MAs(7);return e.oxw(2).onRowReorder(E.value,a)}),e.YNc(8,Je,5,0,"ng-template",12),e.YNc(9,Xe,4,2,"ng-template",6),e.YNc(10,Fe,13,18,"ng-template",13),e.YNc(11,He,3,1,"ng-template",14),e.qZA()(),e.BQk()}if(2&_){const t=o.ngrxLet,n=e.oxw().ngrxLet,l=e.oxw();e.xp6(6),e.Q6J("columns",l.cols)("rowHover",!0)("reorderableColumns",!0)("value",t.eventTemplates)("loading",n)}}function Ke(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div",1),e.YNc(1,ke,12,5,"ng-container",2),e.TgZ(2,"div")(3,"el-update-template-dialog",3),e.NdJ("visibleChange",function(l){return e.CHM(t),e.oxw().displayUpdateTemplateDialog=l}),e.qZA(),e.TgZ(4,"el-delete-template-dialog",3),e.NdJ("visibleChange",function(l){return e.CHM(t),e.oxw().displayDeleteTemplateDialog=l}),e.qZA(),e.TgZ(5,"el-create-eventtemplate-dialog",3),e.NdJ("visibleChange",function(l){return e.CHM(t),e.oxw().displayCreateEventTemplateDialog=l}),e.qZA(),e.TgZ(6,"el-delete-eventtemplate-dialog",4),e.NdJ("eventTemplateChange",function(l){return e.CHM(t),e.oxw().deletableEventTemplate=l}),e.qZA()()()}if(2&_){const t=e.oxw();e.xp6(1),e.Q6J("ngrxLet",t.template$),e.xp6(2),e.Q6J("visible",t.displayUpdateTemplateDialog),e.xp6(1),e.Q6J("visible",t.displayDeleteTemplateDialog),e.xp6(1),e.Q6J("visible",t.displayCreateEventTemplateDialog),e.xp6(1),e.Q6J("eventTemplate",t.deletableEventTemplate)}}let We=(()=>{class _{constructor(t){this.store=t,this.searchTerm="",this.displayCreateEventTemplateDialog=!1,this.displayUpdateTemplateDialog=!1,this.displayDeleteTemplateDialog=!1,this.template$=this.store.pipe((0,i.Ys)(P),(0,U.h)(n=>!!n),(0,C.U)(n=>Object.assign(Object.assign({},n),{eventTemplates:[...n.eventTemplates]}))),this.templateLoading$=this.store.pipe((0,i.Ys)(Ee),(0,w.q)(2)),this.templateNotDeletable$=this.store.pipe((0,i.Ys)(W.Mc),(0,U.h)(n=>!!n),(0,u.w)(n=>this.store.pipe((0,i.Ys)(le.Vc),(0,C.U)(l=>!!(null==l?void 0:l.find(a=>a.templateId===n)))))),this.cols=[m.ih,m.P6,m.Mz]}ngOnInit(){this.store.dispatch(Z({}))}onRowReorder(t,n){this.store.dispatch(M({template:Object.assign(Object.assign({},n),{eventTemplates:t})}))}move(t,n,l){var a;if(t+l>=0&&t+l<(null===(a=n.eventTemplates)||void 0===a?void 0:a.length)){const E=n.eventTemplates[t],p=[...n.eventTemplates];p.splice(t,1),p.splice(t+l,0,E),this.onRowReorder(p,n)}}deleteTemplate(t){t?this.store.dispatch((0,v.L$)({summary:$localize`:Delete template error headline@@TemplateComponent\:deleteErrorHeadline:Can not delete template!`,detail:$localize`:Delete template error details@@TemplateComponent\:deleteErrorDetails:The template is used by a log.`})):this.displayDeleteTemplateDialog=!0}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-template"]],decls:1,vars:1,consts:function(){let o,t,n,l,a,E;return o=$localize`:Page hint@@TemplateComponent\:hint: In this view you can customize the title and description of the template. Furthermore you have the possibility to specify events that might occur during the logging process. `,t=$localize`:Table headline@@TemplateComponent\:tableHeadline:Event Templates`,n=$localize`:Title@@TemplateComponent\:title:Title`,l=$localize`:Description@@TemplateComponent\:description:Description`,a=$localize`:Search placeholder@@TemplateComponent\:seachPlaceholder:Search keyword`,E=$localize`:Empty table message@@TemplateComponent\:empty: No Event Templates found. `,[["class","grid",4,"ngrxLet"],[1,"grid"],[4,"ngrxLet"],[3,"visible","visibleChange"],[3,"eventTemplate","eventTemplateChange"],[1,"col-12"],["pTemplate","header"],[1,"flex","text-center","justify-content-center","font-light"],o,["header",t,1,"col-12"],["styleClass","p-datatable-striped","dataKey","name","breakpoint","500px",3,"columns","rowHover","reorderableColumns","value","loading","onRowReorder"],["dt",""],["pTemplate","caption"],["pTemplate","body"],["pTemplate","emptymessage"],[1,"grid","m-0","w-full"],[1,"grid","col-12","sm:col","p-0","pb-1","m-0","sm:mr-3"],[1,"p-inputgroup","col-12","pt-0","pl-0","pr-0"],[1,"p-inputgroup-addon"],n,["type","text","pInputText","",3,"disabled","value"],[1,"p-inputgroup","col-12","pb-0","pl-0","pr-0"],l,["class","col-12 sm:col-fixed flex sm:flex-column flex-row justify-content-center sm:justify-content-between p-0 mt-3 sm:mt-0",4,"ngrxLet"],[1,"col-12","sm:col-fixed","flex","sm:flex-column","flex-row","justify-content-center","sm:justify-content-between","p-0","mt-3","sm:mt-0"],["pButton","","pRipple","","icon","fas fa-edit","iconPos","right",1,"p-button-outlined","p-button-rounded","p-button-warning","mr-2","sm:mr-0",3,"click"],["pButton","","pRipple","","icon","pi pi-trash","iconPos","right",1,"p-button-outlined","p-button-rounded","p-button-danger","sm:mb-1",3,"ngClass","click"],[1,"flex","flex-wrap","table-header","sm:justify-content-between","justify-content-around"],[1,"p-inputgroup","max-w-full","sm:w-auto","m-1"],[1,"p-inputgroup-addon","pi","pi-search"],["pInputText","","type","text","placeholder",a,3,"input"],["pButton","","pRipple","","type","button","icon","pi pi-plus",1,"p-button-outlined","p-button-rounded","p-button-success","m-1",3,"click"],["class","w-3rem",4,"ngIf"],["pReorderableColumn","",4,"ngFor","ngForOf"],[1,"w-3rem","hide-on-smallscreen"],[1,"w-3rem"],["pReorderableColumn",""],["draggable","true",3,"pReorderableRow"],["class","cursor-move hide-on-smallscreen",4,"ngIf"],["class","flex flex-wrap justify-content-between hide-on-bigscreen",4,"ngIf"],[1,"text-center","w-3rem"],[1,"px-2",3,"ngClass"],["pButton","","pRipple","","icon","pi pi-times","iconPos","right",1,"p-button-rounded","p-button-danger",3,"click"],[1,"cursor-move","hide-on-smallscreen"],["draggable","true",1,"pi","pi-bars",3,"pReorderableRowHandle"],[1,"flex","flex-wrap","justify-content-between","hide-on-bigscreen"],["pButton","","pRipple","","type","button","icon","pi pi-chevron-up",1,"p-button-secondary","p-button-rounded","mr-2",3,"disabled","click"],["pButton","","pRipple","","type","button","icon","pi pi-chevron-down",1,"p-button-secondary","p-button-rounded","mr-2",3,"disabled","click"],[1,"text-center"],E]},template:function(t,n){1&t&&e.YNc(0,Ke,7,5,"div",0),2&t&&e.Q6J("ngrxLet",n.templateLoading$)},directives:[G.eJ,ee.s,L.jx,h.o,O.Hq,A.H,c.mk,S.iA,c.O5,c.sg,S.Af,S.qO,S.Mv,ce,Ce,Ue,we],pipes:[_e.z,b.bt],styles:[""]}),_})();function et(_,o){1&_&&(e.TgZ(0,"div",10)(1,"span",11),e.SDv(2,12),e.qZA()())}function tt(_,o){1&_&&(e.TgZ(0,"div",10)(1,"span",11),e.SDv(2,13),e.qZA()())}function _t(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"form",14),e.NdJ("ngSubmit",function(){return e.CHM(t),e.oxw().submit()}),e._UZ(1,"button",15),e.qZA()}if(2&_){const t=e.oxw();e.Q6J("formGroup",t.form),e.xp6(1),e.Q6J("disabled",t.form.invalid)}}let nt=(()=>{class _ extends y.M{constructor(t,n){super(),this.store=t,this.fb=n,this.abstractLogIsUniqueError=R.zO,this.form=this.fb.group({title:[null,T.kI.required],desc:null},{asyncValidators:R.mX.abstractLogIsUnique(this.store.pipe((0,i.Ys)(N.zU)))})}close(){super.close(),this.form.reset()}submit(){this.store.dispatch(B(this.form.value)),this.close()}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh),e.Y36(T.qu))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-create-template-dialog"]],features:[e.qOj],decls:13,vars:16,consts:function(){let o,t,n,l,a,E;return o=$localize`:Dialog headline@@CreateTemplateDialogComponent\:header:Add new Template`,t=$localize`:Title input label@@CreateTemplateDialogComponent\:titleLabel:Title`,n=$localize`:Description input label@@CreateTemplateDialogComponent\:descriptionLabel:Description`,l=$localize`:Title error hint@@CreateTemplateDialogComponent\:titleError:A template with this name already exists. Please choose another name.`,a=$localize`:Description error hint@@CreateTemplateDialogComponent\:descriptionError:A template with this description already exists. Please choose another description.`,E=$localize`:Add button@@CreateTemplateDialogComponent\:addButton:Add`,[["header",o,"styleClass","w-full sm:w-30rem",3,"resizable","maximizable","visible","modal","closeOnEscape","visibleChange"],[3,"formGroup"],[1,"p-float-label","mt-5","field"],["formControlName","title","pInputText","","type","text",1,"inputfield","w-full"],["for","float-input"],t,["class","w-full mt-1 px-2",4,"ngIf"],["formControlName","desc","pInputText","","type","text",1,"inputfield","w-full"],n,["pTemplate","footer"],[1,"w-full","mt-1","px-2"],[1,"p-error","text-xs"],l,a,[3,"formGroup","ngSubmit"],["pButton","","pRipple","","type","submit","icon","pi pi-plus","label",E,1,"p-button-success","p-button-text",3,"disabled"]]},template:function(t,n){1&t&&(e.TgZ(0,"p-dialog",0),e.NdJ("visibleChange",function(){return n.close()}),e.TgZ(1,"form",1)(2,"span",2),e._UZ(3,"input",3),e.TgZ(4,"label",4),e.SDv(5,5),e.qZA(),e.YNc(6,et,3,0,"div",6),e.qZA(),e.TgZ(7,"span",2),e._UZ(8,"input",7),e.TgZ(9,"label",4),e.SDv(10,8),e.qZA(),e.YNc(11,tt,3,0,"div",6),e.qZA()(),e.YNc(12,_t,2,2,"ng-template",9),e.qZA()),2&t&&(e.Q6J("resizable",!1)("maximizable",!0)("visible",n.visible)("modal",!0)("closeOnEscape",!0),e.xp6(1),e.Q6J("formGroup",n.form),e.xp6(2),e.ekj("ng-invalid",(null==n.form.errors?null:n.form.errors[n.abstractLogIsUniqueError])||!n.form.get("title").valid)("ng-valid",!(null!=n.form.errors&&n.form.errors[n.abstractLogIsUniqueError])&&n.form.get("title").valid),e.xp6(3),e.Q6J("ngIf",null==n.form.errors?null:n.form.errors[n.abstractLogIsUniqueError]),e.xp6(2),e.ekj("ng-invalid",(null==n.form.errors?null:n.form.errors[n.abstractLogIsUniqueError])||!n.form.get("desc").valid)("ng-valid",!(null!=n.form.errors&&n.form.errors[n.abstractLogIsUniqueError])&&n.form.get("desc").valid),e.xp6(3),e.Q6J("ngIf",null==n.form.errors?null:n.form.errors[n.abstractLogIsUniqueError]))},directives:[x.V,T._Y,T.JL,T.sg,T.Fj,T.JJ,T.u,h.o,c.O5,L.jx,O.Hq,A.H],styles:[""]}),_})();function ot(_,o){if(1&_){const t=e.EpF();e.TgZ(0,"div",8)(1,"div",9),e._UZ(2,"i",10),e.TgZ(3,"input",11),e.NdJ("input",function(l){return e.CHM(t),e.oxw(),e.MAs(2).filterGlobal(l.target.value,"contains")}),e.qZA()(),e.TgZ(4,"button",12),e.NdJ("click",function(){return e.CHM(t),e.oxw().displayCreateTemplateDialog=!0}),e.qZA()()}}function lt(_,o){if(1&_&&(e.TgZ(0,"th",14),e._uU(1),e._UZ(2,"p-sortIcon",15),e.qZA()),2&_){const t=o.$implicit;e.Q6J("pSortableColumn",t.field),e.xp6(1),e.hij("",t.header," "),e.xp6(1),e.Q6J("field",t.field)}}function at(_,o){if(1&_&&(e.TgZ(0,"tr"),e.YNc(1,lt,3,3,"th",13),e.qZA()),2&_){const t=o.$implicit;e.xp6(1),e.Q6J("ngForOf",t)}}const it=function(_){return[_]};function Et(_,o){if(1&_&&(e.TgZ(0,"tr",16)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.qZA(),e.TgZ(5,"td"),e._uU(6),e.ALo(7,"date"),e.qZA()()),2&_){const t=o.$implicit;e.Q6J("routerLink",e.VKq(7,it,t.id)),e.xp6(2),e.Oqu(t.title),e.xp6(2),e.Oqu(t.desc),e.xp6(2),e.Oqu(e.xi3(7,4,t.revision,"medium"))}}function pt(_,o){if(1&_&&(e.TgZ(0,"tr")(1,"td",17),e.SDv(2,18),e.qZA()()),2&_){const t=e.oxw();e.xp6(1),e.uIk("colspan",t.cols.length)}}const st=[{path:"",component:(()=>{class _{constructor(t){this.store=t,this.searchTerm="",this.displayCreateTemplateDialog=!1,this.templates$=this.store.pipe((0,i.Ys)(N.zU),(0,C.U)(n=>[...n])),this.templatesLoading$=this.store.pipe((0,i.Ys)(N.pE)),this.cols=[m.SJ,m.IB,m.pR]}}return _.\u0275fac=function(t){return new(t||_)(e.Y36(i.yh))},_.\u0275cmp=e.Xpm({type:_,selectors:[["el-templates"]],decls:10,vars:9,consts:function(){let o,t,n;return o=$localize`:Page headline@@TemplatesComponent\:header:Templates`,t=$localize`:Search placeholder@@TemplatesComponent\:seachPlaceholder:Search keyword`,n=$localize`:Empty table message@@TemplatesComponent\:empty: No Templates found. Please add at least one template. Afterwards you can create protocols. `,[["header",o],["styleClass","p-datatable-striped","dataKey","id","breakpoint","520px",3,"rowHover","columns","value","loading"],["dt",""],["pTemplate","caption"],["pTemplate","header"],["pTemplate","body"],["pTemplate","emptymessage"],[3,"visible","visibleChange"],[1,"flex","flex-wrap","table-header","sm:justify-content-between","justify-content-around"],[1,"p-inputgroup","max-w-full","sm:w-auto","m-1"],[1,"p-inputgroup-addon","pi","pi-search"],["pInputText","","type","text","placeholder",t,3,"input"],["pButton","","pRipple","","type","button","icon","pi pi-plus",1,"p-button-outlined","p-button-rounded","p-button-success","m-1",3,"click"],[3,"pSortableColumn",4,"ngFor","ngForOf"],[3,"pSortableColumn"],[3,"field"],[1,"cursor-pointer",3,"routerLink"],[1,"text-center"],n]},template:function(t,n){1&t&&(e.TgZ(0,"p-panel",0)(1,"p-table",1,2),e.ALo(3,"async"),e.ALo(4,"async"),e.YNc(5,ot,5,0,"ng-template",3),e.YNc(6,at,2,1,"ng-template",4),e.YNc(7,Et,8,9,"ng-template",5),e.YNc(8,pt,3,1,"ng-template",6),e.qZA()(),e.TgZ(9,"el-create-template-dialog",7),e.NdJ("visibleChange",function(a){return n.displayCreateTemplateDialog=a}),e.qZA()),2&t&&(e.xp6(1),e.Q6J("rowHover",!0)("columns",n.cols)("value",e.lcZ(3,5,n.templates$))("loading",e.lcZ(4,7,n.templatesLoading$)),e.xp6(8),e.Q6J("visible",n.displayCreateTemplateDialog))},directives:[ee.s,S.iA,L.jx,h.o,O.Hq,A.H,c.sg,S.lQ,S.fz,I.rH,nt],pipes:[c.Ov,c.uU],styles:[""]}),_})()},{path:":templateId",component:We}];let Tt=(()=>{class _{}return _.\u0275fac=function(t){return new(t||_)},_.\u0275mod=e.oAB({type:_}),_.\u0275inj=e.cJS({imports:[[I.Bz.forChild(st)],I.Bz]}),_})();var r=s(6991),$=s(262),Y=s(4351),g=s(9646),rt=s(813);let mt=(()=>{class _{constructor(t,n,l,a){this.store=t,this.templateService=n,this.actions$=l,this.router=a,this.loadTemplate$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(Z),(0,u.w)(E=>this.store.pipe((0,i.Ys)(W.Mc),(0,w.q)(1),(0,U.h)(p=>!(!p&&!E.id)),(0,u.w)(p=>this.templateService.loadTemplate(p||E.id).pipe((0,C.U)(D=>H({template:D})),(0,$.K)(D=>(0,g.of)(Q({error:D}))))))))),this.createTemplate$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(B),(0,Y.b)(E=>this.templateService.createTemplate(E.title,E.desc).pipe((0,C.U)(p=>f.OK({template:p})),(0,$.K)(p=>(0,g.of)(J({error:p}))))))),this.updateTemplate$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(M),(0,Y.b)(E=>this.templateService.updateTemplate(E.template).pipe((0,C.U)(p=>f.sT({template:p})),(0,$.K)(p=>(0,g.of)(q({error:p}))))))),this.deleteTemplate$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(z),(0,Y.b)(E=>this.templateService.deleteTemplate(E.template).pipe((0,C.U)(p=>f.w$({template:p})),(0,$.K)(p=>(0,g.of)(X({error:p}))))))),this.loadTemplateFailure$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(Q),(0,te.b)(()=>this.router.navigate(["templates"])),(0,u.w)(E=>(0,g.of)((0,v._N)({summary:$localize`:Template not found error@@TemplateEffects\:loadTemplateFailureHeadline:Error while loading template!`,detail:E.error}))))),this.createTemplateFailure$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(J),(0,u.w)(E=>(0,g.of)((0,v._N)({summary:$localize`:Template not created error@@TemplateEffects\:createTemplateFailureHeadline:Error while creating template!`,detail:E.error}))))),this.updateTemplateFailure$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(q),(0,u.w)(E=>(0,g.of)((0,v._N)({summary:$localize`:Template not updated error@@TemplateEffects\:updateTemplateFailureHeadline:Error while updating template!`,detail:E.error}))))),this.deleteTemplateFailure$=(0,r.GW)(()=>this.actions$.pipe((0,r.l4)(X),(0,u.w)(E=>(0,g.of)((0,v._N)({summary:$localize`:Template not deleted error@@TemplateEffects\:deleteTemplateFailureHeadline:Error while deleting template!`,detail:E.error})))))}}return _.\u0275fac=function(t){return new(t||_)(e.LFG(i.yh),e.LFG(rt.E),e.LFG(r.eX),e.LFG(I.F0))},_.\u0275prov=e.Yz7({token:_,factory:_.\u0275fac}),_})();var ct=s(3630);let dt=(()=>{class _{}return _.\u0275fac=function(t){return new(t||_)},_.\u0275mod=e.oAB({type:_}),_.\u0275inj=e.cJS({imports:[[c.ez,Tt,ct.W,i.Aw.forFeature(k,ie),r.sQ.forFeature([mt])]]}),_})()}}]);