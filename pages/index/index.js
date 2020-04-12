//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    username:'',
    content:'',
    msgs:[],
    height:0
  },

  getMsgs:function(){
    wx.request({
      url:'http://minipro.gbook/api/v1/msgs',
      // data:e.detail.value,
      header:{'Accept':'application/json'},
      method:'GET',
      success:(data)=>{
        this.setData({
          msgs:data.data
        })
        console.log(data.data)
      }
    });
  },

  more:function(){
    let current_page = this.data.msgs.meta.current_page;
    let last_page = this.data.msgs.meta.last_page;
    if(current_page < last_page){
      wx.request({
        url:'http://minipro.gbook/api/v1/msgs',
        data:{
          page:current_page+1
        },
        header:{'Accept':'application/json'},
        method:'GET',
        success:(data)=>{
          data.data.data = this.data.msgs.data.concat(data.data.data);
          this.setData({
            msgs:data.data
          })
          console.log("下一页的数据",data.data)
        }
      });
    }else{
      wx.showToast({title:'无更多数据'})
    }
  },
  
  onLoad: function () {
    this.getMsgs()
  },

  //生命周期函数，页面获得展示时触发
  onShow: function(){
    //获取窗口高度
    let h = wx.getSystemInfoSync().windowHeight;
    //得到发表区节点对象，并追加 boundingClientRect() 方法，拥有获取发表区高度
    let write = wx.createSelectorQuery().select("#write").boundingClientRect();
    //执行并获取结果
    write.exec((res)=>{
      //输出计算结果
      this.setData({
        height:h-res[0].height
      })
      console.log(h-res[0].height);
    })
  },

  saveGbook:function(e){
    console.log(e.detail.value);
    wx.request({
      url:'http://minipro.gbook/api/v1/msgs',
      data:e.detail.value,
      header:{'Accept':'application/json'},
      method:'POST',
      success:(data)=>{
        if(data.statusCode==200){
          this.setData({
            username:'',
            content:''
          })
          wx.showToast({
            title: '发表成功',
          });
          this.getMsgs()
        }else{
          wx.showToast({
            title: '发表失败',
            icon:'none'
          });
        }
        console.log(data)
      }
    });
  }
})
