class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(value, priority) {
    const newItem = { value, priority };
    let inserted = false;

    // Insert based on priority
    for (let i = 0; i < this.items.length; i++) {
      if (priority < this.items[i].priority) {
        this.items.splice(i, 0, newItem);
        inserted = true;
        break;
      }
    }

    if (!inserted) {
      this.items.push(newItem); // lowest priority, push to end
    }
  }

  dequeue() {
    return this.isEmpty() ? null : this.items.shift().value;
  }

  peek() {
    return this.isEmpty() ? null : this.items[0].value;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

module.exports = { PriorityQueue };
