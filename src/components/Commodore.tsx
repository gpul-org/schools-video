
import { brightness, colorSignal, contrast, Img, initial, Layout, Node, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { ColorSignal, PossibleColor, range, SignalValue } from "@motion-canvas/core";
import schoolsLogo from '../images/school-logo.png';
import crt from '../shaders/crt.glsl';

/*
body: #BAB29A
frameLight: #2A2626
frameDark: #150003
screen: #A6B8B6
*/

export interface CommodoreProps extends NodeProps {
  bodyColor?: SignalValue<PossibleColor>,
  frameColor?: SignalValue<PossibleColor>,
  screenColor?: SignalValue<PossibleColor>,
  badgeColor?: SignalValue<PossibleColor>,
}

export class Commodore extends Rect {

  @initial("#BAB29A")
  @colorSignal()
  public declare readonly bodyColor: ColorSignal<this>;
  @initial("#2A2626")
  @colorSignal()
  public declare readonly frameColor: ColorSignal<this>;
  @initial("#A6B8B6")
  @colorSignal()
  public declare readonly screenColor: ColorSignal<this>;
  @initial("#8F887C")
  @colorSignal()
  public declare readonly badgeColor: ColorSignal<this>;
  
  public constructor(props?: CommodoreProps) {
    super({
      ...props
    });

    this.add(
      <Layout
        direction={"column"}
        layout
      >
      {/* Screen */}
      <Rect
        size={[1200, 1000]}
        fill={this.bodyColor}
        radius={5}

        layout
        alignItems={"center"}
        justifyContent={"center"}

        shadowBlur={20}
        shadowOffset={[0, 10]}
        shadowColor={"#000b"}
      >
        <Rect
          size={[1150, 950]}
          fill={this.frameColor}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Rect
            size={[1100, 900]}
            fill={this.screenColor}
            radius={5}
            shaders={crt}
            alignItems={"center"}
            justifyContent={"center"}
          >
            {props.children}
          </Rect>
        </Rect>
      </Rect>
      {/* Foot */}
      <Rect
        size={[1200, 50]}
        fill={this.bodyColor}
        radius={[40, 40, 0, 0]}
        zIndex={-1}
      />
      {/* Badge */}
      <Rect
        size={[360, 60]}
        fill={this.bodyColor}
        zIndex={2}
        layout={false}
        position={[0, 490]}
        shadowOffset={[0, 10]}
        shadowBlur={10}
        shadowColor={"#0004"}
      >
        <Rect
          size={[350, 50]}
          fill={this.badgeColor}
          layout
          alignItems={"center"}
          justifyContent={"center"}
          gap={25}
        >

          {/* Logo */}
          <Img src={schoolsLogo} filters={[contrast(0), brightness(10)]} size={[30,30]}/>

          {/* Name */}
          <Txt
            fill={"white"}
            fontSize={20}
            fontWeight={1000}
          >
            gpulschool
          </Txt>

          {/* Rainbow */}
          <Rect
            layout
            direction={"column"}
            gap={4}
          >
            {[
              "#E33956",
              "#FF7A00",
              "#EFFF00",
              "#21E300",
              "#00C6FF",
            ].map(color =>
              <Rect
                size={[70, 4]}
                fill={color}
              />
            )}
          </Rect>

          {/* Power Indicator */}
          <Rect
            size={[30, 50]}
            fill={this.frameColor}
            layout
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <Rect
              size={[0,10]}
            />
            <Rect
              radius={10}
              size={[20,5]}
              fill={"darkgreen"}
              shadowBlur={2}
              shadowColor={"#fff"}

            />
            <Txt
              fill={"white"}
              fontSize={7}
            >
              POWER
            </Txt>
          </Rect>

        </Rect>
      </Rect>
      </Layout>
    )
  }
}
