<template>
  <div>
    <!-- 判断是否有id来显示新建或编辑 -->
    <h1>{{ id ? "编辑" : "新建" }}管理员</h1>
    <!-- elmui写法 -->
    <!-- 点击按钮时触发原生表单的提交事件 -->
    <el-form label-width='120px' @submit.native.prevent="save">
     
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- type按钮样式，native-type：原生button属性，提交按钮 -->
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  // 接收list里编辑按钮传来的id,免去要在$route里找
  props: ["id"],
  data() {
    return {
      // v-model的值会传给数据库条目对应属性
      model: {},
    };
  },
  methods: {
    // 点击按钮后的新建/更改，二者并存在一个方法里
    save() {
      if (this.id) {
        // 修改时带着id给服务器去找对应条目             新name
        this.$http.put(`rest/admin_users/${this.id}`, this.model);
      } else {
        // 发请求保存新建的数据，访问的其实是/admin/api/categories
        this.$http.post("rest/admin_users", this.model);
      }
      // 发送请求后跳转页面
      this.$router.push("/admin_users/list");
      // elementui提供的弹窗方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 发请求获取要编辑的数据送入输入框
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      this.model = res.data;
    },
   
  },
  // 挂载完后执行输入框获取数据、父级数据的请求
  mounted() {
    this.id && this.id && this.fetch();
  },
};
</script>

<style>
</style>