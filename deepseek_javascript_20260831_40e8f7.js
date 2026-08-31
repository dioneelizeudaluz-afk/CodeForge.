export const generatePreviewHTML = (htmlContent, cssContent, jsContent) => {
  let result = htmlContent || '<html><head><title>Preview</title></head><body></body></html>';
  
  if (cssContent) {
    const styleTag = `<style>${cssContent}</style>`;
    result = result.replace('</head>', `${styleTag}</head>`);
  }
  
  if (jsContent) {
    const scriptTag = `<script>${jsContent}</script>`;
    result = result.replace('</body>', `${scriptTag}</body>`);
  }
  
  return result;
};

export const injectConsoleCapture = (htmlContent) => {
  const consoleScript = `
    <script>
      // Capture console logs
      (function() {
        const originalLog = console.log;
        const originalError = console.error;
        const originalWarn = console.warn;
        
        console.log = function(...args) {
          originalLog.apply(console, args);
          window.parent.postMessage({
            type: 'console',
            level: 'log',
            message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
          }, '*');
        };
        
        console.error = function(...args) {
          originalError.apply(console, args);
          window.parent.postMessage({
            type: 'console',
            level: 'error',
            message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
          }, '*');
        };
        
        console.warn = function(...args) {
          originalWarn.apply(console, args);
          window.parent.postMessage({
            type: 'console',
            level: 'warn',
            message: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ')
          }, '*');
        };
      })();
    </script>
  `;
  
  return htmlContent.replace('</body>', `${consoleScript}</body>`);
};

export const getSandboxAttributes = () => {
  return 'allow-scripts allow-modals allow-same-origin';
};