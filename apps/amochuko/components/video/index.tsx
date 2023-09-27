import { useRef, useEffect } from "react";

interface VideoPlayerProps {
  src: string;
  isPlaying: boolean;
}
export function VideoPlayer({ src, isPlaying }: VideoPlayerProps) {
  const ref: any = useRef(null);

  useEffect(() => {
    if (isPlaying) {
      ref?.current.play();
      console.log(ref.current);
    } else {
      ref?.current.pause();
    }
  }, [isPlaying]);

  return <video src={src} ref={ref} loop playsInline />;
}
