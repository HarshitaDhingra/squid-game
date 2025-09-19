function areDOMTreesIdentical(node1, node2) {
  if (!node1 && !node2) return true;
  if (!node1 || !node2) return false;

  // Compare tag names
  if (node1.nodeType !== node2.nodeType) return false;

  // If element, check tag + attributes
  if (node1.nodeType === Node.ELEMENT_NODE) {
    if (node1.tagName !== node2.tagName) return false;

    // Compare attributes
    if (node1.attributes.length !== node2.attributes.length) return false;
    for (let i = 0; i < node1.attributes.length; i++) {
      let attr1 = node1.attributes[i];
      let attr2 = node2.getAttribute(attr1.name);
      if (attr1.value !== attr2) return false;
    }
  }

  // If text node
  if (node1.nodeType === Node.TEXT_NODE) {
    if (node1.nodeValue.trim() !== node2.nodeValue.trim()) return false;
  }

  // Compare children
  if (node1.childNodes.length !== node2.childNodes.length) return false;
  for (let i = 0; i < node1.childNodes.length; i++) {
    if (!areDOMTreesIdentical(node1.childNodes[i], node2.childNodes[i])) {
      return false;
    }
  }

  return true;
}
