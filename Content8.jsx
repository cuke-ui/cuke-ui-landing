import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';
import { Row, Col } from 'antd';
import QueueAnim from 'rc-queue-anim';

class Content8 extends React.PureComponent {
  getDelay = (e, b) => (e % b) * 100 + Math.floor(e / b) * 100 + b * 100;

  getBlockChildren = (item, i) => {
    const children = item.children;
    const delay = this.props.isMobile ? i * 50 : this.getDelay(i, 24 / item.md);
    const liAnim = {
      y: 30,
      opacity: 0,
      type: 'from',
      ease: 'easeOutQuad',
      delay,
    };
    return (
      <TweenOne component={Col} animation={liAnim} key={i.toString()} {...item}>
        <div {...children}>
          <div className="image-wrapper" {...children.img}>
            <img src={children.img.children} alt="img" />
          </div>
          <h2 {...children.title}>{children.title.children}</h2>
          <div {...children.content}>{children.content.children}</div>
        </div>
      </TweenOne>
    );
  };

  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    const children = dataSource.block.children.map(this.getBlockChildren);
    return (
      <div {...props} {...dataSource.wrapper}>
        <div {...dataSource.page}>
          <div {...dataSource.titleWrapper}>
            {dataSource.titleWrapper.children.map((item, i) =>
              React.createElement(
                item.name.indexOf('title') === 0 ? 'h1' : 'div',
                { key: i.toString(), ...item },
                typeof item.children === 'string' &&
                item.children.match(
                  /\.(svg|gif|jpg|jpeg|png|JPG|PNG|GIF|JPEG)$/
                )
                  ? React.createElement('img', {
                      src: item.children,
                      alt: 'img',
                    })
                  : item.children
              )
            )}
          </div>
          <OverPack {...dataSource.OverPack}>
            <QueueAnim type="bottom" key="img">
              <Row {...dataSource.block} key="img">
                {children}
              </Row>
            </QueueAnim>
          </OverPack>
        </div>
      </div>
    );
  }
}

export default Content8;
