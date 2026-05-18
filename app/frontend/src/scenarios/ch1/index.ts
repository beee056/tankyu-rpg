// ─────────────────────────────────────────────────────────────────────────────
// 第1章 マスターシーンマップ
// コマ1〜8 + 隠しコマ5.5 の全シーンを統合したエクスポート
// ─────────────────────────────────────────────────────────────────────────────

export { CHAPTER1_START_SCENE } from "./scene_01";

import { SCENE_MAP as SCENE_MAP_01 } from "./scene_01";
import { SCENE_MAP_02 } from "./scene_02";
import { SCENE_MAP_03 } from "./scene_03";
import { SCENE_MAP_04 } from "./scene_04";
import { SCENE_MAP_05 } from "./scene_05";
import { SCENE_MAP_05_5 } from "./scene_05_5";
import { SCENE_MAP_06 } from "./scene_06";
import { SCENE_MAP_07 } from "./scene_07";
import { SCENE_MAP_08 } from "./scene_08";

import type { SceneData } from "shared-types";

/** 第1章の全シーンをまとめたマスターマップ */
export const CHAPTER1_SCENE_MAP: Record<string, SceneData> = {
  ...SCENE_MAP_01,
  ...SCENE_MAP_02,
  ...SCENE_MAP_03,
  ...SCENE_MAP_04,
  ...SCENE_MAP_05,
  ...SCENE_MAP_05_5,
  ...SCENE_MAP_06,
  ...SCENE_MAP_07,
  ...SCENE_MAP_08,
};
