// コマンド
// npm run build -- --env.page=top

module.exports = env => {
  const entries = ['./_src/index.js'];

  // ページ毎にCSSを出力できるよう、分岐処理を作成 04月12日
  switch (env.page) {
    case "top":
      console.log("top");
      break;
    case "list":
      console.log("list");
      break;
    case "cost":
      console.log("cost");
      break;
    default:
  }

  return {
    entry: entries,
  };
};
