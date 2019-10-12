<template>
<!-- 路面平整度模板 -->
    <div link='blue' vlink='purple' class="lmpzdmb">

<table  v-if="!isxq"  border='0' cellpadding='0' cellspacing='0' width='876' style='border-collapse: 
 collapse;table-layout:fixed;width:657pt;margin:100px auto;'>
 <col class='x21' width='117' style='mso-width-source:userset;width:87.75pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='120' style='mso-width-source:userset;width:90pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='116' style='mso-width-source:userset;width:87pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='115' style='mso-width-source:userset;width:86.25pt'>
 <col width='102' style='mso-width-source:userset;width:76.5pt'>
 <tr height='26' style='mso-height-source:userset;height:19.8pt' id='r0'>
<td colspan='8' height='24' class='x24' width='876' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:18.3pt;'>行驶质量 RQI</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r1'>
<td height='16' class='x22' style='height:12.3pt;'>路线编号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.lxbh"></div></td>
<td class='x22'>起点桩号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td class='x22'>止点桩号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.zdzh"></div></td>
<td class='x22'>行车方向</td>
<td class='x22'><div size="mini" type="text" v-text="formData.xcfx"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r2'>
<td height='16' class='x22' style='height:12.3pt;'>检测日期</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcrq"></div></td>
<td class='x22'>检测设备</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcsb"></div></td>
<td class='x22'>检测人员</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcry"></div></td>
<td class='x22'>检查车道</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jccd"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r3'>
<td height='16' class='x22' style='height:12.3pt;'>IRI1</td>
<td class='x22'><el-input :style="isNaN(formData.jcd1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd1"></el-input></td>
<td height='16' class='x22' style='height:12.3pt;'>IRI2</td>
<td class='x22'><el-input :style="isNaN(formData.jcd2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd2"></el-input></td>
<td class='x22'>IRI3</td>
<td class='x22'><el-input :style="isNaN(formData.jcd3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd3"></el-input></td>
<td class='x22'>IRI4</td>
<td class='x22'><el-input :style="isNaN(formData.jcd4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd4"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
<td height='16' class='x22' style='height:12.3pt;'>IRI5</td>
<td class='x22'><el-input :style="isNaN(formData.jcd5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd5"></el-input></td>
<td class='x22'>IRI6</td>
<td class='x22'><el-input :style="isNaN(formData.jcd6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd6"></el-input></td>
<td class='x22'>IRI7</td>
<td class='x22'><el-input :style="isNaN(formData.jcd7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd7"></el-input></td>
<td class='x22'>IRI8</td>
<td class='x23'><el-input :style="isNaN(formData.jcd8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd8"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
<td height='16' class='x22' style='height:12.3pt;'>IRI9</td>
<td class='x22'><el-input :style="isNaN(formData.jcd9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd9"></el-input></td>
<td class='x22'>IRI10</td>
<td class='x22'><el-input :style="isNaN(formData.jcd10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.jcd10"></el-input></td>
<td class='x22'>IRI平均值</td>
<td class='x25'><el-input :style="isNaN(formData.lmpzd)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.lmpzd"></el-input></td>
<td class='x22'></td>
<td class='x25'></td>
 </tr>

</table>

<table  v-if="isxq"  border='0' cellpadding='0' cellspacing='0' width='876' style='border-collapse: 
 collapse;table-layout:fixed;width:657pt;margin:100px auto;'>
 <col class='x21' width='117' style='mso-width-source:userset;width:87.75pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='120' style='mso-width-source:userset;width:90pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='116' style='mso-width-source:userset;width:87pt'>
 <col class='x21' width='102' style='mso-width-source:userset;width:76.5pt'>
 <col class='x21' width='115' style='mso-width-source:userset;width:86.25pt'>
 <col width='102' style='mso-width-source:userset;width:76.5pt'>
 <tr height='26' style='mso-height-source:userset;height:19.8pt' id='r0'>
<td colspan='8' height='24' class='x24' width='876' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:18.3pt;'>行驶质量 RQI</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r1'>
<td height='16' class='x22' style='height:12.3pt;'>路线编号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.lxbh"></div></td>
<td class='x22'>起点桩号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td class='x22'>止点桩号</td>
<td class='x22'><div size="mini" type="text" v-text="formData.zdzh"></div></td>
<td class='x22'>行车方向</td>
<td class='x22'><div size="mini" type="text" v-text="formData.xcfx"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r2'>
<td height='16' class='x22' style='height:12.3pt;'>检测日期</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcrq"></div></td>
<td class='x22'>检测设备</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcsb"></div></td>
<td class='x22'>检测人员</td>
<td class='x23'><div size="mini" type="text" v-text="formData.jcry"></div></td>
<td class='x22'>检查车道</td>
<td class='x23'><div size="mini" type="text" v-text="formData.jccd"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r3'>
<td height='16' class='x22' style='height:12.3pt;'>IRI1</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd1"></div></td>
<td height='16' class='x22' style='height:12.3pt;'>IRI2</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd2"></div></td>
<td class='x22'>IRI3</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd3"></div></td>
<td class='x22'>IRI4</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd4"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
<td height='16' class='x22' style='height:12.3pt;'>IRI5</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd5"></div></td>
<td class='x22'>IRI6</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd6"></div></td>
<td class='x22'>IRI7</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd7"></div></td>
<td class='x22'>IRI8</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd8"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
<td height='16' class='x22' style='height:12.3pt;'>IRI9</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd9"></div></td>
<td class='x22'>IRI10</td>
<td class='x22'><div size="mini" type="text" v-text="formData.jcd10"></div></td>
<td class='x22'>IRI平均值</td>
<td class='x22'><div size="mini" type="text" v-text="formData.lmpzd"></div></td>
<td class='x22'></td>
<td class='x25'></td>
 </tr>

</table>
<div class="footer dialog_footer">
    <el-button v-if="!isxq" size="small" type="primary"  class="dialog-button bao_cun" @click="submit">确定</el-button>
    <el-button v-if="!isxq" size="small"   class="dialog-button qu_xiao" @click="goback">取消</el-button>
</div>
</div>
</template>

<script>
export default {
    props:['data'],
    data ()
    {
        return {
            isxq:'',
            formData:{
                lxbh:'',
                qdzh:'',
                zdzh:'',
                xcfx:'',
                jcrq:'',
                jcsb:'',
                lmpzd:'',
                jcry:'',
                jcd1:'',
                jcd2:'',
                jcd3:'',
                jcd4:'',
                jcd5:'',
                jcd6:'',
                jcd7:'',
                jcd8:'',
                jcd9:'',
                jcd10:'',
                zhi:'',
            }

        }
    },
    created(){
        this.isxq=this.data.isxq
        this.formData.jccd=this.data.jccd
        this.formData.lxbh=this.data.lxbm
        this.formData.qdzh=this.data.qdzh
        this.formData.zdzh=this.data.zdzh
        this.formData.xcfx=this.data.fx
        this.formData.jcrq=this.data.jcrq
        this.formData.jcsb=this.data.jcsb
        this.formData.lmpzd=this.data.iri
        this.formData.jcry=this.data.jlry
        this.formData.jcd1=this.data.jcd1
        this.formData.jcd2=this.data.jcd2
        this.formData.jcd3=this.data.jcd3
        this.formData.jcd4=this.data.jcd4
        this.formData.jcd5=this.data.jcd5
        this.formData.jcd6=this.data.jcd6
        this.formData.jcd7=this.data.jcd7
        this.formData.jcd8=this.data.jcd8
        this.formData.jcd9=this.data.jcd9
        this.formData.jcd10=this.data.jcd10
        this.formData.zhi=this.data.zhi
        this.formData.jcid=this.data.jcid
    },
    methods: {
    goback(){
     this.$emit('childByValue', 'false')
    },
    submit(){
    let flag=true
         this.formData.mx=this.formData.dataArr
    if(isNaN(this.formData.jcd1)){
      flag =false
      }
      if(isNaN(this.formData.jcd2)){
        flag =false
      }
      if(isNaN(this.formData.jcd3)){
        flag =false
      }
      if(isNaN(this.formData.jcd4)){
         flag =false
      }
      if(isNaN(this.formData.jcd5)){
       flag =false
      }
      if(isNaN(this.formData.jcd6)){
        flag =false
      }
      if(isNaN(this.formData.jcd7)){
        flag =false
      }
      if(isNaN(this.formData.jcd8)){
      flag =false
      }
      if(isNaN(this.formData.jcd9)){
         flag =false
      }
      if(isNaN(this.formData.jcd10)){
    flag =false
      }
      if(isNaN(this.formData.lmpzd)){
        flag =false
      }
     if(!flag){
     this.$message({
            message: '存在非法数据',
            type: 'error'
          }) 
      return
    }
    this.formData.iri=this.formData.lmpzd
    this.$api.editRqiList(this.formData).then(resp => {
        if (resp.data.code != 1) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else if (resp.data.code === 1) {
        this.$emit('editOk', 'false')
        }
      }).catch(e => {
      })
    }
    }
}
</script>
<style lang="scss" scoped>
.footer{
    height: 100px;
    text-align: center;
    line-height: 100px;
}
@page
 {
 mso-header-data:"";
 mso-footer-data:"";
 margin:0.75in 0.7in 0.75in 0.7in;
 mso-header-margin:0.3in;
 mso-footer-margin:0.3in;
 mso-page-orientation:Portrait;
 }
tr
 {mso-height-source:auto;
 mso-ruby-visibility:none;}
col
 {mso-width-source:auto;
 mso-ruby-visibility:none;}
br
 {mso-data-placement:same-cell;}
ruby
 {ruby-align:left;}
.style0
 {
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border:none;
 mso-protection:locked visible;
 mso-style-name:Normal;
 mso-style-id:0;}
.font0
 {
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif"; }
.font1
 {
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif"; }
.font2
 {
 color:#000000;
 font-size:9pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","monospace"; }
td
 {mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border:none;
 mso-protection:locked visible;
 mso-ignore:padding;}
.style0
 {
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Normal";
 }
.style1
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style2
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style3
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style4
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style5
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style6
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style7
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style8
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style9
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style10
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style11
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style12
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style13
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.style14
 {
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 }
.x15
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 }
.style16
 {
 mso-number-format:"0%";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Percent";
 }
.style17
 {
 mso-number-format:"_ \0022¥\0022* \#\,\#\#0\.00_ \;_ \0022¥\0022* -\#\,\#\#0\.00_ \;_ \0022¥\0022* \0022-\0022??_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Currency";
 }
.style18
 {
 mso-number-format:"_ \0022¥\0022* \#\,\#\#0_ \;_ \0022¥\0022* -\#\,\#\#0_ \;_ \0022¥\0022* \0022-\0022_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Currency [0]";
 }
.style19
 {
 mso-number-format:"_ * \#\,\#\#0\.00_ \;_ * -\#\,\#\#0\.00_ \;_ * \0022-\0022??_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Comma";
 }
.style20
 {
 mso-number-format:"_ * \#\,\#\#0_ \;_ * -\#\,\#\#0_ \;_ * \0022-\0022_ \;_ \@_ ";
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:10pt;
 font-weight:400;
 font-style:normal;
 font-family:"Arial","sans-serif";
 mso-protection:locked visible;
 mso-style-name:"Comma [0]";
 }
.x21
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 mso-protection:locked visible;
 }
.x22
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x23
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:bottom;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x24
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x25
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:general;
 vertical-align:middle;
 white-space:nowrap;
 background:white;
 mso-pattern:auto;
 color:#000000;
 font-size:11pt;
 font-weight:400;
 font-style:normal;
 font-family:"等线","sans-serif";
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }  

</style>
