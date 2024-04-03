<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="所属分类" prop="categoryId">
        <el-select v-model="queryParams.categoryId" placeholder="请选择所属分类" clearable>
          <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"
                     :disabled="item.commonStatus == 0">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="网站名称" prop="name">
        <el-input
          v-model="queryParams.name"
          placeholder="请输入网站名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="首页显示" prop="indexShow">
        <el-select v-model="queryParams.indexShow" clearable>
          <el-option
            v-for="dict in na_index_show"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="网站状态" prop="commonStatus">
        <el-select v-model="queryParams.commonStatus" clearable>
          <el-option
            v-for="dict in na_common_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Search" @click="handleQuery">搜索</el-button>
        <el-button icon="Refresh" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="Plus"
          @click="handleAdd"
          v-hasPermi="['website:site:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['website:site:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['website:site:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['website:site:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="siteList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="所属分类" align="center" prop="categoryName" />
      <el-table-column label="网站名称" align="center" prop="name" />
      <el-table-column label="网站副标题" align="center" prop="subTitle" />
      <el-table-column label="网站地址" align="center" prop="url" />
      <el-table-column label="颜色" align="center" prop="color" />
      <el-table-column label="网站logo图" align="center" prop="logo" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.logo" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="网站icon图" align="center" prop="icon" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.icon" :width="50" :height="50"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="SEO关键词" align="center" prop="keywords" />-->
<!--      <el-table-column label="SEO描述" align="center" prop="description" />-->
      <el-table-column label="首页显示" align="center" prop="indexShow">
        <template #default="scope">
          <dict-tag :options="na_index_show" :value="scope.row.indexShow"/>
        </template>
      </el-table-column>
      <el-table-column label="网站状态" align="center" prop="commonStatus">
        <template #default="scope">
          <dict-tag :options="na_common_status" :value="scope.row.commonStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="网站排序" align="center" prop="sort" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['website:site:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['website:site:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改站点管理对话框 -->
    <el-dialog :title="title" v-model="open" width="650px" append-to-body>
      <el-form ref="siteRef" :model="form" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="所属分类" prop="categoryId">
              <el-select v-model="form.categoryId" placeholder="请选择所属分类" @change="changeSelect"  >
                <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id"
                           :disabled="item.commonStatus == 0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网站排序" prop="sort">
              <el-input-number v-model="form.sort" :min="1"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站地址" prop="url">
              <el-input v-model="form.url" placeholder="请输入网站地址" />
            </el-form-item>
          </el-col>
          <el-col :span="4">
              <el-button type="primary" plain style="margin-left: 20px;" @click="spider" :loading="spiderLoading">一键采集</el-button>
          </el-col>
          <el-col :span="6">
            <el-form-item label="名称颜色" prop="color">
                <el-color-picker v-model="form.color" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入网站名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SEO关键词" prop="keywords">
              <el-input v-model="form.keywords" placeholder="请输入SEO关键词" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站副标题" prop="subTitle">
              <el-input v-model="form.subTitle" placeholder="请输入网站副标题" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="SEO描述" prop="description">
              <el-input v-model="form.description" placeholder="请输入SEO描述" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="网站logo图" prop="logo">
              <image-upload v-model="form.logo" :limit="1" :isShowTip="false"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网站icon图" prop="icon">
              <image-upload v-model="form.icon" :limit="1" :isShowTip="false"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否首页显示" prop="indexShow">
              <el-radio-group v-model="form.indexShow">
                <el-radio
                    v-for="dict in na_index_show"
                    :key="dict.value"
                    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="网站状态" prop="commonStatus">
              <el-radio-group v-model="form.commonStatus">
                <el-radio
                    v-for="dict in na_common_status"
                    :key="dict.value"
                    :label="dict.value"
                >{{dict.label}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submitForm">确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Site">
import { listSite, getSite, delSite, addSite, updateSite, spiderSite } from "@/api/website/site";
import {listCategory} from "@/api/website/category";
import {onMounted} from "vue";

const { proxy } = getCurrentInstance();
const { na_common_status, na_index_show } = proxy.useDict('na_common_status', 'na_index_show');

const siteList = ref([]);
const open = ref(false);
const loading = ref(true);
const spiderLoading = ref(false);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");
const categoryList = ref([])

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    categoryId: null,
    name: null,
    subTitle: null,
    indexShow: null,
    commonStatus: null,
    orderByColumn: 'create_time',
    isAsc: 'desc',
  },
  spiderParam:{
    spiderDoMain: null
  },
  rules: {
    categoryId: [{ required: true, message: "所属分类不能为空", trigger: "blur" }],
    name: [{ required: true, message: "网站名称不能为空", trigger: "blur" }],
    subTitle: [{ required: true, message: "网站副标题不能为空", trigger: "blur" }],
    url: [{ required: true, message: "网站地址不能为空", trigger: "blur" }],
    logo: [{ required: true, message: "网站logo图不能为空", trigger: "blur" }],
    icon: [{ required: true, message: "网站icon图不能为空", trigger: "blur" }],
  }
});

const {queryParams, form, rules, spiderParam} = toRefs(data);

/** 查询站点管理列表 */
function getList() {
  loading.value = true;
  listSite(queryParams.value).then(response => {
    siteList.value = response.rows;
    total.value = response.total;
    loading.value = false;
  });
}

// 取消按钮
function cancel() {
  open.value = false;
  reset();
}

// 表单重置
function reset() {
  form.value = {
    id: null,
    categoryId: null,
    categoryName: null,
    name: null,
    color: null,
    subTitle: null,
    url: null,
    logo: null,
    icon: null,
    keywords: null,
    description: null,
    indexShow: null,
    commonStatus: null,
    sort: null,
    createTime: null,
    updateTime: null
  };
  proxy.resetForm("siteRef");
}

/** 搜索按钮操作 */
function handleQuery() {
  queryParams.value.pageNum = 1;
  getList();
}

/** 重置按钮操作 */
function resetQuery() {
  proxy.resetForm("queryRef");
  handleQuery();
}

// 多选框选中数据
function handleSelectionChange(selection) {
  ids.value = selection.map(item => item.id);
  single.value = selection.length != 1;
  multiple.value = !selection.length;
}

/** 新增按钮操作 */
function handleAdd() {
  reset();
  open.value = true;
  title.value = "添加站点管理";
  form.value.indexShow = "1";
  form.value.commonStatus = "1";
  form.value.sort = 1;
  listCategory().then(response =>{
    categoryList.value = response.rows;
  })
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getSite(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改站点管理";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["siteRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        if (form.value.color === null) {
          form.value.color = '';
        }
        updateSite(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addSite(form.value).then(response => {
          proxy.$modal.msgSuccess("新增成功");
          open.value = false;
          getList();
        });
      }
    }
  });
}

/** 删除按钮操作 */
function handleDelete(row) {
  const _ids = row.id || ids.value;
  proxy.$modal.confirm('是否确认删除站点管理编号为"' + _ids + '"的数据项？').then(function() {
    return delSite(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('website/site/export', {
    ...queryParams.value
  }, `site_${new Date().getTime()}.xlsx`)
}

/**
 * 修改所属分类，赋值categoryName到表单
 */
function changeSelect(event) {
  for (let i in categoryList.value) {
    if (categoryList.value[i].id === event) {
      form.value.categoryName = categoryList.value[i].name;
      break;
    }
  }
}

function spider() {
  if (form.value.url === null || form.value.url === '') {
    proxy.$modal.msgWarning("请先输入网站地址");
  }else {
    spiderLoading.value = true;
    spiderParam.value.spiderDoMain = form.value.url;
      spiderSite(spiderParam.value).then(response => {
        if (response.code === 666) {
          spiderLoading.value = false;
          proxy.$modal.msgError(response.msg);
        }else {
          form.value.icon = response.data.icon;
          form.value.name = response.data.title;
          form.value.subTitle = response.data.title;
          form.value.keywords = response.data.keywords;
          form.value.description = response.data.description;
          spiderLoading.value = false;
          proxy.$modal.msgSuccess("抓取完成");
        }
      });
  }
}

onMounted(()=>{
  listCategory().then(response =>{
    categoryList.value = response.rows;
  })
})

getList();
</script>
