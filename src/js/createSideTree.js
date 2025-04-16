import { Graph, NodeEvent, treeToGraphData } from "@antv/g6";
import axios from "axios";
let treeData;

async function getTreeData() {
  try {
    await axios.get(".././public/datasrc/treeData.json").then((res) => {
      treeData = res.data;
      createTree(treeData);
    });
  } catch {}
}
function createTree(data) {
  const graph = new Graph({
    container: "container",
    data: treeToGraphData(data),
    autoFit: {
      type: "view",
      options: {
        direction: "both",
      },
    },
    node: {
      style: {
        size: (d) => d.size,
        fill: (d) => {
          if (d.grade === 1) {
            return "#0050b3";
          } else if (d.grade === 2) {
            return "#096dd9";
          } else if (d.grade === 3) {
            return "#40a9ff";
          } else {
            return "#69c0ff";
          }
        },
        cursor: "pointer",
        haloStroke: "#cccccc",
        labelText: (d) => d.id,
        labelPlacement: "bottom",
        labelBackground: true,
        labelOffsetX: 4,
        labelBackgroundShadowColor: "black",
        labelBackgroundRadius: 2,

        badge: true, // 是否显示徽标
        badges: (e) => {
          if (e.isPass == undefined) {
            return [{ text: "未通过", placement: "right-center" }];
          } else if (e.isPass == 1) {
            return [{ text: "已通过", placement: "right-center" }];
          } else if (e.isPass == 2) {
            return [{ text: "五级安检员", placement: "right-center" }];
          }
        },
        badgePalette: (e) => {
          if (e.isPass == undefined) {
            return ["#F4664A"];
          } else if (e.isPass == 1) {
            return ["#00af57ff"];
          } else if (e.isPass == 2) {
            return ["#F6BD16"];
          }
        }, // 徽标的背景色板
        badgeFontSize: (e) => {
          if (e.grade == 1) {
            return 10;
          } else if (e.grade == 2) {
            return 8;
          } else if (e.grade == 3) {
            return 7;
          } else if (e.grade == 4) {
            return 6;
          }
        }, // 徽标字体大小
      },
      animation: {
        enter: false,
      },
      state: {
        selected: {
          lineWidth: 2,
          stroke: "black",
        },
      },
    },
    edge: {
      type: "polyline",
      style: {
        stroke: "white",
        radius: 4,
        router: {
          type: "orth",
        },
      },
      animation: {
        enter: false,
      },
    },
    layout: {
      type: "indented",
      direction: "LR",
      indent: 40,
      getHeight: () => 20,
      getWidth: () => 32,
    },
    behaviors: [
      {
        type: "click-select",
        degree: 0,
        unselectedState: "inactive",
      },
      "collapse-expand",
      "drag-canvas",
    ],
    plugins: [
      {
        type: "tooltip",
        trigger: "click",
        enterable: true,
        getContent: (e, items) => {
          let result = `<p  style="font-weight: bolder;font-size:0.8rem">你当前所在的目录为:<span style="font-weight:bolder;font-size:1rem">${
            items[0].depth + 1
          }级目录</span></p>
          <p><span style="color:orange;font-size:1rem">·${
            items[0].id
          }</span></p><p class="enterIn" onclick="enterTeachPage()">点击进入学习</p>`;
          return result;
        },
      },
      {
        type: "toolbar",
        position: "top-right",
        // style: {
        //   height: "30px",
        //   width: "30px",
        //   marginRight: "20px",
        //   backgroundColor: "#ffffff",
        // },
        style: {
          height: "30px",
          width: "55px",
          marginRight: "20px",
          backgroundColor: "#ffffff",
        },
        getItems: () => [
          { id: "auto-fit", value: "auto-fit" },
          { id: "zoom-in", value: "zoom-in" },
        ],
        onClick: (value) => {
          // 处理按钮点击事件
          if (value === "auto-fit") {
            graph.fitView();
          } else if (value === "zoom-in") {
            graph.zoomBy(1.1);
          }
        },
      },
      {
        type: "watermark",
        text: "基于AI agent的民航安检教学辅助平台",
        width: 400,
        opacity: 0.05, // 透明度
        rotate: Math.PI / 12, // 旋转角度
        backgroundRepeat: "repeat",
        backgroundPosition: "middle",
      },
    ],
  });
  // graph.on(NodeEvent.POINTER_OVER, (element) => {
  //   console.log(element);
  // });
  graph.render();
}
getTreeData();
