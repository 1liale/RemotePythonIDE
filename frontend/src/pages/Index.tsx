import { useState, useEffect } from "react";
import { Sidebar } from "@/components/CodeEditor/Sidebar";
import { EditorPanel } from "@/components/CodeEditor/EditorPanel";
import { RightPanel } from "@/components/CodeEditor/RightPanel";
import { TopBar } from "@/components/CodeEditor/TopBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { CodeExecutionProvider } from "@/contexts/CodeExecutionContext";

const Index = () => {
  const [activeFile, setActiveFile] = useState("main.py");

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className="h-screen w-full bg-background text-foreground flex flex-col overflow-hidden">
      <CodeExecutionProvider>
        <TopBar isDark={isDark} onToggleTheme={toggleTheme} />

        <div className="flex-1 flex overflow-hidden">
          <ResizablePanelGroup
            direction="horizontal"
            className="flex-1 overflow-hidden"
          >
            <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
              <Sidebar activeFile={activeFile} onFileSelect={setActiveFile} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={60} minSize={40}>
              <EditorPanel activeFile={activeFile} isDark={isDark} />
            </ResizablePanel>

            <ResizableHandle withHandle />

            <ResizablePanel defaultSize={20} minSize={15} maxSize={40}>
              <RightPanel />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </CodeExecutionProvider>
    </div>
  );
};

export default Index;
