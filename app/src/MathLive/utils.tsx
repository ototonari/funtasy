import React from "react";

type VirtualKeyboardSpaceProps = {
  height?: number
}

// 仮想キーボードにより画面の縦方向に強制的にスペースが増され、消える時にスクロールダウンするのを防ぐためのスペーサー
export const VirtualKeyboardSpace: React.FC<VirtualKeyboardSpaceProps> = ({height = 300}) => (
  <div style={{ height: height}} />
)
