import { defineMermaidSetup } from '@slidev/types'

const FONT_STACK = '"Trebuchet MS", "Helvetica Neue", Arial, sans-serif'

export default defineMermaidSetup(() => ({
  theme: 'default',
  fontFamily: FONT_STACK,
  themeCSS: `
    svg, .nodeLabel, .edgeLabel, .cluster-label, .label,
    text, tspan,
    foreignObject, foreignObject div, foreignObject span, foreignObject p {
      font-family: ${FONT_STACK} !important;
    }
    .nodeLabel, .edgeLabel, .cluster-label {
      white-space: nowrap !important;
    }
  `,
  flowchart: {
    htmlLabels: true,
    padding: 16,
    nodeSpacing: 40,
    rankSpacing: 40,
    useMaxWidth: true,
  },
  sequence: {
    useMaxWidth: true,
  },
  class: {
    useMaxWidth: true,
  },
}))
