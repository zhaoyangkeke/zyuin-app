/**
* ----交工结算书
*/
<template>
  <div id="zqcwzfzs" style="height: 100%" v-loading="loading">
    <div class="header" v-show="!showDetail">
      <span class="headerTit">交工结算书</span>
      <div class="header_option">
        <ul>
          <!--<li @click="showSearch=!showSearch"><i class="el-icon-search"> 查询</i></li>-->
          <li @click="showAdd()"><i class="el-icon-edit-outline"> 添加</i></li>
          <li @click="deleteData()"><i class="el-icon-delete"> 删除</i></li>
        </ul>
      </div>
    </div>
    <div class="conter_table" v-show="!showDetail">
      <div class="chaxun">
        <el-form :inline="true" :model="searchForm" ref="searchForm" class="searchForm">
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-form-item class="" label="路线名称" prop="lxbh">
              <el-input v-model="searchForm.lxcode" size="mini" placeholder="请输入编号"></el-input>
              <!--<selectTree class="selectTree" v-model="searchForm.bmname" :isDefaultselect="true" :urlFunc="$api.requestBmtreeAll" :dataKey="{name: 'bmname'}" placeholder="请选择部门" @treeSelect="selecttreeBm"></selectTree>-->
            </el-form-item>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="行车方向" prop="" class="">
            <el-select size="mini"  class="" placeholder="请选择方向" v-model="searchForm.xcfx">
              <!--<el-option v-for="(item,index) in roadOptions" :key="index" :label="item.name" :value="item.code"></el-option>-->
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="日期选择" prop="" class="">
            <el-date-picker
              v-model="searchForm.jcrq"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <!--<el-select size="mini"  class="" placeholder="请选择日期" v-model="searchForm.jcrq">
              <el-option v-for="(item,index) in qmbbOptions" :key="index" :label="item.bbmc" :value="item.bbid"></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item style="margin-bottom: 0px" label="" prop="" class="">
            <el-button size="mini" @click="search(1, 10)" style="background-color: #DF4D4A;border-color:transparent;color: #fff">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                style="width: 100%;"
                row-class-name="row_class"
                border
                :height="showSearch?'calc(100% - 59px)':'calc(100% - 18px)'"
                :row-style="{fontFamily: '宋体', fontSize: '12px'}"
                @selection-change="handleSelectionChange">
        <el-table-column
          type="index"
          label=" "
          width="25">
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column type="expand">
          <template scope="scope">
            <el-table class="demo-table-expand"
                      :data="scope.row.mx">
              <el-table-column prop="pmmtjgjssmx_zmbh" label="子目号"></el-table-column>
              <el-table-column prop="pmmtjgjssmx_zmmc" label="子目名称"></el-table-column>
              <el-table-column prop="pmmtjgjssmx_dw" label="单位"></el-table-column>
              <el-table-column prop="pmmtjgjssmx_htdj" label="合同单价"></el-table-column>
              <el-table-column label="原合同">
                <el-table-column prop="pmmtjgjssmx_yhts" label="数量"></el-table-column>
                <el-table-column prop="pmmtjgjssmx_yhtje" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="实际计量">
                <el-table-column prop="pmmtjgjssmx_sjjlsl" label="数量"></el-table-column>
                <el-table-column prop="pmmtjgjssmx_sjjlje" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column label="交工结算">
                <el-table-column prop="pmmtjgjssmx_jgjssl" label="数量"></el-table-column>
                <el-table-column prop="pmmtjgjssmx_jgjsje" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column prop="date" label="与实际计量比较增加或减少">
                <el-table-column prop="pmmtjgjssmx_ysjbsl" label="数量"></el-table-column>
                <el-table-column prop="pmmtjgjssmx_ysjbje" label="金额"></el-table-column>
              </el-table-column>
              <el-table-column prop="pmmtjgjssmx_remark" label="备注"></el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" class-name="column-caoz" label="操作" width="80">
          <template scope="scope">
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="updateFormDia(scope.row, scope.$index)">编辑</span>
            <span style="color:#00a2fd;cursor: pointer;text-align: center" @click="showBhFormDia(scope.row)">详情</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="状态"  show-overflow-tooltip>
          <template scope="scope">
            <span style="color:#D34C42;cursor: pointer;text-align: center" v-if="scope.row.pmmtjgjss_spzt==='未处理'" @click="shenhe(scope.row, scope.$index)">{{scope.row.pmmtjgjss_spzt}}</span>
            <span style="color:#00a2fd;text-align: center" v-if="scope.row.pmmtjgjss_spzt==='已下发'">{{scope.row.pmmtjgjss_spzt}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_jssbh" label="结算书编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_gcmc" label="工程名称" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_htbh" label="合同编号" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_cbdw" label="承包单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_jldw" label="监理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_gldw" label="管理单位" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_htje" label="合同金额" show-overflow-tooltip></el-table-column>
        <el-table-column align="center" prop="pmmtjgjss_bz" label="备注" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <footer class="footer" v-show="!showDetail">
      <div style="float: right;padding: 6px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </footer>
    <div class="tabArea" v-if="showDetail"  @close="resetForm">
      <div style="position:relative;">
        <p class="tabAreaTit" v-if="!addzb">
          <span class="titleclasschild"  @click="showDetail = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>交工结算书</span>
        </p>
        <p class="tabAreaTit" v-if="addzb">
          <span class="titleclasschild"  @click="addzb = false"><i class="icon iconfont icon-arrow-left titleclasschild" style="cursor: pointer"></i></span>
          <span>添加子目</span>
        </p>
        <div class="SPState">
          <el-button size="mini" v-if="!addzb" @click="addzb = true"><i class="el-icon-edit-outline" title="添加"></i>添加子目</el-button>
          <el-button size="mini" v-if="addzb" @click="addzibiao"><i class="el-icon-edit-outline" title="添加"></i>添加</el-button>
        </div>
      </div>
      <div class="dialog_warp">
        <ul class="zhubnr"  v-if="!addzb">
          <li>
            <span>结算书编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" :value="lmshForm.pmmtjgjss_jssbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width:100%;" v-model="htbh" value-key="pmmtjgjss_htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.pmmtjgjss_htbh" :label="item.pmmtjgjss_gcmc" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_htbh"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gldw"></el-input>
            </p>
          </li>
          <li>
            <span>监理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jldw"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                :disabled="showxq"
                :on-success="daoru">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>备注</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_bz"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程合同金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjhtje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程计量金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjjlje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程交工结算金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjjsje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>合同暂定金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_htzdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>计量暂定金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jlzdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>交工结算暂定金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jgjszdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>索赔费用(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_spfy"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>罚金(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_fj"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应扣留的质量保证金(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_zlbzj"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>累计已支付工程价款(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_ljzfgck"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应支付的交工付款金额(元)</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_yzfkk"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应支付的交工付款金额（大写）</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_yzfkkdx"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>编制单位</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_dwmc"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>编制部门</span>
            <p>
              <el-input class="gjzjje" size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_bmmc"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="zibnr2" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <ul>
            <li>
              <span>操作</span>
              <span>子目号</span>
              <span>子目名称</span>
              <span>单位</span>
              <span>合同单价</span>
              <span>
                <div>原合同</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>实际计量</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>交工结算</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>实际计量增或减</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>备注</span>
              <!--<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>-->
            </li>

            <li   v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_zmbh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_dw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_htdj"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_yhts"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_yhtje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_sjjlsl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_sjjlje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_jgjssl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_jgjsje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_ysjbsl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_ysjbje"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_remark"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="mini" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="mini" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="mini" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </div>
<!--    <el-dialog class="data-dialog el-updata-div" title="交工结算书" :close-on-click-modal="false" :visible.sync="showDetail" width="580px" @close="resetForm">
      <div class="dialog_warp">
        <ul class="zhubnr">
          <li>
            <span>结算书编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" :value="lmshForm.pmmtjgjss_jssbh"></el-input>
            </p>
          </li>
          <li>
            <span>工程名称</span>
            <p>
              <el-select clearable :disabled="showxq" size="mini" style="width: 148px;" v-model="htbh" value-key="pmmtjgjss_htbh" placeholder="" @change="selectHt">
                <el-option v-for="item in htList" :key="item.pmmtjgjss_htbh" :label="item.pmmtjgjss_gcmc" :value="item"></el-option>
              </el-select>
            </p>
          </li>
          <li>
            <span>合同编号</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_htbh"></el-input>
            </p>
          </li>
          <li>
            <span>承包单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_cbdw"></el-input>
            </p>
          </li>
          <li>
            <span>管理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gldw"></el-input>
            </p>
          </li>
          <li>
            <span>监理单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jldw"></el-input>
            </p>
          </li>
          <li class="text_line">
            <span>附件</span>
            <p>
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                :disabled="showxq"
                :on-success="daoru">
                <i style="color: #00a2fd;" v-if="!showxq" class="el-icon-upload2"> 添加附件</i>
              </el-upload>
            </p>
          </li>
          <li class="text_line">
            <span>备注</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_bz"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程合同金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjhtje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程计量金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjjlje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>各章节工程交工结算金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_gzjjsje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>合同暂定金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_htzdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>计量暂定金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jlzdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>交工结算暂定金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_jgjszdje"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>索赔费用(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_spfy"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>罚金(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_fj"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应扣留的质量保证金(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_zlbzj"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>累计已支付工程价款(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_ljzfgck"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应支付的交工付款金额(元)</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_yzfkk"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>应支付的交工付款金额（大写）</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_yzfkkdx"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>编制单位</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_dwmc"></el-input>
            </p>
          </li>
          <li class="zbxx">
            <span>编制部门</span>
            <p>
              <el-input size="mini" :disabled="showxq" type="text" v-model="lmshForm.pmmtjgjss_bmmc"></el-input>
            </p>
          </li>
          <div style="clear: both"></div>
        </ul>
        <div class="addzbsj">
          <i @click="addzb=!addzb" :class="addzb?'el-icon-remove-outline':'el-icon-circle-plus-outline'"></i>
        </div>
        <div class="zibnr" v-if="addzb" style="overflow-x: auto;overflow-y: hidden;">
          <div class="iconwarp">
            <i style="float: right" class="el-icon-edit-outline" title="添加" @click="addzibiao"></i>
            <el-upload
              class="upload-demo"
              action=""
              style="float: right"
              multiple
              :limit="3"
              :on-change="ceshi">
              <i class="el-icon-download" title="导入"></i>
            </el-upload>
          </div>
          <ul>
            <li>
              <span>操作</span>
              <span>子目号</span>
              <span>子目名称</span>
              <span>单位</span>
              <span>合同单价</span>
              <span>
                <div>原合同</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>实际计量</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>交工结算</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>
                <div>实际计量增或减</div>
                <span>数量</span>
                <span>金额</span>
              </span>
              <span>备注</span>
              &lt;!&ndash;<p>
                <i class="el-icon-edit-outline" title="添加"></i><i class="el-icon-delete" title="删除"></i>
              </p>&ndash;&gt;
            </li>
            <li v-for="(item, index) in lmshForm.mx" :key="index">
              <p>
                <i class="el-icon-delete" title="删除" @click="deletezibiao(index)"></i>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_zmbh"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_zmmc"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_dw"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_htdj"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_yhts"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_yhtje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_sjjlsl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_sjjlje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_jgjssl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_jgjsje"></el-input>
              </p>
              <p class="tow_linep">
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_ysjbsl"></el-input>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_ysjbje"></el-input>
              </p>
              <p>
                <el-input size="mini" type="text" v-model="item.pmmtjgjssmx_remark"></el-input>
              </p>
            </li>
            <div style="clear: both"></div>
          </ul>
        </div>
        <div class="dialog_footer" v-if="!showxq">
          <el-button size="small" v-if="isadd" type="primary"  class="dialog-button bao_cun" :loading="submitLoading" @click="addSubmit">保存</el-button>
          <el-button size="small" v-if="!isadd" type="primary" class="dialog-button bao_cun" :loading="submitLoading"  @click="updateSubmit">保存</el-button>
          <el-button size="small" @click="resetForm" class="dialog-button qu_xiao"  style="margin-right: 20px">取消</el-button>
        </div>
      </div>
    </el-dialog>-->
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    hasMenu: {
      type: Boolean,
      default: false
    },
    clickHide: {
      type: Function
    }
  },
  data () {
    return {
      lmshFormMx:[{}],
      lmshForm: {
        mx: [{}]
      },
      index: '',
      isadd: false,
      addzb: false,
      submitLoading: false,
      showxq: false,
      showSearch: false,
      loading: false,
      tableHeight: 300,
      tableData: [],
      tableData1: [],
      showBhForm: false,
      searchCriteria: false,
      qmbbOptions: [],
      roadOptions: [],
      searchForm: {},
      currentPage: 1,
      pageSize: 10,
      personelForm: {},
      showDetail: false,
      multipleSelection: [],
      htbh: {},
      htList: [],
      tabindex: 0,
      total:0,
      detailData:[]
    }
  },
  methods: {
    //标签里面写了临时加上
    daoru () {
      for (var i = 0; i < 4; i++) {
        this.tableData.push({
          lxcode: 'G15',
          qdzh: 'K16+700',
          zdzh: 'K16+800',
          xcfx: '上行',
          jcrq: '2018/12/11',
          jcsb: 'XX设备',
          jlry: '张三',
          jckd: '3',
          qljszk1: '2',
          qljszk2: '3',
          qljszk3: '4',
          qljszk4: '5',
          sd1: '1',
          sd2: '2',
          sd3: '3',
          hd1: '1',
          hd2: '2',
          hd3: '3',
          hd4: '4'
        })
      }
      this.$message({
        type: 'success',
        message: '导入成功!'
      })
    },
    showAdd () {
      this.showDetail = true
      this.showxq = false
      this.isadd = true
      this.formId = 'jgjss' + new Date().getTime()
      this.lmshForm.pmmtjgjss_jssbh = this.formId
      this.lmshForm.pmmtjgjss_djbh = this.formId
    },
    updateFormDia (row, index) {
      this.showDetail = true
      this.isadd = false
      this.showxq = false
      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.index = index
      this.htbh = {
        pmmtjgjss_htbh: this.lmshForm.pmmtjgjss_htbh
      }

      this.$api.getjgjsMx({pmmtjgjssmx_jssbh:row.pmmtjgjss_jssbh}).then(res=>{

        if(res.data.code == 1){
          this.lmshForm.mx = res.data.data
          console.log(this.lmshForm.mx);
        }
      })
      // this.lmshForm.mx =  this.detailData
    },
    showBhFormDia (row) {
      this.showDetail = true
      this.showxq = true

      this.lmshForm = JSON.parse(JSON.stringify(row))
      this.htbh = {
        pmmtjgjss_htbh: this.lmshForm.pmmtjgjss_htbh
      }
      this.$api.getjgjsMx({pmmtjgjssmx_jssbh:row.pmmtjgjss_jssbh}).then(res=>{
        if(res.data.code == 1){
          if(res.data){
            this.lmshForm.mx= res.data.data
          }else{
            this.lmshForm.mx = []
          }
        }else{
          this.lmshForm.mx = []
        }
      })
      // this.lmshForm.mx =  this.detailData
    },
    search (currentPage, pageSize) {
      this.showSearch = false
      if (this.searchForm.jcrq) {
        this.searchForm.ksrq = this.searchForm.jcrq[0]
        this.searchForm.jsrq = this.searchForm.jcrq[1]
      }
      this.$api.getJiaogList('?pageNum=' + currentPage + '&pageSize=' + pageSize + '&' + $.param(this.searchForm)).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          if(resp.data){
            if(resp.data.data){
              if(resp.data.data.list){
                this.tableData = resp.data.data.list
              }
              if(resp.data.data.total){
                this.total = resp.data.data.total
              }
            }
          }

        }
      }).catch(e => {
        this.loading = false
      })
    },
    addSubmit () {

      this.$api.addJiaogForGcys(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    updateSubmit () {

      this.$api.editJiaogForGcys(this.lmshForm).then(res => {
        if (res.data.code === 1) {
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
          this.search(this.currentPage, this.pageSize)
          this.resetForm()
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      })
    },
    deleteData () {
      if (this.multipleSelection.length > 0) {
        this.$confirm('确定删除选中的信息吗？删除后数据无法恢复！', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let djbharr = ''
          this.multipleSelection.map((item, index) => {
            djbharr = djbharr + item.pmmtjgjss_jssbh + ','
          })
          djbharr = djbharr.slice(0, djbharr.length - 1)
          this.$api.delJiaogForGcys('?pmmtjgjss_jssbhs=' + djbharr).then(res => {
            if (res.data.code === 1) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.search(this.currentPage, this.pageSize)
              // this.resetForm()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      } else {
        this.$message({type: 'error', message: '请选选择要删除的数据'})
      }
    },
    shenhe (row, index) {
      this.$confirm('是否通过审核？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        let form = JSON.parse(JSON.stringify(row))
        form.pmmtjgjssmx_spzt = '已下发'
        this.$api.spJiaogForGcys('?spzt=' + form.pmmtjgjssmx_spzt + '&jssbh=' + form.pmmtjgjss_jssbh).then(res => {
          if (res.data.code === 1) {
            this.$message({
              type: 'success',
              message: '审核通过!'
            })
            this.search(this.currentPage, this.pageSize)
            this.resetForm()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消审核'
        })
      })
    },
    daochu () {

    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.search(this.currentPage, this.pageSize)
    },
    handleCurrentChange (val) {
      this.currentPage = val
      this.search(this.currentPage, this.pageSize)
    },
    getPage (currentPage, pageSize) {
      this.loading = true
      this.$api.requestLkpdLkdcQueryPage('/' + currentPage + '/' + pageSize).then(resp => {
        this.loading = false
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          if(resp.data){
            this.tableData = resp.data.content
            if(resp.data.totalElements){
              this.total = resp.data.totalElements
            }

          }

        }
      }).catch(e => {
        this.loading = false
      })
    },
    resetForm () {
      this.showDetail = false
      this.lmshForm = {
        mx: [{}]
      }
      this.htbh = {}
    },
    addzibiao () {
      this.lmshForm.mx.push({mid: this.lmshForm.id})
    },
    deletezibiao (index) {
      this.lmshForm.mx.splice(index, 1)
    },
    ceshi () {
      this.$message({
        type: 'error',
        message: '内容格式不符合要求'
      })
    },
    submitAddForm () {
    },
    getXcRoadOptions () {
      this.$api.requestLdbqueryCombos().then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.roadOptions = resp.data
        }
      }).catch(e => {
      })
    },
    selecttreeBm (node) {
      this.searchForm.bmid = node.bmcode
      this.searchForm.bmname = node.bmname
      if (!this.searchForm.qmbbid) {
        // return
      } else {
        this.search(this.currentPage, this.pageSize)
      }
    },
    getQmldbb () {
      if (this.qmbbOptions.length > 0) { return }
      this.$api.requestLkpdbbkQueryQmldbb('0201').then(resp => {
        if (resp.status !== 200) {
          this.$message({
            message: '出错了',
            type: 'error'
          })
        } else {
          this.qmbbOptions = resp.data
          this.searchForm.qmbbid = this.qmbbOptions[0].bbid
          if (!this.searchForm.bmid) {
            // return
          } else {
            this.search(this.currentPage, this.pageSize)
          }
        }
      }).catch(e => {
      })
    },
    tablable (num) {
      this.tabindex = num
    },
    selectHt (value) {

      this.lmshForm = value
      this.lmshForm.pmmtjgjss_jssbh = this.formId
      this.lmshForm.mx.forEach(item=>{
        item.pmmtjgjssmx_mid = value.pmmtjgjss_jssbh

      })
    }
  },
  mounted () {
    this.$api.getHtJiaogInfoByBm('').then(res => {
      this.htList = res.data.data
    })
    this.search(1, 10)
    this.tableHeight = $('#zqcwzfzs')[0].offsetHeight
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  #zqcwzfzs{
    position: relative;
    /*padding: 10px 15px 0 15px;*/
    font-size: 12px;
    height: 100%;
    overflow: auto;
    .gjzjje{
      input{
        height: 55px;
      }
    }
    .header{}
    .conter_table{
      height: calc(100% - 91px);
      min-height: 300px;
      padding: 0 15px;
    }
    .footer{
      height: 45px;
      background: #fff;
      position: relative;
      z-index: 100;
    }
    .dialog_warp{
      background: #fff;
      /*padding: 20px 40px;*/
      .tab_lable{
        margin-bottom: 10px;
        font-size: 12px;
        text-align: left;
        height: 38px;
        line-height: 38px;
        border-bottom: 1px solid #f1f4f7;
        padding: 0 15px;
        p{
          text-align: left;
        }
        span{
          display: inline-block;
          /*border-bottom: 2px solid #00a2fd;*/
          height: 38px;
          margin-right: 20px;
          &:hover{
            border-bottom: 2px solid #00a2fd;
            cursor: pointer;
          }
        }
        .tabselect{
          border-bottom: 2px solid #00a2fd;
        }
      }
      .zhubnr{
        li{
          width: 50%;
          height: 32px;
          float: left;
          border: 1px solid #D5D6D7;
          border-bottom: none;
          color: #52575D!important;
          font-size: 12px;
          &:nth-of-type(2n+1){
            border-right: none;
          }
          &:nth-last-of-type(1),&:nth-last-of-type(2){
            border-bottom: 1px solid #D5D6D7;
          }
          >span{
            width: 100px;
            display: inline-block;
            padding:0 5px;
            height: 100%;
            line-height: 31px;
            border-right: 1px solid #D5D6D7;
            background: #F7F8F9;
            float: left;
          }
          p{
            width: calc(100% - 100px);
            height: 100%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
          }
          .radio_line{
            /*span{
              display: inline-block;
              width: 50%;
            }*/
            padding: 0 5px;
            .el-radio__label{
              font-size: 12px;
            }
          }
          /*.tow_line,.three_line{
            >span{
              display: inline-block;
              text-indent: 5px;
              float: left;
              width: 50%;
              height: 100%;
              line-height: 31px;
              .el-input--mini{
                width: calc(100% - 25px);
                .el-input__inner{
                  padding: 0;
                }
              }
            }
          }
          .three_line{
            >span{
              width: calc(100%/3);
            }
          }*/
        }
        .zbxx{
          height: 60px;
        }
        .tow_line,.three_line,.four_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          .el-input--mini{
            width: calc(100% - 60px);
          }
          p{
            >span{
              border-bottom: 1px solid #D5D6D7;
              &:last-child{
                border-bottom: none;
              }
              i{
                display: inline-block;
                width: 60px;
                height: 100%;
                font-style: normal;
                background: #F7F8F9;
                float: left;
                line-height: 32px;
                text-align: center;
              }
            }
          }
        }
        .text_line{
          width: 100%;
          border-right: 1px solid #D5D6D7!important;
          min-height: 64px;
          height: auto;
          >span{
            min-height: 64px;
            height: 100% !important;
          }
          p{
            min-height: 64px;
          }
          .el-upload-list__item{
            border: none;
          }
        }
      }
      .zibnr2,.zibiaonr{
        width: 100%;
        position: relative;
        padding: 15px 0 0 0;
        overflow: hidden;
        text-align: center;
        box-sizing: border-box;
        ul{
          overflow-x: auto;
          overflow-y: hidden;
          padding-bottom: 15px;
          li{
            width: 100%;
            /*width: 1000px;*/
            height: 32px;
            float: left;
            box-sizing: border-box;
            border: 1px solid #D5D6D7;
            color: #52575D!important;
            font-size: 12px;
            border-right: none;
            border-bottom: none;
            &:nth-of-type(1){
              height: 60px;
            }
            &:nth-last-of-type(1){
              border-bottom: 1px solid #D5D6D7;
            }
            >span{
              width: calc(100%/10);
              display: inline-block;
              height: 100%;
              float: left;
              line-height: 31px;
              text-align: center;
              background: #F7F8F9;
              border-right: 1px solid #D5D6D7;
              div{
                height: 50%;
              }
              span{
                width: 50%;
                height: 50%;
                display: inline-block;
                float: left;
                border-top: 1px solid #D5D6D7;
                border-right: 1px solid #D5D6D7;
                &:nth-last-of-type(1){
                  border-right: none;
                }
              }
            }
            p{
              width: calc(100%/10);
              height: 100%;
              line-height: 32px;
              float: left;
              border-right: 1px solid #D5D6D7;
              .el-input__inner{
                border: none;
                text-align: center;
              }
              i{
                color: #00a2fd;
                margin:0 5px;
              }
            }
            .tow_linep{
              .el-input{
                width: 50%!important;
                float: left;
                &:nth-of-type(1){
                  border-right: 1px solid #D5D6D7;
                }
                .el-input__inner{
                  padding: 0!important;
                }
              }
            }
          }
        }
        .gchzb{
          li{
            width: 600px;
            >span,p{
              width: calc(100%/6);
            }
          }
        }
      }
      .zibiaonr{
        margin-top: 20px;
        li{
          width: calc(100%/6);
          height: 64px;
          float: left;
          border: 1px solid #D5D6D7;
          color: #52575D!important;
          font-size: 12px;
          border-right: none;
          &:nth-last-of-type(1){
            border-right: 1px solid #D5D6D7;
          }
          >span{
            width: 100%;
            display: inline-block;
            height: 50%;
            line-height: 31px;
            text-align: center;
            background: #F7F8F9;
            border-bottom: 1px solid #D5D6D7;
          }
          p{
            width: calc(100%);
            height: 50%;
            float: left;
            .el-input__inner{
              border: none;
              text-align: center;
            }
            i{
              color: #00a2fd;
              margin:0 5px;
            }
          }
        }
      }
      .addzbsj{
        text-align: center;
        color: #1CA4FA;
        padding: 10px 0;
      }
      .iconwarp{
        text-align: right;
        height: 14px;
        overflow: hidden;
        i{
          color: #1CA4FA;
          margin-left: 10px;
        }
      }
    }
  }
</style>
