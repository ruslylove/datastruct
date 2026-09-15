'use strict';

/**
 * Minimal Graph ADT (undirected), mirroring the Vertex/Edge style from
 * lect-18-Graph.md / lab12.tex: vertices hold an arbitrary element,
 * edges hold a weight and metadata, and the graph exposes an adjacency
 * list keyed by vertex.
 */
class Graph {
  constructor() {
    this._vertices = new Map(); // code -> element
    this._adj = new Map();      // code -> Array<Edge>
  }

  insertVertex(code, element) {
    if (!this._vertices.has(code)) {
      this._vertices.set(code, element);
      this._adj.set(code, []);
    }
    return code;
  }

  hasVertex(code) {
    return this._vertices.has(code);
  }

  vertexElement(code) {
    return this._vertices.get(code);
  }

  vertices() {
    return this._vertices.keys();
  }

  numVertices() {
    return this._vertices.size;
  }

  /** Insert a directed edge from -> to. Call twice to represent an undirected link. */
  insertEdge(from, to, weight, meta = {}) {
    if (!this._adj.has(from)) throw new Error(`Unknown vertex: ${from}`);
    if (!this._adj.has(to)) throw new Error(`Unknown vertex: ${to}`);
    const edge = { from, to, weight, ...meta };
    this._adj.get(from).push(edge);
    return edge;
  }

  outgoingEdges(code) {
    return this._adj.get(code) || [];
  }

  numEdges() {
    let count = 0;
    for (const list of this._adj.values()) count += list.length;
    return count;
  }
}

module.exports = { Graph };
