import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import fs from 'fs'
import markdownToHtml from "zenn-markdown-html";
import { JSDOM } from 'jsdom'
import { useMediaQuery } from "react-responsive";
import useSize from '@react-hook/size'
import styles from '../styles/Docs.module.scss'
import { breakpointArticle, breakpointSidebar, DocsProps, TableOfContent } from "../compontents/common";
import TOC from "../compontents/TOC";
import Header from "../compontents/Header";
import { useTranslation } from "next-i18next";
import Footer from "../compontents/Footer";
import { useEffect, useRef } from "react";
import DiscordSection from "../compontents/DiscordSection";
import { useRouter } from 'next/router'
import { standaloneArticles } from "../content/content";

type PathParams = {
  id: string
}

export const getStaticPaths: GetStaticPaths<PathParams> = async ({ locales }) => {
  let paths: any = []
  standaloneArticles.forEach((e) => {
    locales?.forEach((l) => {
      paths.push({ params: { id: e.path }, locale: l })
    })
  })
  return {
    paths: paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const content = fs.readFileSync(
    `content/${params!.id}/${locale}.md`, 'utf-8')
  const rawHtmlContent = markdownToHtml(content)
  const htmlContent = rawHtmlContent.replaceAll('<img src="', `<img src="/${params!.id}/`)
  const domHtml = new JSDOM(htmlContent).window.document

  const headings = domHtml.querySelectorAll<HTMLElement>("h2")
  const tableOfContent: TableOfContent[] = []

  headings.forEach((element) => {
    const level = element.tagName
    const title = element.innerHTML.split("</a> ")[1]
    const href = '#' + element.id
    tableOfContent.push({ level: level, title: title, href: href })
  })

  const sentences = Array.from(domHtml.querySelectorAll<HTMLElement>("p"))
  const description_wordbreak = sentences.map(s => s.textContent).join('\n').slice(0, 160)
  const description = description_wordbreak.substring(0, description_wordbreak.lastIndexOf(" "));

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      html: htmlContent,
      tableOfContent: tableOfContent,
      id: params!.id,
      description,
    }
  }
}

const DefaultPage: NextPage<DocsProps> = ({ html, tableOfContent, description, id}) => {
  const { t } = useTranslation('common')
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })
  const articleRef = useRef(null)
  const [articleWidth, _] = useSize(articleRef);
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{`${t(id ? id : '')} | Zwin`}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={`https://zwin.dev${router.asPath}`} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header toppage={false}/>
      <div className={styles.container}>

        <main className={styles.main}>
          <section className={styles.body}>
            <article className={styles.article} ref={articleRef}>
              <div className={styles.content}>
                <div className={styles.markdowninjection}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                {!isLarge && <DiscordSection alignCenter={true}/>}
              </div>
              {articleWidth > breakpointArticle && <TOC toc={tableOfContent} />}
            </article>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default DefaultPage
