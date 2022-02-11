// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  topic: string,
  error: ?string,
  showHelpModal: () => void,
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
  marginTop: styles.gridSize(3)
}

const topicSectionStyle = {
  fontSize: 20,
}

const topicStyle = {
  fontWeight: 600,
}

const messageStyle = {
  position: 'absolute',
  bottom: styles.gridSize(),
  borderRadius: 10,
  left: styles.gridSize(),
  right: styles.gridSize(),
  padding: styles.gridSize(),
}

const infoStyle = {
  ...messageStyle,
  backgroundColor: 'RGBA(0, 255, 0, 0.1)',
  border: `1px solid #0A0`,
  color: '#0A0',
  fontSize: 12,
}

const infoHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

const infoModalIconStyle = {
  color: 'inherit',
  backgroundColor: 'transparent',
  borderRadius: '50%',
  border: `1px solid #0A0`,
  width: 16,
  height: 16,
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
}

const errorStyle = {
  ...messageStyle,
  backgroundColor: 'RGBA(255, 0, 0, 0.1)',
  color: '#A00',
  border: `1px solid #A00`,
}


export default class Sidebar extends React.PureComponent<Props> {
  render() {
    const { topic, error, showHelpModal } = this.props;
    return (
      <div style={rootStyle}>
        <div style={headerStyle}>
          Welcome to 3Chan!
        </div>
        <div style={sectionStyle}>
          3Chan is Newtopia's central forum for intelligent debate and radical acceptance.
        </div>
        <div style={sectionStyle}>
          Please keep all conversation civil, respectful, and thoughtful. Remember, we're all in this together!
        </div>
        <div style={sectionStyle}>
          <div style={topicSectionStyle}>
            We're currently discussing: <span style={topicStyle}>{topic}</span>!
          </div>
        </div>
        { error && (
          <div style={errorStyle}>
            {error}
          </div>
        )}
        {!error && (
          <div style={infoStyle}>
            <div style={infoHeaderStyle}>
              <span>Controls:</span>
              <button onClick={showHelpModal}  style={infoModalIconStyle}>?</button>
            </div>
            <ul>
            <li>ctrl+shift+[ - previous topic</li>
            <li>ctrl+shift+] - next topic</li>
            <li>ctrl+shift+j - make chatroom "worse"</li>
            <li>ctrl+shift+k - make chatroom "better"</li>
            <li>ctrl+shift+up - speed up</li>
            <li>ctrl+shift+down - speed up</li>
            </ul>
          </div>
        )}
      </div>
    )
  }
}