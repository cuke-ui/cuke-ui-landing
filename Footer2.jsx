import React from 'react';
import TweenOne from 'rc-tween-one';
import OverPack from 'rc-scroll-anim/lib/ScrollOverPack';

class Footer2 extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    const { dataSource } = props;
    delete props.dataSource;
    delete props.isMobile;
    return (
      <div {...props} {...dataSource.wrapper}>
        <OverPack {...dataSource.OverPack}>
          <TweenOne {...dataSource.links}>
            {dataSource.links.children.map((item, i) => {
              return (
                <a key={i.toString()} {...item}>
                  <img src={item.children} height="100%" alt="img" />
                </a>
              );
            })}
          </TweenOne>
          <TweenOne
            animation={{ x: '+=30', opacity: 0, type: 'from' }}
            key="copyright"
            {...dataSource.copyright}
          >
            {dataSource.copyright.children.map((item, i) =>
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
          </TweenOne>
        </OverPack>
      </div>
    );
  }
}

export default Footer2;
