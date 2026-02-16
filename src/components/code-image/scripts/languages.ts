// Supported languages for code image tool
export interface Language {
  id: string;
  name: string;
}

export const languages: Language[] = [
  { id: 'javascript', name: 'JavaScript' },
  { id: 'typescript', name: 'TypeScript' },
  { id: 'jsx', name: 'JSX' },
  { id: 'tsx', name: 'TSX' },
  { id: 'python', name: 'Python' },
  { id: 'html', name: 'HTML' },
  { id: 'css', name: 'CSS' },
  { id: 'json', name: 'JSON' },
  { id: 'bash', name: 'Bash' },
  { id: 'rust', name: 'Rust' },
  { id: 'go', name: 'Go' },
  { id: 'java', name: 'Java' },
  { id: 'c', name: 'C' },
  { id: 'cpp', name: 'C++' },
  { id: 'csharp', name: 'C#' },
  { id: 'php', name: 'PHP' },
  { id: 'ruby', name: 'Ruby' },
  { id: 'swift', name: 'Swift' },
  { id: 'kotlin', name: 'Kotlin' },
  { id: 'sql', name: 'SQL' },
  { id: 'yaml', name: 'YAML' },
  { id: 'markdown', name: 'Markdown' },
  { id: 'vue', name: 'Vue' },
  { id: 'svelte', name: 'Svelte' },
  { id: 'astro', name: 'Astro' },
  { id: 'plaintext', name: 'Plain Text' },
];

// Auto-detect language from code content
export function detectLanguage(code: string): string {
  const trimmed = code.trim();
  if (!trimmed) return 'plaintext';

  // Shebang
  if (trimmed.startsWith('#!/usr/bin/python') || trimmed.startsWith('#!/usr/bin/env python')) return 'python';
  if (trimmed.startsWith('#!/bin/bash') || trimmed.startsWith('#!/bin/sh') || trimmed.startsWith('#!/usr/bin/env bash')) return 'bash';
  if (trimmed.startsWith('#!/usr/bin/env node')) return 'javascript';

  // HTML
  if (/^<!DOCTYPE/i.test(trimmed) || /^<html/i.test(trimmed)) return 'html';

  // Vue / Svelte
  if (trimmed.startsWith('<template>') || trimmed.startsWith('<template ')) return 'vue';

  // Astro / Markdown frontmatter
  if (/^---\n/.test(trimmed) && trimmed.includes('import ')) return 'astro';

  // JSON
  if (/^[\[{]/.test(trimmed)) {
    try { JSON.parse(trimmed); return 'json'; } catch { /* not json */ }
  }

  // SQL
  if (/^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/i.test(trimmed)) return 'sql';

  // YAML
  if (/^[a-zA-Z_][\w-]*\s*:/m.test(trimmed) && !trimmed.includes('{') && !trimmed.includes('import ')) return 'yaml';

  // CSS
  if (/^(@import|@media|@keyframes|[.#:][a-zA-Z])/.test(trimmed) && trimmed.includes('{')) return 'css';

  // Rust
  if (/\bfn\s+\w+/.test(trimmed) && (/->/.test(trimmed) || /let\s+mut\b/.test(trimmed) || /use\s+\w+::/.test(trimmed))) return 'rust';

  // Go
  if (/^package\s+\w+/m.test(trimmed)) return 'go';
  if (/\bfunc\s+/.test(trimmed) && /:=/.test(trimmed)) return 'go';

  // Python
  if (/^(def|class)\s+\w+.*:/m.test(trimmed) || /^(import|from)\s+\w+/m.test(trimmed) && /:\s*$/m.test(trimmed)) return 'python';

  // PHP
  if (trimmed.startsWith('<?php')) return 'php';

  // Ruby
  if (/^(require|gem)\s/m.test(trimmed) || /\bdo\s*\|/.test(trimmed) && /\bend\b/.test(trimmed)) return 'ruby';

  // Swift
  if (/\b(var|let)\s+\w+\s*:\s*\w+/.test(trimmed) && /\bfunc\s+/.test(trimmed)) return 'swift';

  // Kotlin
  if (/\bfun\s+\w+/.test(trimmed) && /\bval\s+/.test(trimmed)) return 'kotlin';

  // Java
  if (/\bpublic\s+(static\s+)?class\s+/.test(trimmed)) return 'java';

  // C#
  if (/\bnamespace\s+\w+/.test(trimmed) && /\busing\s+\w+/.test(trimmed)) return 'csharp';

  // C/C++
  if (/^#include\s+[<"]/.test(trimmed)) return trimmed.includes('iostream') || trimmed.includes('std::') ? 'cpp' : 'c';

  // TypeScript / TSX
  if (/:\s*(string|number|boolean|any|void|never)\b/.test(trimmed) || /\binterface\s+\w+/.test(trimmed) || /\btype\s+\w+\s*=/.test(trimmed)) {
    if (/<[A-Z]/.test(trimmed) || /return\s*\(?\s*</.test(trimmed)) return 'tsx';
    return 'typescript';
  }

  // JSX
  if (/<[A-Z]/.test(trimmed) || /return\s*\(?\s*</.test(trimmed)) return 'jsx';

  // JavaScript (broad)
  if (/\b(const|let|var|function|class|import|export|async|await|require)\b/.test(trimmed)) return 'javascript';

  // Bash
  if (/^\s*(echo|export|if\s+\[|for\s+\w+\s+in|while|chmod|mkdir|cd |ls |npm |npx |yarn |pnpm )/m.test(trimmed)) return 'bash';

  // Markdown
  if (/^#{1,6}\s/.test(trimmed) || /^\*\*\w/.test(trimmed) || /^\-\s/.test(trimmed)) return 'markdown';

  return 'plaintext';
}
