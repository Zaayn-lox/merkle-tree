/**
 * Seminar 2.5 Simple Trie
 */


class TrieNode {
    constructor(key) {
        this.key = key;
        this.children = {};
        this.isWord = false;
    }
}


class Trie {
    constructor() {
        this.root = new TrieNode(null);
    }

    insert(word) {
        let current = this.root;

        for (const symbol of word) {
            if (!current.children[symbol]) {
                current.children[symbol] = new TrieNode(symbol);
            }

            current = current.children[symbol];
        }

        current.isWord = true;
    }

    hasNode(word) {
        let current = this.root;

        for (const symbol of word) {
            if (!current.children[symbol]) {
                return false;
            }

            current = current.children[symbol];
        }

        return current.isWord;
    }

    getAllNodes() {
        const nodes = [];

        const visit = (node) => {
            for (const child of Object.values(node.children)) {
                nodes.push(child);
                visit(child);
            }
        };

        visit(this.root);

        return nodes;
    }
}

module.exports = { Trie };
