/**
 * Lightweight, fast syntax tokenizer for DevType code snippets.
 * Optimized for C++, Java, and C#.
 */
(function (global) {
  const KEYWORDS = {
    cpp: new Set([
      'using', 'namespace', 'std', 'int', 'float', 'double', 'bool', 'char',
      'void', 'auto', 'struct', 'class', 'template', 'typename', 'const',
      'constexpr', 'return', 'if', 'else', 'while', 'for', 'include',
      'swap', 'sort', 'max', 'min', 'true', 'false'
    ]),
    java: new Set([
      'public', 'private', 'protected', 'class', 'static', 'final', 'void',
      'int', 'long', 'boolean', 'char', 'return', 'if', 'else', 'for',
      'while', 'new', 'import', 'package', 'this', 'true', 'false'
    ]),
    csharp: new Set([
      'public', 'private', 'protected', 'class', 'static', 'readonly', 'void',
      'int', 'bool', 'string', 'return', 'if', 'else', 'for', 'while', 'new',
      'using', 'get', 'set', 'typeof', 'var', 'true', 'false'
    ])
  };

  const TYPES = new Set([
    'vector', 'string', 'Map', 'HashMap', 'LinkedHashMap', 'Stack', 'List',
    'Dictionary', 'Type', 'Action', 'Math', 'MathUtils', 'StringUtils',
    'MathHelper', 'NumberUtils', 'PlayerController', 'Inventory', 'EventBus',
    'LRUCache', 'Integer', 'Character', 'object'
  ]);

  /**
   * Tokenizes a code snippet into an array of character objects with syntax metadata.
   * @param {string} code - Source code snippet
   * @param {string} language - 'cpp' | 'java' | 'csharp'
   * @returns {Array<{char: string, type: string}>}
   */
  function tokenizeCode(code, language) {
    const langKeywords = KEYWORDS[language] || KEYWORDS.cpp;
    const result = [];
    const len = code.length;
    let i = 0;

    while (i < len) {
      const ch = code[i];

      // 1. Comments
      if (ch === '/' && code[i + 1] === '/') {
        let comment = '';
        while (i < len && code[i] !== '\n') {
          comment += code[i];
          i++;
        }
        for (const c of comment) {
          result.push({ char: c, type: 'comment' });
        }
        continue;
      }

      // 2. Strings
      if (ch === '"' || ch === "'") {
        const quote = ch;
        let str = quote;
        i++;
        while (i < len && code[i] !== quote && code[i] !== '\n') {
          if (code[i] === '\\' && i + 1 < len) {
            str += code[i] + code[i + 1];
            i += 2;
          } else {
            str += code[i];
            i++;
          }
        }
        if (i < len && code[i] === quote) {
          str += quote;
          i++;
        }
        for (const c of str) {
          result.push({ char: c, type: 'string' });
        }
        continue;
      }

      // 3. Numbers
      if (/\d/.test(ch) && (i === 0 || !/[a-zA-Z0-9_]/.test(code[i - 1]))) {
        let num = '';
        while (i < len && /[0-9.fF]/.test(code[i])) {
          num += code[i];
          i++;
        }
        for (const c of num) {
          result.push({ char: c, type: 'number' });
        }
        continue;
      }

      // 4. Identifiers & Keywords
      if (/[a-zA-Z_]/.test(ch)) {
        let word = '';
        while (i < len && /[a-zA-Z0-9_]/.test(code[i])) {
          word += code[i];
          i++;
        }

        let type = 'plain';
        if (langKeywords.has(word)) {
          type = 'keyword';
        } else if (TYPES.has(word)) {
          type = 'type';
        } else if (i < len && code[i] === '(') {
          type = 'function';
        }

        for (const c of word) {
          result.push({ char: c, type });
        }
        continue;
      }

      // 5. Operators & Punctuation
      let opType = 'plain';
      if (/[+\-*/%=<>!&|^~?:;]/.test(ch)) {
        opType = 'operator';
      }

      result.push({ char: ch, type: opType });
      i++;
    }

    return result;
  }

  const DevTypeSyntax = {
    tokenizeCode
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = DevTypeSyntax;
  } else {
    global.DevTypeSyntax = DevTypeSyntax;
  }
})(typeof window !== 'undefined' ? window : globalThis);
