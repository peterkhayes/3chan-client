// @flow
import type { Message } from './types.js'
import React from 'react';
import * as styles from './styles';
import MessageItem from './MessageItem';
import Sidebar from './Sidebar';
import MessageInput from './MessageInput';

type Props = {
    topic: string,
    invertColors: boolean,
    changingTopic: boolean,
    messageInputText: string,
    messageInputError: ?string,
    messageInputPlaceholder: string,
    messages: Array<Message>,
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
    paddingTop: styles.gridSize(0.5),
    fontFamily: styles.fonts.serious,
    color: styles.colors.dark,
    backgroundColor: styles.colorsWithOpacity.light(0.3),
};

const mainPanelStyle = {
    position: 'absolute',
    left: styles.sidebarWidth,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
}

const messageListStyle = {
    flex: '1 1 0',
    overflowY: 'auto',
};

const overlayStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
}

const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 350,
    height: 200,
    marginLeft: -175,
    marginTop: -150,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: styles.fonts.fun,
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    borderRadius: styles.gridSize(),
    fontSize: 30,
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
            changingTopic,
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
                                    <MessageItem
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
                {changingTopic && (
                    <div style={overlayStyle}>
                        <div style={popupStyle}>
                            Changing topic...
                        </div>
                    </div>
                )}
            </div>
        )
    }

}
