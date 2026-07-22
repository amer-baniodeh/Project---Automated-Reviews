import { Fragment, ReactNode } from "react";

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`${keyPrefix}-b-${i}`} className="pixel-strong">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <Fragment key={`${keyPrefix}-t-${i}`}>{part}</Fragment>;
  });
}

export function renderArticle(article: string): ReactNode[] {
  const blocks = article.split(/\n\n+/).filter((b) => b.trim().length > 0);

  return blocks.map((block, bi) => {
    if (block.startsWith("## ")) {
      return (
        <h3 key={`h-${bi}`} className="pixel-article-heading">
          {block.slice(3).trim()}
        </h3>
      );
    }

    const lines = block.split("\n");
    return (
      <p key={`p-${bi}`} className="pixel-article-para">
        {lines.map((line, li) => (
          <Fragment key={`l-${bi}-${li}`}>
            {renderInline(line, `${bi}-${li}`)}
            {li < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </p>
    );
  });
}