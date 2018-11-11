// @flow
import type { Message } from './types';
import React from 'react';
import * as styles from './styles';

type Props = {
  text: string,
  placeholder: string,
  onTextChange: (text: string) => void,
  onSubmit: (text: string) => void,
};

const textAreaStyle = {
  width: '100%',
  height: styles.gridSize(8),
  resize: 'none',
  fontFamily: styles.fonts.fun,
  backgroundColor: 'inherit',
  color: styles.colors.dark,
  border: 'none',
  borderTop: styles.border,
  margin: '0 -1px 0',
  padding: styles.gridSize(1),
  outline: 'none',
  fontSize: 14,
};

export default class MessageInput extends React.Component<Props> {
  _textAreaEl: ?HTMLTextAreaElement

  componentDidUpdate () {
    if (this._textAreaEl) {
      this._textAreaEl.focus();
    }
  }

  _setTextAreaEl = (el: ?HTMLTextAreaElement) => {
    if (el) {
      this._textAreaEl = el;
      el.focus();
    }
  }

  onKeyDown = (e: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      this.props.onSubmit(this.props.text);
      e.preventDefault();
    }
  }

  onChange = (e: SyntheticKeyboardEvent<HTMLTextAreaElement>) => {
    this.props.onTextChange(e.currentTarget.value);
  }

  render() {
    return (
      <textarea
        ref={this._setTextAreaEl}
        style={textAreaStyle}
        value={this.props.text}
        placeholder={this.props.placeholder}
        onKeyDown={this.onKeyDown}
        onChange={this.onChange}
      />
    )
  }
}