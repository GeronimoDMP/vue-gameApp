<template>
  <div>
    <!-- 判断是否有id来显示新建或编辑 -->
    <h1>{{ id ? "编辑" : "新建" }}物品</h1>
    <!-- elmui写法 -->
    <!-- 点击按钮时触发原生表单的提交事件 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <!-- 点击加号后选择图片,选了图片后执行action(自带的ajax所以要完整地址) -->
        <!-- action向服务器的哪个路由发送请求发送图片,
        on-success上传并经服务器处理后返回的数据对象作为返回的值传入afterUpload函数 -->
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
    afterUpload(res){
      // 接收的数据对象的url赋给model.icon即图片地址
      // 需要vue方法加入data才能显示。
      // name不需要是因为他在model里是为了传给服务端的，不需要再哪里显示
      this.$set(this.model,'icon',res.url)
      // this.model.icon=res.url
    },
    // 点击按钮后的新建/更改，二者并存在一个方法里
    save() {
      if (this.id) {
        // 修改时带着id给服务器去找对应条目        新name
        this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        // 发请求保存新建的数据，访问的其实是/admin/api/categories
        this.$http.post("rest/items", this.model);
      }
      // 发送请求后跳转页面
      this.$router.push("/items/list");
      // elementui提供的弹窗方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 发请求获取要编辑的数据送入输入框
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      // 服务器返回的搜索出来的结果赋给model，使之可以在页面上显示
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
