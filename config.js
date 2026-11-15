/**
 * 埋点配置（与 char-db-cn / ai-ref-library-cn 保持一致）：
 * 同一个 Microsoft Clarity 项目 r1wmvdsf4a，站点在 sleepyzone.online 下，
 * 报表里按 URL 过滤（包含 mio-design-archive）即可只看本站。
 *
 * 关闭埋点：把 providers 改成 []（只保留本地 window.__trackLog，不发请求）。
 * 调试：控制台执行 window.__trackDebug = true 后刷新，可看到每条事件。
 */
window.ANALYTICS = {
  providers: [
    { provider: "clarity", id: "r1wmvdsf4a" }
  ]
};
