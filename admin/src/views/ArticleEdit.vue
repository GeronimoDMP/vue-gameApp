<template>
  <div>
    <!-- 判断是否有id来显示新建或编辑 -->
    <h1>{{ id ? "编辑" : "新建" }}文章</h1>
    <!-- elmui写法 -->
    <!-- 点击按钮时触发原生表单的提交事件 -->
    <el-form label-width='120px' @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <!-- 选中的内容关联到条目对象的parent属性,值是parent的id -->
        <el-select v-model="model.parent" multiple>
          <!-- label显示名称 value选中后保存的值，id的不变性-->
          <el-option v-for="item in parents" :key="item.id"
          :label='item.name' :value='item._id'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.body"></vue-editor>
      </el-form-item>
      <el-form-item>
        <!-- type按钮样式，native-type：原生button属性，提交按钮 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 富文本组件
import {VueEditor} from 'vue2-editor'
export default {
  // 接收list里编辑按钮传来的id,免去要在$route里找
  props: ["id"],
  components:{
    VueEditor
  },
  data() {
    return {
      // v-model的值会传给数据库条目对应属性
      model: {},
      parents:[]
    };
  },
  methods: {
    // 点击按钮后的新建/更改，二者并存在一个方法里
    save() {
      if (this.id) {
        // 修改时带着id给服务器去找对应条目             新name
        this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 发请求保存新建的数据，访问的其实是/admin/api/categories
        this.$http.post("rest/articles", this.model);
      }
      // 发送请求后跳转页面
      this.$router.push("/articles/list");
      // elementui提供的弹窗方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 发请求获取要编辑的数据送入输入框
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      this.model = res.data;
    },
    // 下拉框获取父级数据
    async fetchParents() {
      const res = await this.$http.get('rest/categories');
      this.parents = res.data;
    },
  },
  // 挂载完后执行输入框获取数据、父级数据的请求
  mounted() {
    this.fetchParents();
    this.id && this.id && this.fetch();
  },
};
</script>

<style>
</style>