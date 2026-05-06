import MessageEncoder from "../components/MessageEncoder";
import QuizGame from "../components/QuizGame";

export default function FunPage() {
  return (
    <>
      <main className="container">
        <div className="page-header">
          <div>
            <h1>Fun & Games</h1>
            <p className="page-sub">Interactive quiz and message encoder/decoder.</p>
          </div>
        </div>
        <QuizGame />
        <MessageEncoder />
      </main>
      <footer className="container site-footer">© 2025 Jessica Lecker — React portfolio</footer>
    </>
  );
}
