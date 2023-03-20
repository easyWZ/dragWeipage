import { ref, reactive } from "vue";
import topSetComponent from "/src/views/preview/view-topset.vue";
import justBuyComponent from "/src/views/preview/view-justBuy.vue";

const imgUrl = "./img/item/";
const viewstate = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  //注意新增组件id唯一性
  list: [
    {
      name: "基础配置",
      component: topSetComponent,
      unique:'topset',
      src: imgUrl + "kv.png",
      acSrc: imgUrl + "ac-kv.png",
      id: 1000,
      checked: false,
      option: {
        title: '',
        placeHolder:'活动页名称',
        bgColor:'#f5f5f5',
        bgSrc:'',
        share:{
          title:'',
          titlePlaceholder:'分享该页面的时候展示',
          content:'',
          contentPlaceholder:'用户通过微信分享给朋友展示',
          imgUrl:''
        },
        width:'',
      },
    },
    {
      name: "立即购买",
      component: justBuyComponent,
      src: imgUrl + "buy.png",
      acSrc: imgUrl + "ac-buy.png",
      id: 1004,
      checked: false,
    },
  ],
});

export { viewstate };
