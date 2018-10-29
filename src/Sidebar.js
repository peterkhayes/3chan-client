// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  topic: string,
};

const ROOT_STYLE = {
  fontFamily: styles.fonts.fun,
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: styles.sidebarWidth - 1,
  padding: styles.gridSize(),
  borderRight: styles.border,
};

const HEADER_STYLE = {
  fontSize: 24,
  fontWeight: 600,
};

const SECTION_STYLE = {
  marginTop: styles.gridSize(2)
}

const TOPIC_STYLE = {
  fontWeight: 600,
}

export default class Sidebar extends React.PureComponent<Props> {
  render() {
    return (
      <div style={ROOT_STYLE}>
        <div style={HEADER_STYLE}>
          Welcome to 3Chan!
        </div>
        <div style={SECTION_STYLE}>
          3Chan is Newtopia's central forum for intelligent debate and radical acceptance.
        </div>
        <div style={SECTION_STYLE}>
          We're currently discussing <span style={TOPIC_STYLE}>{this.props.topic}</span>!
        </div>
        <div style={SECTION_STYLE}>
          Please keep all conversation civil, respectful, and thoughtful. Remember, we're all in this together!
        </div>
      </div>
    )
  }
}