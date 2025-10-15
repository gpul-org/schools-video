import { Img, makeScene2D } from '@motion-canvas/2d'
import { Layout, Rect, Txt } from '@motion-canvas/2d/lib/components'
import { all, waitFor } from '@motion-canvas/core/lib/flow'
import { easeInOutCubic, easeOutBack } from '@motion-canvas/core/lib/tweening'
import { createRef } from '@motion-canvas/core/lib/utils'
import qr from '../images/qr-premio-gpul-org.svg'

export default makeScene2D(function* (view) {
  const background = createRef<Rect>()
  const container = createRef<Rect>()
  const seeYou = createRef<Txt>()
  const socialContainer = createRef<Layout>()

  yield view.add(
    <>
      {/* Light Background */}
      <Rect ref={background} width={1920} height={1080} fill={'#f8fafc'} />

      {/* Main container */}
      <Rect
        ref={container}
        layout
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={70}
        width={1600}
        height={900}
        fill={'white'}
        stroke={'#e2e8f0'}
        lineWidth={2}
        radius={20}
        shadowColor={'rgba(0, 0, 0, 0.1)'}
        shadowOffset={[0, 10]}
        shadowBlur={40}
        opacity={0}
        scale={0.8}
      >
        {/* See you there message */}
        <Layout
          ref={seeYou}
          opacity={0}
          direction={"column"}
          alignItems={"center"}
        >
        <Txt
          fontSize={72}
          fill={'#0ea5e9'}
          fontWeight={800}
          letterSpacing={2}
          scale={0.9}
          cache
        >
          Libera o teu TFG/TFM ya!
        </Txt>
        <Txt>
          E gaña até 750€
        </Txt>
        </Layout>
        {/* Social Media Section */}
        <Layout
          ref={socialContainer}
          direction="column"
          alignItems="center"
          gap={10}
          opacity={0}
          y={50}
        >
          <Txt fontSize={38} fill={'#1e293b'} fontWeight={600} cache>
            Consulta las bases en:
          </Txt>

          <Img src={qr} height={300} />
          <Txt fontSize={38} fill={'#1e293b'} fontWeight={600} cache>
            premio.gpul.org
          </Txt>
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
    </>
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

  yield* waitFor(0.7)

  yield* container().children()[2].opacity(1, 0.6)

  yield* waitFor(1)

  // Final pulse effect
  yield* all(
    seeYou().scale(1.05, 0.4).to(1, 0.4),
  )

  yield* waitFor(2)
})
