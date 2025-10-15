
import { colorSignal, initial, NodeProps, Rect, Txt } from "@motion-canvas/2d";
import { ColorSignal, createRef, PossibleColor, SignalValue } from "@motion-canvas/core";

export interface FloppyProps extends NodeProps {
  bodyColor?: SignalValue<PossibleColor>
}

export class Floppy extends Rect {

  @initial("#f00")
  @colorSignal()
  public declare readonly bodyColor: ColorSignal<this>;

  private readonly container = createRef<Rect>();
  
  public constructor(props?: FloppyProps) {
    super({
      fill: props.bodyColor,
      ...props
    });

    this.add(
      <Rect
        ref={this.container}
        size={[80, 80]}
        fill={this.bodyColor}
      >


      </Rect>
    )
  }
}
