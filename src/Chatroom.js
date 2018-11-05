// @flow
import type { MessageProps } from './types.js'
import React from 'react';
import * as styles from './styles';
import Message from './Message';
import Sidebar from './Sidebar';

type Props = {
    topic: string,
    messages: Array<MessageProps>,
};

const rootStyle = {
    paddingTop: styles.gridSize(),
    fontFamily: styles.fonts.serious,
    color: styles.colors.dark,
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: styles.colorsWithOpacity.light(0.3),
};

const messageListStyle = {
    marginLeft: styles.sidebarWidth,
    paddingLeft: styles.gridSize(),
    paddingRight: styles.gridSize(),
    flexGrow: 1,
    flexDirection: 'column',
    overflowY: 'auto',
}


export default class Chatroom extends React.Component<Props> {
    _messageListEl: ?HTMLDivElement;

    componentDidUpdate(prevProps: Props) {
        if (prevProps.messages.length !== this.props.messages.length) {
            this.scrollBottom();
        }
    }

    setMessageListEl = (el: ?HTMLDivElement) => {
        this._messageListEl = el;
    };

    scrollBottom = () => {
        if (this._messageListEl) {
            this._messageListEl.scrollTop = this._messageListEl.scrollHeight;
        }
    }

    render() {
        const { messages, topic } = this.props;
        return (
            <div style={rootStyle}>
                <Sidebar topic={topic} />
                <div ref={this.setMessageListEl} style={messageListStyle}>
                    {messages.map((message, idx) => {
                        return (
                            <Message
                                {...message}
                                key={idx}
                                onLoad={this.scrollBottom}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }

}
