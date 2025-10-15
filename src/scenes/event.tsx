import { brightness, makeScene2D, Node } from '@motion-canvas/2d'
import { Img, Layout, Rect, Txt } from '@motion-canvas/2d/lib/components'
import { all, waitFor } from '@motion-canvas/core/lib/flow'
import { easeInOutCubic, easeOutBack } from '@motion-canvas/core/lib/tweening'
import { createRef } from '@motion-canvas/core/lib/utils'
import crt from '../shaders/crt.glsl';
import { data } from '../project';

import ficLogo from '../images/fic.svg'
import udcLogo from '../images/udc.svg'

const COLORS = [
  "#0ea5e9",
  "#10b981",
  "#8b5cf6",
  "#ec4899"
]
const BG_COLORS = [
  "#0ea5e922",
  "#10b98122",
  "#8b5cf622",
  "#ec489922"
]

const dayFormatter = new Intl.DateTimeFormat("gl-es", {
  weekday: 'long',
  day: 'numeric',
  month: 'long'
})

const timeFormatter = new Intl.DateTimeFormat("gl-es", {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false
})

export default makeScene2D(function* (view) {
  const background = createRef<Rect>()
  const container = createRef<Rect>()
  const header = createRef<Layout>()
  const main = createRef<Layout>()
  const footer = createRef<Layout>()

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
        {/* Header Section with Logos */}
        <Layout
          ref={header}
          direction="row"
          alignItems="center"
          gap={40}
          opacity={0}
          y={-50}
        >
          <Img src={udcLogo} width={120} />
          <Layout direction="column" alignItems="center" gap={15}>
            <Txt
              fontSize={48}
              fill={'#1e293b'}
              fontWeight={700}
              letterSpacing={2}
              cache
              textAlign={'center'}
            >
              UNIVERSIDADE DA CORUÑA
            </Txt>
            <Txt fontSize={38} fill={'#64748b'} fontWeight={600} cache>
              Facultade de Informática
            </Txt>
            <Rect width={400} height={3} fill={'#0ea5e9'} radius={2} />
          </Layout>
          <Img src={ficLogo} width={120} />
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
            {data.title}
          </Txt>

          <Layout direction="column" alignItems="center" gap={15}>
            <Txt fontSize={52} fill={'#0ea5e9'} fontWeight={700} cache>
              {data.author}
            </Txt>
            <Layout direction="row" alignItems="center" gap={30}>

              {
                data.tags.map( (tag, i) =>
                
              <Rect
                layout
                fill={BG_COLORS[i]}
                stroke={COLORS[i]}
                lineWidth={2}
                radius={10}
                padding={15}
              >
                <Txt fontSize={28} fill={COLORS[i]} filters={[brightness(0.3)]} fontWeight={600} cache>
                  {tag}
                </Txt>
              </Rect>
              )
            }
            </Layout>
          </Layout>
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
          <Rect
            layout
            fill={'rgba(14, 165, 233, 0.1)'}
            stroke={'#0ea5e9'}
            lineWidth={3}
            radius={15}
            padding={25}
          >
            <Txt filters={[brightness(0.3)]} fontSize={38} fill={'#0ea5e9'} fontWeight={700} cache>
              {dayFormatter.format(data.startDate)}
            </Txt>
          </Rect>

          <Rect
            layout
            fill={'rgba(249, 115, 22, 0.1)'}
            stroke={'#f97316'}
            lineWidth={3}
            radius={15}
            padding={25}
          >
            <Txt filters={[brightness(0.3)]} fontSize={38} fill={'#f97316'} fontWeight={700} cache>
              {timeFormatter.format(data.startDate)}
              {" - "}
              {timeFormatter.format(data.endDate)}
            </Txt>
          </Rect>
        </Layout>
      </Rect>
    </Node>
  )

  // Animation sequence
  yield* all(
    container().opacity(1, 0.8, easeInOutCubic),
  )

  yield* waitFor(0.2)

  yield* all(header().opacity(1, 0.6), header().y(0, 0.6, easeInOutCubic))

  yield* waitFor(0.3)

  yield* all(main().opacity(1, 0.8), main().scale(1, 0.8, easeOutBack))

  yield* waitFor(0.4)

  yield* all(footer().opacity(1, 0.6), footer().y(0, 0.6, easeInOutCubic))

  yield* waitFor(0.3)

  yield* waitFor(1.5)

  // Highlight important info
  yield* all(footer().scale(1.05, 0.4).to(1, 0.4))

  yield* waitFor(2)
})
