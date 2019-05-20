import App, { Container } from 'next/app'
import React from 'react'
import { initializeStore } from 'src/store'
import { Provider } from 'mobx-react'
import initializeServices, { IService } from 'src/services'

import 'src/styles/global/index.scss'

class MyMobxApp extends App {
  static async getInitialProps(appContext: any) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore()
    const service = initializeServices(mobxStore)
    mobxStore.service = service
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore
    appContext.ctx.services = service

    let appProps = await App.getInitialProps(appContext)

    return {
      ...appProps,
      initialMobxState: mobxStore,
      service,
    }
  }

  private mobxStore: any
  private service: IService

  constructor(props: any) {
    super(props)
    const isServer = typeof window === 'undefined'
    this.mobxStore = isServer ? props.initialMobxState : initializeStore()
    this.service = isServer
      ? props.services
      : initializeServices(this.mobxStore)
    this.mobxStore.service = this.service
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <Provider {...this.mobxStore} {...this.service}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}
export default MyMobxApp
