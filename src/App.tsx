import { DNDProvider } from "./components/DNDProvider";
import { Columns } from "./components/Columns";

const mockDataJSON = JSON.stringify({
  columns: [
    {
      id: "column-1",
      draggables: [
        { id: "draggable-1", content: { text: "Drag me!" } },
        { id: "draggable-2", content: { text: "Drag me, too!" } },
        {
          id: "draggable-4",
          content: { text: "I'm a draggable" },
        },
        {
          id: "draggable-5",
          content: { text: "I'm a draggable" },
        },
      ],
    },
    {
      id: "column-2",
      draggables: [{ id: "draggable-3", content: { text: "Drag me, too!" } }],
    },
    { id: "column-3" },
  ],
});

function App() {
  return (
    <DNDProvider data={mockDataJSON}>
      <Columns />
    </DNDProvider>
  );
}

export default App;
