import { h, reactive, RendererElement, RendererNode, VNode } from "vue";

function renderIcon(className: string) {
  return () => h("i", {
    className
  })
}
const globalStore = reactive<{
  consoleErrorCount: number //* 控制台错误数量
}>({
  consoleErrorCount: 0
})

export default globalStore