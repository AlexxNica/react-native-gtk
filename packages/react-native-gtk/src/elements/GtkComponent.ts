import cssToYogaValue from '../flexbox/cssToYogaValue';
import flex from '../flexbox/flex';
import { Node } from 'yoga-layout';
import * as gtk from 'gtk-node';

export interface StyleAttributes {
  flex ?: number;
  flexDirection ?: 'row' | 'column';
  justifyContent ?: 'space-between' | 'space-around';
  width ?: number;
  height ?: number;
}

export interface GtkProps {
  style?: StyleAttributes;
  children?: any;
};

export default abstract class GtkComponent<T extends gtk.Widget = gtk.Widget, P extends GtkProps = GtkProps> {
  abstract node: T;
  props: P;
  children = new Array<GtkComponent>();
  layout: Node = Node.createDefault();

  constructor(props: P) {
    this.props = props;
  }

  commitMount(): void {
    this.update();
  }

  commitUpdate(newProps: any): void {
    this.props = newProps;
    this.update();
  }

  private update() {
    this.setProps();
    this.layoutChildren();
  }

  appendChild(child: GtkComponent): void {
    this.children.push(child);
    this.layout.insertChild(child.layout, this.layout.getChildCount());
  }

  removeChild(child: GtkComponent): void {

  }

  layoutChildren(): void {
    // no-op
    return undefined;
  }

  private setProps(): void {
    for (const [key, value] of Object.entries(this.props)) {
      if (key === 'style') {
        this.applyStyles(value);
      }
      this.setProp(key, value);
    }
  }

  setProp(prop: string, value: any): void {
    // no-op
    return undefined;
  }

  private applyStyles(style: StyleAttributes) {
    flex(style, this.layout);
    if ('width' in style && 'height' in style) {
      this.node.set_size_request(style.width as number, style.height as number);
    }
  }
}