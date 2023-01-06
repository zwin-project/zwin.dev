import { TableOfContent } from "./common"

const TOC = (props: {toc: TableOfContent[]}) => {
  return (
    <div>
      <h4>Table of Contents</h4>
      {props.toc.map((elm: TableOfContent) => {
        return <li key={elm.href}>
          <a href={elm.href}>{elm.title}</a>
        </li>
      })}
    </div>
  )
}

export default TOC
