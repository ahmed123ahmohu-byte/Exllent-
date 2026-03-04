export const extractCodeBlock = (text = '') => {
  const match = text.match(/```(\w+)?\n([\s\S]*?)```/);
  if (!match) return null;
  return {
    language: (match[1] || 'plaintext').toLowerCase(),
    code: match[2]
  };
};

export const buildPreviewDoc = (block) => {
  if (!block) return '';
  const { language, code } = block;

  if (language === 'html') {
    return code;
  }

  if (language === 'css') {
    return `<style>${code}</style><div class="demo">Nexa CSS Preview</div>`;
  }

  if (language === 'javascript' || language === 'js') {
    return `<div id="app">Nexa JS Preview</div><script>${code}</script>`;
  }

  if (language === 'jsx' || language === 'react') {
    return `
      <div id="root"></div>
      <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
      <script type="text/babel">
        ${code}
      </script>
    `;
  }

  if (language === 'python' || language === 'py') {
    return `<pre style="padding:20px;color:#a5b4fc;background:#0f172a;">Python preview is limited in-browser.\n\n${code}</pre>`;
  }

  return `<pre style="padding:20px;color:#e2e8f0;background:#0f172a;">${code.replace(/</g, '&lt;')}</pre>`;
};
