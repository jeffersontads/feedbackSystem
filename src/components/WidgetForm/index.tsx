import { CloseButton } from "../CloseButton";

//sempre precisamos importar imagens, icones, css etc...
import bugImageUrl from "../../assets/image/bug.svg";
import ideaImageUrl from "../../assets/image/idea.svg";
import otherImageUrl from "../../assets/image/thought.svg";
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";

/**
 * OBJETO QUE GUARDA TODOS OS TIPOS DE FEEDBACK QUE PODEMOS TER
 */
export const feedbackTypes = {
  BUG: {
    title: "Problema",
    image: {
      source: bugImageUrl,
      alt: "imagem de um inseto amarelo",
    },
  },
  IDEA: {
    title: "Ideia",
    image: {
      source: ideaImageUrl,
      alt: "imagem de uma lampada",
    },
  },
  OTHER: {
    title: "Other",
    image: {
      source: otherImageUrl,
      alt: "Nuvem de pensamento",
    },
  },
};
/**
 * Object.entries(feedbackTypes) =>
 * [
 * ['BUG', {...}]
 * ['IDEA', {...}]
 * ['OTHER', {...}]
 * ]
 * //  a melhor maneira de salvar uma interação que venha por parte do usuário é utilizando o estado
 */

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  //cria o estado
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setFeedbackSent] = useState(false);

  function handleRestartFeedback() {
    setFeedbackSent(false);
    setFeedbackType(null);
  }

  return (
    <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
      {feedbackSent ? (
        <FeedbackSuccessStep
          onFeedbackRestartRequested={handleRestartFeedback}
        />
      ) : (
        <>
          {!feedbackType ? (
            <FeedbackTypeStep onFeedBackTypeChanged={setFeedbackType} />
          ) : (
            <FeedbackContentStep
              feedbackType={feedbackType}
              onFeedbackRestartRequested={handleRestartFeedback}
              onFeedbackSent={() => setFeedbackSent(true)}
            />
          )}
        </>
      )}
      <footer className="text-xs text-neutral-400">
        Feito com ♥ pela{" "}
        <a className="underline underline-offset-2"> Rocketseat </a>
      </footer>
    </div>
  );
}
