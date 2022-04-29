<template>
  <div>
    <h1>管理员列表</h1>
    <!-- data:显示的数据，在组件的data里 -->
    <el-table :data="items">
      <!-- prop:显示的是数据对象的该属性，label：对应列显示名称 -->
      <el-table-column prop="_id" label="ID" width="230"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="120">
        <!-- 点击按钮跳转，同时传params为id(scope.row即该行数据对象) -->
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" size="small" @click="remove(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    // 发送请求获取数据
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      // 获取的数据放入data
      this.items = res.data;
    },

    // 删除,传入要删除的数据对象
    remove(row) {
      // 删除前弹窗，then即表示用户点击了确认,发送删除请求
      this.$confirm(`确定删除"${row.username}"?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        // 数据库中是_id
        const res = await this.$http.delete(`rest/admin_users/${row._id}`);
        // 重新获取列表，因为items是在mounted获取的
        this.fetch();
        // 提示
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      });
    },
  },
  // 模板挂载完后发送请求，存入data，重新解析
  // 如果是created发送请求：模板解析完了响应还没到，要刷新
  mounted() {
    this.fetch();
  },
};
</script>

<style>
</style>