import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import fs from 'fs'
import markdownToHtml from "zenn-markdown-html";
import { JSDOM } from 'jsdom'
import { useMediaQuery } from "react-responsive";
import useSize from '@react-hook/size'
import styles from '../../styles/Docs.module.scss'
import { gettingStarted } from "../../content/content";
import { breakpointArticle, breakpointSidebar, DocsProps, TableOfContent } from "../../compontents/common";
import TOC from "../../compontents/TOC";
import Header from "../../compontents/Header";
import Sidenav, { SidenavPath } from "../../compontents/Sidenav";
import DocsNav from "../../compontents/DocsNav";
import { useTranslation } from "next-i18next";
import Footer from "../../compontents/Footer";
import { useEffect, useRef } from "react";
import DiscordSection from "../../compontents/DiscordSection";
import { useRouter } from 'next/router';

type PathParams = {
  id: string
}

export const getStaticPaths: GetStaticPaths<PathParams> = async ({ locales }) => {
  let paths: any = []
  gettingStarted.articles.forEach((e) => {
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
    `content/getting_started/${params!.id}/${locale}.md`, 'utf-8')
  const rawHtmlContent = markdownToHtml(content)
  const htmlContent = rawHtmlContent.replaceAll('<img src="', `<img src="/images/getting_started/${params!.id}/`)
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
  const description = description_wordbreak.substring(0, description_wordbreak.lastIndexOf(" "))

  const contentIndex = gettingStarted.articles.findIndex((e) => e.path == params!.id)
  const nextContent = contentIndex == gettingStarted.articles.length - 1 ? null : gettingStarted.articles[contentIndex + 1].path
  const previousContent = contentIndex == 0 ? null : gettingStarted.articles[contentIndex - 1].path

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      html: htmlContent,
      tableOfContent: tableOfContent,
      nextContent: nextContent,
      previousContent: previousContent,
      id: params!.id,
      description,
    }
  }
}

const GettingStarted: NextPage<DocsProps> = ({ html, tableOfContent, nextContent, previousContent, id, description }) => {
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
        <title>{`${t(['getting_started', 'articles', id].join('.'))} | Zwin`}</title>
        <meta name="description" content={description} />
        <meta property="og:url" content={`https://zwin.dev${router.asPath}`} />
        <meta property="og:description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header toppage={false}/>
      <div className={styles.container}>

        <main className={styles.main}>
          <section className={styles.body}>
            {isLarge && <Sidenav kind={SidenavPath.gettingStarted} />}
            <article className={styles.article} ref={articleRef}>
              <div className={styles.content}>
                <div className={styles.markdowninjection}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
                <DocsNav
                  next={nextContent == null ? undefined : {
                    path: nextContent,
                    title: t(['getting_started', 'articles', nextContent].join('.'))
                  }}
                  previous={previousContent == null ? undefined : {
                    path: previousContent,
                    title: t(['getting_started', 'articles', previousContent].join('.'))
                  }}
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

export default GettingStarted
