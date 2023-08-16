export const defaultCustomTheme = `
/*
 * tips
 * #aabbcc RGB Hex code
 * #aabbccdd RGB +透過
 * ↓色変数 値だけ変えれば反映される
 */
--font-color: #fff;                // 文字色
--panel-fo-color: #FBFD8A;            // パネル文字
--panel-fo-shadow-color: #000;        // パネル文字縁
--btn-fo-color: #fff;                 // ボタン文字
--setting-bg-color: #086972;        // 設定背景
--content-bg-color: #086972;        // パネル背景
--deb-bg-color: orange;            // デバッグ背景
--btn-bg-color: #87DFD6;              // 設定ボタン背景
--btn-bg-checked-color: #01A9B4;    // 設定ボタン背景有効

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
export const chocoTheme = `
--font-color: #FFC627;                          // 文字色
--panel-fo-color: #FFe697;                      // パネル文字
--panel-fo-shadow-color: #000;               // パネル文字縁
--btn-fo-color: black;                        // ボタン文字
--setting-bg-color: #311;                    // 設定背景
--content-bg-color: #795548ee;               // パネル背景
--deb-bg-color: #795548ee;                        // デバッグ背景
--btn-bg-color: #ffe;        // 設定ボタン背景
--btn-bg-checked-color: #dda; // 設定ボタン背景有効

--bingo-bg-color: #333;
--bingo-bg-hit-color: #FFe697;


#timebar {
  .wrap {
    background: #ffa;
  }
  .fill {
    background-color: var(--setting-bg-color);
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

#the-goal-of-all-life-is-death {
    background: black;
    color: lime;
}
`
