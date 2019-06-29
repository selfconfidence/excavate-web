<template>
<div>
  <br/>
  <el-form :inline="true">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<el-form-item label="标题">
<el-input v-model="parameterMap.title" placeholder="标题"></el-input>
</el-form-item>
<el-form-item label="时间范围查询">
   <el-date-picker
      v-model="parameterMap.pullDate"
      type="date"
      placeholder="开始时间">
    </el-date-picker>
 <el-date-picker
      v-model="parameterMap.stopDate"
      type="date"
      placeholder="截至日期">
    </el-date-picker>
    <el-button type="primary" @click="indexListShow()">查询</el-button>
    <el-button type="primary" @click="dialogFormVisible=true,pojo = {}">新增</el-button>
</el-form-item>
  </el-form>
  <el-dialog
  title="添加"
  :visible.sync="dialogFormVisible"
  width="30%">
  <span slot="footer" class="dialog-footer">
    <el-form :model="pojo" :rules="rules" ref="pojo" label-width="100px" class="demo-ruleForm">
<el-form-item label="标题" prop="title">
<el-input v-model="pojo.title"  placeholder="标题"></el-input>
</el-form-item>
<el-form-item label="发布日期" prop="pullDate">
<el-date-picker
      v-model="pojo.pullDate"
      type="date"
      placeholder="发布日期">
    </el-date-picker>
</el-form-item>
<el-form-item label="截至日期" prop="stopDate">
<el-date-picker
      v-model="pojo.stopDate"
      type="date"
      placeholder="截至日期">
    </el-date-picker>
</el-form-item>
<el-form-item label="公司名称" prop="company">
<el-input v-model="pojo.company" placeholder="公司名称"></el-input>
</el-form-item>
<el-form-item label="工作性质" prop="companyType">
<el-input v-model="pojo.companyType" placeholder="工作性质"></el-input>
</el-form-item>
<el-form-item label="状态">
<el-switch
  v-model="pojo.status"
  style="display: block"
  active-color="#13ce66"
  inactive-color="#ff4949"
  active-value="0"
  inactive-value="1"
  active-text="有效"
  inactive-text="无效"
  >
</el-switch>
</el-form-item>
    </el-form>
   <el-button type="primary" @click="dialogFormVisible=false">返回</el-button>
    <el-button type="primary" @click="handleUpdate()" >保存</el-button>

  </span>
</el-dialog>
  <el-table
    :data="indexList"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="编码"
      width="180">
    </el-table-column>
    <el-table-column
      prop="title"
      label="标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="pullDate"
      label="发布日期">
    </el-table-column>
    <el-table-column
      prop="stopDate"
      label="截至日期">
    </el-table-column>
    <el-table-column
      prop="company"
      label="公司名称">
    </el-table-column>
    <el-table-column
      prop="companyType"
      label="工作性质">
    </el-table-column>
    <el-table-column
      prop="status"
      label="是否有效">
    </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handlefindOne(scope.row.id)" type="text" size="small">编辑</el-button>
        <el-button @click="handleDelete(scope.row.id)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      @size-change="indexListShow"
      @current-change="indexListShow"
      :current-page="currentPage"
      :page-sizes="[5, 10,20,50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
</div>
</template>
<script>
import indexApi from '@/api/indexlook'
export default {
    data(){
      return{
        indexList:[],
        currentPage:1,
        pageSize:10,
        parameterMap:{},
        total:0,
        dialogFormVisible:false,
        id:'',
        pojo:{
          id:'',
          title:"",
          pullDate:"",
          stopDate:"",
          company:"",
          companyType:"",
          status:""
        },
        rules: {
          title:[
             { required: true, message: '请输入标题', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          pullDate:[
             { required: true, message: '请输入开始时间', trigger: 'blur' },
          ],
           stopDate:[
             { required: true, message: '请输入结束时间', trigger: 'blur' },
          ],
          company:[
                         { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
           companyType:[
                         { required: true, message: '请输入公司性质', trigger: 'blur' },

          ]
        }
      }
    }
   ,
   created(){
     this.indexListShow();

   },
    methods:{
      indexListShow(){
        indexApi.getsIndexSearchList(this.currentPage,this.pageSize,this.parameterMap).then(response =>{
          this.indexList = response.data.rows;
          this.total = response.data.total;
        })
      },
      //更新操作,其实是和保存相似的,只不过一个有id,一个没id
      handleUpdate(){
        indexApi.update(this.id,this.pojo).then(response =>{
          this.$message({
              message: response.message,
              type: (!response.flag) ?'warning':'success'
        });
        
         
        })
         this.id = '';
      },
      handleDelete(id){
              this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          indexApi.indexDelete(id).then(response =>{
             this.$message({
            type: (!response.flag) ?'warning':'success',
            message: response.message
          });
           this.indexListShow();
          })
          
        }).catch(() => {
           
        });
            
      },
      handlefindOne(id){
        this.dialogFormVisible = true;
        indexApi.findOneById(id).then(response =>{
          this.pojo = response.data;
          this.id = id;
        })
      }
    }
  
}
</script>