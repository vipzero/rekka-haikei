export const defaultCustomTheme = `
/*
 * tips
 * #aabbcc RGB Hex code
 * #aabbccdd RGB +透過
 * ↓色変数 値だけ変えれば反映される
 */
--font-color: #fff;                // 文字色
--panel-fo: #FBFD8A;            // パネル文字
--panel-fo-shadow-color: #000;        // パネル文字縁
--btn-fo-color: #fff;                 // ボタン文字
--setting-bg-color: #086972;        // 設定背景
--content-bg-color: #086972;        // パネル背景
--btn-bg-color: #87DFD6;              // 設定ボタン背景
--btn-bg-checked-color: #01A9B4;    // 設定ボタン背景有効

--deb-bg: #064750;            // デバッグ背景
--deb-fo: #66dfd3;            // デバッグ背景

#timebar {
  .wrap {
    background-color: orange;
  }
  .fill {
    background-color: #FBFD8A;
  }
  .pointer {
    background-color: green;
  }
}

#panel {
}
#bg {
}
#setting-box {
}
`
