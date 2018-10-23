// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  topic: string,
};

const ROOT_STYLE = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: styles.sidebarWidth - 1,
  backgroundColor: 'white',
  borderRight: styles.border,
}

export default class Sidebar extends React.PureComponent<Props> {
  render() {
    return (
      <div style={ROOT_STYLE}>
        THIS IS SIDEBAR
      </div>
    )
  }
}