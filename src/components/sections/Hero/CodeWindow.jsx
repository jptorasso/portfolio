import styles from "./CodeWindow.module.css";

// Cada línea es un array de "tokens": [tipo, texto].
// El tipo define el color (kw = palabra clave, type = tipo, fn = método, str = texto, cm = comentario).
const codeLines = [
  [["cm", "// Developer.cs"]],
  [["kw", "public record "], ["type", "Developer"], ["pl", "("], ["kw", "string "], ["pl", "Name, "], ["kw", "string "], ["pl", "Role)"]],
  [["pl", "{"]],
  [["kw", "    public string"], ["pl", "[] Stack => ["]],
  [["str", '        "C#"'], ["pl", ", "], ["str", '".NET"'], ["pl", ", "], ["str", '"Blazor"'], ["pl", ", "], ["str", '"SQL Server"'], ["pl", ","]],
  [["str", '        "JavaScript"'], ["pl", ", "], ["str", '"React"']],
  [["pl", "    ];"]],
  [["kw", "    public string"], ["pl", "[] Learning => ["], ["str", '"Next.js"'], ["pl", "];"]],
  [],
  [["kw", "    public async "], ["type", "Task"], ["pl", "<"], ["type", "Software"], ["pl", "> "], ["fn", "SolveAsync"], ["pl", "("], ["type", "Need "], ["pl", "need)"]],
  [["pl", "    {"]],
  [["kw", "        var "], ["pl", "design = "], ["kw", "await "], ["fn", "AnalyzeAsync"], ["pl", "(need);"]],
  [["kw", "        return await "], ["fn", "BuildAsync"], ["pl", "(design);"]],
  [["pl", "    }"]],
  [["pl", "}"]],
];

/** Ventana de editor decorativa que muestra un fragmento de C#. */
export default function CodeWindow() {
  return (
    <div className={styles.frame} aria-hidden="true">
      <div className={styles.window}>
        <div className={styles.titleBar}>
          <span className={styles.dots}>
            <span />
            <span />
            <span />
          </span>
          <span className={styles.fileName}>Developer.cs</span>
          <span className={styles.tag}>C# 12</span>
        </div>

        <pre className={styles.code}>
          <code>
            {codeLines.map((tokens, lineIndex) => (
              <span key={lineIndex} className={styles.line}>
                {tokens.map(([type, text], tokenIndex) => (
                  <span key={tokenIndex} className={styles[type]}>
                    {text}
                  </span>
                ))}
              </span>
            ))}
          </code>
        </pre>

        <div className={styles.statusBar}>
          <span className={styles.statusOk}>● Build succeeded</span>
          <span>0 errores · 0 advertencias</span>
        </div>
      </div>
    </div>
  );
}
