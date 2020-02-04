<template>
    <div>
        <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工</el-button>

        <!-- 员工表 -->

        <el-table :data="emps" stripe border v-loading="loading" style="width: 100%">
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
            <el-table-column fixed="right" label="操作" width="200">
                <template slot-scope="scope">
                    <el-button @click="showEditEmpView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
                    <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页 -->

        <el-pagination background @current-change="currentChange" @size-change="sizeChange"
        layout="sizes, prev, pager, next, jumper, ->, total, slot"
        :total="total">
        </el-pagination>

        <!-- 添加用户 -->

        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
            <el-form :model="emp" :rules="rules" ref="empForm">
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="姓名: " prop="name">
                            <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit"
                            v-model="emp.name" placeholder="请输入员工姓名"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="性别: " prop="gender">
                            <el-radio-group v-model="emp.gender">
                                <el-radio label="男">男</el-radio>
                                <el-radio label="女">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="出生日期: " prop="birthday">
                            <el-date-picker v-model="emp.birthday" size="mini" type="date"
                            value-format="yyyy-MM-dd" style="width: 150px;" placeholder="出生日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="政治面貌: " prop="politicId">
                            <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px;">
                                <el-option v-for="item in politics" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="民族: " prop="nationId">
                            <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px;">
                                <el-option v-for="item in nations" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="籍贯: " prop="nativePlace">
                            <el-input size="mini" style="width: 120px;" prefix-icon="el-icon-edit"
                            v-model="emp.nativePlace" placeholder="籍贯"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="电子邮箱: " prop="email">
                            <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-message"
                            v-model="emp.email" placeholder="电子邮箱"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="联系地址: " prop="address">
                            <el-input size="mini" style="width: 200px;" prefix-icon="el-icon-edit"
                            v-model="emp.address" placeholder="联系地址"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="职位: " prop="posId">
                            <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px;">
                                <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="职称: " prop="jobLevelId">
                            <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px;">
                                <el-option v-for="item in jobLevels" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="所属部门: " prop="departmentId">
                            <el-select v-model="emp.departmentId" placeholder="所属部门" size="mini" style="width: 150px;">
                                <el-option v-for="item in departments" :key="item.id" :label="item.name" :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="电话号码: " prop="phone">
                            <el-input size="mini" style="width: 200px;" prefix-icon="el-icon-phone"
                            v-model="emp.phone" placeholder="电话号码"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="工号: " prop="workId">
                            <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit"
                            v-model="emp.workId" placeholder="工号" disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5">
                        <el-form-item label="学历: " prop="tiptopDegree">
                            <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini" style="width: 150px;">
                                <el-option v-for="item in tiptopDegrees" :key="item" :label="item" :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="毕业学校: " prop="school">
                            <el-input size="mini" style="width: 150px;" prefix-icon="el-icon-edit"
                            v-model="emp.school" placeholder="毕业学校"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="7">
                        <el-form-item label="专业: " prop="specialty">
                            <el-input size="mini" style="width: 200px;" prefix-icon="el-icon-edit"
                            v-model="emp.specialty" placeholder="专业"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="6">
                        <el-form-item label="入职日期: " prop="beginDate">
                            <el-date-picker v-model="emp.beginDate" size="mini" type="date"
                            value-format="yyyy-MM-dd" style="width: 130px;" placeholder="入职日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="转正日期: " prop="conversionTime">
                            <el-date-picker v-model="emp.conversionTime" size="mini" type="date"
                            value-format="yyyy-MM-dd" style="width: 130px;" placeholder="转正日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同起始日期: " prop="beginContract">
                            <el-date-picker v-model="emp.beginContract" size="mini" type="date"
                            value-format="yyyy-MM-dd" style="width: 130px;" placeholder="合同起始日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item label="合同终止日期: " prop="endContract">
                            <el-date-picker v-model="emp.endContract" size="mini" type="date"
                            value-format="yyyy-MM-dd" style="width: 150px;" placeholder="合同终止日期"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <el-form-item label="身份证号码: " prop="idCard">
                            <el-input size="mini" style="width: 180px;" prefix-icon="el-icon-edit"
                            v-model="emp.idCard" placeholder="身份证号码"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="聘用形式: " prop="engageForm">
                            <el-radio-group v-model="emp.engageForm">
                                <el-radio label="劳动合同">劳动合同</el-radio>
                                <el-radio label="劳务合同">劳务合同</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="婚姻情况: " prop="wedlock">
                            <el-radio-group v-model="emp.wedlock">
                                <el-radio label="已婚">已婚</el-radio>
                                <el-radio label="未婚">未婚</el-radio>
                                <el-radio label="离异">离异</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addEmp">确定</el-button>
                <el-button @click="dialogVisible=false">取消</el-button>
            </span>
        </el-dialog>
        
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
                emps: [],
                title: '',
                dialogVisible: false,
                emp: {
                    id: '',
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nativePlace: '',
                    politicId: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: '',
                    jobLevelId: '',
                    posId: '',
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '',
                    workId: '',
                    contractTerm: '',
                    conversionTime: '',
                    notWorkDate: '',
                    beginContract: '',
                    endContract: '',
                    workAge: ''
                },
                politics: [],
                nations: [],
                positions: [],
                jobLevels: [],
                departments: [],
                tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
                rules: {
                    name: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                        pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
                        message: '身份证号码格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                    nationId: [{required: true, message: '请输入您组', trigger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {
                        type: 'email',
                        message: '邮箱格式不正确',
                        trigger: 'blur'
                    }],
                    phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                    address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
                    departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    tiptopDegree: [{required: true, message: '请输入学历', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                    workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notWorkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同结束日期', trigger: 'blur'}],
                    workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}],
                }
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
        },
        methods: {

            //分页

            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },

            //初始化员工表

            initEmps() {
                this.loading = true;
                let url = '/employee/basic/?page=' + this.page + '&size=' + this.size;
                this.getRequest(url).then(resp => {
                    this.loading = false;
                    if(resp) {
                        this.emps = resp.data.emps;
                        this.total = resp.data.total;
                    }
                })
            },
            initData() {
                if(!window.sessionStorage.getItem("politics")) {
                    this.getRequest('/employee/basic/politics').then(resp => {
                        if(resp) {
                            this.politics = resp.data;
                            window.sessionStorage.setItem("politics", JSON.stringify(resp.data));
                        }
                    })
                }
                else{
                    this.politics = JSON.parse(window.sessionStorage.getItem("politics"));
                }
                if(!window.sessionStorage.getItem("nations")) {
                    this.getRequest('/employee/basic/nations').then(resp => {
                        if(resp) {
                            this.nations = resp.data;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp.data));
                        }
                    })
                }
                else{
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }
                if(!window.sessionStorage.getItem("positions")) {
                    this.getRequest('/employee/basic/positions').then(resp => {
                        if(resp) {
                            this.positions = resp.data;
                            window.sessionStorage.setItem("positions", JSON.stringify(resp.data));
                        }
                    })
                }
                else{
                    this.positions = JSON.parse(window.sessionStorage.getItem("positions"));
                }
                if(!window.sessionStorage.getItem("jobLevels")) {
                    this.getRequest('/employee/basic/jobLevels').then(resp => {
                        if(resp) {
                            this.jobLevels = resp.data;
                            window.sessionStorage.setItem("jobLevels", JSON.stringify(resp.data));
                        }
                    })
                }
                else{
                    this.jobLevels = JSON.parse(window.sessionStorage.getItem("jobLevels"));
                }
                if(!window.sessionStorage.getItem("departments")) {
                    this.getRequest('/employee/basic/departments').then(resp => {
                        if(resp) {
                            this.departments = resp.data;
                            window.sessionStorage.setItem("departments", JSON.stringify(resp.data));
                        }
                    })
                }
                else{
                    this.departments = JSON.parse(window.sessionStorage.getItem("departments"));
                }
            },

            //添加员工

            getMaxWorkId() {
                this.getRequest('/employee/basic/maxWorkId').then(resp => {
                    if(resp) {
                        this.emp.workId = resp.data;
                    }
                })
            },
            emptyEmp() {
                this.emp = {
                    name: '',
                    gender: '',
                    birthday: '',
                    idCard: '',
                    wedlock: '',
                    nationId: '',
                    nativePlace: '',
                    politicId: '',
                    email: '',
                    phone: '',
                    address: '',
                    departmentId: '',
                    jobLevelId: '',
                    posId: '',
                    engageForm: '',
                    tiptopDegree: '',
                    specialty: '',
                    school: '',
                    beginDate: '',
                    workState: '',
                    workId: '',
                    contractTerm: '',
                    conversionTime: '',
                    notWorkDate: '',
                    beginContract: '',
                    endContract: '',
                    workAge: ''
                }
            },
            showAddEmpView() {
                this.title = '添加员工';
                this.emptyEmp();
                this.getMaxWorkId();
                this.dialogVisible = true;
            },
            showEditEmpView(data) {
                this.title = '编辑员工信息';
                this.emp = data;
                this.dialogVisible = true;
            },
            addEmp() {
                if (this.emp.id) {
                    this.$refs['empForm'].validate(valid => {
                        if (valid) {
                            this.putRequest('/employee/basic/', this.emp).then(resp => {
                                if (resp) {
                                    this.dialogVisible = false;
                                    this.initEmps();
                                }
                            })
                        }
                    });
                } else {
                    this.$refs['empForm'].validate(valid => {
                        if (valid) {
                            this.postRequest('/employee/basic/', this.emp).then(resp => {
                                if (resp) {
                                    this.dialogVisible = false;
                                    this.initEmps();
                                }
                            })
                        }
                    });
                }
            },
            deleteEmp(data) {
                this.$confirm('此操作将永久删除【' + data.name + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/employee/basic/" + data.id).then(resp => {
                        if (resp) {
                            this.initEmps();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    }
</script>