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
        src: "",
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
      component: vinComponent,
      src: imgUrl + "vin.png",
      acSrc: imgUrl + "ac-vin.png",
      id: 1005,
      checked: true,
    },
    {
      component: ruleComponent,
      unique: "rule",
      name: "活动规则",
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

const addRepeactAssembly = (id: Number, data: any[]) => {
  let addObjectOrigin = state.list.find((item: any) => {
    return item.id == id;
  });
  let dealJsonObj = JSON.parse(JSON.stringify(addObjectOrigin));
  // 暂时用随机数-后续处理保证唯一性
  let mathRan: any = Math.random() * 10000;
  dealJsonObj.id = parseInt(mathRan);
  dealJsonObj.name = dealJsonObj.name + dealJsonObj.id;
  // 默认值处理
  dealJsonObj.option = dealJsonObj.unique == "kv" ? { width: 100 } : {};
  // 追加可复用组件
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
  data.push(dealJsonObj);
};

export { state, addRepeactAssembly };
