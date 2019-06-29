<template>
<div>
  <el-rate
  v-model="value"
  disabled
  show-score
  text-color="#ff9900"
  score-template="{value}">
</el-rate>

<el-input v-model="value" placeholder="请为自己评分~"></el-input>
</div>
</template>

<script>
import apiTable from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      value: '请为自己评分'
    }
  },
  created() {
    //this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      apiTable.getList(null).then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
