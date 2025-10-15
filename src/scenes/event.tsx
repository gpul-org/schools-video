import { Gradient, makeScene2D } from '@motion-canvas/2d'
import { Img, Layout, Rect, Txt } from '@motion-canvas/2d/lib/components'
import { all, chain, waitFor } from '@motion-canvas/core/lib/flow'
import { easeInOutCubic, easeOutBack, linear } from '@motion-canvas/core/lib/tweening'
import { createRef } from '@motion-canvas/core/lib/utils'

import amtegaLogo from '../images/amtega.jpg'
import gpulLogo from '../images/gpul.svg'
import { createSignal } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  const background = createRef<Rect>()
  const container = createRef<Rect>()
  const header = createRef<Layout>()
  const main = createRef<Layout>()
  const libreGradient = createSignal(-100)
  const footer = createRef<Layout>()

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
        gap={50}
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
        {/* Header Section with Logos */}
        <Layout
          ref={header}
          width={"100%"}
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={40}
          opacity={0}
          y={-50}
        >
          <Img src={gpulLogo} height={120} />
          <Txt>+</Txt>
          <Img src={amtegaLogo} height={100} />
        </Layout>

        {/* Main Content */}
        <Layout
          ref={main}
          direction="column"
          alignItems="center"
          gap={30}
          opacity={0}
          scale={0.9}
        >
          <Txt
            fontSize={68}
            fill={'#1e293b'}
            fontWeight={900}
            letterSpacing={1}
            cache
            textAlign={'center'}
          >
            Premio ao mellor traballo universitario
          </Txt>
          <Txt
            fontSize={200}
            fontWeight={700}
            fontFamily={"Jetbrains Mono"}
            fill={new Gradient({
              type: 'linear',
              from: () => -100 + libreGradient(),
              to: () => 100 + libreGradient(),
              stops: [
                {offset: 0, color: '#2A7B9B'},
                {offset: 1/2, color: '#57C785'},
                {offset: 2/2, color: '#EDDD53'},
              ]
            })}
          >
            Libre
          </Txt>
        </Layout>

        {/* Footer Section */}
        <Layout
          ref={footer}
          direction="row"
          alignItems="center"
          gap={50}
          opacity={0}
          y={50}
        >
          <Txt>
            Fecha límite:
          </Txt>
          <Rect
            layout
            fill={'rgba(14, 165, 233, 0.1)'}
            stroke={'#0ea5e9'}
            lineWidth={3}
            radius={15}
            padding={25}
          >
            <Txt fontSize={42} fill={'#0ea5e9'} fontWeight={700} cache>
              30 de outubro
            </Txt>
          </Rect>
        </Layout>
      </Rect>
    </>
  )

  // Animation sequence
  yield* all(
    container().opacity(1, 0.8, easeInOutCubic),
    container().scale(1, 0.8, easeOutBack)
  )

  yield* waitFor(0.2)

  yield* all(header().opacity(1, 0.6), header().y(0, 0.6, easeInOutCubic))

  yield* waitFor(0.3)

  yield* all(
    main().opacity(1, 0.8),
    main().scale(1, 0.8, easeOutBack),
    libreGradient(100, 3, easeInOutCubic),
    chain(
      waitFor(0.4),
      all(footer().opacity(1, 0.6), footer().y(0, 0.6, easeInOutCubic))

    )
  )

  yield* waitFor(0.3)

  yield* waitFor(1.5)

  // Highlight important info
  yield* all(footer().scale(1.05, 0.4).to(1, 0.4))

  yield* waitFor(2)
})
