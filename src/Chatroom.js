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
    showingHelpModal: boolean,
    setMessageInputText: (string) => void,
    submitMessage: (string) => void,
    showHelpModal: () => void,
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
    boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
    backgroundColor: 'white',
    borderRadius: styles.gridSize(),
}

const changeMessagePopupStyle = {
    ...popupStyle,
    width: 350,
    height: 200,
    marginLeft: -175,
    marginTop: -150,
    fontSize: 30,
    display: 'flex',
    fontFamily: styles.fonts.fun,
    alignItems: 'center',
    justifyContent: 'center',
};

const popupInstructionsStyle = {
    ...popupStyle,
    fontFamily: styles.fonts.serious,
    width: 400,
    height: 300,
    marginLeft: -200,
    marginTop: -150,
    padding: 2 * styles.gridSize(),
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
        const {
            messages,
            topic,
            invertColors,
            changingTopic,
            messageInputText,
            messageInputError,
            messageInputPlaceholder,
            showingHelpModal,
            setMessageInputText,
            submitMessage,
            showHelpModal,
        } = this.props;

        return (
            <div style={{...outerRootStyle, filter: invertColors ? "invert(100%)" : undefined}}>
                <div style={rootStyle}>
                    <Sidebar topic={topic} error={messageInputError} showHelpModal={showHelpModal} />
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
                {(changingTopic || showingHelpModal) && (
                    <div style={overlayStyle}>
                        {changingTopic ? (
                            <div style={changeMessagePopupStyle}>Changing topic...</div>
                        ) : (
                            <div style={popupInstructionsStyle}>
                                <h2>3Chan</h2>
                                <p>This project simulates a chatroom. It was on display at an internet-themed party in 2018. Over the course of the evening, the chatroom descends from "civility" into "madness".</p>
                                <p>Some of the content was written by my partner Andrea Passwater. Other content was scraped from Reddit and/or generated with Markov Chains.</p>
                            </div>
                        )}  
                    </div>
                )}
            </div>
        )
    }

}
