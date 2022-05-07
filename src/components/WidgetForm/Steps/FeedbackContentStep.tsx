import {
  ArrowArcLeft,
  ArrowLeft,
  Camera,
  CameraRotate,
  CameraSlash,
  VideoCamera,
} from "phosphor-react";
import { FormEvent, useState } from "react";
import { feedbackTypes, FeedbackType } from "..";
import { api } from "../../../lib/api";

import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshootButton } from "../ScreenshootButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepProps) {
  const [screenshoot, setScreenshoot] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const feedbackTypeInfo = feedbackTypes[feedbackType];
  const [isSendingFeedback, setIsSendingFeedback] = useState(false);

  function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();
    setIsSendingFeedback(true);
    api.post("/feedbacks", {
      type: feedbackType,
      comment,
      screenshoot,
    });
    // console.log(screenshoot, comment);
    setIsSendingFeedback(false);
    onFeedbackSent();
  }
  return (
    <>
      <header>
        <button
          type="button"
          className="top-5 left-4 absolute text-zinc-400 hover:text-zinc-100"
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
      <form onSubmit={handleSubmitFeedback} className="my-4 w-full" action="">
        <textarea
          className="min-w-[19rem] w-full min-h-[7rem] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:outline-none focus:ring-brand-500 focus:ring-1 resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track scrollbar-thin"
          placeholder="Algo não está funcionando bem? Queremos corrigir. Conte com detalhes o que está acontecendo..."
          onChange={(event) => setComment(event.target.value)}
        />
        <footer className="flex mt-2 gap-2">
          <ScreenshootButton
            screenshoot={screenshoot}
            onScreenshootTook={setScreenshoot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
          >
            {isSendingFeedback ? <Loading /> : "Enviar feedback!"}
          </button>
        </footer>
      </form>
    </>
  );
}
