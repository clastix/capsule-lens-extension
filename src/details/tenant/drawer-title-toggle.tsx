import { Component } from '@k8slens/extensions';
import React from 'react';

export type Props = {
  title: string
}

export type State = {
  visible: boolean
}

export class DrawerTitleToggle extends React.Component<Props, State> {
  state: State = {
    visible: false
  }

  toggle = () => {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const { visible } = this.state;
    const { title, children } = this.props;
    const icon = `arrow_drop_${visible ? 'up' : 'down'}`;
    const link = visible ? 'Hide' : 'Show';

    return <>
      <div className='DrawerTitle DrawerParamToggler flex align-center'>
        <div className='param-label'>{title}</div>
        <div className='param-link' onClick={this.toggle}>
          <span className='param-link-text'>{link}</span>
          <Component.Icon material={icon}/>
        </div>
      </div>
      {visible && children}
    </>;
  }
}
