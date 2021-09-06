import React, { Component } from 'react'
import { Input } from 'antd'
import './index.less'

export default class InputWithLabel extends Component {

    state = { isFocus: false, value: '' }

    inputOnFucus = () => {
        this.setState({ isFocus: true })
    }

    inputOnBlur = () => {
        if (!this.state.value) {
            this.setState({ isFocus: false })
        }
    }

    changeVal = (e) => {
        this.setState({ value: e.target.value })
    }

    reset = () => {
        this.setState({ value: '', isFocus: false })
    }

    render() {
        const { isFocus } = this.state;
        const { label, type, addonAfter } = this.props;
        return (
            <div className="input-with-label">
                {
                    type === 'password' ? <Input.Password onFocus={this.inputOnFucus} onBlur={this.inputOnBlur} onChange={this.changeVal} size="large"/>
                        : <Input onFocus={this.inputOnFucus} onBlur={this.inputOnBlur} onChange={this.changeVal} addonAfter={addonAfter || null} size="large"/>
                }
                <label className={isFocus ? 'input-label focus' : 'input-label'}>{label}</label>
            </div>
        )
    }
}
