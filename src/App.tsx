import React, { useLayoutEffect, useState } from "react";
import { stringify } from "yaml";

function bor(booleans: boolean | boolean[]) {
  if (typeof booleans === "boolean") {
    return booleans;
  }

  return booleans.some((b) => b);
}

export function App() {
  const [moving, setMoving] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [leftFlex, setLeftFlex] = useState(`0 0 ${window.innerWidth / 2}px`);
  const [rightFlex, setRightFlex] = useState("1 0 0px");

  useLayoutEffect(() => {
    const leftContainer = document.querySelector(
      ".h-container__left"
    ) as HTMLDivElement;
    const handlePaste = (ev: ClipboardEvent) => {
      ev.preventDefault();

      const text = ev.clipboardData?.getData("text/plain") || "";
      leftContainer.textContent = text;
    };
    leftContainer.addEventListener("paste", handlePaste);

    return () => {
      leftContainer.removeEventListener("paste", handlePaste);
    };
  }, []);

  const onDivide: React.MouseEventHandler<HTMLElement> = (e) => {
    if (!moving) {
      return;
    }
    const finalX = e.pageX;
    const screenWidth = window.innerWidth;

    const leftWidth = Math.min(Math.max(120, finalX), screenWidth - 100) + 10;
    const rightWidth = screenWidth - leftWidth;
    setLeftFlex(`1 1 ${leftWidth}px`);
    setRightFlex(`1 0 ${rightWidth}px`);
  };

  const [yaml, setYaml] = useState("");

  const convertJsonToYaml: React.FocusEventHandler<HTMLDivElement> = (e) => {
    const str = e.target.textContent || "";

    let json = "";
    if (str) {
      try {
        json = JSON.parse(str);
      } catch (e) {
        console.error(e);
      }
    }

    if (json) {
      // Format to readable JSON
      document.getElementsByClassName("h-container__left")[0].textContent =
        JSON.stringify(json, null, 2);
      setYaml(stringify(json));
    } else {
      setYaml("");
    }
  };

  return (
    <div
      className="App"
      onMouseUp={() => {
        setMoving(false);
      }}
    >
      <main className="h-container" onMouseMove={onDivide}>
        <div
          className="h-container__left padding-5"
          contentEditable
          style={{
            flex: leftFlex,
            userSelect: bor([isHover, moving]) ? "none" : "initial",
          }}
          data-text="JSON here"
          tabIndex={0}
          onBlur={convertJsonToYaml}
        />
        <div
          className="h-container__divider"
          style={{
            backgroundColor: bor([isHover, moving]) ? "#cfd8dc" : "#f1f1f1",
          }}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
          onMouseDown={() => {
            setMoving(true);
          }}
        >
          <span
            className="h-container__divider__indicator"
            style={{ color: bor([isHover, moving]) ? "whitesmoke" : "gray" }}
          >
            ...
          </span>
        </div>
        <div
          className="h-container__right padding-5"
          tabIndex={0}
          style={{
            flex: rightFlex,
            userSelect: bor([isHover, moving]) ? "none" : "text",
          }}
        >
          {yaml}
        </div>
      </main>
    </div>
  );
}
