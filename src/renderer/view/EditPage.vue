<template>
    <div id="ex-edit-page">
        <el-container>
            <el-aside class="ec-aside" width="200px">
                <div class="ec-title">
                    EasyConfig
                </div>
                <el-menu @select="onSelect" background-color="#303133" text-color="#fff" active-text-color="#fff">
                    <el-menu-item :class="{'is-active':f.title===currentFile.title}" :index="i+''"
                                  v-for="(f,i) in files">
                        <div class="ec-file-item">
                            <div class="ec-file-item-title"><i
                                    class="el-icon-document"></i>{{f.title}}
                            </div>
                            <el-switch
                                    class="ec-file-item-use-switch"
                                    v-model="f.use"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </div>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header class="ec-header">
                    <el-input @keyup.enter.native="saveAliasFile" v-model="currentFile.newTitle"
                              placeholder="请输入内容"></el-input>
                </el-header>
                <el-main>
                    <el-input
                            @keyup.meta.83.native="saveAliasFile"
                            @keyup.ctrl.83.native="saveAliasFile"
                            type="textarea"
                            :rows="15"
                            placeholder="请输入内容"
                            v-model="currentFile.text">
                    </el-input>

                </el-main>
                <el-footer class="ec-footer">
                    <el-button type="primary" plain>使用</el-button>
                    <el-button type="danger" plain>删除</el-button>
                </el-footer>
            </el-container>
        </el-container>
    </div>
</template>
<script>
  const {ipcRenderer} = require('electron')

  export default {
    name: 'edit-page',
    data () {
      return {
        files: [],
        currentFile: {}
      }
    },
    methods: {
      onSelect (v) {
        this.setCurrentFile(this.files[parseInt(v)])
      },
      setCurrentFile (file) {
        if (!file) {
          return
        }
        this.currentFile = {...file}
        this.currentFile.newTitle = this.currentFile.title
      },
      saveAliasFile () {
        let _this = this
        ipcRenderer.send('save-alias-file', this.currentFile)
        ipcRenderer.on('saved-alias-file', () => {
          _this.initAliasFiles()
        })
      },
      initAliasFiles () {
        let _this = this
        ipcRenderer.send('load-alias-files')
        ipcRenderer.on('loaded-alias-files', (event, files) => {
          _this.files = files
          this.setCurrentFile(_this.files[0])
        })
      }
    },
    mounted () {
      this.initAliasFiles()
      ipcRenderer.send('init-files')
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
    @main-height: 60px;
    @menu-item-height: 50px;
    #ex-edit-page {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        display: flex;
    }

    .ec-aside {
        width: 200px;
        color: #fff;
        background-color: #303133;
        ul.el-menu {
            border-right: none;
            li.el-menu-item {
                height: @menu-item-height;
                line-height: @menu-item-height;
                &.is-active {
                    background-color: #262729 !important;
                }

                .ec-file-item {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .ec-file-item-title {
                        flex: 1;
                    }
                    .ec-file-item-use-switch {
                        flex: 0;
                    }
                }
            }
        }
    }

    .ec-title {
        height: @main-height;
        line-height: @main-height;
        text-align: center;
    }

    .ec-header {
        line-height: @main-height;
    }

    .ec-footer {
        text-align: center;
        vertical-align: middle;
        line-height: @main-height;
    }
</style>