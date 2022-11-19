import{s as e,u as l,a as t,b as a}from"./question.f2152326.js";import{s as o}from"./index.eb4e575a.js";import{d as i,p as n,g as d,r as s,u,o as r,b as p,v as c,e as m,F as g,y as f,z as h,w as y,h as b,i as _,t as q,x as V}from"./vendor.3e4d1919.js";const C=i({props:{paperid:{type:String,default:null}},data(){return{question:{paperId:"",questionType:"",questionTag:"",optionList:[]},questionTypeList:[{dictLabel:"其它",dictValue:0},{dictLabel:"单选题",dictValue:1},{dictLabel:"多选题",dictValue:2},{dictLabel:"填空题",dictValue:3},{dictLabel:"判断题",dictValue:4},{dictLabel:"简答题",dictValue:5}],questionTagList:[{dictLabel:"其它",dictValue:0},{dictLabel:"基础题",dictValue:1},{dictLabel:"提升题",dictValue:2},{dictLabel:"开放题",dictValue:3},{dictLabel:"主观题",dictValue:4},{dictLabel:"客观题",dictValue:5}],repositoryList:this.$store.getters.repositoryList,rules:{questionType:[{type:"date",required:!0,message:"试题类型不能为空",tirgger:"change"}],questionTag:[{type:"date",required:!0,message:"试题标签不能为空",tirgger:"change"}],repositoryId:[{required:!0,message:"题库归属不能为空",tirgger:"change"}],questionContent:[{required:!0,message:"试题内容不能为空",tirgger:"blur"}],isEnabled:[{required:!0,message:"请选择试题状态",trigger:"change"}]},loading:!1}},methods:{close(){this.$emit("closeCustomAddDrawer"),this.question.optionList=[]},handleAdd(){this.question.optionList.push({isRight:0,optionContent:"",analysis:""})},removeItem(e){console.log(e),this.question.optionList.splice(e,1)},saveQuestion(){this.loading=!0,console.log(this.paperid),null!==this.paperid&&""!==this.paperid||e(this.question).then((e=>{this.loading=!1,this.$message.success(e.msg),this.$emit("closeCustomAddDrawer"),this.$emit("getQuestionByPage"),this.question.optionList=[]}))}}}),w=y();n("data-v-9adad1bc");const k=m("span",null,"自定义试题内容",-1),L=b(" 保存试题 "),x=b("添加图片"),v=b("添加视频"),T=b("添加代码"),I=b("启用"),U=b("弃用"),z=m("span",null,"选项列表",-1),D=b(" 添加选项 "),Q=b("答案"),P=b("提交"),S=b("取消");d();const B=w(((e,l,t,a,o,i)=>{const n=s("el-button"),d=s("el-option"),y=s("el-select"),b=s("el-form-item"),_=s("el-col"),q=s("el-input"),V=s("el-radio"),C=s("el-radio-group"),B=s("el-input-number"),A=s("el-row"),E=s("el-card"),$=s("el-checkbox"),N=s("el-table-column"),R=s("el-table"),j=s("el-form"),G=u("loading");return r(),p("div",null,[c(m(j,{ref:"form",model:e.question,rules:e.rules,"label-width":"80px",class:"demo-ruleForm"},{default:w((()=>[m(E,null,{header:w((()=>[k,m(n,{style:{float:"right",padding:"3px 10px"},class:"filter-item",type:"text",icon:"el-icon-refresh",onClick:e.saveQuestion},{default:w((()=>[L])),_:1},8,["onClick"])])),default:w((()=>[m(A,{gutter:20},{default:w((()=>[m(_,{span:12},{default:w((()=>[m(b,{label:"试题类型",prop:"questionType"},{default:w((()=>[m(y,{modelValue:e.question.questionType,"onUpdate:modelValue":l[1]||(l[1]=l=>e.question.questionType=l),placeholder:"请选择试题类型",clearable:"",filterable:""},{default:w((()=>[(r(!0),p(g,null,f(e.questionTypeList,(e=>(r(),p(d,{key:e.dictValue,label:e.dictLabel,value:e.dictValue},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(_,{span:12},{default:w((()=>[m(b,{label:"试题标签",prop:"questionTag"},{default:w((()=>[m(y,{modelValue:e.question.questionTag,"onUpdate:modelValue":l[2]||(l[2]=l=>e.question.questionTag=l),placeholder:"请选择试题标签",clearable:"",filterable:""},{default:w((()=>[(r(!0),p(g,null,f(e.questionTagList,(e=>(r(),p(d,{key:e.dictValue,label:e.dictLabel,value:e.dictValue},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(_,{span:12},{default:w((()=>[m(b,{label:"题库归属",prop:"repositoryId"},{default:w((()=>[m(y,{modelValue:e.question.repositoryId,"onUpdate:modelValue":l[3]||(l[3]=l=>e.question.repositoryId=l),placeholder:"请选择所属题库",clearable:"",filterable:""},{default:w((()=>[(r(!0),p(g,null,f(e.$store.getters.repositoryList,(e=>(r(),p(d,{key:e.repositoryId,label:e.repositoryName,value:e.repositoryId},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(_,{span:12},{default:w((()=>[m(b,{label:"试题备注"},{default:w((()=>[m(q,{modelValue:e.question.remark,"onUpdate:modelValue":l[4]||(l[4]=l=>e.question.remark=l),placeholder:"请输入试题备注"},null,8,["modelValue"])])),_:1})])),_:1}),m(_,{span:24},{default:w((()=>[m(b,{label:"试题内容",prop:"questionContent"},{default:w((()=>[m(q,{modelValue:e.question.questionContent,"onUpdate:modelValue":l[5]||(l[5]=l=>e.question.questionContent=l),type:"textarea",rows:4,placeholder:"请输入试题内容"},null,8,["modelValue"])])),_:1})])),_:1}),m(_,{span:14},{default:w((()=>[m(b,{label:"内容扩展"},{default:w((()=>[m(n,{size:"mini"},{default:w((()=>[x])),_:1}),m(n,{size:"mini"},{default:w((()=>[v])),_:1}),m(n,{size:"mini"},{default:w((()=>[T])),_:1})])),_:1})])),_:1}),m(_,{span:10},{default:w((()=>[m(b,{label:"试题状态",prop:"isEnabled"},{default:w((()=>[m(C,{modelValue:e.question.isEnabled,"onUpdate:modelValue":l[6]||(l[6]=l=>e.question.isEnabled=l)},{default:w((()=>[m(V,{label:1},{default:w((()=>[I])),_:1}),m(V,{label:0},{default:w((()=>[U])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(_,{span:12},{default:w((()=>[c(m(b,{label:"试题排序"},{default:w((()=>[m(B,{modelValue:e.question.questionSort,"onUpdate:modelValue":l[7]||(l[7]=l=>e.question.questionSort=l),min:0,max:9999,placeholder:"请输入试题排序"},null,8,["modelValue"])])),_:1},512),[[h,null!==e.paperid]])])),_:1}),m(_,{span:12},{default:w((()=>[c(m(b,{label:"试题分值"},{default:w((()=>[m(q,{modelValue:e.question.questionScore,"onUpdate:modelValue":l[8]||(l[8]=l=>e.question.questionScore=l),placeholder:"请输入试题分值"},null,8,["modelValue"])])),_:1},512),[[h,null!==e.paperid]])])),_:1}),m(_,{span:24},{default:w((()=>[m(b,{label:"试题分析"},{default:w((()=>[m(q,{modelValue:e.question.anaylsis,"onUpdate:modelValue":l[9]||(l[9]=l=>e.question.anaylsis=l),type:"textarea",rows:2,placeholder:"请输入试题分析"},null,8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1}),m(E,null,{header:w((()=>[z,m(n,{style:{float:"right",padding:"3px 10px"},class:"filter-item",type:"text",icon:"el-icon-plus",onClick:e.handleAdd},{default:w((()=>[D])),_:1},8,["onClick"])])),default:w((()=>[m(R,{data:e.question.optionList,border:!0,style:{width:"100%"}},{default:w((()=>[m(N,{label:"是否答案",width:"120",align:"center"},{default:w((({row:e})=>[m($,{modelValue:e.isRight,"onUpdate:modelValue":l=>e.isRight=l,"true-label":1,"false-label":0,checked:1===e.isRight},{default:w((()=>[Q])),_:2},1032,["modelValue","onUpdate:modelValue","checked"])])),_:1}),m(N,{label:"选项内容"},{default:w((({row:e})=>[m(q,{modelValue:e.optionContent,"onUpdate:modelValue":l=>e.optionContent=l,type:"textarea",rows:2},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(N,{label:"选项解析"},{default:w((({row:e})=>[m(q,{modelValue:e.analysis,"onUpdate:modelValue":l=>e.analysis=l,type:"textarea",rows:2},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(N,{label:"操作",align:"center",width:"100px"},{default:w((({row:l})=>[m(n,{type:"danger",icon:"el-icon-delete",size:"mini",circle:"",onClick:t=>e.removeItem(l.$index)},null,8,["onClick"])])),_:1})])),_:1},8,["data"])])),_:1}),m(A,{gutter:20,type:"flex",justify:"center"},{default:w((()=>[m(_,{span:12},{default:w((()=>[m(b,null,{default:w((()=>[m(n,{type:"primary",onClick:e.saveQuestion},{default:w((()=>[P])),_:1},8,["onClick"]),m(n,{onClick:e.close},{default:w((()=>[S])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model","rules"]),[[G,e.loading]])])}));C.render=B,C.__scopeId="data-v-9adad1bc";var A=i({props:{question:{type:Object,default:null},paperid:{type:String,default:null}},data(){return{questionVo:this.question,repositoryList:o.getters.repositoryList,questionTypeList:[{dictLabel:"其它",dictValue:0},{dictLabel:"单选题",dictValue:1},{dictLabel:"多选题",dictValue:2},{dictLabel:"填空题",dictValue:3},{dictLabel:"判断题",dictValue:4},{dictLabel:"简答题",dictValue:5}],questionTagList:[{dictLabel:"其它",dictValue:0},{dictLabel:"基础题",dictValue:1},{dictLabel:"提升题",dictValue:2},{dictLabel:"开放题",dictValue:3},{dictLabel:"主观题",dictValue:4},{dictLabel:"客观题",dictValue:5}],rules:{questionTypeId:[{type:"date",required:!0,message:"试题类型不能为空",tirgger:"blur"}],questionTagId:[{type:"date",required:!0,message:"试题标签不能为空",tirgger:"blur"}],repositoryId:[{required:!0,message:"题库归属不能为空",tirgger:"blur"}],questionContent:[{required:!0,message:"试题内容不能为空",tirgger:"blur"}],isEnabled:[{required:!0,message:"请选择试题状态",trigger:"change"}]},loading:!1}},watch:{question:function(){this.questionVo=this.question}},methods:{saveQuestionVo(){this.loading=!0,console.log(this.paperid),null!==this.paperid&&""!==this.paperid||l(this.questionVo).then((e=>{console.log("修改了试题!"),this.$emit("closeUpdateDrawer"),this.$emit("getQuestionByPage")}))},handleAdd(){this.questionVo.optionList.push({isRight:0,optionContent:"",analysis:""})},removeItem(e){this.questionVo.optionList.splice(e,1)},close(){this.$emit("closeUpdateDrawer")}}});const E=m("span",null,"试题信息",-1),$=b("更新试题"),N=b("返回列表"),R=b("添加图片"),j=b("添加视频"),G=b("添加代码"),M=b("启用"),F=b("弃用"),O=m("span",null,"选项信息",-1),H=b(" 更新选项 "),J=b(" 添加选项 "),K=b("选项"),W=b("提交"),X=b("取消");A.render=function(e,l,t,a,o,i){const n=s("el-button"),d=s("el-option"),h=s("el-select"),y=s("el-form-item"),b=s("el-col"),q=s("el-input"),V=s("el-radio"),C=s("el-radio-group"),w=s("el-row"),k=s("el-card"),L=s("el-checkbox"),x=s("el-table-column"),v=s("el-table"),T=s("el-form"),I=u("loading");return r(),p("div",null,[c(m(T,{ref:"form",model:e.questionVo,"label-position":"left","label-width":"80px"},{default:_((()=>[m(k,{class:"box-card"},{header:_((()=>[E,m(n,{style:{float:"right",padding:"3px 0","margin-left":"20px"},icon:"el-icon-refresh",type:"text"},{default:_((()=>[$])),_:1}),m(n,{onClick:e.close,type:"text",style:{float:"right",padding:"3px 0"},icon:"el-icon-back"},{default:_((()=>[N])),_:1},8,["onClick"])])),default:_((()=>[m(w,{gutter:20},{default:_((()=>[m(b,{span:12},{default:_((()=>[m(y,{label:"试题类型",prop:"questionTypeId"},{default:_((()=>[m(h,{modelValue:e.questionVo.questionType,"onUpdate:modelValue":l[1]||(l[1]=l=>e.questionVo.questionType=l),placeholder:"请选择试题类型",clearable:"",filterable:""},{default:_((()=>[(r(!0),p(g,null,f(e.questionTypeList,(e=>(r(),p(d,{key:e.dictValue,label:e.dictLabel,value:e.dictValue},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(b,{span:12},{default:_((()=>[m(y,{label:"试题标签",prop:"questionTagId"},{default:_((()=>[m(h,{modelValue:e.questionVo.questionTag,"onUpdate:modelValue":l[2]||(l[2]=l=>e.questionVo.questionTag=l),placeholder:"请选择试题标签",clearable:"",filterable:""},{default:_((()=>[(r(!0),p(g,null,f(e.questionTagList,(e=>(r(),p(d,{key:e.dictValue,label:e.dictLabel,value:e.dictValue},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(b,{span:12},{default:_((()=>[m(y,{label:"题库归属",prop:"repositoryId"},{default:_((()=>[m(h,{disabled:"",modelValue:e.questionVo.repositoryId,"onUpdate:modelValue":l[3]||(l[3]=l=>e.questionVo.repositoryId=l),placeholder:"请选择所属题库",clearable:"",filterable:""},{default:_((()=>[(r(!0),p(g,null,f(e.repositoryList,(e=>(r(),p(d,{key:e.repositoryId,label:e.repositoryName,value:e.repositoryId},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1})])),_:1}),m(b,{span:12},{default:_((()=>[m(y,{label:"试题备注"},{default:_((()=>[m(q,{modelValue:e.questionVo.remark,"onUpdate:modelValue":l[4]||(l[4]=l=>e.questionVo.remark=l),placeholder:"请输入题库备注"},null,8,["modelValue"])])),_:1})])),_:1}),m(b,{span:24},{default:_((()=>[m(y,{label:"试题内容",prop:"questionContent"},{default:_((()=>[m(q,{modelValue:e.questionVo.questionContent,"onUpdate:modelValue":l[5]||(l[5]=l=>e.questionVo.questionContent=l),type:"textarea",placeholder:"请输入题库内容"},null,8,["modelValue"])])),_:1})])),_:1}),m(b,{span:14},{default:_((()=>[m(y,{label:"内容扩展"},{default:_((()=>[m(n,{size:"mini"},{default:_((()=>[R])),_:1}),m(n,{size:"mini"},{default:_((()=>[j])),_:1}),m(n,{size:"mini"},{default:_((()=>[G])),_:1})])),_:1})])),_:1}),m(b,{span:10},{default:_((()=>[m(y,{label:"试题状态",prop:"isEnabled"},{default:_((()=>[m(C,{modelValue:e.question.isEnabled,"onUpdate:modelValue":l[6]||(l[6]=l=>e.question.isEnabled=l)},{default:_((()=>[m(V,{label:1},{default:_((()=>[M])),_:1}),m(V,{label:0},{default:_((()=>[F])),_:1})])),_:1},8,["modelValue"])])),_:1})])),_:1})])),_:1})])),_:1}),m(k,{class:"box-card"},{header:_((()=>[O,m(n,{style:{float:"right",padding:"3px 0","margin-left":"20px"},icon:"el-icon-refresh",type:"text"},{default:_((()=>[H])),_:1}),m(n,{style:{float:"right",padding:"3px 0"},type:"text",icon:"el-icon-plus",onClick:e.handleAdd},{default:_((()=>[J])),_:1},8,["onClick"])])),default:_((()=>[m(v,{data:e.questionVo.optionList,border:!0,style:{width:"100%"}},{default:_((()=>[m(x,{label:"是否答案",width:"120",align:"center"},{default:_((({row:e})=>[m(L,{modelValue:e.isRight,"onUpdate:modelValue":l=>e.isRight=l,"true-label":"1","false-label":"0",checked:1===e.isRight},{default:_((()=>[K])),_:2},1032,["modelValue","onUpdate:modelValue","checked"])])),_:1}),m(x,{label:"选项内容"},{default:_((({row:e})=>[m(q,{modelValue:e.optionContent,"onUpdate:modelValue":l=>e.optionContent=l,type:"textarea",rows:1},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(x,{label:"选项解析"},{default:_((({row:e})=>[m(q,{modelValue:e.analysis,"onUpdate:modelValue":l=>e.analysis=l,type:"textarea",rows:1},null,8,["modelValue","onUpdate:modelValue"])])),_:1}),m(x,{label:"操作",align:"center",width:"100px"},{default:_((()=>[m(n,{type:"danger",icon:"el-icon-delete",size:"mini",circle:""})])),_:1})])),_:1},8,["data"])])),_:1}),m(w,{gutter:20,type:"flex",justify:"center"},{default:_((()=>[m(b,{span:12},{default:_((()=>[m(y,null,{default:_((()=>[m(n,{type:"primary",onClick:e.saveQuestionVo},{default:_((()=>[W])),_:1},8,["onClick"]),m(n,{onClick:e.close},{default:_((()=>[X])),_:1},8,["onClick"])])),_:1})])),_:1})])),_:1})])),_:1},8,["model"]),[[I,e.loading]])])};var Y=i({components:{QuestionAdd:C,QuestionUpdate:A},data:()=>({question:{},page:{currentPage:1,pageSize:20,totalPage:0,totalCount:0,params:{questionContent:void 0,questionTime:void 0,repositoryId:void 0},list:[],sortColumn:"createdTime",sortMethod:"asc"},repositoryList:[{repositoryId:0,repositoryName:"xxx"},{repositoryId:1,repositoryName:"aaa"}],ids:[],single:!0,multiple:!0,selectQuestions:[],loading:!0,addDrawer:!1,updateDrawer:!1}),mounted(){this.repositoryList=o.getters.repositoryList},created(){this.getQuestionByPage()},methods:{getQuestionByPage(){t(this.page).then((e=>{this.page=e.data,this.loading=!1}))},search(){this.page.currentPage=1,this.getQuestionByPage()},refresh(){this.page.currentPage=1,this.page.params.questionContent=void 0,this.page.params.questionTime=void 0,this.page.params.repositoryId=void 0,this.getQuestionByPage()},handleSizeChange(e){this.page.pageSize=e,this.getQuestionByPage()},handleCurrentChange(e){this.page.currentPage=e,this.getQuestionByPage()},changeSort(e){e.order?(this.page.sortColumn=e.prop,this.page.sortMethod=e.order):(this.page.sortColumn="",this.page.sortMethod="asc"),this.getQuestionByPage()},handleSelectionChange(e){this.selectQuestions=e.map((e=>e.questionId)),this.single=1!==e.length,this.multiple=!e.length},openCustomAddDrawer(){this.addDrawer=!0},openUpdateDrawer(e){var l=e.questionId;void 0===l&&(l=this.selectQuestions[0]),a(l).then((e=>{this.question=e.data,this.updateDrawer=!0}))},closeCustomAddDrawer(){this.addDrawer=!1},closeUpdateDrawer(){this.updateDrawer=!1}}});const Z=y();n("data-v-40ed124d");const ee=b("查询"),le=b("恢复"),te=b("新增"),ae=b(">修改"),oe=b("删除"),ie=b("其它"),ne=b("单选题"),de=b("多选题"),se=b("填空题"),ue=b("判断题"),re=b("简答题"),pe=b("其它"),ce=b("基础题"),me=b("提升题"),ge=b("主观题"),fe=b("客观题"),he=b("启用"),ye=b("弃用"),be=b("修改"),_e=b("启用"),qe=b("弃用"),Ve=b("删除");d();const Ce=Z(((e,l,t,a,o,i)=>{const n=s("el-input"),d=s("el-form-item"),h=s("el-option"),y=s("el-select"),b=s("el-button"),_=s("el-form"),C=s("el-col"),w=s("el-row"),k=s("el-table-column"),L=s("router-link"),x=s("el-tag"),v=s("el-table"),T=s("el-pagination"),I=s("question-add"),U=s("el-drawer"),z=s("question-update"),D=u("loading");return r(),p("div",null,[m(_,{inline:!0,model:e.page,class:"demo-form-inline",size:"mini"},{default:Z((()=>[m(d,{label:"试题内容"},{default:Z((()=>[m(n,{modelValue:e.page.params.questionContent,"onUpdate:modelValue":l[1]||(l[1]=l=>e.page.params.questionContent=l),placeholder:"请输入试题名称",clearable:""},null,8,["modelValue"])])),_:1}),m(d,{label:"题库归属",prop:"repositoryId"},{default:Z((()=>[m(y,{modelValue:e.page.params.repositoryId,"onUpdate:modelValue":l[2]||(l[2]=l=>e.page.params.repositoryId=l),placeholder:"请选择所属题库",clearable:"",filterable:""},{default:Z((()=>[(r(!0),p(g,null,f(e.repositoryList,(e=>(r(),p(h,{key:e.repositoryId,label:e.repositoryName,value:e.repositoryId},null,8,["label","value"])))),128))])),_:1},8,["modelValue"])])),_:1}),m(d,null,{default:Z((()=>[m(b,{type:"primary",icon:"el-icon-search",sizi:"mini",onClick:e.search},{default:Z((()=>[ee])),_:1},8,["onClick"]),m(b,{type:"success",icon:"el-icon-refresh-left",size:"mini",onClick:e.refresh},{default:Z((()=>[le])),_:1},8,["onClick"])])),_:1})])),_:1},8,["model"]),m(w,{gutter:10,style:{"margin-bottom":"8px"}},{default:Z((()=>[m(C,{span:1.5},{default:Z((()=>[m(b,{type:"primary",icon:"el-icon-plus",size:"mini",onClick:e.openCustomAddDrawer},{default:Z((()=>[te])),_:1},8,["onClick"])])),_:1},8,["span"]),m(C,{span:1.5},{default:Z((()=>[m(b,{type:"success",icon:"el-icon-edit",size:"mini",disabled:e.single,onClick:e.openUpdateDrawer},{default:Z((()=>[ae])),_:1},8,["disabled","onClick"])])),_:1},8,["span"]),m(C,{span:1.5},{default:Z((()=>[m(b,{type:"danger",icon:"el-icon-delete",size:"mini",disabled:e.multiple},{default:Z((()=>[oe])),_:1},8,["disabled"])])),_:1},8,["span"])])),_:1}),c(m(v,{data:e.page.list,border:"",fit:"",style:{width:"100%"},"header-cell-style":{background:"#eef1f6",color:"#606266"},"row-style":{cursor:"pointer"},onSelectionChange:e.handleSelectionChange,onSortChange:e.changeSort},{default:Z((()=>[m(k,{type:"expand"},{default:Z((({row:e})=>[m(_,{"label-position":"left",inline:"",class:"demo-table-expand"},{default:Z((()=>[m(d,{label:"试题内容"},{default:Z((()=>[m("span",null,q(e.questionContent),1)])),_:2},1024),m(d,{label:"试题图片"},{default:Z((()=>[m("span",null,q(e.questionImage),1)])),_:2},1024),m(d,{label:"试题视频"},{default:Z((()=>[m("span",null,q(e.questionVideo),1)])),_:2},1024),m(d,{label:"试题代码"},{default:Z((()=>[m("span",null,q(e.questionCode),1)])),_:2},1024),m(d,{label:"创建者"},{default:Z((()=>[m("span",null,q(e.creatorName),1)])),_:2},1024),m(d,{label:"更新者"},{default:Z((()=>[m("span",null,q(e.updaterName),1)])),_:2},1024),m(d,{label:"备注"},{default:Z((()=>[m("span",null,q(e.remark),1)])),_:2},1024),m(d,{label:"归属题库"},{default:Z((()=>[m("span",null,q(e.repositoryName),1)])),_:2},1024)])),_:2},1024)])),_:1}),m(k,{type:"selection",width:"50",align:"center"}),m(k,{prop:"questionId",label:"试题编号",align:"center","show-overflow-tooltip":""}),m(k,{label:"试题内容",prop:"questionContent","min-width":"300",align:"left","show-overflow-tooltip":""},{default:Z((({row:e})=>[m(L,{to:"questionInfo/"+e.questionId,class:"link-type"},{default:Z((()=>[m("span",null,q(e.questionContent),1)])),_:2},1032,["to"])])),_:1}),m(k,{prop:"questionTypeId",label:"试题类型","min-width":"100",align:"center"},{default:Z((({row:e})=>[0===e.questionTypeId?(r(),p(x,{key:0,type:"info"},{default:Z((()=>[ie])),_:1})):1===e.questionType?(r(),p(x,{key:1,type:"success"},{default:Z((()=>[ne])),_:1})):2===e.questionType?(r(),p(x,{key:2},{default:Z((()=>[de])),_:1})):3===e.questionType?(r(),p(x,{key:3,type:"warning"},{default:Z((()=>[se])),_:1})):4===e.questionType?(r(),p(x,{key:4,type:"danger"},{default:Z((()=>[ue])),_:1})):5===e.questionType?(r(),p(x,{key:5,type:"success"},{default:Z((()=>[re])),_:1})):V("",!0)])),_:1}),m(k,{prop:"questionTagId",label:"试题标签","min-width":"100",align:"center"},{default:Z((({row:e})=>[0===e.questionTagId?(r(),p(x,{key:0},{default:Z((()=>[pe])),_:1})):1===e.questionTag?(r(),p(x,{key:1},{default:Z((()=>[ce])),_:1})):2===e.questionTag?(r(),p(x,{key:2,type:"danger"},{default:Z((()=>[me])),_:1})):3===e.questionTag?(r(),p(x,{key:3,type:"warning"},{default:Z((()=>[ge])),_:1})):4===e.questionTag?(r(),p(x,{key:4,type:"success"},{default:Z((()=>[fe])),_:1})):V("",!0)])),_:1}),m(k,{prop:"createdTime",label:"创建时间","min-width":"180",align:"center",sortable:"custom"}),m(k,{prop:"isEnable",label:"状态","min-width":"80",align:"center"},{default:Z((({row:e})=>[1===e.isEnabled?(r(),p(x,{key:0},{default:Z((()=>[he])),_:1})):(r(),p(x,{key:1,type:"info"},{default:Z((()=>[ye])),_:1}))])),_:1}),m(k,{label:"操作","min-width":"200",align:"center"},{default:Z((({row:l})=>[m(b,{type:"text",size:"mini",icon:"el-icon-edit",onClick:t=>e.openUpdateDrawer(l)},{default:Z((()=>[be])),_:2},1032,["onClick"]),0===l.isEnabled?(r(),p(b,{key:0,type:"text",icon:"el-icon-check",size:"mini"},{default:Z((()=>[_e])),_:1})):V("",!0),1===l.isEnabled?(r(),p(b,{key:1,type:"text",icon:"el-icon-close",size:"mini"},{default:Z((()=>[qe])),_:1})):V("",!0),m(b,{type:"text",size:"mini",icon:"el-icon-delete"},{default:Z((()=>[Ve])),_:1})])),_:1})])),_:1},8,["data","onSelectionChange","onSortChange"]),[[D,e.loading]]),m(T,{align:"center",class:"pagination","current-page":e.page.currentPage,"page-sizes":[5,10,20,50],"page-size":e.page.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.page.totalCount,onSizeChange:e.handleSizeChange,onCurrentChange:e.handleCurrentChange},null,8,["current-page","page-size","total","onSizeChange","onCurrentChange"]),m(U,{"with-header":!1,title:"添加试题",modelValue:e.addDrawer,"onUpdate:modelValue":l[3]||(l[3]=l=>e.addDrawer=l),size:"50%"},{default:Z((()=>[m(I,{onCloseCustomAddDrawer:e.closeCustomAddDrawer,onGetQuestionByPage:e.getQuestionByPage},null,8,["onCloseCustomAddDrawer","onGetQuestionByPage"])])),_:1},8,["modelValue"]),m(U,{"with-header":!1,title:"修改试题",modelValue:e.updateDrawer,"onUpdate:modelValue":l[4]||(l[4]=l=>e.updateDrawer=l),size:"50%"},{default:Z((()=>[m(z,{question:e.question,onCloseUpdateDrawer:e.closeUpdateDrawer,onGetQuestionByPage:e.getQuestionByPage},null,8,["question","onCloseUpdateDrawer","onGetQuestionByPage"])])),_:1},8,["modelValue"])])}));Y.render=Ce,Y.__scopeId="data-v-40ed124d";export default Y;
