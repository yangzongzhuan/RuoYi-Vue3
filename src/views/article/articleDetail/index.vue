<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryRef" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="文章分类" prop="articleCategoryId">
        <el-input
          v-model="queryParams.articleCategoryId"
          placeholder="请输入文章分类"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="分类名称" prop="articleCategoryName">
        <el-input
          v-model="queryParams.articleCategoryName"
          placeholder="请输入分类名称"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文章标题" prop="title">
        <el-input
          v-model="queryParams.title"
          placeholder="请输入文章标题"
          clearable
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="文章类型" prop="type">
        <el-select v-model="queryParams.type" placeholder="请选择文章类型" clearable>
          <el-option
            v-for="dict in na_article_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="commonStatus">
        <el-select v-model="queryParams.commonStatus" placeholder="请选择状态" clearable>
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
          v-hasPermi="['article:articleDetail:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['article:articleDetail:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['article:articleDetail:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="Download"
          @click="handleExport"
          v-hasPermi="['article:articleDetail:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="articleDetailList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
<!--      <el-table-column label="文章分类id" align="center" prop="articleCategoryId" />-->
      <el-table-column label="文章分类名称" align="center" prop="articleCategoryName" />
      <el-table-column label="文章标题" align="center" prop="title" />
      <el-table-column label="标题颜色" align="center" prop="color" />
      <el-table-column label="内容" align="center" prop="content" />
      <el-table-column label="浏览量" align="center" prop="view" />
      <el-table-column label="文章类型" align="center" prop="type">
        <template #default="scope">
          <dict-tag :options="na_article_type" :value="scope.row.type"/>
        </template>
      </el-table-column>
      <el-table-column label="首图" align="center" prop="indexImg" width="100">
        <template #default="scope">
          <image-preview :src="scope.row.indexImg" :width="50" :height="50"/>
        </template>
      </el-table-column>
      <el-table-column label="下载地址" align="center" prop="downloadAddr" />
      <el-table-column label="状态" align="center" prop="commonStatus">
        <template #default="scope">
          <dict-tag :options="na_common_status" :value="scope.row.commonStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template #default="scope">
          <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['article:articleDetail:edit']">修改</el-button>
          <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['article:articleDetail:remove']">删除</el-button>
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

    <!-- 添加或修改文章对话框 -->
    <el-dialog :title="title" v-model="open" width="650px" append-to-body>
      <el-form ref="articleDetailRef" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="文章分类id" prop="articleCategoryId">
          <el-input v-model="form.articleCategoryId" placeholder="请输入文章分类id" />
        </el-form-item>
        <el-form-item label="文章分类名称" prop="articleCategoryName">
          <el-input v-model="form.articleCategoryName" placeholder="请输入分类名称" />
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>
        <el-form-item label="标题颜色" prop="color">
          <el-input v-model="form.color" placeholder="请输入标题颜色" />
        </el-form-item>
        <el-form-item label="内容">
          <editor v-model="form.content" :min-height="192"/>
        </el-form-item>
        <el-form-item label="浏览量" prop="view">
          <el-input v-model="form.view" placeholder="请输入浏览量" />
        </el-form-item>
        <el-form-item label="文章类型" prop="type">
          <el-select v-model="form.type" placeholder="请选择文章类型">
            <el-option
              v-for="dict in na_article_type"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首图" prop="indexImg">
          <image-upload v-model="form.indexImg"/>
        </el-form-item>
        <el-form-item label="下载地址" prop="downloadAddr">
          <el-input v-model="form.downloadAddr" placeholder="请输入下载地址" />
        </el-form-item>
        <el-form-item label="状态" prop="commonStatus">
          <el-radio-group v-model="form.commonStatus">
            <el-radio
              v-for="dict in na_common_status"
              :key="dict.value"
              :label="dict.value"
            >{{dict.label}}</el-radio>
          </el-radio-group>
        </el-form-item>
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

<script setup name="ArticleDetail">
import { listArticleDetail, getArticleDetail, delArticleDetail, addArticleDetail, updateArticleDetail } from "@/api/article/articleDetail";

const { proxy } = getCurrentInstance();
const { na_common_status, na_article_type } = proxy.useDict('na_common_status', 'na_article_type');

const articleDetailList = ref([]);
const open = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);
const title = ref("");

const data = reactive({
  form: {},
  queryParams: {
    pageNum: 1,
    pageSize: 10,
    articleCategoryId: null,
    articleCategoryName: null,
    title: null,
    type: null,
    commonStatus: null,
    orderByColumn: 'create_time',
    isAsc: 'desc'
  },
  rules: {
    articleCategoryId: [
      { required: true, message: "文章分类不能为空", trigger: "blur" }
    ],
    title: [
      { required: true, message: "文章标题不能为空", trigger: "blur" }
    ],
    type: [
      { required: true, message: "文章类型不能为空", trigger: "change" }
    ],
  }
});

const { queryParams, form, rules } = toRefs(data);

/** 查询文章列表 */
function getList() {
  loading.value = true;
  listArticleDetail(queryParams.value).then(response => {
    articleDetailList.value = response.rows;
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
    articleCategoryId: null,
    articleCategoryName: null,
    title: null,
    color: null,
    content: null,
    view: null,
    type: null,
    indexImg: null,
    downloadAddr: null,
    commonStatus: null,
    createBy: null,
    createTime: null,
    updateTime: null
  };
  proxy.resetForm("articleDetailRef");
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
  title.value = "添加文章";
}

/** 修改按钮操作 */
function handleUpdate(row) {
  reset();
  const _id = row.id || ids.value
  getArticleDetail(_id).then(response => {
    form.value = response.data;
    open.value = true;
    title.value = "修改文章";
  });
}

/** 提交按钮 */
function submitForm() {
  proxy.$refs["articleDetailRef"].validate(valid => {
    if (valid) {
      if (form.value.id != null) {
        updateArticleDetail(form.value).then(response => {
          proxy.$modal.msgSuccess("修改成功");
          open.value = false;
          getList();
        });
      } else {
        addArticleDetail(form.value).then(response => {
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
  proxy.$modal.confirm('是否确认删除文章编号为"' + _ids + '"的数据项？').then(function() {
    return delArticleDetail(_ids);
  }).then(() => {
    getList();
    proxy.$modal.msgSuccess("删除成功");
  }).catch(() => {});
}

/** 导出按钮操作 */
function handleExport() {
  proxy.download('article/articleDetail/export', {
    ...queryParams.value
  }, `articleDetail_${new Date().getTime()}.xlsx`)
}

getList();
</script>
