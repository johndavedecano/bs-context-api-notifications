import React from 'react'
import uuid4 from 'uuid/v4'
import assign from 'lodash/assign'
import omit from 'lodash/omit'

import { AlertList } from 'react-bs-notifier'

const NotificationContext = React.createContext()

class NotificationProvider extends React.Component {
  constructor() {
    super()
    this.state = {
      ['top-left']: {},
      ['top-right']: {},
      ['bottom-left']: {},
      ['bottom-right']: {}
    }

    this.push = this.push.bind(this)
    this.remove = this.remove.bind(this)
  }

  push(alert = {}) {
    if (this.state[alert.position]) {
      const id = uuid4()
      const nextAlert = assign({ id }, alert)
      this.setState(
        {
          [alert.position]: assign(this.state[alert.position], {
            [id]: nextAlert
          })
        },
        () => {
          if (this.props.debug) {
            console.log(this.state)
          }
        }
      )
    }
  }

  remove(alert) {
    if (this.state[alert.position]) {
      this.setState({
        [alert.position]: omit(this.state[alert.position], [alert.id])
      })
    }
  }

  render() {
    return (
      <NotificationContext.Provider
        value={{
          push: this.push,
          remove: this.remove
        }}
      >
        <AlertList
          position="top-left"
          alerts={Object.values(this.state['top-left'])}
          timeout={this.props.timeout}
          onDismiss={this.remove}
          showIcon={this.props.showIcon}
        />

        <AlertList
          position="top-right"
          alerts={Object.values(this.state['top-right'])}
          timeout={this.props.timeout}
          onDismiss={this.remove}
          showIcon={this.props.showIcon}
        />
        <AlertList
          position="bottom-left"
          alerts={Object.values(this.state['bottom-left'])}
          timeout={this.props.timeout}
          onDismiss={this.remove}
          showIcon={this.props.showIcon}
        />
        <AlertList
          position="bottom-right"
          timeout={this.props.timeout}
          alerts={Object.values(this.state['bottom-right'])}
          onDismiss={this.remove}
          showIcon={this.props.showIcon}
        />
        {this.props.children}
      </NotificationContext.Provider>
    )
  }
}

NotificationProvider.defaultProps = {
  timeout: 3000,
  debug: false,
  showIcon: true
}

const NotificationConsumer = NotificationContext.Consumer

export { NotificationProvider, NotificationConsumer }
