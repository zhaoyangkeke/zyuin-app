<template>
<!-- 路基模板 -->
    <div link='blue' vlink='purple' class="lmczmb styleSheets">
<table  v-if="!isxq"  border='0' cellpadding='0' cellspacing='0' width='1236' style='border-collapse: 
 collapse;table-layout:fixed;width:927pt;margin:0 auto;'>
 <col class='x22' width='115' span='2' style='mso-width-source:userset;width:86.25pt'>
 <col class='x22' width='71' span='2' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='52' style='mso-width-source:userset;width:39pt'>
 <col class='x22' width='71' span='2' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='59' style='mso-width-source:userset;width:44.25pt'>
 <col class='x22' width='55' style='mso-width-source:userset;width:41.25pt'>
 <col class='x22' width='54' style='mso-width-source:userset;width:40.5pt'>
 <col class='x22' width='57' style='mso-width-source:userset;width:42.75pt'>
 <col class='x22' width='79' style='mso-width-source:userset;width:59.25pt'>
 <col class='x22' width='68' style='mso-width-source:userset;width:51pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='85' style='mso-width-source:userset;width:63.75pt'>
 <tr height='43' style='mso-height-source:userset;height:32.4pt' id='r0'>
<td colspan='17' height='42' class='x36' width='1236' style='border-right:1px solid windowtext;height:31.65pt;'>路基损坏调查表</td>
 </tr>
 <tr height='28' style='mso-height-source:userset;height:21pt' id='r1'>
<td colspan='7' height='27' class='x33' style='border-bottom:1px solid windowtext;height:20.25pt;'></td>
<td class='x26' colspan="2" style="text-align:right">检查车道：</td>
<td class='x27' colspan="2" ><div size="mini" type="text" v-text="formData.jccd"></div></td>
<td class='x26'>调查时间：</td>
<td class='x27' x:num="41785"><el-date-picker
      type="date"
      :clearable='false'
      v-text="formData.dcsj"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker></td>
<td colspan='2' class='x34' style='border-bottom:1px solid windowtext;'>调查人员：</td>
<td colspan='2' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.dcry"></div></td>
 </tr>
 <tr height='55' class='x21' style='mso-height-source:userset;height:41.4pt' id='r2'>
<td height='53' class='x28' style='height:39.9pt;'>路线编码名称：</td>
<td class='x29'><div  size="mini" type="textarea" :autosize="{minRows: 1, maxRows: 2 }" v-text="formData.lxbmmc"></div></td>
<td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>调查方向：</td>
<td class='x24'><div size="mini" type="text" v-text="formData.dcfx"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>起点桩号：</td>
<td colspan='2' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>单元长度：</td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.lmcd"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>路面宽度：</td>
<td class='x25'><div size="mini" type="text" v-text="formData.lmkd"></div></td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.2pt' id='r3'>
<td colspan='2' rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>损坏类型</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>程度</td>
<td rowspan='3' height='57' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>单位扣分</td>
<td rowspan='3' height='56' class='x32' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>权重(wi)</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>计量单位</td>
<td colspan='10' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>百米扣分</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>累计扣分</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>1</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>2</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>3</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>4</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>5</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>6</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>7</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>8</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>9</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>10</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r6'>
<td colspan='2' rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>路肩损坏</td>
<td class='x30'>轻</td>
<td class='x30'>1</td>
<td rowspan='2' height='35' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'>0.10</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>㎡</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[0].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm10"></el-input></td>
<td rowspan='2' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[0].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r7'>
<td class='x30'>重</td>
<td class='x30'>2</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[1].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r8'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>边坡坍塌</td>
<td class='x23'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.25" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.25</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[2].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm10"></el-input></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[2].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r9'>
<td class='x23'>中</td>
<td class='x30'>50</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[3].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[3].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r10'>
<td class='x23'>重</td>
<td class='x30'>100</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[4].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[4].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r11'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>水沟冲毁</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.15" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.15</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[5].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].bm10"></el-input></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[5].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[5].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r12'>
<td class='x30'>中</td>
<td class='x30'>30</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[6].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[6].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r13'>
<td class='x30'>重</td>
<td class='x30'>50</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[7].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[7].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r14'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路基构造物损坏</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.10</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[8].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].bm10"></el-input></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[8].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[8].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r15'>
<td class='x30'>中</td>
<td class='x30'>50</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[9].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[9].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r16'>
<td class='x30'>重</td>
<td class='x30'>100</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[10].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[10].bm10"></el-input></td>
 </tr>
 <tr height='22' style='mso-height-source:userset;height:16.8pt' id='r17'>
<td colspan='2' height='20' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:15.3pt;'>路缘石缺损</td>
<td class='x30'></td>
<td class='x30'>4</td>
<td class='x42' x:num="0.05">0.05</td>
<td class='x30'>m</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[11].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].bm10"></el-input></td>
<td rowspan='1' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[11].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[11].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r18'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路基沉降</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.25" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.25</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[12].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].bm10"></el-input></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[12].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[12].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r19'>
<td class='x30'>中</td>
<td class='x30'>30</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[13].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[13].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r20'>
<td class='x30'>重</td>
<td class='x30'>50</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[14].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[14].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r21'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>排水不畅</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.10</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[15].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].bm10"></el-input></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><el-input :style="isNaN(formData.dataArr[15].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[15].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r22'>
<td class='x30'>中</td>
<td class='x30'>50</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[16].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[16].bm10"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r23'>
<td class='x30'>重</td>
<td class='x30'>100</td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm1"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm2"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm3"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm4"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm5"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm6"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm7"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm8"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm9"></el-input></td>
<td class='x30'><el-input :style="isNaN(formData.dataArr[17].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[17].bm10"></el-input></td>
 </tr>
</table>


<table  v-if="isxq"  border='0' cellpadding='0' cellspacing='0' width='1236' style='border-collapse: 
 collapse;table-layout:fixed;width:927pt;margin:0 auto;'>
 <col class='x22' width='115' span='2' style='mso-width-source:userset;width:86.25pt'>
 <col class='x22' width='71' span='2' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='52' style='mso-width-source:userset;width:39pt'>
 <col class='x22' width='71' span='2' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='59' style='mso-width-source:userset;width:44.25pt'>
 <col class='x22' width='55' style='mso-width-source:userset;width:41.25pt'>
 <col class='x22' width='54' style='mso-width-source:userset;width:40.5pt'>
 <col class='x22' width='57' style='mso-width-source:userset;width:42.75pt'>
 <col class='x22' width='79' style='mso-width-source:userset;width:59.25pt'>
 <col class='x22' width='68' style='mso-width-source:userset;width:51pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='85' style='mso-width-source:userset;width:63.75pt'>
 <tr height='43' style='mso-height-source:userset;height:32.4pt' id='r0'>
<td colspan='17' height='42' class='x36' width='1236' style='border-right:1px solid windowtext;height:31.65pt;'>路基损坏调查表</td>
 </tr>
 <tr height='28' style='mso-height-source:userset;height:21pt' id='r1'>
<td colspan='7' height='27' class='x33' style='border-bottom:1px solid windowtext;height:20.25pt;'></td>
<td class='x26' colspan="2" style="text-align:right">检查车道：</td>
<td class='x27' colspan="2" ><div size="mini" type="text" v-text="formData.jccd"></div></td>
<td class='x26'>调查时间：</td>
<td class='x27' x:num="41785"><el-date-picker
      type="date"
      :clearable='false'
      v-text="formData.dcsj"
      format="yyyy-MM-dd"
      value-format="yyyy-MM-dd"
      placeholder="选择日期">
    </el-date-picker></td>
<td colspan='2' class='x34' style='border-bottom:1px solid windowtext;'>调查人员：</td>
<td colspan='2' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.dcry"></div></td>
 </tr>
 <tr height='55' class='x21' style='mso-height-source:userset;height:41.4pt' id='r2'>
<td height='53' class='x28' style='height:39.9pt;'>路线编码名称：</td>
<td class='x29'><div  size="mini" type="textarea" :autosize="{minRows: 1, maxRows: 2 }" v-text="formData.lxbmmc"></div></td>
<td colspan='3' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>调查方向：</td>
<td class='x24'><div size="mini" type="text" v-text="formData.dcfx"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>起点桩号：</td>
<td colspan='2' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>单元长度：</td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.lmcd"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>路面宽度：</td>
<td class='x25'><div size="mini" type="text" v-text="formData.lmkd"></div></td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.2pt' id='r3'>
<td colspan='2' rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>损坏类型</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>程度</td>
<td rowspan='3' height='57' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>单位扣分</td>
<td rowspan='3' height='56' class='x32' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>权重(wi)</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>计量单位</td>
<td colspan='10' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>百米扣分</td>
<td rowspan='3' height='56' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>累计扣分</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>1</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>2</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>3</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>4</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>5</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>6</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>7</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>8</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>9</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>10</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r6'>
<td colspan='2' rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>路肩损坏</td>
<td class='x30'>轻</td>
<td class='x30'>1</td>
<td rowspan='2' height='35' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'>0.10</td>
<td rowspan='2' height='34' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.1pt;'>㎡</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[0].bm10"></div></td>
<td rowspan='2' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[0].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r7'>
<td class='x30'>重</td>
<td class='x30'>2</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[1].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r8'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>边坡坍塌</td>
<td class='x23'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.25" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.25</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[2].bm10"></div></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[2].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r9'>
<td class='x23'>中</td>
<td class='x30'>50</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[3].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r10'>
<td class='x23'>重</td>
<td class='x30'>100</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[4].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r11'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>水沟冲毁</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.15" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.15</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[5].bm10"></div></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[5].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r12'>
<td class='x30'>中</td>
<td class='x30'>30</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[6].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r13'>
<td class='x30'>重</td>
<td class='x30'>50</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[7].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r14'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路基构造物损坏</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.10</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[8].bm10"></div></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[8].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r15'>
<td class='x30'>中</td>
<td class='x30'>50</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[9].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r16'>
<td class='x30'>重</td>
<td class='x30'>100</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[10].bm10"></div></td>
 </tr>
 <tr height='22' style='mso-height-source:userset;height:16.8pt' id='r17'>
<td colspan='2' height='20' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:15.3pt;'>路缘石缺损</td>
<td class='x30'></td>
<td class='x30'>4</td>
<td class='x42' x:num="0.05">0.05</td>
<td class='x30'>m</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[11].bm10"></div></td>
<td rowspan='1' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[11].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r18'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路基沉降</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.25" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.25</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[12].bm10"></div></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[12].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r19'>
<td class='x30'>中</td>
<td class='x30'>30</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[13].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r20'>
<td class='x30'>重</td>
<td class='x30'>50</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[14].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r21'>
<td colspan='2' rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>排水不畅</td>
<td class='x30'>轻</td>
<td class='x30'>20</td>
<td rowspan='3' height='54' class='x39' x:num="0.10" style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>0.10</td>
<td rowspan='3' height='53' class='x31' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>处</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[15].bm10"></div></td>
<td rowspan='3' height='35' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:26.85pt;'><div size="mini" type="text" v-text="formData.dataArr[15].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r22'>
<td class='x30'>中</td>
<td class='x30'>50</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[16].bm10"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r23'>
<td class='x30'>重</td>
<td class='x30'>100</td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm1"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm2"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm3"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm4"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm5"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm6"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm7"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm8"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm9"></div></td>
<td class='x30'><div size="mini" type="text" v-text="formData.dataArr[17].bm10"></div></td>
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
            arr:[],
        formData:{
            dcsj:'',
            dcry:'',
            lxbmmc:'',
            dcfx:'',
            qdzh:'',
            dycd:'',
            lmkd:'',
            dataArr:[],
            ljkf:[]
        },
        hj1:'',
        hj2:'',
        hj3:'',
        hj4:'',
        hj5:'',
        hj6:'',

        }
    },
     created() {
         this.formData.jccd=this.data.jccd
        this.isxq=this.data.isxq
       this.formData.dcsj=this.data.dcsj
        this.formData.isxq=this.data.isxq
        this.formData.dcry=this.data.dcry
        this.formData.lxbmmc=this.data.lxmc
        this.formData.dcfx=this.data.fx
        this.formData.qdzh=this.data.qdzh
        this.formData.lmcd=this.data.lmcd
        this.formData.lmkd=this.data.lmkd
        this.formData.dataArr=this.data.lkdcfb
        this.formData.dataArr[0].ljsj=Number(this.formData.dataArr[0].ljsj) +Number(this.formData.dataArr[1].ljsj)
        this.formData.dataArr[2].ljsj=Number(this.formData.dataArr[2].ljsj) +Number(this.formData.dataArr[3].ljsj)+Number(this.formData.dataArr[4].ljsj)
        this.formData.dataArr[5].ljsj=Number(this.formData.dataArr[5].ljsj) +Number(this.formData.dataArr[7].ljsj)+Number(this.formData.dataArr[6].ljsj)
        this.formData.dataArr[8].ljsj=Number(this.formData.dataArr[8].ljsj) +Number(this.formData.dataArr[9].ljsj)+Number(this.formData.dataArr[10].ljsj)
        this.formData.dataArr[12].ljsj=Number(this.formData.dataArr[12].ljsj) +Number(this.formData.dataArr[13].ljsj)+Number(this.formData.dataArr[14].ljsj)
       this.formData.dataArr[15].ljsj=Number(this.formData.dataArr[15].ljsj) +Number(this.formData.dataArr[16].ljsj)+Number(this.formData.dataArr[17].ljsj)
       this.formData.dataArr[1].ljsj=0
       this.formData.dataArr[3].ljsj=0
       this.formData.dataArr[4].ljsj=0
       this.formData.dataArr[6].ljsj=0
       this.formData.dataArr[7].ljsj=0
       this.formData.dataArr[9].ljsj=0
       this.formData.dataArr[10].ljsj=0
       this.formData.dataArr[13].ljsj=0
       this.formData.dataArr[14].ljsj=0
       this.formData.dataArr[16].ljsj=0
       this.formData.dataArr[17].ljsj=0
},
    methods: {
    goback(){
     this.$emit('childByValue', 'false')
    },
    submit(){
    let flag =true
    this.formData.mx=this.formData.dataArr
   for (let index = 0; index < this.formData.mx.length; index++) {
     var element = this.formData.mx[index];
      if(isNaN(element.bm1)){
      flag =false
      }
      if(isNaN(element.bm2)){
        flag =false
      }
      if(isNaN(element.bm3)){
        flag =false
      }
      if(isNaN(element.bm4)){
         flag =false
      }
      if(isNaN(element.bm5)){
       flag =false
      }
      if(isNaN(element.bm6)){
        flag =false
      }
      if(isNaN(element.bm7)){
        flag =false
      }
      if(isNaN(element.bm8)){
      flag =false
      }
      if(isNaN(element.bm9)){
         flag =false
      }
      if(isNaN(element.bm10)){
    flag =false
      }
      if(isNaN(element.ljsj)){
        flag =false
      }
   }
    if(!flag){
     this.$message({
            message: '存在非法数据',
            type: 'error'
          }) 
      return
    }
     
    this.$api.editSciList(this.formData).then(resp => {
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
 mso-page-orientation:Landscape;
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
 mso-protection:locked visible;
 }
.x23
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
 border-top:none;
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x26
 {
 mso-style-parent:style0;
 mso-number-format:"yyyy\\-mm\\-dd\;\@";
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
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x27
 {
 mso-style-parent:style0;
 mso-number-format:"yyyy\/m\/d\;\@";
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
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x28
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
.x29
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
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
.x30
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
.x31
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
.x32
 {
 mso-style-parent:style0;
 mso-number-format:General;
 text-align:center;
 vertical-align:middle;
 white-space:normal;word-wrap:break-word;
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
.x33
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
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x34
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
 border-top:none;
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x35
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x36
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
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x37
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x38
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x39
 {
 mso-style-parent:style0;
 mso-number-format:"0\.00_\)\;\[Red\]\\\(0\.00\\\)";
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
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x40
 {
 mso-style-parent:style0;
 mso-number-format:"0\.00_\)\;\[Red\]\\\(0\.00\\\)";
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x41
 {
 mso-style-parent:style0;
 mso-number-format:"0\.00_\)\;\[Red\]\\\(0\.00\\\)";
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
 border-top:none;
 border-right:1px solid windowtext;
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x42
 {
 mso-style-parent:style0;
 mso-number-format:"0\.00_\)\;\[Red\]\\\(0\.00\\\)";
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

</style>
