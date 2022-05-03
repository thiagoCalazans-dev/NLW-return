import { CloseButton } from "./CloseButton";
import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from "./Steps/FeedbackSucessStep";

export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "Imagem de um inseto",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "imagem de uma lâmpada",
    },
  },
  OTHER: {
    title: "Outro",
    image: {
      source: thoughtImageUrl,
      alt: "imagem de uma nuvem de pensamento",
    },
  },
};

// Object.entries(feedbackTypes) => transforma o Objeto em um array na seguinte disposição:
// [
//     ['BUG', {...}]
//     ['IDEA', {...}]
//     ['OTHER', {...}]
// ]

export type feedbackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
  const [feedbackType, setFeedbackType] = useState<feedbackType | null>(null);
  const [feedbackSend, setFeedbackSend] = useState(false);
  const handleRestartFeedback = () => {
    setFeedbackSend(false)
    setFeedbackType(null);
  };

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
    {feedbackSend ? (<FeedbackSucessStep onFeedbackRestartRequested={handleRestartFeedback}/>) : (<>  {!feedbackType ? (
        <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
      ) : (
        <FeedbackContentStep
          feedbackType={feedbackType}
          onFeedbackRestartRequested={handleRestartFeedback}
          onFeedbackSend={() => setFeedbackSend(true)}
        />
      )}</>)}
      <footer>
        Feito com amor pela
        <a
          className="underline underline-offset-2"
          href="https://rocketseat.com.br"
        >
          Rocketseat
        </a>
      </footer>
    </div>
  );
};
