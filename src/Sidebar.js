// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  topic: string,
};

const rootStyle = {
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

const headerStyle = {
  fontSize: 24,
  fontWeight: 600,
};

const sectionStyle = {
  marginTop: styles.gridSize(2)
}

const topicStyle = {
  fontWeight: 600,
}

export default class Sidebar extends React.PureComponent<Props> {
  render() {
    return (
      <div style={rootStyle}>
        <div style={headerStyle}>
          Welcome to 3Chan!
        </div>
        <div style={sectionStyle}>
          3Chan is Newtopia's central forum for intelligent debate and radical acceptance.
        </div>
        <div style={sectionStyle}>
          We're currently discussing <span style={topicStyle}>{this.props.topic}</span>!
        </div>
        <div style={sectionStyle}>
          Please keep all conversation civil, respectful, and thoughtful. Remember, we're all in this together!
        </div>
      </div>
    )
  }
}