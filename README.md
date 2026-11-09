# 霧島澪 · 设计档案（Mio Design Archive）

> 本文是 2026-11-08 初版说明；卷数/件数会随每晚同步增长，实时数字见 [`STATS.md`](STATS.md)。

把 [@Mio_2am](https://x.com/Mio_2am) 的「九宫格设计」系列整理成可检索的本地资料库：
**18 卷姿势 + 8 卷服装 + 6 卷发型，共 32 卷、288 件**，每件都有固定编号、单件裁切图、中文说明、出图提示词、中英对照、主题标签和原帖链接。

打开 `index.html` 即可浏览（纯静态，离线可用，不需要服务器）。

---

## 1. 整理思路

作者的原帖结构非常规整：一条推文 = 一张 3×3 九宫格 = 9 个设计，格内有 1–9 编号，姿势卷通常还带英文动作名。
所以不按时间流水账，而是按 **系列 → 卷 → 编号** 三层归档：

```
P-08-03   姿势 Pose   第 8 卷   第 3 号
C-05-07   服装 Cloth  第 5 卷   第 7 套
H-06-02   发型 Hair   第 6 卷   第 2 式
```

这样带来三个好处：

1. **可引用**：发提示词或讨论时只写 `P-08-03`，不用贴图；
2. **可交叉**：姿势卷和服装卷共用卷号体系，能组合（如 P-16 排球动作 × C-06 排球服）；
3. **可扩展**：补新卷只是在数据里追加一条，不影响旧编号。

每卷再补一层「主题」与「标签」：舞蹈 / 坐姿 / 站姿 / 躺姿 / 健身 / 排球 / 高尔夫 / 礼服 / 秋装 / 暗黑 / 马尾 / 短发……
用于筛选，不替代编号。

## 2. 目录结构

```
library/
├─ index.html                 # 主画廊：分卷 / 平铺 / 搜索 / 灯箱
├─ data.json                  # 结构化数据（卷、件、标签、原帖、路径）
├─ data.js                    # 同上，供 index.html 直接加载
├─ tagdict.js                 # 标签中英对照表，供详情面板逐词对译
├─ mio-design-library.csv     # 288 行表格，可直接进 Excel / Notion
├─ mio-design-index.md        # 纯文本索引，按卷列出九件名称
├─ mio-prompts.md             # 提示词手册，按卷/件列出中文说明 + prompt + 中文对照
├─ overview.jpg               # 32 卷封面总览图
└─ assets/
   ├─ sheets/                 # 每卷一张原九宫格（32 张）
   └─ tiles/                  # 每卷裁成 9 张单件图（288 张）
```

## 3. 数据字段

| 字段 | 说明 |
|---|---|
| `slug` | `pose-08` / `cloth-05` / `hair-06` |
| `series` | `pose` / `cloth` / `hair` |
| `vol` | 卷号，与原帖 Vol. 对齐 |
| `theme_zh` / `theme_en` | 主题（舞蹈、坐姿、秋装…） |
| `note` | 一句话策展说明 |
| `tags` | 卷级标签，用于筛选 |
| `url` / `date` | 原帖与发布日期 |
| `items[].id` | `P-08-03` 形式的稳定编号 |
| `items[].name` | 格内英文名（OCR）或人工命名；无名卷用 `Pose 03-01` / `Look 01` |
| `items[].zh` | 中文动作 / 服装 / 发型说明 |
| `items[].prompt` | 英文标签式出图提示词 |
| `items[].prompt_zh` | 提示词的中文对照（按标签顺序逐词对译，`，`连接） |
| `items[].tile` | 单件裁切图路径 |

## 4. 覆盖范围

- **姿势 Pose**：Vol.01–18（18 卷 / 162 件）
- **服装 Cloth**：Vol.01–08（8 卷 / 72 件）
- **发型 Hair**：Vol.01–06（6 卷 / 54 件）

共 **32 卷 / 288 件**，编号连续无断档。早期未标 Vol. 的卷（Pose 01–02、Cloth 01–02、Hair 01–04）按发布顺序回溯编号，与后来明确标注的卷号衔接。

## 5. 中文说明与出图提示词

每件都补了两层文本：

- `zh`：中文动作 / 服装 / 发型说明（姿势写重心、四肢、躯干与视线；服装写上装、下装、外套、鞋与配色；发型写长度、分缝、刘海与纹理）。
- `prompt`：英文逗号标签，Danbooru 风格，以 `1girl, solo, ...` 开头，只描述内容，不含质量词。

推荐搭配：

- 正向前缀：`masterpiece, best quality, very aesthetic, absurdres`（Illustrious / Noob 系）；写实模型可换 `photorealistic, 35mm photo`。
- 负向：`lowres, worst quality, low quality, bad anatomy, bad hands, extra fingers, missing fingers, text, watermark, signature, jpeg artifacts, multiple views`。

在画廊里点开任意一件，右侧可「复制提示词 / 复制含前缀 / 复制中文对照 / 复制负向」。提示词下方有**中文对照**：一行整句中文 + 一排逐词对照标签（英文标签 → 中文），CSV 也包含「中文说明」「提示词」「中文对照」三列。

288 件说明与提示词均由逐格视觉核对撰写；源文件在项目根目录的 `prompts/{slug}.json`。个别左右手/鞋型若与你的判断不同，直接改对应 JSON 后重跑 `apply_prompts.py` + `finalize.py` 即可。

中文对照由根目录 `tagdict.json`（1256 条标签词表）逐词匹配生成，`bilingual.py` 负责导出 `library/tagdict.js`；遇到词表里没有的新标签，运行 `python3 bilingual.py` 会列出缺译项，补进 `tagdict.json` 后重跑 `finalize.py`。

## 6. 如何补一卷

1. 把该卷九宫格原图放进 `raw/{slug}.jpg`；
2. 在项目根目录 `volumes.json` 追加一条：
   ```json
   {"slug":"pose-18","series":"pose","vol":18,"date":"2026-11-09",
    "url":"https://x.com/Mio_2am/status/...","theme_zh":"主题","theme_en":"Theme",
    "tags":["标签"],"note":"一句话说明","file":"raw/pose-18.jpg","names":null}
   ```
   `names: null` 表示用 OCR 读格内名称；无名称的卷传 9 项名称数组；
3. 运行：
   ```bash
   PY=/Users/zhaojizong/.dsh/dsh-runtimes/dsh-primary-runtime/dependencies/python/bin/python3
   $PY build_library.py     # 切图 + OCR + 写 data.json
   $PY apply_prompts.py     # 把 prompts/{slug}.json 里的中文说明/提示词合入
   $PY finalize.py          # data.js / tagdict.js / CSV / Markdown / STATS（含中文对照）
   $PY make_overview.py     # 总览图
   ```
4. 刷新 `index.html`。

OCR 用 macOS Vision（`ocr.swift` 编译出的 `ocr`），对格内英文名识别率很高；编号与名称同格时按 3×3 位置归属。

## 6.5 导出图片包（分发用）

```bash
$PY export_images.py        # 生成 dist/mio-images/
cd dist && zip -rq -X mio-images-$(date +%Y%m%d).zip mio-images
```

`dist/mio-images/` 是扁平目录，共 321 张图：32 张九宫格（`sheet-pose-18.jpg`）、288 张单件图（文件名即编号，如 `P-18-01.jpg`）、1 张总览，另附 `MANIFEST.csv` 与 `README.md`。整个目录约 12 MB，可直接压缩分发。

## 7. 每日自动同步（20:00）

已配置定时任务：每天 **20:00（Asia/Shanghai）** 运行一次增量同步。

- 手动执行：`bash sync.sh --days 3`
- 逻辑：搜索最近 3 天的 `from:Mio_2am Vol` → 对比 `state.json` → 下载新九宫格 → OCR → 追加 `volumes.json` → 重建画廊/CSV/统计
- 新卷的 `pending.json` 会列出待补文案；定时任务里的 agent 按 `SYNC.md` 逐格补中文说明与提示词
- 实时统计见 [`STATS.md`](STATS.md)

## 8. 工程文件（项目根目录）

| 文件 | 作用 |
|---|---|
| `volumes.json` | 卷目录，唯一数据源（32 卷） |
| `state.json` | 同步游标：最后同步时间 + 各系列已知最大卷号 |
| `sync.py` / `sync.sh` | 每日增量同步脚本 |
| `SYNC.md` | 定时任务 runbook（含提示词写作规范） |
| `pending.json` | 待补文案的新卷列表 |
| `prompts/` | 每卷的 `{slug}.json`，中文说明 + 提示词源文件 |
| `tagdict.json` | 标签中英对照词表（1256 条），新卷新标签从这里补 |
| `bilingual.py` | 生成逐词中文对照 / 导出 `library/tagdict.js` / 报告缺译 |
| `build_library.py` | 从 `volumes.json` 切图 + 生成 `data.json` |
| `apply_prompts.py` | 合并 `prompts/` 到数据 |
| `finalize.py` | 生成 data.js / tagdict.js / CSV / Markdown / STATS |
| `make_overview.py` | 生成 32 卷封面总览 |
| `export_images.py` | 把全部图片导出到 `dist/mio-images/`（扁平目录 + MANIFEST.csv），便于打包分发 |

## 9. 版权与边界

设计、图片和角色版权归 **@Mio_2am（霧島澪 / Kirishima Mio）** 所有。
作者在原帖中明确表示可以引用、可以作为姿势/搭配参考；本资料库只是本地个人参考整理，
**请勿二次分发图片本体，也不要用于商业再发布**。引用时请保留原帖链接与作者署名。

整理：2026-11-08
