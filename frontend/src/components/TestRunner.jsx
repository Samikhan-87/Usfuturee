import { useState, useEffect, useRef } from "react";
import { ShieldAlert, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";

export const TestRunner = ({ test, onExit }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const answersRef = useRef({});
  const submittedRef = useRef(false);

  const doSubmit = (auto = false) => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    let s = 0;
    test.questions.forEach((q, i) => {
      if (answersRef.current[i] === q.answer) s += 1;
    });
    setScore(s);
    setSubmitted(true);
    if (auto) {
      toast.warning("Tab switch detected — your test was auto-submitted.", { position: "bottom-right" });
    }
  };

  useEffect(() => {
    const onCtx = (e) => e.preventDefault();
    const onVis = () => {
      if (document.hidden && !submittedRef.current) doSubmit(true);
    };
    document.addEventListener("contextmenu", onCtx);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      document.removeEventListener("contextmenu", onCtx);
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const choose = (qi, oi) => {
    if (submittedRef.current) return;
    const next = { ...answersRef.current, [qi]: oi };
    answersRef.current = next;
    setAnswers(next);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-auto bg-background p-4 sm:p-8" data-testid="test-runner">
      <div className="mx-auto max-w-2xl">
        {!submitted ? (
          <>
            <div className="sticky top-0 z-10 mb-6 flex items-center gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-amber-700 dark:text-amber-400">
              <ShieldAlert className="h-5 w-5 shrink-0" />
              <p className="text-sm font-semibold">Secure Test Mode — do not switch tabs or your test ends automatically. Right-click is disabled.</p>
            </div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{test.subject} Test</h1>
            <p className="mb-6 text-muted-foreground">{test.duration} · {test.marks} marks · {test.questions.length} questions</p>

            <div className="flex flex-col gap-5">
              {test.questions.map((q, qi) => (
                <div key={qi} className="rounded-2xl border border-border bg-card p-5" data-testid={`question-${qi}`}>
                  <p className="font-semibold text-foreground">{qi + 1}. {q.q}</p>
                  <div className="mt-3 grid gap-2 sm:grid-cols-2">
                    {q.options.map((opt, oi) => (
                      <button
                        key={oi}
                        data-testid={`q${qi}-opt${oi}`}
                        onClick={() => choose(qi, oi)}
                        className={`rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                          answers[qi] === oi ? "border-primary bg-accent text-primary" : "border-border bg-background text-foreground hover:border-primary/50"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              data-testid="submit-test-button"
              onClick={() => doSubmit(false)}
              className="mt-6 h-12 w-full rounded-full bg-primary font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
            >
              Submit Test
            </button>
          </>
        ) : (
          <div className="grid min-h-[70vh] place-items-center text-center" data-testid="test-result">
            <div>
              <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500" />
              <h1 className="mt-4 font-heading text-3xl font-bold text-foreground">Test Submitted!</h1>
              <p className="mt-2 text-muted-foreground">You scored</p>
              <p className="my-2 font-heading text-5xl font-black text-primary">{score}/{test.questions.length}</p>
              <button
                data-testid="close-test-button"
                onClick={onExit}
                className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-hover"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
