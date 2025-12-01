import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from "react";

export function MarkdownPartial({
  mainMarkdown,
  dialogMarkdown,
  dialogTitle,
}: {
  mainMarkdown: ReactNode;
  dialogMarkdown: ReactNode;
  dialogTitle: ReactNode;
}) {
  const [overflowing, setIsOverflowing] = useState(false);
  const markdownRef = useRef<HTMLDivElement>(null);
  function checkOverflow(node: HTMLDivElement) {
    setIsOverflowing(node.scrollHeight > node.clientHeight);
  }

  useEffect(() => {
    const controller = new AbortController();
    window.addEventListener(
      "resize",
      () => {
        if (markdownRef.current == null) return;
        checkOverflow(markdownRef.current);
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, []);

  useLayoutEffect(() => {
    if (markdownRef.current == null) return;
    checkOverflow(markdownRef.current);
  }, []);

  return (
    <>
      <div ref={markdownRef} className="max-h-[300px] overflow-hidden relative">
        {mainMarkdown}
      
      </div>
    </>
  );
}
