<template>
  <div>
    <!-- 判断是否有id来显示新建或编辑 -->
    <h1>{{ id ? "编辑" : "新建" }}广告位</h1>
    <!-- elmui写法 -->
    <!-- 点击按钮时触发原生表单的提交事件 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button @click="model.items.push({})"
          ><i class="el-icon-plus"></i>添加广告</el-button
        >
        <el-row type="flex" style="flex-wrap: wrap">
          <!-- 一行展示2个技能,点击按钮后skills增加一个对象，el-col随之增加-->
          <el-col :md="24" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="跳转链接(URL)">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="margin-top:1rem">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :show-file-list="false"
                :on-success="(res) => $set(item, 'img', res.url)"
              >
                <!--on-success回调里会传入服务器返回的res，直接写回调函数-->
                <img v-if="item.img" :src="item.img" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button
                style="margin-left:7rem"
                size="small"
                type="danger"
                @click="model.items.splice(i, 1)"
                >删除</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
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
      model: {
        items: [],
      },
    };
  },
  methods: {
    // 点击按钮后的新建/更改，二者并存在一个方法里
    save() {
      if (this.id) {
        // 修改时带着id给服务器去找对应条目             新name
        this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 发请求保存新建的数据
        this.$http.post("rest/ads", this.model);
      }
      // 发送请求后跳转页面
      this.$router.push("/ads/list");
      // elementui提供的弹窗方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 发请求获取要编辑的数据送入输入框
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      this.model = { ...this.model, ...res.data };
    },
  },
  // 挂载完后执行输入框获取数据、父级数据的请求
  mounted() {
    this.id && this.id && this.fetch();
  },
};
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    min-width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }
  .avatar {
    min-width: 5rem;
    height: 5rem;
    display: block;
  }
</style>