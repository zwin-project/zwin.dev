import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Header from '../compontents/Header'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSize from '@react-hook/size'
import Footer from '../compontents/Footer'
import ChevronRight from '../public/icons/chevron_right.svg'
import { useMediaQuery } from 'react-responsive'
import { breakpointSidebar } from '../compontents/common'
import { useRouter } from 'next/router'
import TwitterTimeline from '../compontents/TwitterTimeline'

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'toppage']))
    }
  }
}

const Cta = (props: {white: boolean}) => {
  const { t } = useTranslation(['toppage'])
  return (
    <Link className={styles.wraplink} href='getting_started/system_requirements'>
      <p className={[styles.button, styles.cta, props.white ? styles.white : ''].join(' ')}>{t('fv.cta')}</p>
    </Link>
  )
}

const ChevronLink = (props: { text: string }) => {
  return (
    <div className={styles.chevronlink}>
      <p>{props.text}</p>
      <ChevronRight className={styles.chevron} />
    </div>
  )
}

type Text = {
  text: string,
  bold?: boolean
}

const Feature = (props: {
  odd: boolean,
  title: string,
  heading: string[],
  desc: Text[],
  points: string[],
  image: string
}) => {
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })
  return (
    <div className={styles.feature}>
      {(isLarge && !props.odd) && <div className={styles.imagewrap}>
        <Image alt={'Feature image: ' + props.heading.join(' ')} src={props.image} className={styles.image} fill />
      </div>}
      <div className={styles.vertical}>
        {!isLarge && <div className={styles.imagewrap + ' ' + styles.mobile}>
          <Image alt={'Feature image: ' + props.heading.join(' ')} src={props.image} className={styles.image} fill />
        </div>}
        <p className={styles.title}>{props.title}</p>
        <h2 className={styles.heading}>{...props.heading.map((e) => (
          <span key={e}>{e}</span>
        ))}</h2>
        <p className={styles.desc}>{...props.desc.map((e) => (
          <span className={e.bold ? styles.bold : ''} key={e.text}>{e.text} </span>
        ))}</p>
        <ul className={styles.points}>
          {...props.points.map((point) => (
            <li key={point} className={styles.point}>{point}</li>
          ))}
        </ul>
      </div>
      {(isLarge && props.odd) && <div className={styles.imagewrap}>
        <Image alt={'Feature image: ' + props.heading.join(' ')} src={props.image} className={styles.image} fill />
      </div>}
    </div>
  )
}

const Card = (props: {
  title: string,
  desc: string
}) => {
  return (
    <div className={styles.card}>
      <h4>{props.title}</h4>
      <p>{props.desc}</p>
    </div>
  )
}

interface Window {
  Image: {
    prototype: HTMLImageElement;
    new(): HTMLImageElement;
  };
}

const Home: NextPage = () => {
  const { t } = useTranslation(['toppage', 'common'])
  const router = useRouter()
  const isLarge = useMediaQuery({
    query: `(min-width: ${breakpointSidebar}px)`
  })

  const frameCount = 30
  const currentFrame = (index: number) => (
    `/top/hero/${index.toString().padStart(4, '0')}.jpg`
  )
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stickyWrapRef = useRef<HTMLDivElement>(null)
  const stickySpacerRef = useRef<HTMLDivElement>(null)
  const [canvasWidth, canvasHeight] = useSize(canvasRef);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(1)
  const [imageArray, setImageArray] = useState<HTMLImageElement[]>([])

  const preloadImages = useCallback(() => {
    let images: HTMLImageElement[] = []
    for (let i = 1; i <= frameCount; i++) {
      const img = new window.Image()
      img.src = currentFrame(i)
      images.push(img)
      setImageArray(images)
    }
  }, [])

  const setCanvasSize = useCallback(() => {
    if (!canvasRef.current) return
    canvasRef.current.width = canvasWidth
    canvasRef.current.height = canvasHeight
  }, [canvasHeight, canvasWidth])

  const drawFrame = useCallback((image: HTMLImageElement) => {
    if (!context) return
    const canvas = canvasRef.current
    if (!canvas) return
    context.drawImage(image,
      canvas.width / 2 - image.width / 2,
      canvas.height / 2 - image.height / 2) 
  }, [context])

  // initial load
  useEffect(() => {
    if (!canvasRef.current) return
    document.getElementById('body')?.classList.add('dark')
    setContext(canvasRef.current.getContext("2d"))
    setCurrentIndex(1)
    preloadImages()
    return () => document.getElementById('body')?.classList.remove('dark')
  }, [preloadImages])
  
  const drawCurrentFrame = useCallback(() => {
    setCanvasSize()
    const img = imageArray[currentIndex - 1]
    if (!img) return
    if (img.complete) {
      drawFrame(img)
    } else {
      img.onload = () => { drawFrame(img) }
    }
  }, [currentIndex, imageArray, drawFrame, setCanvasSize])

  useEffect(() => {
    requestAnimationFrame(() => drawCurrentFrame())
  }, [drawCurrentFrame])

  const onScroll = useCallback(() => {
    if (!canvasRef.current) return
    if (!stickySpacerRef.current) return
    if (!stickyWrapRef.current) return
    const canvasRect = canvasRef.current.getBoundingClientRect()
    if (Math.abs(canvasRect.top) > 50) return

    const spacerHeight = stickySpacerRef.current.clientHeight
    const wrapRect = stickyWrapRef.current.getBoundingClientRect()
    const percentage = Math.min(-wrapRect.top / spacerHeight, 1)
    const tempIndex = Math.max(1, Math.floor(percentage * frameCount))
    setCurrentIndex(tempIndex)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <div className={styles.container}>
      <Head>
        <title>{`${t('top', {ns: 'common'})} | Zwin`}</title>
        <meta name="description" content={t('explainer.desc') || ""} />
        <meta property="og:title" content={`${t('top', {ns: 'common'})} | Zwin`}/>
        <meta property="og:url" content={`https://zwin.dev${router.asPath}`} />
        <meta property="og:description" content={t('explainer.desc') || ""} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header toppage />
        <section className={styles.fv}>
          <h1 className={styles.title} dangerouslySetInnerHTML={
            {__html: t('fv.h1', {interpolation: {escapeValue: false}})}
          }/>
          <p className={styles.for}>
            {router.locale != 'ja' && <span>{t('fv.for')}</span>}
            <span className={styles.box}>{t('fv.pc')}</span>
            <span>+</span>
            <span className={styles.box}>{t('fv.hmd')}</span>
            {router.locale == 'ja' && <span>{t('fv.for')}</span>}
          </p>
          <p className={styles.desc}>{t('fv.open')}</p>
        </section>
        <div className={styles.buttonwrap}>
          <Cta white={false}/>
          <a target="_blank" rel="noreferrer" className={styles.wraplink} href="https://github.com/zwin-project">
            <p className={styles.button}>{t('fv.github')}</p>
          </a>
        </div>
        <div className={styles.stickybgwrap} ref={stickyWrapRef}>
          <div className={styles.stickybg}>
            <canvas ref={canvasRef}></canvas>
          </div>
          <div className={styles.stickyspacer} ref={stickySpacerRef} />
          <section className={styles.explainer}>
            <p>{t('explainer.desc')}</p>
            <Link className={styles.wraplink} href='/what_is_it/what_is_zwin'>
              <ChevronLink text={t('explainer.link')} />
            </Link>
          </section>
          <section className={styles.videowrap}>
            <div className={styles.videoinner}>
              <p>{t('video.desc')}</p>
              <h2>{t('video.heading')}</h2>
              <iframe className={styles.videoembed}
                // width="560" height="315"
                src="https://www.youtube.com/embed/uZEDEfEZB1w" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
          </section>
          <div className={styles.features}>
            <section className={styles.featurewrap}>
              <Feature
                odd={true}
                title={t('feature1.title')}
                heading={[t('feature1.heading')]}
                desc={[{ text: t('feature1.desc') }]}
                points={[
                  t('feature1.point1'),
                  t('feature1.point2')
                ]}
                image='/top/feature/1.png'
              />
            </section>
            <section className={styles.featurewrap}>
              <Feature
                odd={false}
                title={t('feature2.title')}
                heading={[t('feature2.heading')]}
                desc={[{ text: t('feature2.desc') }, { text: t('feature2.desc_bold'), bold: true }]}
                points={[
                  t('feature2.point1'),
                  t('feature2.point2')
                ]}
                image='/top/feature/2.png'
              />
              <section className={styles.feature3dwindow}>
                <div className={styles.left}>
                  <h3>{t('feature2.whats.title')}</h3>
                  {!isLarge && <div className={styles.imagewrap + ' ' + styles.mobile}>
                    <Image alt='3D window explanation' src={'/top/3dwindow/3dwindow_' + router.locale + '.png'} className={styles.image} fill />
                  </div>}
                  <p className={styles.bold}>{t('feature2.whats.desc1')}</p>
                  <p>{t('feature2.whats.desc2')}</p>
                  <p>{t('feature2.whats.desc3')}</p>
                  <p>{t('feature2.whats.desc4')}</p>
                </div>
                <div className={styles.right}>
                  {isLarge && <div className={styles.imagewrap}>
                    <Image alt='3D window explanation' src={'/top/3dwindow/3dwindow_' + router.locale + '.png'} className={styles.image} fill />
                  </div>}
                  <Link className={styles.wraplink} href='/what_is_it/3d_window'>
                    <ChevronLink text={t('feature2.whats.link')} />
                  </Link>
                </div>
              </section>
            </section>
            <section className={styles.featurewrap}>
              <Feature
                odd={true}
                title={t('feature3.title')}
                heading={[t('feature3.heading1'), t('feature3.heading2')]}
                desc={[{ text: t('feature3.desc') }]}
                points={[
                  t('feature3.point1'),
                  t('feature3.point2')
                ]}
                image='/top/feature/3.png'
              />
            </section>
          </div>
        </div>
        <section className={styles.try}>
          <div className={styles.tryinner}>
            <h2>{t('try.heading')}</h2>
            <p>{t('try.desc')}</p>
            <Cta white/>
          </div>
        </section>
        <section className={styles.twitter}>
          <div className={styles.twitterinner}>
            <div className={styles.head}>
              <h2>{t('twitter.heading')}</h2>
              <a target="_blank" rel="noreferrer" className={styles.wraplink} href="https://twitter.com/zwin_project">
                <ChevronLink text={t('twitter.link')} />
              </a>
            </div>
            <TwitterTimeline />
          </div>
        </section>
        <section className={styles.links}>
          <div className={styles.linksinner}>
            <h2>{t('links.heading')}</h2>
            <div className={styles.cardwrap}>
              <Link className={styles.wraplink} href='/roadmap'>
                <Card title={t('roadmap', {ns: "common"})} desc={t('roadmap_desc', {ns: "common"})} />
              </Link>
              <Link className={styles.wraplink} href='/contact'>
                <Card title={t('contact', {ns: "common"})} desc={t('contact_desc', {ns: "common"})} />
              </Link>
              <Link className={styles.wraplink} href='/roadmap'>
                <Card title={'Roadmap'} desc={'Don\'t miss our future releases'} />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  )
}

export default Home
