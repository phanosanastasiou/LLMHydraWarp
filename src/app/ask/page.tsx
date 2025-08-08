import QuestionForm from "@/components/QuestionForm";
import Navbar from "@/components/Navbar";

export default function AskPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold">Ask a question</h1>
        <QuestionForm />
      </main>
    </div>
  );
}
