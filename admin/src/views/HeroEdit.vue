<template>
  <div>
    <!-- 判断是否有id来显示新建或编辑 -->
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <!-- elmui写法 -->
    <!-- 点击按钮时触发原生表单的提交事件 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs value="basic" type="border-card">
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <!-- 点击加号后选择图片,选了图片后执行action(自带的ajax所以要完整地址) -->
            <!-- action向服务器的哪个路由发送请求发送图片,
        on-success上传并经服务器处理后返回的数据对象作为返回的值传入afterUpload函数 -->
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories">
              <el-option
                v-for="item in categories"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <!-- rate：星星 -->
            <el-rate
              :max="9"
              show-score
              style="margin-top: 0.7rem"
              v-model="model.scores.difficult"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate
              :max="9"
              show-score
              style="margin-top: 0.7rem"
              v-model="model.scores.skills"
            ></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate
              :max="9"
              show-score
              style="margin-top: 0.7rem"
              v-model="model.scores.attack"
            ></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate
              :max="9"
              show-score
              style="margin-top: 0.7rem"
              v-model="model.scores.survive"
            ></el-rate>
          </el-form-item>

          <el-form-item label="顺风出装">
            <!-- multiple多选 -->
            <el-select v-model="model.items1" multiple>
              <el-option
                v-for="item in items"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <!-- multiple多选 -->
            <el-select v-model="model.items2" multiple>
              <el-option
                v-for="item in items"
                :key="item.id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input type="textarea" v-model="model.usageTips"></el-input>
          </el-form-item>
          <el-form-item label="对抗技巧">
            <el-input type="textarea" v-model="model.battleTips"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input type="textarea" v-model="model.teamTips"></el-input>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <!-- 点击按钮为skills添加对象 -->
          <el-button @click="model.skills.push({})"
            ><i class="el-icon-plus"></i>添加技能</el-button
          >
          <el-row type="flex" style="flex-wrap: wrap">
            <!-- 一行展示2个技能,点击按钮后skills增加一个对象，el-col随之增加-->
            <el-col :md="12" v-for="(item, i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                > <!--on-success回调里会传入服务器返回的res，直接写回调函数-->
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item >
                <el-button size="small" type="danger"
                @click=" model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top: 1rem">
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
      // 接收请求返回的模型数据，在selecte里显示
      categories: [],
      items: [],
      // 除了图片属性和多层级属性，其他的可不定义
      model: {
        mame: "",
        avatar: "",
        scores: {
          difficult: 0,
        },
        skills:[]
      },
    };
  },
  methods: {
    afterUpload(res) {
      this.model.avatar = res.url;
    },
    // 点击按钮后的新建/更改，二者并存在一个方法里
    save() {
      if (this.id) {
        // 修改时带着id给服务器去找对应条目        新name
        this.$http.put(`rest/heroes/${this.id}`, this.model);
      } else {
        // 发请求保存新建的数据，访问的其实是/admin/api/categories
        this.$http.post("rest/heroes", this.model);
      }
      // 发送请求后跳转页面
      this.$router.push("/heroes/list");
      // elementui提供的弹窗方法
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },

    // 发请求获取要编辑的数据送入输入框
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.id}`);
      // 服务器返回的搜索出来的结果赋给model，使之可以在页面上显示
      this.model = { ...this.model, ...res.data };
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`);
      // 服务器返回的搜索出来的结果赋给model，使之可以在页面上显示
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      // 服务器返回的搜索出来的结果赋给model，使之可以在页面上显示
      this.items = res.data;
    },
  },
  // 挂载完后执行输入框获取数据、父级数据的请求
  mounted() {
    this.fetchCategories();
    this.fetchItems();
    this.id && this.id && this.fetch();
  },
};
</script>

<style>

</style>
