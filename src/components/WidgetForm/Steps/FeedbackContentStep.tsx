import { CloseButton } from "../CloseButton";
import { feedbackType, feedbackTypes } from "..";
import { ArrowLeft, Camera } from "phosphor-react";
import { ScreenshotButton } from "../ScreenshotButton";
import { FormEvent, useState } from "react";

interface FeedbackContentStepProps {
  feedbackType: feedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSend: () => void;
}

export const FeedbackContentStep = ({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSend,
}: FeedbackContentStepProps) => {

  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')

  const handleSubmitFeedback = (e: FormEvent) => {
  e.preventDefault()
    console.log({
      screenshot,
      comment,
    })
    onFeedbackSend();
  }

  const feedbackTypeInfo = feedbackTypes[feedbackType];
  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100"
          type="button"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="w-4 h-4" />
        </button>

        <span className="text-xl leading-6 flex items-center gap-2">
          <img
            className="w-6 h-6"
            src={feedbackTypeInfo.image.source}
            alt={feedbackTypeInfo.image.alt}
          />
          {feedbackTypeInfo.title}
        </span>
        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback}className="my-4 w-full">
        <textarea
                onChange={(e) => setComment(e.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md 
          focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin"
          placeholder="conte com detalhes o que está acontecendo..."
        />
        <footer className="flex gap-2 mt-2">
          <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />
          <button
            disabled={comment.length === 0}
            type="submit"
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none
          focus:ring-2 focus:ring-offset-2 focus: ring-offset-zinc-700 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            Enviar Feedback
          </button>
        </footer>
      </form>
    </>
  );
};
