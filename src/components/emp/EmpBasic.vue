<template>
    <div>
        <el-table :data="emps" stripe border v-loading="loading">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="name" label="姓名" width="90"></el-table-column>
            <el-table-column prop="workId" label="工号" width="85"></el-table-column>
            <el-table-column prop="gender" label="性别" width="85"></el-table-column>
            <el-table-column prop="birthday" label="出生日期" width="95"></el-table-column>
            <el-table-column prop="idCard" label="身份证号" width="150"></el-table-column>
            <el-table-column prop="wedlock" label="婚姻情况" width="70"></el-table-column>
            <el-table-column prop="nationName" label="民族" width="50"></el-table-column>
            <el-table-column prop="nativePlace" label="籍贯" width="80"></el-table-column>
            <el-table-column prop="politicName" label="政治面貌" width="80"></el-table-column>
            <el-table-column prop="email" label="电子邮箱" width="180"></el-table-column>
            <el-table-column prop="phone" label="电话号码" width="100"></el-table-column>
            <el-table-column prop="address" label="联系地址" width="220"></el-table-column>
            <el-table-column prop="departmentName" label="所属部门" width="100"></el-table-column>
            <el-table-column prop="posName" label="职位" width="100"></el-table-column>
            <el-table-column prop="jobLevelName" label="职称" width="100"></el-table-column>
            <el-table-column prop="enaggeForm" label="聘用形式" width="100"></el-table-column>
            <el-table-column prop="tiptopDegree" label="最高学历" width="80"></el-table-column>
            <el-table-column prop="specialty" label="专业" width="150"></el-table-column>
            <el-table-column prop="school" label="毕业学校" width="150"></el-table-column>
            <el-table-column prop="beginDate" label="入职日期" width="95"></el-table-column>
            <el-table-column prop="conversionTime" label="转正日期" width="95"></el-table-column>
            <el-table-column prop="beginContract" label="合同起始日期" width="95"></el-table-column>
            <el-table-column prop="endContract" label="合同终止日期" width="95"></el-table-column>
        </el-table>
        <el-pagination background @current-change="currentChange" @size-change="sizeChange"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                loading: false,
                page: 1,
                size: 10,
                total: 0,
                emps: []
            }
        },
        mounted() {
            this.initEmps();
        },
        methods: {
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },
            initEmps() {

                this.loading = true;
                let url = '/employee/basic?page=' + this.page + '&size=' + this.size;
                this.getRequest(url).then(resp => {
                    this.loading = false;
                    if(resp) {
                        this.emps = resp.data.emps;
                        this.total = resp.data.total;
                    }
                })
            }
        }
    }
</script>