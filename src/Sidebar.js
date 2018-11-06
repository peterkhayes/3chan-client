// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  topic: string,
  error: ?string,
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

const errorStyle = {
  position: 'absolute',
  bottom: styles.gridSize(),
  border: `1px solid #A00`,
  borderRadius: 10,
  backgroundColor: 'RGBA(255, 0, 0, 0.1)',
  left: styles.gridSize(),
  right: styles.gridSize(),
  padding: styles.gridSize(),
  color: '#A00',
}

export default class Sidebar extends React.PureComponent<Props> {
  render() {
    const { topic, error } = this.props;
    return (
      <div style={rootStyle}>
        <div style={headerStyle}>
          Welcome to 3Chan!
        </div>
        <div style={sectionStyle}>
          3Chan is Newtopia's central forum for intelligent debate and radical acceptance.
        </div>
        <div style={sectionStyle}>
          We're currently discussing <span style={topicStyle}>{topic}</span>!
        </div>
        <div style={sectionStyle}>
          Please keep all conversation civil, respectful, and thoughtful. Remember, we're all in this together!
        </div>
        { error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
      </div>
    )
  }
}