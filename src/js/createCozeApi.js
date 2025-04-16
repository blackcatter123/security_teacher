let coze = new CozeWebSDK.WebChatClient({
  config: {
    bot_id: "7486427999148392459",
    isIframe: false,
  },
  componentProps: {
    title: "基于AI agent的民航安检教学辅助平台",
  },
  auth: {
    type: "token",
    token:
      "pat_wYaRyA0why0gSYu5TlcFMRvWmkkTgmrkD0zI2EI5dF4YWR5rGQ9xiLfMEbqUcJxp",
    onRefreshToken: function () {
      return "pat_wYaRyA0why0gSYu5TlcFMRvWmkkTgmrkD0zI2EI5dF4YWR5rGQ9xiLfMEbqUcJxp";
    },
  },
  ui: {
    base: {
      icon: "./public/photos/Logo2.png",
      layout: "pc",
    },
  },
  footer: {
    isShow: true,
    expressionText: "基于AI agent的民航安检智能化教学辅助平台",
  },
});
function openCoze() {
  coze.showChatBot();
}
