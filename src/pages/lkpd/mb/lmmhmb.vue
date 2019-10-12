<template>
<!-- 桥隧构造物模板 -->
    <div link='blue' vlink='purple' class="lmczmb">
<table v-if="!isxq" border='0' cellpadding='0' cellspacing='0' width='1113' style='border-collapse: 
 collapse;table-layout:fixed;width:834pt;margin:0 auto;'>
 <col class='x22' width='115' span='2' style='mso-width-source:userset;width:86.25pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='59' style='mso-width-source:userset;width:44.25pt'>
 <col class='x22' width='55' style='mso-width-source:userset;width:41.25pt'>
 <col class='x22' width='54' style='mso-width-source:userset;width:40.5pt'>
 <col class='x22' width='57' style='mso-width-source:userset;width:42.75pt'>
 <col class='x22' width='79' style='mso-width-source:userset;width:59.25pt'>
 <col class='x22' width='68' style='mso-width-source:userset;width:51pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='85' style='mso-width-source:userset;width:63.75pt'>
 <tr height='43' style='mso-height-source:userset;height:32.4pt' id='r0'>
<td colspan='15' height='42' class='x34' width='1113' style='border-right:1px solid windowtext;height:31.65pt;'>路面磨耗指数调查表</td>
 </tr>
 <tr height='28' style='mso-height-source:userset;height:21pt' id='r1'>
<td colspan='5' height='27' class='x38' style='border-bottom:1px solid windowtext;height:20.25pt;'></td>
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
<td colspan='2' class='x39' style='border-bottom:1px solid windowtext;'>调查人员：</td>
<td colspan='2' class='x39' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.dcry"></div></td>
 </tr>
 <tr height='55' class='x21' style='mso-height-source:userset;height:41.4pt' id='r2'>
<td height='53' class='x28' style='height:39.9pt;'>路线编码名称：</td>
<td class='x29'><div  size="mini" type="textarea" :autosize="{minRows: 1, maxRows: 2 }" v-text="formData.lxbmmc"></div></td>
<td class='x32'>调查方向：</td>
<td class='x24'><div size="mini" type="text" v-text="formData.dcfx"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>起点桩号：</td>
<td colspan='2' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>单元长度：</td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.lmcd"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>路面宽度：</td>
<td class='x25'><div size="mini" type="text" v-text="formData.lmkd"></div></td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.2pt' id='r3'>
<td colspan='2' rowspan='3' height='57' class='x40' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>调查内容</td>
<td rowspan='3' height='57' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>位置</td>
<td rowspan='3' height='57' class='x41' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>计量单位</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>1</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>2</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>3</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>4</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>5</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>6</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>7</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>8</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>9</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>10</td>
<td rowspan='3' height='57' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>累计</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r6'>
<td colspan='2' rowspan='3' height='53' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路面构造深度</td>
<td class='x23'>基准值</td>
<td rowspan='3' height='54' class='x41' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>mm</td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm1"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm2"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm3"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm4"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm5"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm6"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm7"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm8"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm9"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[0].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].bm10"></el-input></td>
<td class='x31'><el-input :style="isNaN(formData.dataArr[0].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[0].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r7'>
<td class='x33'>左轮深度</td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm1"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm2"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm3"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm4"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm5"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm6"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm7"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm8"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm9"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[1].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].bm10"></el-input></td>
<td class='x31'><el-input :style="isNaN(formData.dataArr[1].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[1].ljsj"></el-input></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r8'>
<td class='x23'>右轮深度</td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm1)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm1"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm2)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm2"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm3)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm3"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm4)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm4"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm5)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm5"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm6)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm6"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm7)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm7"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm8)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm8"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm9)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm9"></el-input></td>
<td class='x33'><el-input :style="isNaN(formData.dataArr[2].bm10)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].bm10"></el-input></td>
<td class='x31'><el-input :style="isNaN(formData.dataArr[2].ljsj)?'border: 1px red solid;':''" size="mini" type="text" v-model="formData.dataArr[2].ljsj"></el-input></td>
 </tr>

</table>



<table v-if="isxq" border='0' cellpadding='0' cellspacing='0' width='1113' style='border-collapse: 
 collapse;table-layout:fixed;width:834pt;margin:0 auto;'>
 <col class='x22' width='115' span='2' style='mso-width-source:userset;width:86.25pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='59' style='mso-width-source:userset;width:44.25pt'>
 <col class='x22' width='55' style='mso-width-source:userset;width:41.25pt'>
 <col class='x22' width='54' style='mso-width-source:userset;width:40.5pt'>
 <col class='x22' width='57' style='mso-width-source:userset;width:42.75pt'>
 <col class='x22' width='79' style='mso-width-source:userset;width:59.25pt'>
 <col class='x22' width='68' style='mso-width-source:userset;width:51pt'>
 <col class='x22' width='71' span='3' style='mso-width-source:userset;width:53.25pt'>
 <col class='x22' width='85' style='mso-width-source:userset;width:63.75pt'>
 <tr height='43' style='mso-height-source:userset;height:32.4pt' id='r0'>
<td colspan='15' height='42' class='x34' width='1113' style='border-right:1px solid windowtext;height:31.65pt;'>路面磨耗指数调查表</td>
 </tr>
 <tr height='28' style='mso-height-source:userset;height:21pt' id='r1'>
<td colspan='5' height='27' class='x38' style='border-bottom:1px solid windowtext;height:20.25pt;'></td>
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
<td colspan='2' class='x39' style='border-bottom:1px solid windowtext;'>调查人员：</td>
<td colspan='2' class='x39' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.dcry"></div></td>
 </tr>
 <tr height='55' class='x21' style='mso-height-source:userset;height:41.4pt' id='r2'>
<td height='53' class='x28' style='height:39.9pt;'>路线编码名称：</td>
<td class='x29'><div  size="mini" type="textarea" :autosize="{minRows: 1, maxRows: 2 }" v-text="formData.lxbmmc"></div></td>
<td class='x32'>调查方向：</td>
<td class='x24'><div size="mini" type="text" v-text="formData.dcfx"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>起点桩号：</td>
<td colspan='2' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.qdzh"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>单元长度：</td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'><div size="mini" type="text" v-text="formData.lmcd"></div></td>
<td colspan='2' class='x35' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;'>路面宽度：</td>
<td class='x25'><div size="mini" type="text" v-text="formData.lmkd"></div></td>
 </tr>
 <tr height='21' style='mso-height-source:userset;height:16.2pt' id='r3'>
<td colspan='2' rowspan='3' height='57' class='x40' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>调查内容</td>
<td rowspan='3' height='57' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>位置</td>
<td rowspan='3' height='57' class='x41' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>计量单位</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>1</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>2</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>3</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>4</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>5</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>6</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>7</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>8</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>9</td>
<td rowspan='3' height='56' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:42.3pt;'>10</td>
<td rowspan='3' height='57' class='x34' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:43.05pt;'>累计</td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r4'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r5'>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r6'>
<td colspan='2' rowspan='3' height='53' class='x36' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:39.9pt;'>路面构造深度</td>
<td class='x23'>基准值</td>
<td rowspan='3' height='54' class='x41' style='border-right:1px solid windowtext;border-bottom:1px solid windowtext;height:40.65pt;'>mm</td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm1"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm2"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm3"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm4"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm5"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm6"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm7"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm8"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm9"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[0].bm10"></div></td>
<td class='x31'><div size="mini" type="text" v-text="formData.dataArr[0].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r7'>
<td class='x33'>左轮深度</td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm1"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm2"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm3"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm4"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm5"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm6"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm7"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm8"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm9"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[1].bm10"></div></td>
<td class='x31'><div size="mini" type="text" v-text="formData.dataArr[1].ljsj"></div></td>
 </tr>
 <tr height='18' style='mso-height-source:userset;height:13.8pt' id='r8'>
<td class='x23'>右轮深度</td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm1"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm2"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm3"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm4"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm5"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm6"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm7"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm8"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm9"></div></td>
<td class='x33'><div size="mini" type="text" v-text="formData.dataArr[2].bm10"></div></td>
<td class='x31'><div size="mini" type="text" v-text="formData.dataArr[2].ljsj"></div></td>
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
            lj:[]
        }
        }
    },
    created(){
        this.isxq=this.data.isxq
        this.formData.jccd=this.data.jccd
        this.formData.dcsj=this.data.dcsj
        this.formData.isxq=this.data.isxq
        this.formData.dcry=this.data.dcry
        this.formData.lxbmmc=this.data.lxmc
        this.formData.dcfx=this.data.fx
        this.formData.qdzh=this.data.qdzh
        this.formData.lmcd=this.data.lmcd
        this.formData.lmkd=this.data.lmkd
        this.formData.dataArr=this.data.lkdcfb
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
    this.$api.editPwiList(this.formData).then(resp => {
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
.x32
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
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
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
 border-top:1px solid windowtext;
 border-right:1px solid windowtext;
 border-bottom:none;
 border-left:1px solid windowtext;
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
 border-bottom:1px solid windowtext;
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
 border-bottom:none;
 border-left:1px solid windowtext;
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
 border-right:none;
 border-bottom:1px solid windowtext;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x39
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
.x40
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
 border-right:none;
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x41
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
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x42
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
 border-bottom:none;
 border-left:1px solid windowtext;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x43
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
 border-left:none;
 mso-diagonal-down:none;
 mso-diagonal-up:none;
 mso-protection:locked visible;
 }
.x44
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
</style>
