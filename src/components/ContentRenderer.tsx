'use client';

import React from 'react';

interface ContentRendererProps {
  content: any;
  className?: string;
  style?: React.CSSProperties;
}

export default function ContentRenderer({ content, className = '', style }: ContentRendererProps) {
  if (!content) return null;

  // Case 1: Legacy Sanity Block array
  if (Array.isArray(content)) {
    return (
      <div className={`content-renderer ${className}`} style={{ ...style, lineHeight: 1.8 }}>
        {content.map((block: any, idx: number) => {
          if (block._type === 'block') {
            const text = block.children?.map((child: any) => child.text).join('') || '';
            if (block.style === 'h1' || block.style === 'h2') {
              return <h3 key={idx} style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{text}</h3>;
            }
            if (block.style === 'h3' || block.style === 'h4') {
              return <h4 key={idx} style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.25rem', marginBottom: '0.5rem', color: 'var(--cerulean)' }}>{text}</h4>;
            }
            if (block.listItem) {
              return <li key={idx} style={{ marginLeft: '1.25rem', marginBottom: '0.35rem' }}>{text}</li>;
            }
            return <p key={idx} style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>{text}</p>;
          }
          return null;
        })}
      </div>
    );
  }

  // Case 2: String content (Markdown or Multi-line Plaintext)
  if (typeof content === 'string') {
    const lines = content.split('\n');
    const elements: React.ReactNode[] = [];
    let currentParagraph: string[] = [];
    let currentList: string[] = [];

    const flushParagraph = (key: string) => {
      if (currentParagraph.length > 0) {
        elements.push(
          <p key={key} style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)' }}>
            {formatInline(currentParagraph.join(' '))}
          </p>
        );
        currentParagraph = [];
      }
    };

    const flushList = (key: string) => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={key} style={{ marginBottom: '1.25rem', paddingLeft: '1.5rem', listStyleType: 'disc', color: 'var(--text-secondary)' }}>
            {currentList.map((item, i) => (
              <li key={i} style={{ marginBottom: '0.4rem' }}>{formatInline(item)}</li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (!trimmed) {
        flushParagraph(`p-${index}`);
        flushList(`ul-${index}`);
        return;
      }

      // Headers
      if (trimmed.startsWith('### ')) {
        flushParagraph(`p-${index}`);
        flushList(`ul-${index}`);
        elements.push(
          <h4 key={`h4-${index}`} style={{ fontSize: '1.15rem', fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.6rem', color: 'var(--cerulean)' }}>
            {trimmed.replace(/^###\s+/, '')}
          </h4>
        );
      } else if (trimmed.startsWith('## ')) {
        flushParagraph(`p-${index}`);
        flushList(`ul-${index}`);
        elements.push(
          <h3 key={`h3-${index}`} style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '1.75rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
            {trimmed.replace(/^##\s+/, '')}
          </h3>
        );
      } else if (trimmed.startsWith('# ')) {
        flushParagraph(`p-${index}`);
        flushList(`ul-${index}`);
        elements.push(
          <h2 key={`h2-${index}`} style={{ fontSize: '1.6rem', fontWeight: 800, marginTop: '2rem', marginBottom: '0.85rem', color: 'var(--text-primary)' }}>
            {trimmed.replace(/^#\s+/, '')}
          </h2>
        );
      } else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        flushParagraph(`p-${index}`);
        currentList.push(trimmed.substring(2));
      } else {
        flushList(`ul-${index}`);
        currentParagraph.push(trimmed);
      }
    });

    flushParagraph('p-final');
    flushList('ul-final');

    return (
      <div className={`content-renderer ${className}`} style={{ ...style, lineHeight: 1.8 }}>
        {elements}
      </div>
    );
  }

  return <div>{String(content)}</div>;
}

/**
 * Basic inline formatter for **bold** and *italic*
 */
function formatInline(text: string): React.ReactNode {
  // Regex to split on bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}
