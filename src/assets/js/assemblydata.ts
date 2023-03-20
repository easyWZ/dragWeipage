import { reactive } from "vue";
import kvComponent from "/src/views/preview/view-kv.vue";
import justBuyComponent from "/src/views/preview/view-justBuy.vue";
import goodsComponent from "/src/views/preview/view-goods.vue";
import ruleComponent from "/src/views/preview/view-rule.vue";
import vinComponent from "/src/views/preview/view-vin.vue";

const imgUrl = "./img/item/";
const state = reactive({
  //需要拖拽的数据，拖拽后数据的顺序也会变化
  //注意新增组件id唯一性
  list: [
    {
      name: "KV图",
      component: kvComponent,
      unique: "kv",
      repeatNumber: 1,
      isMaxRepeat: false,
      src: imgUrl + "kv.png",
      acSrc: imgUrl + "ac-kv.png",
      id: 1001,
      checked: true,
      option: {
        width: 100,
        src: "/img/item/kv-1.jpg",
      },
    },
    {
      name: "商品",
      unique: "goods",
      component: goodsComponent,
      src: imgUrl + "goods.png",
      acSrc: imgUrl + "ac-goods.png",
      id: 1002,
      checked: true,
    },
    {
      name: "VIN",
      unique: "vin",
      repeatNumber: 1,
      isMaxRepeat: false,
      component: vinComponent,
      src: imgUrl + "vin.png",
      acSrc: imgUrl + "ac-vin.png",
      id: 1005,
      checked: true,
    },
    {
      name: "活动规则",
      component: ruleComponent,
      unique: "rule",
      repeatNumber: 1,
      isMaxRepeat: false,
      src: imgUrl + "rule.png",
      acSrc: imgUrl + "ac-rule.png",
      id: 1003,
      checked: true,
    },
    {
      name: "立即购买",
      undraggable: true,
      component: justBuyComponent,
      src: imgUrl + "buy.png",
      acSrc: imgUrl + "ac-buy.png",
      id: 1004,
      checked: false,
    },
  ],
});

const addRepeactAssembly = (id: any, data: any[]) => {
  // 校验name不同
  let appendObj: any = state.list.find((slist) => {
    return slist.id == id;
  });
  let slistzindex = 0;
  state.list.forEach((slist: any, sindex: number) => {
    if (slist.name == appendObj.name) {
      slistzindex = sindex;
    }
  });
  let addObjectOrigin = state.list[slistzindex];
  // 深复制
  let dealJsonObj = JSON.parse(JSON.stringify(addObjectOrigin));
  // 暂时用随机数-后续处理保证唯一性
  let mathRan: any = Math.random() * 10000;
  dealJsonObj.id = parseInt(mathRan);
  dealJsonObj.name = dealJsonObj.name + dealJsonObj.id;
  // 默认值处理
  dealJsonObj.option =
    dealJsonObj.unique == "kv" ? { width: 100, src: "/img/item/kv-1.jpg" } : {};
  // 组件加载
  dealJsonObj.component =
    id == 1001
      ? kvComponent
      : id == 1002
      ? goodsComponent
      : id == 1003
      ? ruleComponent
      : id == 1005
      ? vinComponent
      : "";
  // 深复制数据替换浅复制产生数据
  data.forEach((dItem, index) => {
    if (dItem.name == appendObj.name) {
      data[index] = dealJsonObj;
    }
  });
};

export { state, addRepeactAssembly };
