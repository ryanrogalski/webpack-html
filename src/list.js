class Node {
  constructor(data, next = null) {
    this.data = data
    this.next = next
  }
}

class LinkedList {
  constructor() {
    this.head = null
  }

  insertAtStart(data) {
    const node = new Node(data, this.head)
    this.head = node
  }

  insertAtEnd(data) {
    const node = new Node(data)

    if (!this.head) {
      this.head = node
    } else {
      let tail = this.head

      while (tail.next !== null) {
        tail = tail.next
      }
      tail.next = node
    }
    return this.head
  }

  findAt(index) {
    let counter = 0
    let node = this.head
    while (node) {
      if (counter === index) {
        return node
      }
      counter++
      node = node.next
    }
    return null
  }

  insertAt(data, index) {
    const node = new Node(data)

    if (!this.head) {
      this.head = node
      return
    }

    if (index === 0) {
      this.insertAtStart(data)
    } else {
      const prev = this.getAt(index - 1)
      node.next = prev.next
      prev.next = node
      return this.head
    }
  }
}

const list = new LinkedList()

list.insertAtStart('start')
list.insertAtStart('start 2')
list.insertAtStart('start 3')
const two = list.findAt(2)
list.insertAtEnd('end')

console.log(list, two)
