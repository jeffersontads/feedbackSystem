import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshootButtonProps {
  screenshoot: string | null;
  onScreenshootTook: (screenshoot: string | null) => void;
}

export function ScreenshootButton({
  screenshoot,
  onScreenshootTook,
}: ScreenshootButtonProps) {
  //criar estado para mostrar um sinal de loading enquanto a foto esta sendo tiradas
  const [isTakingScreenshoot, setIsTakingScreenshoot] = useState(false);

  //função para tirar foto da tela
  async function handleTakeScreenshoot() {
    setIsTakingScreenshoot(true);

    const canvas = await html2canvas(document.querySelector("html")!);
    const base64image = canvas.toDataURL("image/png");

    //tirou a foto manda o base64 que seria a foto
    onScreenshootTook(base64image);
    setIsTakingScreenshoot(false);
  }
  if (screenshoot) {
    return (
      <button
        type="button"
        className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
        onClick={() => onScreenshootTook(null)}
        style={{
          backgroundImage: `url(${screenshoot})`,
          backgroundPosition: "right bottom",
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={handleTakeScreenshoot}
      className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500"
    >
      {/* //Se a foto esta sendo tirada mosta LOADING senão mostra a camera */}
      {isTakingScreenshoot ? (
        <Loading />
      ) : (
        <Camera className="w-6 h-6 text-zinc-100" />
      )}
    </button>
  );
}
