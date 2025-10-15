import { brightness, Img, makeScene2D, Node } from '@motion-canvas/2d'
import { Layout, Rect, Txt } from '@motion-canvas/2d/lib/components'
import { all, waitFor } from '@motion-canvas/core/lib/flow'
import { easeInOutCubic, easeOutBack } from '@motion-canvas/core/lib/tweening'
import { createRef } from '@motion-canvas/core/lib/utils'
import crt from '../shaders/crt.glsl';

import instagramLogo from '../images/instagram.svg'
import telegramLogo from '../images/telegram.svg'
import webLogo from '../images/web.svg'
import twitterLogo from '../images/twitter.svg'

export default makeScene2D(function* (view) {
  const background = createRef<Rect>()
  const container = createRef<Rect>()
  const seeYou = createRef<Txt>()
  const socialContainer = createRef<Layout>()
  const instagram = createRef<Layout>()
  const twitter = createRef<Layout>()
  const telegram = createRef<Layout>()
  const website = createRef<Layout>()

  yield view.add(
    <Node shaders={crt}>
      {/* Light Background */}
      <Rect ref={background} width={1920 * 2} height={1080 * 2} fill={'#A6B8B6'} />

      {/* Main container */}
      <Rect
        ref={container}
        layout
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={50}
        width={1600}
        height={900}
        lineWidth={2}
        radius={20}
        shadowColor={'rgba(0, 0, 0, 0.1)'}
        shadowOffset={[0, 10]}
        shadowBlur={40}
        opacity={0}
        scale={1.3}
      >
        {/* See you there message */}
        <Txt
          ref={seeYou}
          fontSize={72}
          fill={'#0ea5e9'}
          fontWeight={800}
          letterSpacing={2}
          opacity={0}
          scale={0.9}
          cache
        >
          VÉMONOS ALÍ!
        </Txt>

        {/* Social Media Section */}
        <Layout
          ref={socialContainer}
          direction="column"
          alignItems="center"
          gap={50}
          opacity={0}
          y={50}
        >
          <Txt fontSize={38} fill={'#1e293b'} fontWeight={600} cache>
            Síguenos nas redes sociais
          </Txt>

          {/* Social Media Icons Grid */}
          <Layout direction="row" alignItems="center" gap={80}>
            {/* Instagram */}
            <Layout
              ref={instagram}
              direction="column"
              alignItems="center"
              gap={15}
              opacity={0}
              scale={0.8}
            >
              <Img width={90} src={instagramLogo}/>
              <Txt
                fontSize={32}
                fill={'#64748b'}
                fontWeight={500}
                cache
                textAlign={'center'}
              >
                @gpul_udc
              </Txt>
            </Layout>

            {/* Twitter */}
            <Layout
              ref={twitter}
              direction="column"
              alignItems="center"
              gap={15}
              opacity={0}
              scale={0.8}
            >
              <Img width={90} src={twitterLogo}/>
              <Txt
                fontSize={32}
                fill={'#64748b'}
                fontWeight={500}
                cache
                textAlign={'center'}
              >
                @gpul_udc
              </Txt>
            </Layout>

            {/* Telegram */}
            <Layout
              ref={telegram}
              direction="column"
              alignItems="center"
              gap={15}
              opacity={0}
              scale={0.8}
            >
              <Img width={90} src={telegramLogo}/>
              <Txt
                fontSize={32}
                fill={'#64748b'}
                fontWeight={500}
                cache
                textAlign={'center'}
              >
                @gpul_udc
              </Txt>
            </Layout>

            {/* Website */}
            <Layout
              ref={website}
              direction="column"
              alignItems="center"
              gap={15}
              opacity={0}
              scale={0.8}
            >
              <Img width={90} src={webLogo}/>
              <Txt
                fontSize={32}
                fill={'#64748b'}
                fontWeight={500}
                cache
                textAlign={'center'}
              >
                gpul.org
              </Txt>
            </Layout>
          </Layout>
        </Layout>

        {/* Bottom tagline */}
        <Txt
          fontSize={34}
          fill={'#64748b'}
          fontWeight={400}
          fontStyle={'italic'}
          opacity={0}
          cache
        >
          Promovendo o software libre desde 2003
        </Txt>
      </Rect>
    </Node>
  )

  // Animation sequence
  yield* all(
    container().opacity(1, 0.8, easeInOutCubic),
    container().scale(1, 0.8, easeOutBack)
  )

  yield* waitFor(0.3)

  yield* all(seeYou().opacity(1, 0.8), seeYou().scale(1, 1, easeOutBack))

  yield* waitFor(0.5)

  yield* all(
    socialContainer().opacity(1, 0.8),
    socialContainer().y(0, 0.8, easeInOutCubic)
  )

  yield* waitFor(0.2)

  // Animate social media icons sequentially
  yield* instagram().opacity(1, 0.4)
  yield* instagram().scale(1, 0.4, easeOutBack)
  yield* waitFor(0.15)

  yield* twitter().opacity(1, 0.4)
  yield* twitter().scale(1, 0.4, easeOutBack)
  yield* waitFor(0.15)

  yield* telegram().opacity(1, 0.4)
  yield* telegram().scale(1, 0.4, easeOutBack)
  yield* waitFor(0.15)

  yield* website().opacity(1, 0.4)
  yield* website().scale(1, 0.4, easeOutBack)

  yield* waitFor(0.5)

  yield* container().children()[2].opacity(1, 0.6)

  yield* waitFor(1)

  // Final pulse effect
  yield* all(
    seeYou().scale(1.05, 0.4).to(1, 0.4),
    instagram().children()[0].scale(1.1, 0.3).to(1, 0.3),
    twitter().children()[0].scale(1.1, 0.3).to(1, 0.3),
    telegram().children()[0].scale(1.1, 0.3).to(1, 0.3),
    website().children()[0].scale(1.1, 0.3).to(1, 0.3)
  )

  yield* waitFor(2)
})
