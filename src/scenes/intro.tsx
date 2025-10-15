import { makeScene2D, Node } from '@motion-canvas/2d'
import { Img, Layout, Rect, Txt } from '@motion-canvas/2d/lib/components'
import { all, waitFor } from '@motion-canvas/core/lib/flow'
import { easeInOutCubic, easeOutBack, linear } from '@motion-canvas/core/lib/tweening'
import { createRef, range} from '@motion-canvas/core/lib/utils'

import gpulLogo from '../images/gpul.svg'
import { Commodore } from '../components/Commodore'
import { createSignal } from '@motion-canvas/core'

export default makeScene2D(function* (view) {
  const camera = createRef<Node>()
  const background = createRef<Rect>()
  const container = createRef<Rect>()
  const logo = createRef<Img>()
  const associationName = createRef<Txt>()
  const tagline = createRef<Txt>()
  const presents = createRef<Rect>()

  const commodore = createRef<Commodore>()

  const load = createSignal(0)
  const maxLoad = 20

  yield view.add(
    <Node ref={camera}>
      {/* Light Background */}
      <Rect ref={background} width={1920} height={1080} fill={'#587D8B'} />

      <Commodore ref={commodore}>

      {/* Main container */}
      <Rect
        ref={container}
        layout
        direction="column"
        alignItems="center"
        justifyContent="center"
        gap={50}
        opacity={0}
        scale={1.1}
      >
        {/* GPUL Logo */}
        <Img ref={logo} src={gpulLogo} width={300} opacity={0} scale={0} />

        {/* Association Name */}
        <Layout direction="column" alignItems="center" gap={20}>
          <Txt
            ref={associationName}
            fontSize={56}
            fill={'#1e293b'}
            fontWeight={800}
            letterSpacing={2}
            opacity={0}
            y={50}
            cache
            textAlign={'center'}
          >
            GRUPO DE PROGRAMADORES{'\n'}E USUARIOS DE LINUX
          </Txt>

          <Txt
            ref={tagline}
            fontSize={32}
            fill={'#64748b'}
            fontWeight={400}
            fontStyle={'italic'}
            opacity={0}
            cache
          >
            Freeing minds since 1998
          </Txt>
        </Layout>

        {/* Presents text */}
        <Rect
          ref={presents}
          opacity={0}
          layout
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
        <Txt
          text={"PRESENTA"}
          fontSize={48}
          fill={'#0ea5e9'}
          fontWeight={600}
          letterSpacing={2}
          scale={0.8}
        />
        <Layout
          layout
          direction={"row"}
          gap={5}
          justifyContent={"center"}
          alignItems={"center"}
          height={20}
        >
          {range(maxLoad).map( i =>
            <Rect
              fill={() => i < load() ? "black" : "white"}
              size={[15, 25]}
            />
          )}
        </Layout>
        <Layout
          layout={false}
        >
        <Txt
          text={() => `${(load() / maxLoad * 100).toFixed(0)}%`}
          fontSize={30}
          position={[250, 29]}
        />
        </Layout>
        </Rect>
        {/* 
            MAYBE: screen on and off animations (4 pointed star like)
        */}
      </Rect>
      </Commodore>
    </Node>
  )

  // Animation sequence
  yield* container().opacity(1, 0.6, easeInOutCubic)
  yield* waitFor(0.2)

  yield* all(logo().opacity(1, 0.8), logo().scale(1, 1.2, easeOutBack))

  yield* waitFor(0.3)

  yield* all(
    associationName().opacity(1, 0.8),
    associationName().y(0, 0.8, easeInOutCubic)
  )

  yield* waitFor(0.2)

  yield* tagline().opacity(1, 0.6)
  yield* waitFor(0.4)

  yield* all(
    presents().opacity(1, 0.8),
    presents().scale(1, 0.8, easeOutBack),
    load(maxLoad, 2, linear)
  )

  yield* all(
    // Gentle logo pulse
    logo().scale(1.05, 0.5).to(1, 0.5),
    camera().scale([2,2], 1),
    container().opacity(0, 0.6, easeInOutCubic)
  )
})
