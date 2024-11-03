import TextEditor from "@/components/TextEditor";

export default function RootPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 py-10 h-full">
      <div className="min-h-[calc(100vh-5rem)] border border-slate-800 max-w-7xl mx-auto  rounded-md shadow-sm">
        <TextEditor />
      </div>
    </div>
  );
}
