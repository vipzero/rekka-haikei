export const defaultCustomTheme = `
/*
 * tips
 * #aabbcc RGB Hex code
 * #aabbccdd RGB +透過
 * ↓色変数 値だけ変えれば反映される
 */
--font-color: #FFC627;                // 文字色
--panel-fo-color: #FFC627;            // パネル文字
--panel-fo-shadow-color: #000;        // パネル文字縁
--btn-fo-color: #fff;                 // ボタン文字
--setting-bg-color: #8C1D40aa;        // 設定背景
--content-bg-color: #8C1D40aa;        // パネル背景
--sub-bg-color: #8C1D40ee;            // デバッグ背景
--btn-bg-color: #00A3E0;              // 設定ボタン背景
--btn-bg-checked-color: #00A3E088;    // 設定ボタン背景有効

#timebar {
  .wrap {
    background-color: orange;
  }
  .fill {
    background-color: purple;
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
--sub-bg-color: #795548ee;                        // デバッグ背景
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
