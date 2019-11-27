import $axios from '@/utils/request'
export default {
    data() {
        return {
            dataTotal: 0,
            page: 1,
            psize: 10,
            dataTotal_dialog: 0,
            page_dialog: 1,
            psize_dialog: 10,
            tableDataSource: [],
            tableDataSource_dialog: [],
            url: '',
            url_dialog: '',
            searchForm: {},
            searchForm_dialog: {},
        }
    },
    methods: {
        //获取table数据list
        getList(url) {
            this.url = url;
            $axios({
                url: url,
                method: 'post',
                data: {
                    searchForm: this.searchForm,
                    page: this.page,
                    rows: this.psize
                }
            }).then(res => {
                const resp = res.data;
                if (resp.flag) {
                    this.dataTotal = resp.data.total;
                    this.tableDataSource = resp.data.rows;
                } else {
                    this.warn(resp.message)
                }
            })
        },
        //更换每页数据条数
        handleSizeChange(val) {
            this.$refs.searchFrom.$children[0].resetFields();
            this.psize = val;
            this.page = 1;
            this.getList(this.url);
        },
        //更换页数
        handleCurrentChange(val) {
            this.$refs.searchFrom.$children[0].resetFields();
            this.page = val;
            this.getList(this.url);
        },

        //dialog部分

        //获取table数据list
        getList_dialog(url) {
            this.url_dialog = url;
            $axios({
                url: url,
                method: 'post',
                data: {
                    searchForm: this.searchForm_dialog,
                    page: this.page_dialog,
                    rows: this.psize_dialog
                }
            }).then(res => {
                const resp = res.data;
                if (resp.flag) {
                    this.dataTotal_dialog = resp.data.total;
                    this.tableDataSource_dialog = resp.data.rows;
                } else {
                    this.warn(resp.message)
                }
            })
        },
        //更换每页数据条数
        handleSizeChange_dialog(val) {
            this.$refs.searchFrom.$children[0].resetFields();
            this.psize_dialog = val;
            this.getList_dialog(this.url_dialog);
        },
        //更换页数
        handleCurrentChange_dialog(val) {
            this.$refs.searchFrom.$children[0].resetFields();
            this.page_dialog = val;
            this.getList_dialog(this.url_dialog);
        },

        
        //查询
        formSearch(model) {
            this.searchForm = model;
            this.page = 1;
            this.getList(this.url);
        },
        //关闭弹窗
        closeDialog() {
            this.dialogFormVisible = false;
        },
    }
}