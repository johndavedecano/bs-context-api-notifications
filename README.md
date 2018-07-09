## Notification System that uses Context API

Built on top of bs-notifier module

```
import React from 'react'
import ReactDOM from 'react-dom'

import { NotificationProvider, NotificationConsumer } from 'qt_notifications'

const AlertButton = ({ alert, className, children }) => {
  return (
    <NotificationConsumer>
      {({ push }) => {
        return (
          <button
            className={className}
            onClick={() => {
              push(alert)
            }}
          >
            {children}
          </button>
        )
      }}
    </NotificationConsumer>
  )
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      message:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec id tortor ac eros tristique iaculis. Pellentesque velit arcu, dictum vel dolor eu, tempor euismod nunc.'
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(event) {
    this.setState({
      message: event.target.value
    })
  }

  render() {
    return (
      <div style={{ padding: 15 }}>
        <NotificationProvider debug>
          <h1>Examples</h1>
          <div className="col-md-4">
            <textarea
              className="form-control"
              value={this.state.message}
              onChange={this.onChange}
            />
            <br />
          </div>
          <AlertButton
            className="btn btn-success"
            alert={{
              position: 'top-left',
              type: 'success',
              headline: 'Success',
              showIcon: true,
              timeout: 3000,
              message: this.state.message
            }}
          >
            Success Example
          </AlertButton>
          <AlertButton
            className="btn btn-warning"
            alert={{
              position: 'top-right',
              headline: 'Warning',
              showIcon: true,
              timeout: 3000,
              type: 'warning',
              message: this.state.message
            }}
          >
            Warning Example
          </AlertButton>
          <AlertButton
            className="btn btn-danger"
            alert={{
              position: 'bottom-right',
              headline: 'Danger',
              showIcon: true,
              timeout: 3000,
              type: 'danger',
              message: this.state.message
            }}
          >
            Danger Example
          </AlertButton>
          <AlertButton
            className="btn btn-info"
            alert={{
              position: 'bottom-left',
              headline: 'Information',
              showIcon: true,
              timeout: 3000,
              type: 'info',
              message: this.state.message
            }}
          >
            Info Example
          </AlertButton>
        </NotificationProvider>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
}
```