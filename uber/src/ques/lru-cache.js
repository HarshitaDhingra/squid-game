// v1

// var LRUCache = function(capacity) {
//     this.capacity = capacity;
//     this.cache = new Map();
// };

// /** 
//  * @param {number} key
//  * @return {number}
//  */
// LRUCache.prototype.get = function(key) {
//        if (!this.cache.has(key)) return -1;

//         // Move accessed key to end (most recently used)
//         const value = this.cache.get(key);
//         this.cache.delete(key);
//         this.cache.set(key, value);

//         return value;
// };

// /** 
//  * @param {number} key 
//  * @param {number} value
//  * @return {void}
//  */
// LRUCache.prototype.put = function(key, value) {
//     if (this.cache.has(key)) {
//             // Remove key to re-insert at end
//             this.cache.delete(key);
//         }

//         this.cache.set(key, value);

//         // If capacity exceeded, remove least recently used (first item)
//         if (this.cache.size > this.capacity) {
//             const lruKey = this.cache.keys().next().value; // Get first key
//             this.cache.delete(lruKey);
//         }
// };

// v2
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity; // 
    this.map = new Map(); // key -> { key, value, prev: null, next: null }; // node
    this.head = null; // most recently used
    this.tail = null; // least recently used
  }

  // remove node from linked list
  removeNode(node) {
    if (node.prev) node.prev.next = node.next;
    else this.head = node.next;

    if (node.next) node.next.prev = node.prev;
    else this.tail = node.prev;
  }

  // add node at head (most recent)
  addToHead(node) {
    node.prev = null;
    node.next = this.head;

    if (this.head) this.head.prev = node;
    this.head = node;
    if (!this.tail) this.tail = node; // first node
  }

  get(key) {
    if (!this.map.has(key)) return -1;

    const node = this.map.get(key);
    this.removeNode(node);
    this.addToHead(node);

    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.value = value;
      this.removeNode(node);
      this.addToHead(node);
    } else {
      if (this.map.size >= this.capacity) {
        this.map.delete(this.tail.key);
        this.removeNode(this.tail);
      }

      const newNode = { key, value, prev: null, next: null };
      this.addToHead(newNode);
      this.map.set(key, newNode);
    }
  }
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */