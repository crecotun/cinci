import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from 'src/store'
import { Provider } from 'mobx-react'
import initializeApplication, { ApplicationType } from 'src/application'

import 'src/views/styles/global/index.scss'

class MyMobxApp extends App {
  static async getInitialProps(appContext: any) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore()
    const application = initializeApplication(mobxStore)
    mobxStore.application = application
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore
    appContext.ctx.application = application

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore,
      application,
    }
  }

  private mobxStore: any
  private application: ApplicationType

  constructor(props: any) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore()
    this.application = isServer
      ? props.application
      : initializeApplication(this.mobxStore)
    this.mobxStore.application = this.application
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider {...this.mobxStore} {...this.application}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
