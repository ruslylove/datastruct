---
# You can also start simply with 'default'
theme: seriph
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://cover.sli.dev
# some information about your slides (markdown enabled)
title: Welcome to Algorithm and Data Structures
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
# apply unocss classes to the current slide
class: text-center
# https://sli.dev/features/drawing
drawings:
  persist: false
# slide transition: https://sli.dev/guide/animations.html#slide-transitions
transition: fade
# enable MDC Syntax: https://sli.dev/features/mdc
mdc: true
# open graph
# seoMeta:
#  ogImage: https://cover.sli.dev
addons:
  - slidev-addon-graph

favicon: favicon.png
---

# Welcome to Algorithms and Data Structures
010153523 Algorithms and Data Structures <br>
Semester 1/2025

<div @click="$slidev.nav.next" class="mt-12 py-1" hover:bg="white op-10">
  Press Space for next page <carbon:arrow-right />
</div>

<div class="abs-br m-6 text-xl">
  <button @click="$slidev.nav.openInEditor()" title="Open in Editor" class="slidev-icon-btn">
    <carbon:edit />
  </button>
  <a href="https://github.com/ruslylove/datastruct" target="_blank" class="slidev-icon-btn">
    <carbon:logo-github />
  </a>
</div>

<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->


---

## Content

<Toc maxDepth='1' columns='2' />
---
src: ./lectures/syllabus.md
---
---
src: ./lectures/lect-0-Intro-to-Java.md
---
---
src: ./lectures/lect-1-Algorithms-Analysis.md
---

---
src: ./lectures/lect-2-Arrays.md
---

---
src: ./lectures/lect-3-Singly-Linked-List.md
---
---
src: ./lectures/lect-5-Stack.md
---
---
src: ./lectures/lect-6-Queues.md
---
---
src: ./lectures/lect-4-Doubly-Linked-List.md
---
---
src: ./lectures/lect-6-Queues-DEQ.md
---

---
src: ./lectures/lect-7-Lists.md
---
---
src: ./lectures/lect-8-Recursions.md
---
---
src: ./lectures/lect-9-Trees.md
---
---
src: ./lectures/lect-10-PriQ.md
---
---
src: ./lectures/lect-11-Heap.md
---
---
src: ./lectures/lect-12-Maps.md
---
---
src: ./lectures/lect-13-Hash-Tables.md
---
---
src: ./lectures/lect-14-Binary-Search-Trees.md
---
---
src: ./lectures/lect-15-Mergesort-Quicksort.md
---
---
src: ./lectures/lect-16-Graph.md
---
---
src: ./lectures/lect-17-Shortest-path.md
---
---
src: ./lectures/class-diagram.md
---