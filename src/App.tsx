import { ResizableScreen } from "./components/project/ResizeableScreen";
function App() {
  return (
    <div className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Chat App</h1>
      <ResizableScreen />
    </div>
  );
}

export default App;
