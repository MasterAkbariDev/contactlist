import React, { Component, Fragment } from 'react'
import Modal from '../Modal/Modal'
import axios from 'axios'

const ErrorHandler = (WrappedComponent) => {

    return class extends Component {

        constructor() {
            super()
            this.state = {
                error: null,
                showModal: false,
            }
        }

        componentDidMount() {
            axios.interceptors.response.use(null, err => {
                this.handleMessage(true)
                this.setState({error: err})
            })
        }

        handleMessage = (condition) => {
            this.setState({ showModal: condition })
        }

        render() {
            return (
                <Fragment>
                    {this.state.showModal ? (
                        <Modal changeShow={this.handleMessage} show={this.state.error}>{this.state.error?.message}</Modal>
                    ) : (
                        <WrappedComponent {...this.props} />
                    )}
                </Fragment>
            )
        }
    }

}

export default ErrorHandler