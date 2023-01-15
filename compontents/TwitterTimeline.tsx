import { useEffect, useRef } from "react";

const TwitterTimeline = () => {
  useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

  return (
    <a
      className="twitter-timeline"
      data-height="800"
      href="https://twitter.com/zwin_project"
      target="_blank"
      rel="noreferrer">
      Tweets by zwin_project
    </a> 
  )
}

export default TwitterTimeline
