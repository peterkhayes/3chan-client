// @flow
import type { MessageProps } from './types.js'
import React from 'react';
import * as styles from './styles';
import Message from './Message';
import Sidebar from './Sidebar';
import MessageInput from './MessageInput';

type Props = {
    topic: string,
    invertColors: boolean,
    messageInputText: string,
    messageInputError: ?string,
    messageInputPlaceholder: string,
    messages: Array<MessageProps>,
    setMessageInputText: (string) => void,
    submitMessage: (string) => void,
};

const outerRootStyle = {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
};

const rootStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    paddingTop: styles.gridSize(),
    fontFamily: styles.fonts.serious,
    color: styles.colors.dark,
    display: 'flex',
    backgroundColor: styles.colorsWithOpacity.light(0.3),
};

const mainPanelStyle = {
    marginLeft: styles.sidebarWidth,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
}

const messageListStyle = {
    paddingLeft: styles.gridSize(),
    paddingRight: styles.gridSize(),
    flex: '1 1 0',
    overflowY: 'auto',
};


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
        const {
            messages,
            topic,
            invertColors,
            messageInputText,
            messageInputError,
            messageInputPlaceholder,
            setMessageInputText,
            submitMessage,
        } = this.props;

        return (
            <div style={{...outerRootStyle, filter: invertColors ? "invert(100%)" : undefined}}>
                <div style={rootStyle}>
                    <Sidebar topic={topic} error={messageInputError} />
                    <div style={mainPanelStyle}>
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
                        <MessageInput
                            text={messageInputText}
                            placeholder={messageInputPlaceholder}
                            onTextChange={setMessageInputText}
                            onSubmit={submitMessage}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
